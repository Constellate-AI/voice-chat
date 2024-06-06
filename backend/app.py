from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import transcriber
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
