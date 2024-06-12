'use client'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { sora} from '@/lib/fonts'
import {ChatMessageList} from '@/components/chat-message-list'
import {PromptForm} from '@/components/prompt-form'
import {useChat} from 'ai/react'
import {nanoid} from 'ai'
import {useMachine} from "@xstate/react"
import {chatMachine, StateMachineEvent, StateMachineState} from '@/lib/state-machine'
import {useCallback, useEffect, useRef, useState} from 'react'
import {fetchTranscript} from '@/lib/audio/transcription'
//import WorkletNode from '@/lib/audio/worklet-node'
import {PlayQueue} from '@/lib/audio/tts-play-queue'
import {INDICATOR_TYPE} from '@/lib/audio/tts-play-queue'
import {useLocalStorage} from '@/lib/hooks/use-local-storage'


export default function Home() {

    // Configure Vercel AI SDK with initial messages, configs etc
    const {
        messages,
        input,
        setInput,
        append,
        handleInputChange,
        handleSubmit,
        data
    } = useChat({
        initialMessages: [
            {
                role: 'assistant',
                content: 'Hi! I\'m a conversational AI model. My name is Iris. You can talk to me through your microphone - just make sure that your volume is turned up!',
                id: nanoid(12)
            }
        ],
    });

    // when the "data" object (events sent from the server with the LLM data) are received, then push them off to the TTS API
    useEffect(() => {

        // Handle new Sentence SSEs
        if (data && data?.length) {
            // @ts-expect-error
            const sentence = data[data.length - 1]?.sentence
            console.log(`new sentences`, sentence)
            if (data.length === 1) {
                // If this is the first one, clear the existing queue
                // @ts-expect-error
                playQueueRef.current.clear();
            }

            // if TTS is on, call the model and then ship it
            if (isTtsOn) {
                console.log(`Triggering speech synthesis`)
                // Create a nanoid; and post the transcription API to trigger it

                const sentenceId = nanoid(12)
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/synthesize`, {
                    method: 'POST',
                    body: JSON.stringify({
                        text: sentence,
                        id: sentenceId
                    }),
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(`Queued transcription for ${sentenceId}`)
                        }
                        else {
                            console.error(`failed to queue transcription for ${sentenceId}: ${response.statusText}`)

                        }
                    })
                    .catch(err => {
                        console.error(`Failed to queue transcription for ${sentenceId}: `, err.message)
                    })

                // @ts-expect-error
                playQueueRef.current?.add([sentenceId, messages.length + 1, true])
                console.log(`Added ${sentenceId} to the play queue`)

            }

            // Otherwise, have it use speech synthesis
            else {
                console.log(`triggering synthesis`)

                // @ts-expect-error
                playQueueRef.current?.add([sentence, history.length + 1, false]);
            }
        }
        // Call python backend with transcription
    }, [data?.length]);

    // Ref for the recorder that handles getting the user mic & state for mic
    const recorderNodeRef = useRef(null);
    const [isMicOn, setIsMicOn] = useState(true);


    const [botIndicators, setBotIndicators] = useState({});

    // Ref for the play queue to do the TTS
    const playQueueRef = useRef(null)

    // false
    const [isTtsOn, setIsTtsOn] = useState(true);

    // Set up the state machine we created with XState
    const [
        state,
        send,
        service
    ] = useMachine(chatMachine, {

        // Handle state machine events
        inspect: (inspectionEvent) => {

            // when a segment of a transcription is received, set the transcript to include the new segment
            if (
                inspectionEvent.type === '@xstate.event' &&
                inspectionEvent.event.type === StateMachineEvent.TranscriptReceived
            ) {
                console.log(`Transcript received!`, inspectionEvent.event.transcript)
                console.log(`current input`, input)
                setInput(input + inspectionEvent.event.transcript?.trimStart())
                console.log({state})
            }
        }
    });

    // Subscribe to events & state transition the state machine
    useEffect(() => {

        const subscription = service.subscribe((snapshot) => {
            console.log(`snapshot`, snapshot.value)
        })
        return subscription.unsubscribe;
    }, [service]);

    // callback to generate the LLM response. Currently this uses fetchGeneration; which wraps custom decoding.
    // We will use the Vercel AI SDK
    const generateResponse = useCallback(
        async (noop: boolean, input: string = '') => {

            if (!input) return
            if (!noop) {
                // Turn the mic off
                // @ts-expect-error
                recorderNodeRef.current?.stop()
            }
            setIsMicOn(false)
            console.log(`generating response`, input, messages)
            console.log(`running "generateResponse" with string `, input)
            await append({role: 'user', content: input, id: nanoid(12)})
            console.log(`Sending "Generation done"`)
            setInput('')
            send({type: StateMachineEvent.GenerationDone})
            setIsMicOn(true)
            // Turn the mic back on
            // @ts-expect-error

        }, [messages, isTtsOn])


    useEffect(() => {

        if (input && state.matches(StateMachineState.BotGenerating)) {
            //console.log(`can generate`)
            generateResponse(/*Noop =*/ false, input)
        }
        else {
            //console.log(`can't generate`)
            //console.log(`input`, input)
            //console.log(`history`, messages, messages.length)
            //console.log(state.matches(StateMachineState.BotGenerating))
        }


        // FIXME this might not work since messages might not change
    }, [state, input])

    // Callback for when a buffer of audio is received & needs to be transcribed
    const onSegmentReceived = useCallback(
        async (buffer: Buffer) => {

            //console.log(`received audio segment of length`, buffer.byteLength, ` bytes`)
            if (buffer.length) {
                send({type: StateMachineEvent.SegmentReceived})
            }

            // Get the transcript for the audio volume;
            // TODO make sure that this is in order
            const data = await fetchTranscript(buffer)
            if (buffer.length) {
                send({
                    type: StateMachineEvent.TranscriptReceived,
                    transcript: data
                })
            }
        },
        // FIXME this may not wory since the array might not change
        [messages]
    )

    // Load the worker once the page loads
    useEffect(() => {
        class WorkletNode extends AudioWorkletNode {
            // @ts-expect-error
            constructor(context, onSegmentRecv, onSilence, onTalking) {
                super(context, 'worklet-processor')
                this.port.onmessage = (event) => {
                    if (event.data.type === 'segment') {
                        onSegmentRecv(event.data.buffer)
                    }
                    else if (event.data.type === 'silence') {
                        onSilence()
                    }
                    else if (event.data.type === 'talking') {
                        onTalking()
                    }
                }
            }

            stop()  {
                this.port.postMessage({type: 'stop'})
            }

            start() {
                this.port.postMessage({type: 'start'})
            }
        }
        (async function () {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true})
            const context = new AudioContext()
            const source = context.createMediaStreamSource(stream)

            await context.audioWorklet.addModule('worklet-processor.js')
            const recorderNode = new WorkletNode(
                context,
                onSegmentReceived,
                () => {
                    console.log(`sending SILENCE detected event`)
                    return send({type: StateMachineEvent.Silence})
                },
                () => {
                    console.log(`sending TALKING Detected event`)
                    return send({type: StateMachineEvent.Sound})
                }
            )

            // @ts-ignore
            recorderNodeRef.current = recorderNode
            source.connect(recorderNode)
            recorderNode.connect(context.destination)
            // @ts-ignore
            playQueueRef.current = new PlayQueue(context, setBotIndicators)
            console.log(`finished setting everything up`)
            setIsMicOn(false)
            console.log(`turning mic off...`)
        })()

    }, [])

    // Start/stop the recorder when the mic goes on or off
    useEffect(() => {
        if (recorderNodeRef.current) {
            console.log(`mic`, isMicOn)

            if (isMicOn) {
                // @ts-ignore
                recorderNodeRef.current.start()
            }
            else {
                // @ts-ignore
                recorderNodeRef.current.stop()
            }
        }
    }, [isMicOn]);


    // if TTS is off, clear the play queue for it
    useEffect(() => {
        if (playQueueRef.current && !isTtsOn) {
            console.log(`cancelling future audio calls`)

            // @ts-ignore
            playQueueRef.current.clear()
        }
    }, [isTtsOn]);

    let userIndicator = INDICATOR_TYPE.IDLE
    const userIsLast = messages.length % 2 === 1
    if (userIsLast) {
        userIndicator = state.matches(StateMachineState.UserTalking)
            ? INDICATOR_TYPE.TALKING
            : INDICATOR_TYPE.SILENT
    }

    useEffect(() => {
        console.log(`bot indicator changed`, botIndicators)
    }, [botIndicators]);

    return (

        //  Header Bar
        <main className={'flex min-h-screen max-h-screen flex-col items-center justify-between w-screen'}>
            <header className={'bg-gray-900 text-white py-4 px-6 flex items-center justify-between w-full'}>
                <h1 className={'text-xl font-extrabold text-[36px] tracking-tighter'}> iris</h1>
                <div className={'flex flex-row items-center gap-4'}>
                    {/*<Button variant={'ghost'} size={'icon'}>
                        <SettingsIcon className={'h-5 w-5'}/>
                        <span className={'src-only'}>Settings</span>
                    </Button>*/}
                    <Avatar className={'w-8 h-8 border'} style={sora.style}>
                        <AvatarImage src={'/placeholder.svg'} alt={'avatar'}/>
                        <AvatarFallback className={'text-gray-900'}>KM</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            {/* Chat Messages*/}
            <section className={'w-full flex-grow overflow-auto p-6 bg-gray-100 dark:bg-gray-950 flex flex-col'}>
                <ChatMessageList messages={messages}/>
            </section>

            {/* Toolbar*/}
            <section className={'w-full bg-gray-200 dark:bg-gray-950 p-4 flex flex-row items-center gap-2'}>
                <PromptForm
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    isMicOn={isMicOn}
                    setIsMicOn={setIsMicOn}
                />
            </section>

        </main>
    );
}
