import time
import numpy as np
import ffmpeg
import tempfile
from openai import OpenAI
import os
from dotenv import load_dotenv
import requests
import re

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def transcribe(audio_data: bytes):
    print('transcribing')
    fp = load_audio(audio_data)
    print('filepath', fp)

    # TODO use local whisper
    audio_file = open(fp, "rb")
    #transcription = client.audio.transcriptions.create(
    #    model="whisper-1",
    #    file=audio_file
    #)
    #print(transcription.text)

    # try with local whisper
    whisper_api_url = f'{os.getenv("WHISPER_API_URL")}/inference'
    print('whisper API url', whisper_api_url)
    whisper_response = requests.post(
        whisper_api_url,
        files={
            'response_format': (None, 'json'),
            'file': ('file.wav', audio_file),
            'temperature': (None, '0.0'),
            'temperature_step': (None, '0.2')
        }
    )

    print('response', whisper_response.json())

    text = whisper_response.json()['text']
    print('full text:', text)

    # nuke newlines and text between brackets since local whisper adds these
    modified = text.replace('\n', '')
    modified = re.sub(r'\[.*?\]', '', modified)
    print('modified text:', modified)
    return {'text': modified}

def load_audio(data: bytes, sr: int = 16000):
    print('loading audio')
    try:
        # write the audio/float32 to a WAV file noting that it won't work
        fp = tempfile.NamedTemporaryFile(delete=False, suffix=".wav", dir="/tmp")
        fp.write(data)
        fp.close()

        filename = fp.name.split('.')[0]

        out, _ = (ffmpeg.input(
            fp.name,
            threads=0,
            format='f32le',
            acodec="pcm_f32le",
            ac=1,
            ar="24k",
        )
        .output(
            f'{filename}.transformed.wav',
            **{
                'c:a': 'pcm_s16le', # required for whisper.cpp
                'ar': '16k' # required for whisper.cpp
            }
        ) #  **{'b:a': '48k'}
        .run(cmd=['ffmpeg', '-nostdin'],
             capture_stdout=True,
             capture_stderr=True)
        )
        print(f'wrote file {fp.name}')
    except ffmpeg.Error as e:
        raise RuntimeError(f"Failed to load audio: {e.stderr.decode()}") from e

    #return np.frombuffer(out, np.float32).flatten()
    return f'{filename}.transformed.wav'
