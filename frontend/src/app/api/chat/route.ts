import {createOpenAI} from '@ai-sdk/openai'
import {StreamData, StreamingTextResponse, streamText} from 'ai'
import dotenv from 'dotenv'
import FastQ from 'fastq';
import type { queue, done } from 'fastq';

type Sentence = string


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



    // This is how we will stream message chunks that have been transcribed,
    //  BUT for now we will stream the sentence chunks
    const dataStream = new StreamData()

    // Store the full response so far, and the list of COMPLETE sentences
    let responseInProgress: string = '';
    let fullSentences: string[] = [];

    // Worker to process each individual sentence, in SYNC, while it's done
    const sentenceProcessor = (s: Sentence, end: done) => {
        console.log(`processing sentence:`, s)
        if (!fullSentences.includes(s)) {

            // Add it to the list of full sentences
            fullSentences.push(s)

            // Push it to the SSE Data stream
            dataStream.append({sentence: s})
            console.log(`Full sentence added: "${s}"`)
            end(null)

        }
        else {
            console.log(`Rejecting sentence "${s}" (already in list!)`)
        }
    }

    // Task queue for sentence processing so we don't stream these out-of-order
    const taskQueue: FastQ.queue<Sentence> = FastQ<Sentence>(
        sentenceProcessor, // Worker to process Sentences
        1 // Concurrency = 0 so it's synchronous
    )

    // LLM stream
    const llmStream = result.toAIStream({

        // This callback is invoked for each new token; they are NOT guaranteed to be processed in order; hence the
        //  necessity of queueing sentence processing.
        onToken: (token: string) => {
            responseInProgress += token

            // split the response in progress into sentences
            let sentences = responseInProgress.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")

            // If there's a new COMPLETE sentence that hasn't been handled yet, parse it out and push it to the
            //  sentence task queue which will ALSO de-duplicate processing
            if (sentences.length > 1 && sentences.length > fullSentences.length + 1) {
                taskQueue.push(sentences[sentences.length - 2])
            }
        },

        // When the final token is received, check to see if the last sentence is in there and if not, then add it
        onFinal: (fullCompletion: string) => {
            const sentences = fullCompletion.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
            const lastSentence = sentences[sentences.length - 1]
            if (!fullSentences.includes(lastSentence)){
                taskQueue.push(lastSentence)
            }
            dataStream.close()
        },
    })

    return new StreamingTextResponse(
        llmStream,
        {},
        dataStream
    )
}