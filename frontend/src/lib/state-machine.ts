import {createMachine, assign, StateMachine} from 'xstate'


const seconds = (s: number) => s * 1000
const CANCEL_OLD_AUDIO = false // TODO set this to true after cancellations don't affect containers ??

export enum StateMachineState {
    BotDone = 'botDone',
    BotGenerating = 'botGenerating',
    UserSilent = 'userSilent',
    UserTalking = 'userTalking',
}

export enum StateMachineEvent {
    GenerationDone = 'generation done',
    TypingDone = 'typing done',
    SegmentReceived = 'segment received',
    Silence = 'silence',
    Sound = 'sound',
    TranscriptReceived = 'transcription received',
}

export enum StateMachineAction {
    ResetPendingSegments = 'reset pending segments',
    IncrementMessages = 'increment messages',
    SegmentReceive = 'segment receive',
    TranscriptReceive = 'transcript receive',
    ResetTranscript = 'reset transcript'
}

export enum StateMachineGuard {
    CanGenerate = 'can generate'
}

export enum StateMachineDelay {
    SilentDelay = seconds(4),
    UserTalkingDelayForSilentSignalMissed = seconds(3)
}

export interface StateMachineContext {
    pendingSegments: number
    transcript: string
    messages: number
}


export const chatMachine = createMachine(
    {

        // Initial configuration for the state machine - which state to be at and the context for it
        initial: StateMachineState.BotDone,
        context: {
            pendingSegments: 0,     // no pending segments
            transcript: '',         // no transcript yet
            messages: 1             // 1 message so far
        },
        // States for the state machine
        states: {

            // State for when the LLM is generating
            [StateMachineState.BotGenerating]: {

                // Events for this state
                on: {
                    // When the generation is done, go to the 'done' state and reset the transcript
                    [StateMachineEvent.GenerationDone]: {
                        target: StateMachineState.BotDone,
                        actions: StateMachineAction.ResetTranscript
                    }
                }
            },

            // State for when the bot is done generating
            [StateMachineState.BotDone]: {

                // Events for this state
                on: {

                    // When the bot is done generating AND THEN the user is done typing, go to the
                    // "user silent" state and reset the pending audio segments, and increment message count
                    [StateMachineEvent.TypingDone]: {
                        target: StateMachineState.UserSilent,
                        actions: [
                            StateMachineAction.ResetPendingSegments,
                            StateMachineAction.IncrementMessages
                        ]
                    },

                    // When the bot is done generating AND THEN an audio segment is received
                    // Go to the "user talking" state; reset pending segments, receive the new segment, and increment messages
                    [StateMachineEvent.SegmentReceived]: {
                        target: StateMachineState.UserTalking,
                        actions: [
                            StateMachineAction.ResetPendingSegments,
                            StateMachineAction.SegmentReceive,
                            StateMachineAction.IncrementMessages
                        ]
                    },
                }
            },

            // State for when the user is currently talking
            [StateMachineState.UserTalking]: {
                on: {

                    // When the user is talking AND THEN goes silent, go to the "user silent" state
                    [StateMachineEvent.Silence]: {
                        target: StateMachineState.UserSilent
                    },

                    // When the user is talking and a segment is received, handle the segment
                    [StateMachineEvent.SegmentReceived]: {
                        actions: StateMachineAction.SegmentReceive
                    },

                    // When the user is talking and a TRANSCRIPT is received, handle the received transcript
                    [StateMachineEvent.TranscriptReceived]: {
                        actions: StateMachineAction.TranscriptReceive
                    }
                },
                after: {
                    [StateMachineDelay.UserTalkingDelayForSilentSignalMissed]: {
                        target: StateMachineState.BotGenerating,
                        guard: StateMachineGuard.CanGenerate
                    }
                }
            },

            // State for when the user is done talking
            [StateMachineState.UserSilent]: {

                // Events
                on: {
                    // When the user is silent and sound is received, go to the "user talking" state
                    [StateMachineEvent.Sound]: {
                        target: StateMachineState.UserTalking,
                    },

                    // When the user is silent and an audio segment is received, handle it
                    [StateMachineEvent.SegmentReceived]: {
                        actions: StateMachineAction.SegmentReceive
                    },

                    // When a transcript is received, handle the transcript
                    [StateMachineEvent.TranscriptReceived]: {
                        actions: StateMachineAction.TranscriptReceive
                    }
                },

                // Automatic transitions
                after: {

                    [StateMachineDelay.SilentDelay]: [
                        {
                            target: StateMachineState.BotGenerating,
                            actions: StateMachineAction.IncrementMessages,
                            guard: StateMachineGuard.CanGenerate
                        },
                        {
                            target: StateMachineState.UserSilent
                        }
                    ]
                }
            },
        },
    },
    {
        actions: {
            // When a segment is received, increment the number of pending segments
            [StateMachineAction.SegmentReceive]: assign({
                pendingSegments: ({event, context}) => context.pendingSegments + 1
            }),

            // When a transcript for a segment is received, decrement the number of pending segments
            [StateMachineAction.TranscriptReceive]: assign({
                // Update pending segments - decrement
                pendingSegments: ({context}) => context.pendingSegments -1,

                // Add the new transcript segment to the total transcript
                transcript: ({context, event}) => {
                    console.log('received transcript', {context, event})
                    return context.transcript + event.transcript // return current transcript plus new section
                }
            }),

            // When we receive "reset pending segments" reset the pending segments to 0
            [StateMachineAction.ResetPendingSegments]: assign({
                pendingSegments: 0
            }),

            // When we receive "increment messages" add a new message
            [StateMachineAction.IncrementMessages]: assign({
                messages: ({event, context}) => context.messages + 1
            }),

            // Reset transcript
            [StateMachineAction.ResetTranscript]: assign({
                transcript: ''
            })
        },
        guards: {

            // CanGenerate guard - make sure we only generate if there are no pending segments and we
            //  have a non-zero-length transcript
            [StateMachineGuard.CanGenerate]: ({context}) => {
                console.log(`CanGenerate guard running with context`, context)
                const canGenerate = context.pendingSegments === 0 && context.transcript.length > 0
                console.log(`GUARD can generate?`, canGenerate, context.pendingSegments, context.transcript.length)
                return canGenerate
            }
        }
    }
)