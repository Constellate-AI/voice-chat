from TTS.api import TTS
import os
tts = TTS('tts_models/en/vctk/vits')
# print(tts.speakers)


def synthesize_speech(text: str, id: str, speaker='p304'):
    # 244, 246, 268, 270, 297, 304, 316, 335, 339, 364
    print(f'starting segment {id}')

    # write to a temporary file so the API doesn't try to read it until we're done writing
    filename=f'/tmp/{id}.temp.wav'
    print('writing to file', filename)
    wav = tts.tts_to_file(text, speaker=speaker, file_path=filename)

    # rename the file once we're done writing
    os.rename(filename, f'/tmp/{id}.wav')
    print(f'wav finished for {id}')
    return filename
