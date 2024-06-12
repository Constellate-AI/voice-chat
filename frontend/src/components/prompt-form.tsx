'use client'
import type {FC} from 'react'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import {MicIcon, MicOffIcon, SendIcon, MessageCircleXIcon} from 'lucide-react'
import type {UseChatHelpers} from 'ai/react'
import {cn} from '@/lib/utils'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip'

export const PromptForm: FC<Partial<UseChatHelpers> & {isMicOn: boolean, setIsMicOn: (b: boolean) => void}> = ({
    handleInputChange,
    handleSubmit,
    input,
    setIsMicOn,
    isMicOn,
}) => {
    return (
        <div className={' dark:bg-gray-950 p-4 w-full'}>
            <div className={'my-0 mx-auto max-w-[1040px] w-full flex flex-row items-center gap-2'}>
                <Textarea
                    placeholder={'type your message...'}
                    className={'flex-1 rounded-lg p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200'}
                    value={input}
                    onChange={handleInputChange}
                />
                <div className={'grid grid-cols-2 gap-2'}>
                    <div className={'col-span-1 flex flex-col gap-2'}>
                        <form onSubmit={handleSubmit} className={'cursor-pointer'}>
                            <Button className={'cursor-pointer z-10'}>
                                <SendIcon className={'w-5 h-5'}/>
                                <span className={'sr-only'}>Send</span>
                            </Button>
                        </form>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild={true}>
                                    <Button
                                        type={'button'}
                                        className={cn(
                                            'cursor-pointer z-10',
                                            isMicOn ? 'bg-black ' : 'bg-red-500 hover:bg-red-600'
                                        )}
                                        onClick={() => setIsMicOn(!isMicOn)}>
                                        {isMicOn
                                            ? <MicIcon className={'h-5 w-5'}/>
                                            : <MicOffIcon className={'h-5 w-5'}/>
                                        }
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {isMicOn ? 'Turn microphone off' : 'Turn microphone on'}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </div>
                    <div className={'col-span-1 flex flex-col gap-2'}>
                        <Button onClick={() => {}}>
                            <MessageCircleXIcon className={'w-5 h-5'}/>
                        </Button>
                    </div>

                </div>


            </div>

        </div>
    )
}