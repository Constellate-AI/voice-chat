import time
import numpy as np
import ffmpeg
import tempfile
from openai import OpenAI
import os
from dotenv import load_dotenv

ßload_dotenv()
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

    return {'text': 'test'}


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
        .output(f'{filename}.mp3') #  **{'b:a': '48k'}
        .run(cmd=['ffmpeg', '-nostdin'],
             capture_stdout=True,
             capture_stderr=True)
        )
        print(f'wrote file {fp.name}')
    except ffmpeg.Error as e:
        raise RuntimeError(f"Failed to load audio: {e.stderr.decode()}") from e

    #return np.frombuffer(out, np.float32).flatten()
    return f'{filename}.mp3'
