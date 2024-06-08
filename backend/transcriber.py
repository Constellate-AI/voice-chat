import time
import numpy as np
import ffmpeg
import tempfile
from openai import OpenAI
import os
from dotenv import load_dotenv
import requests

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def transcribe(audio_data: bytes):
    print('transcribing')
    t0 = time.time()
    fp = load_audio(audio_data)

    # TODO use local whisper
    audio_file = open(fp, "rb")
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file
    )
    print(transcription.text)

    # try with local whisper
    form_data = {
        'file': ('recording.wav', audio_file),
        'temperature': '0.2',
        'response_format': 'json'
    }
    whisper_api_url = f'{os.getenv("WHISPER_API_URL")}/inference'
    print('whisper API url', whisper_api_url)
    whisper_response = requests.post(
        whisper_api_url,
        data=form_data,
        headers={'Content-Type': 'multipart/form-data'}
    )

    print('whisper response', whisper_response.text)

    return {'text': transcription.text}


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
        .output(f'{filename}.transformed.wav') #  **{'b:a': '48k'}
        .run(cmd=['ffmpeg', '-nostdin'],
             capture_stdout=True,
             capture_stderr=True)
        )
        print(f'wrote file {fp.name}')
    except ffmpeg.Error as e:
        raise RuntimeError(f"Failed to load audio: {e.stderr.decode()}") from e

    #return np.frombuffer(out, np.float32).flatten()
    return f'{filename}.transformed.wav'
