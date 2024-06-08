import {createOpenAI} from '@ai-sdk/openai'
import {streamText} from 'ai'
import dotenv from 'dotenv'

dotenv.config()

const openai = createOpenAI({
    compatibility: 'compatible',
    baseURL: process.env.OPENAI_API_URL,
})

export async function POST(req: Request) {

    const {messages} = await req.json()
    if (!messages || !messages.length) return Response.json({error: 'No Messages specified!'}, {status: 400})

    const result = await streamText({
        model: openai('model-id-doesnt-matter-for-llama.cpp'),
        messages,
    })

    return result.toAIStreamResponse()
}