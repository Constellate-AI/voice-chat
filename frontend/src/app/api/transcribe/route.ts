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

    const temp = await tmp.file({postfix: '.wav'})

    await fs.writeFile(temp.path, new Uint8Array(await body.arrayBuffer()))
    const fp = spawn('ffmpeg', [
        '-i', temp.path,
        '-f', 'f32le',
        '-acodec', 'pcm_f32le',
        '-ac', '1',
        '-ar', '48000',
        '-'
    ])

    const transcription = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: new File([body], 'recordingw.mp3')
    })

    await temp.cleanup()
    console.log(`transcription`, transcription)
    return Response.json({text: transcription.text})
}