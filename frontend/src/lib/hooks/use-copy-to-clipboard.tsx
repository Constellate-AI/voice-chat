'use client'

import * as React from 'react'
import {toast} from 'sonner'

export interface useCopyToClipboardProps {
    timeout?: number
}

export function useCopyToClipboard({
    timeout = 2000
}: useCopyToClipboardProps) {
    const [isCopied, setIsCopied] = React.useState<boolean>(false)

    const copyToClipboard = (value: string) => {
        if (!window.isSecureContext) {
            toast.warning('Unable to copy to clipboard', {
                description: 'Clipboard functionalities are only available in secure (HTTPS) contexts.'
            })
            return
        }
        if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
            toast.error('Unable to copy to clipboard')
            return
        }

        if (!value) {
            return
        }

        navigator.clipboard.writeText(value).then(() => {
            setIsCopied(true)

            setTimeout(() => {
                setIsCopied(false)
            }, timeout)
        })
    }

    return { isCopied, copyToClipboard }
}