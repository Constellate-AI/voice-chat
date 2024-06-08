// TODO replace with call to local whisper submodule

import {unstable_noStore} from 'next/cache'
import OpenAI from 'openai'
import {promises as fs} from 'fs'
import {nanoid} from 'ai'


const openai = new OpenAI()

export async function POST(request: Request): Promise<Response> {
    unstable_noStore() // prevent caching

    const body = await request.blob()

    const fileName = `/tmp/` + nanoid(12) + '.wav'

    await fs.writeFile(fileName, new Uint8Array(await body.arrayBuffer()))
    console.log(`wrote file to `, fileName)

    const transcription = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: new File([body], 'recording.wav')
    })

    //await temp.cleanup()
    console.log(`transcription`, transcription)

    const formData = new FormData()
    formData.append('file', new File([body], 'recording.wav'))
    formData.append('temperature', '0.2')
    formData.append('response_format', 'json')
    const whisperResponse = await fetch(`${process.env.WHISPER_API_URL}/inference`, {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log(`whisper response:`, whisperResponse.status)
    console.log(`whisper response body:`, await whisperResponse.json())

    return Response.json({text: transcription.text})
}