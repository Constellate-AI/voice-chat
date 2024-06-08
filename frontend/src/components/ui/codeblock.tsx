// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Markdown/CodeBlock.tsx

'use client'
import {GeistMono} from 'geist/font/mono';

import { FC, memo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { IconCheck, IconCopy, IconDownload } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import {sourceCodeFont} from '@/lib/fonts'

import {cn} from '@/lib/utils'

interface Props {
    language: string
    value: string
    className?: string
}

interface languageMap {
    [key: string]: string | undefined
}

export const programmingLanguages: languageMap = {
    javascript: '.js',
    python: '.py',
    java: '.java',
    c: '.c',
    cpp: '.cpp',
    'c++': '.cpp',
    'c#': '.cs',
    ruby: '.rb',
    php: '.php',
    swift: '.swift',
    'objective-c': '.m',
    kotlin: '.kt',
    typescript: '.ts',
    go: '.go',
    perl: '.pl',
    rust: '.rs',
    scala: '.scala',
    haskell: '.hs',
    lua: '.lua',
    shell: '.sh',
    sql: '.sql',
    html: '.html',
    css: '.css'
    // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
}

export const generateRandomString = (length: number, lowercase = false) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789' // excluding similar looking characters like Z, 2, I, 1, O, 0
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return lowercase ? result.toLowerCase() : result
}

const CodeBlock: FC<Props> = memo(({ language, value, className }) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

    const downloadAsFile = () => {
        if (typeof window === 'undefined') {
            return
        }
        const fileExtension = programmingLanguages[language] || '.file'
        const suggestedFileName = `file-${generateRandomString(
            3,
            true
        )}${fileExtension}`
        const fileName = window.prompt('Enter file name' || '', suggestedFileName)

        if (!fileName) {
            // User pressed cancel on prompt.
            return
        }

        const blob = new Blob([value], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = fileName
        link.href = url
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const onCopy = () => {
        if (isCopied) return
        copyToClipboard(value)
    }

    return (
        <div className={'relative w-full font-sans codeblock bg-zinc-950 rounded-md my-4'}>

            {/* Header*/}
            <div className='flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100 rounded-t-md border border-zinc-500'>
                <span className='text-xs lowercase'>{language}</span>
                <div className='flex items-center space-x-1'>
                    <Button
                        variant='ghost'
                        className='text-xs cursor-pointer hover:bg-zinc-600 max-h-8'
                        onClick={downloadAsFile}
                        size='icon'
                    >
                        <IconDownload />
                        <span className='sr-only'>Download</span>
                    </Button>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='text-xs cursor-pointer hover:bg-zinc-600 max-h-8'
                        onClick={onCopy}
                    >
                        {isCopied ? <IconCheck /> : <IconCopy />}
                        <span className='sr-only'>Copy code</span>
                    </Button>
                </div>
            </div>

            {/* Body*/}
            <SyntaxHighlighter
                className={className}
                language={language}
                style={coldarkDark}
                PreTag='div'
                showLineNumbers
                customStyle={{
                    margin: 0,
                    width: '100%',
                    background: 'transparent',
                    padding: '1.5rem 1rem',
                    borderColor: 'rgb(113 113 122 / var(--tw-border-opacity))',
                    borderRightWidth: '1px',
                    borderLeftWidth: '1px',
                    borderBottomWidth: '1px',
                    borderBottomLeftRadius: 'calc(var(--radius) - 2px)',
                    borderBottomRightRadius: 'calc(var(--radius) - 2px)',

                    // @ts-expect-error custom tailwaind prop
                    '--tw-border-opacity': 1,
                    ...sourceCodeFont.style
                }}
                codeTagProps={{
                    style: {
                        fontSize: '0.9rem',
                        ...sourceCodeFont.style
                    }
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    )
}, (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.className === nextProps.className)
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }