from fastapi import FastAPI, Request, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import transcriber
import synthesizer
import os

app = FastAPI()
app.add_middleware(CORSMiddleware,
                   allow_origins=['localhost', 'http://localhost:3000', 'http://localhost:3001'],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"],
                   )

@app.get('/')
async def root():
    return {'message': 'hello world'}


@app.post('/transcribe')
async def transcribe(request: Request):
    body = await request.body()
    result = transcriber.transcribe(body)
    return result['text']


@app.post('/synthesize')
async def synthesize_speech(request: Request, background_tasks: BackgroundTasks):
    body = await request.json()
    job_text = body['text']
    job_id = body['id']
    print(f'Received request {job_id} to transcribe sentence:"{job_text}"')

    if not job_id:
        raise HTTPException(status_code=400, detail='Empty text to transcribe')
    if not job_text:
        job_text = ''

    print('Starting background job for', job_id)
    background_tasks.add_task(synthesizer.synthesize_speech, job_text, job_id)
    return {
        'id': job_id
    }


@app.get('/audio/{call_id}')
async def audio(call_id: str):
    print(f'Received request to get transcription for id {call_id}')
    try:
        audio_file = open(f'/tmp/{call_id}.wav', 'rb')

        def audio_stream_generator():
            yield from audio_file

        print(f'created audio stream for {call_id}')
        return StreamingResponse(audio_stream_generator(), media_type="audio/wav")
    except FileNotFoundError as e:
        print(f'Unable to find audio file {call_id}')
        print(e)
        raise HTTPException(status_code=404, detail='Audio file not found')

    except Exception as e:
        print(f'Unable to get audio stream for {call_id}')
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


@app.delete('/audio/{call_id}')
async def delete_audio(call_id: str):
    print(f'Received request to delete {call_id}')
    try:
        os.remove(f'/tmp/{call_id}.wav')
        print(f'deleted audio file for {call_id}')
        return {'id': call_id}
    except Exception as e:
        print(f'Unable to delete audio file for {call_id}')
        raise HTTPException(status_code=500, detail=str(e))
