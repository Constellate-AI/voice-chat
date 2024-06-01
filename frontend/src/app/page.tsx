import Image from "next/image";
import {Button} from '@/components/ui/button'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {SettingsIcon} from 'lucide-react'
import {inter} from '@/lib/fonts'
import {ChatMessageList} from '@/components/chat-message-list'
import {nanoid} from 'ai'
import type {Message} from 'ai'

const exampleMessages = [
    {
        role: 'assistant',
        content: 'Hello! I am an AI language model. How can I assist you?',
        id: nanoid(12)
    },
    {
        role: 'user',
        content: 'Hi there! I am curious to learn more about your capabilities. Can you tell me a bit about what you can do?',
        id: nanoid(12)
    },
    {
        role: 'assistant',
        content: 'As an AI language model, I have a wide range of capabilities. I can assist with tasks such as answering questions, providing explanations, generating text, and even helping with analysis and problem-solving. Please feel free to ask me anything, and I will do my best to help!',
        id: nanoid(12)
    }
]
export default function Home() {
    return (

        //  Header Bar
        <main className="flex min-h-screen flex-col items-center justify-between w-screen">
            <header className={'bg-gray-900 text-white py-4 px-6 flex items-center justify-between w-full'}>
                <h1 className={'text-xl font-bold'}> Private Siri</h1>
                <div className={'flex flex-row items-center gap-4'}>
                    <Button variant={'ghost'} size={'icon'}>
                        <SettingsIcon className={'h-5 w-5'}/>
                        <span className={'src-only'}>Settings</span>
                    </Button>
                    <Avatar className={'w-8 h-8 border'} style={inter.style}>
                        <AvatarImage src={'/placeholder.svg'} alt={'avatar'}/>
                        <AvatarFallback className={'text-gray-900'}>KM</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            {/* Chat Messages*/}
            <section className={'w-full flex-grow overflow-auto p-6 bg-gray-100 dark:bg-gray-950 flex flex-col'}>
                <ChatMessageList messages={exampleMessages as Message[]}/>
            </section>

            {/* Toolbar*/}
            <section className={'w-full bg-gray-200 dark:bg-gray-950 p-4 flex flex-row items-center gap-2'}>

            </section>

        </main>
    );
}
