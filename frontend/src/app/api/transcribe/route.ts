// TODO replace with call to local whisper submodule

import {unstable_noStore} from 'next/cache'
import OpenAI from 'openai'
import ffmpeg from 'ffmpeg'
import {promises as fs} from 'fs'
import {nanoid} from 'ai'
import tmp from 'tmp-promise'
import {spawn} from 'node:child_process'

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
    return Response.json({text: transcription.text})
}