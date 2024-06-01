import {FC} from 'react'
import type {Message} from 'ai'
import {ChatMessage} from '@/components/chat-message'


export const ChatMessageList: FC<{
    messages: Message[]
}> = ({messages}) => {

    return (
        <div className={'my-0 mx-auto max-w-[1040px] flex-grow w-full flex flex-col gap-4'}>

            {messages.map((message: Message, idx: number) => (
                <ChatMessage message={message} key={idx}/>
            ))}
        </div>
    )
}

