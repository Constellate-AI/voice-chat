'use client'
import type {FC} from 'react'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import {SendIcon} from 'lucide-react'
import type {UseChatHelpers} from 'ai/react'

export const PromptForm: FC<Partial<UseChatHelpers>> = ({
    handleInputChange,
    handleSubmit,
    input
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
                <form onSubmit={handleSubmit} className={'cursor-pointer'}>
                    <Button className={'cursor-pointer'} >
                        <SendIcon className={'w-5 h-5'}/>
                        <span className={'sr-only'}>Send</span>
                    </Button>
                </form>

            </div>

        </div>
    )
}