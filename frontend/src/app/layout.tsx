'use client'
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {cn} from '@/lib/utils'
import {Toaster} from '@/components/ui/sonner'
import {ThemeProvider} from '@/components/theme-provider'


import {Sora} from 'next/font/google'
import {Providers} from '@/components/providers'

const sora = Sora({
    subsets: ['latin']
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>

        <body
            className={cn('min-h-screen bg-background font-sans antialiased w-full')}
            style={sora.style}
        >
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            <Toaster richColors position={'top-right'}/>
            <Providers attribute={'class'} defaultTheme={'system'} enableSystem>
                {children}

            </Providers>
        </ThemeProvider>

        </body>
        </html>
    );
}
