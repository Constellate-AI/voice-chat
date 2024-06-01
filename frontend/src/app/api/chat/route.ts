import {openai} from '@ai-sdk/openai'
import {streamText} from 'ai'

export async function POST(req: Request) {

    const {messages} = await req.json()
    if (!messages || !messages.length) return Response.json({error: 'No Messages specified!'}, {status: 400})

    const result = await streamText({
        model: openai('gpt-3.5-turbo'),
        messages,
    })

    return result.toAIStreamResponse()
}