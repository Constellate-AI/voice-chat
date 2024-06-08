'use client'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {inter} from '@/lib/fonts'
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


export default function Home() {

    // Configure Vercel AI SDK with initial messages, configs etc
    const {
        messages,
        input,
        setInput,
        setMessages,
        append,
        handleInputChange,
        handleSubmit,
    } = useChat({
        initialMessages: [
            {
                role: 'assistant',
                content: 'Hi! I\'m a conversational AI model. My name is Iris. You can talk to me through your microphone - just make sure that your volume is turned up!',
                id: nanoid(12)
            }
        ]
    });

    // Ref for the recorder that handles getting the user mic & state for mic
    const recorderNodeRef = useRef(null);
    const [isMicOn, setIsMicOn] = useState(true);
    const [botIndicators, setBotIndicators] = useState({});

    // Ref for the play queue to do the TTS
    const playQueueRef = useRef(null)
    const [isTortoiseOn, setIsTortoiseOn] = useState(false);

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
                setInput(
                    (m) => m + (m
                            ? inspectionEvent.event.transcript
                            : inspectionEvent.event.transcript?.trimStart()
                    )
                );
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
                // @ts-expect-error
                recorderNodeRef.current?.stop()
            }
            console.log(`generating response`, input, messages)
            // TODO the endpoint should both handle LLM generation AND TTS on a per-sentence level.

            // FIXME
            console.log(`running "generateResponse" with string `, input)
            setIsMicOn(false)
            await append({role: 'user', content: input, id: nanoid(12)})
            console.log(`Sending "Generation done"`)
            setInput('')
            send({type: StateMachineEvent.GenerationDone})
            setIsMicOn(true)

        }, [messages, isTortoiseOn])


    useEffect(() => {

        if (input && state.matches(StateMachineState.BotGenerating)) {
            console.log(`can generate`)
            generateResponse(/*Noop =*/ false, input)
        }
        else {
            console.log(`can't generate`)
            console.log(`input`, input)
            console.log(`history`, messages, messages.length)
            console.log(state.matches(StateMachineState.BotGenerating))
        }


        // FIXME this might not work since messages might not change
    }, [state, input])

    // Callback for when a buffer of audio is received & needs to be transcribed
    const onSegmentReceived = useCallback(
        async (buffer: Buffer) => {

            console.log(`received audio segment of length`, buffer.byteLength, ` bytes`)
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
        if (playQueueRef.current && !isTortoiseOn) {
            console.log(`cancelling future audio calls`)

            // @ts-ignore
            playQueueRef.current.clear()
        }
    }, [isTortoiseOn]);

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
                    <Avatar className={'w-8 h-8 border'} style={inter.style}>
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
