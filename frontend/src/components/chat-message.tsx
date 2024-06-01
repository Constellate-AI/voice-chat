import type {FC} from 'react'
import type {Message} from 'ai'
import {cn} from '@/lib/utils'
import {inter} from '@/lib/fonts'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

export const ChatMessage: FC<{ message: Message }> = ({message}) => {
    return (
        <div className={cn(
            'flex items-start gap-4 w-full',
            message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
        )} style={inter.style}>

            {/* Avatar / profile image*/}
            <Avatar className={'w-10 h-10 border bg-gray-200 shadow-lg'}>
                <AvatarImage src={'/placeholder.png'} alt={'Avatar'}></AvatarImage>
                <AvatarFallback className={'text-black'}>{message.role === 'assistant' ? 'AI' : 'KM'}</AvatarFallback>
            </Avatar>

            <div className={cn(
                'p-4 rounded-lg max-w-[75%] shadow-lg',
                message.role === 'assistant'
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white'
                    : 'bg-blue-500 text-white '
            )}>
                {message.content}
            </div>
        </div>
    )
}
