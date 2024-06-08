'use client'

import * as React from 'react'


import {cn} from '@/lib/utils'

function IconNextChat({
                          className,
                          inverted,
                          ...props
                      }: React.ComponentProps<'svg'> & { inverted?: boolean }) {
    const id = React.useId()

    return (
        <svg
            viewBox='0 0 17 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <defs>
                <linearGradient
                    id={`gradient-${id}-1`}
                    x1='10.6889'
                    y1='10.3556'
                    x2='13.8445'
                    y2='14.2667'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stopColor={inverted ? 'white' : 'black'}/>
                    <stop
                        offset={1}
                        stopColor={inverted ? 'white' : 'black'}
                        stopOpacity={0}
                    />
                </linearGradient>
                <linearGradient
                    id={`gradient-${id}-2`}
                    x1='11.7555'
                    y1='4.8'
                    x2='11.7376'
                    y2='9.50002'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stopColor={inverted ? 'white' : 'black'}/>
                    <stop
                        offset={1}
                        stopColor={inverted ? 'white' : 'black'}
                        stopOpacity={0}
                    />
                </linearGradient>
            </defs>
            <path
                d='M1 16L2.58314 11.2506C1.83084 9.74642 1.63835 8.02363 2.04013 6.39052C2.4419 4.75741 3.41171 3.32057 4.776 2.33712C6.1403 1.35367 7.81003 0.887808 9.4864 1.02289C11.1628 1.15798 12.7364 1.8852 13.9256 3.07442C15.1148 4.26363 15.842 5.83723 15.9771 7.5136C16.1122 9.18997 15.6463 10.8597 14.6629 12.224C13.6794 13.5883 12.2426 14.5581 10.6095 14.9599C8.97637 15.3616 7.25358 15.1692 5.74942 14.4169L1 16Z'
                fill={inverted ? 'black' : 'white'}
                stroke={inverted ? 'black' : 'white'}
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <mask
                id='mask0_91_2047'
                style={{maskType: 'alpha'}}
                maskUnits='userSpaceOnUse'
                x={1}
                y={0}
                width={16}
                height={16}
            >
                <circle cx={9} cy={8} r={8} fill={inverted ? 'black' : 'white'}/>
            </mask>
            <g mask='url(#mask0_91_2047)'>
                <circle cx={9} cy={8} r={8} fill={inverted ? 'black' : 'white'}/>
                <path
                    d='M14.2896 14.0018L7.146 4.8H5.80005V11.1973H6.87681V6.16743L13.4444 14.6529C13.7407 14.4545 14.0231 14.2369 14.2896 14.0018Z'
                    fill={`url(#gradient-${id}-1)`}
                />
                <rect
                    x='11.2222'
                    y='4.8'
                    width='1.06667'
                    height='6.4'
                    fill={`url(#gradient-${id}-2)`}
                />
            </g>
        </svg>
    )
}

function IconOpenAI({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            fill='currentColor'
            viewBox='0 0 24 24'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            className={cn('h-4 w-4', className)}
            style={props.height && props.width ? {height: props.height, width: props.width} : {}}
            {...props}
        >
            <title>OpenAI icon</title>
            <path
                d='M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z'/>
        </svg>
    )
}

function IconVercel({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            aria-label='Vercel logomark'
            role='img'
            viewBox='0 0 74 64'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z'
                fill='currentColor'
            ></path>
        </svg>
    )
}

export function IconAlert({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg className={className} fill={'none'} height={24}
             shapeRendering={'geometricPrecision'} stroke={'currentColor'} strokeLinecap={'round'}
             strokeLinejoin={'round'}
             strokeWidth={'1.5'} viewBox={'0 0 24 24'} width={'24'}
             style={{color: 'var(--geist-foreground)', width: '24px', height: '24px'}}>
            <path d={'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'}
                  fill={'var(--geist-fill)'}/>
            <path d={'M12 9v4'} stroke={'var(--geist-stroke)'}/>
            <path d={'M12 17h.01'} stroke={'var(--geist-stroke)'}/>
        </svg>
    )
}

export function IconUploadToCloud({className, ...props}: React.ComponentProps<'svg'>) {
    return (<svg className={className} data-testid={'geist-icon'} fill={'none'} height={props.height || '12'}
         shapeRendering={'geometricPrecision'} stroke={'currentColor'} strokeLinecap={'round'} strokeLinejoin={'round'}
         strokeWidth={'1.5'} viewBox={'0 0 24 24'} width={props.width || '12'} style={{color: 'color:var(--geist-foreground)', width: props.width || '12px', height: props.width || '12px'}}>
        <path d={'M16 16l-4-4-4 4'}/>
        <path d={'M12 12v9'}/>
        <path d={'M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3'}/>
        <path d={'M16 16l-4-4-4 4'}/>
    </svg>)
}

function IconGitHub({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            role='img'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <title>GitHub</title>
            <path
                d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/>
        </svg>
    )
}

function IconSeparator({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            fill='none'
            shapeRendering='geometricPrecision'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1'
            viewBox='0 0 24 24'
            aria-hidden='true'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path d='M16.88 3.549L7.12 20.451'></path>
        </svg>
    )
}

function IconArrowDown({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='m205.66 149.66-72 72a8 8 0 0 1-11.32 0l-72-72a8 8 0 0 1 11.32-11.32L120 196.69V40a8 8 0 0 1 16 0v156.69l58.34-58.35a8 8 0 0 1 11.32 11.32Z'/>
        </svg>
    )
}

function IconArrowRight({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z'/>
        </svg>
    )
}

function IconUser({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z'/>
        </svg>
    )
}

export function IconFile({className, height, width, ...props}: React.ComponentProps<'svg'> & {height?: number, width?: number}) {
    const defaultHeight = 16;

    return (
        <svg
            fill={'none'}
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={'1.5'}
            shapeRendering={'geometricPrecision'}
            viewBox={'0 0 24 24'}
            className={cn(className, `min-h-[${height||16}px] min-w-[${width||16}px]`)}
            height={height || 16}
            width={width || 16}
            style={{color: 'currentcolor'}}>
            <path d={'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z'}></path>
            <path d={'M14 2v6h6M16 13H8M16 17H8M10 9H8'}></path>
        </svg>
    )
}

function IconPlus({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z'/>
        </svg>
    )
}

function IconArrowElbow({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z'/>
        </svg>
    )
}

function IconSpinner({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4 animate-spin', className)}
            {...props}
        >
            <path
                d='M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z'/>
        </svg>
    )
}

function IconMessage({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M216 48H40a16 16 0 0 0-16 16v160a15.84 15.84 0 0 0 9.25 14.5A16.05 16.05 0 0 0 40 240a15.89 15.89 0 0 0 10.25-3.78.69.69 0 0 0 .13-.11L82.5 208H216a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16ZM40 224Zm176-32H82.5a16 16 0 0 0-10.3 3.75l-.12.11L40 224V64h176Z'/>
        </svg>
    )
}

function IconTrash({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z'/>
        </svg>
    )
}

function IconRefresh({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M197.67 186.37a8 8 0 0 1 0 11.29C196.58 198.73 170.82 224 128 224c-37.39 0-64.53-22.4-80-39.85V208a8 8 0 0 1-16 0v-48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H55.44C67.76 183.35 93 208 128 208c36 0 58.14-21.46 58.36-21.68a8 8 0 0 1 11.31.05ZM216 40a8 8 0 0 0-8 8v23.85C192.53 54.4 165.39 32 128 32c-42.82 0-68.58 25.27-69.66 26.34a8 8 0 0 0 11.3 11.34C69.86 69.46 92 48 128 48c35 0 60.24 24.65 72.56 40H168a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z'/>
        </svg>
    )
}

function IconStop({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm24-120h-48a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8Zm-8 48h-32v-32h32Z'/>
        </svg>
    )
}

function IconSidebar({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16ZM40 56h40v144H40Zm176 144H96V56h120v144Z'/>
        </svg>
    )
}

function IconMoon({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M233.54 142.23a8 8 0 0 0-8-2 88.08 88.08 0 0 1-109.8-109.8 8 8 0 0 0-10-10 104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.09 103.09 0 0 0 62.52-20.88 104.84 104.84 0 0 0 37-52.91 8 8 0 0 0-1.98-7.98Zm-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104 106 106 0 0 0 14.92-1.06 89 89 0 0 1-26.02 31.4Z'/>
        </svg>
    )
}

function IconSun({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0Zm72 88a64 64 0 1 1-64-64 64.07 64.07 0 0 1 64 64Zm-16 0a48 48 0 1 0-48 48 48.05 48.05 0 0 0 48-48ZM58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32ZM192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72Zm5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8Zm80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8Zm112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16Z'/>
        </svg>
    )
}

function IconCopy({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z'/>
        </svg>
    )
}

function IconCheck({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z'/>
        </svg>
    )
}

function IconDownload({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M224 152v56a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-56a8 8 0 0 1 16 0v56h160v-56a8 8 0 0 1 16 0Zm-101.66 5.66a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.32L136 132.69V40a8 8 0 0 0-16 0v92.69l-26.34-26.35a8 8 0 0 0-11.32 11.32Z'/>
        </svg>
    )
}

function IconClose({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                d='M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z'/>
        </svg>
    )
}

function IconEdit({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
            />
        </svg>
    )
}

function IconShare({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            viewBox='0 0 256 256'
            {...props}
        >
            <path
                d='m237.66 106.35-80-80A8 8 0 0 0 144 32v40.35c-25.94 2.22-54.59 14.92-78.16 34.91-28.38 24.08-46.05 55.11-49.76 87.37a12 12 0 0 0 20.68 9.58c11-11.71 50.14-48.74 107.24-52V192a8 8 0 0 0 13.66 5.65l80-80a8 8 0 0 0 0-11.3ZM160 172.69V144a8 8 0 0 0-8-8c-28.08 0-55.43 7.33-81.29 21.8a196.17 196.17 0 0 0-36.57 26.52c5.8-23.84 20.42-46.51 42.05-64.86C99.41 99.77 127.75 88 152 88a8 8 0 0 0 8-8V51.32L220.69 112Z'/>
        </svg>
    )
}

function IconUsers({className, ...props}: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            viewBox='0 0 256 256'
            {...props}
        >
            <path
                d='M117.25 157.92a60 60 0 1 0-66.5 0 95.83 95.83 0 0 0-47.22 37.71 8 8 0 1 0 13.4 8.74 80 80 0 0 1 134.14 0 8 8 0 0 0 13.4-8.74 95.83 95.83 0 0 0-47.22-37.71ZM40 108a44 44 0 1 1 44 44 44.05 44.05 0 0 1-44-44Zm210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16 44 44 0 1 0-16.34-84.87 8 8 0 1 1-5.94-14.85 60 60 0 0 1 55.53 105.64 95.83 95.83 0 0 1 47.22 37.71 8 8 0 0 1-2.33 11.07Z'/>
        </svg>
    )
}

function IconExternalLink({
                              className,
                              ...props
                          }: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            viewBox='0 0 256 256'
            {...props}
        >
            <path
                d='M224 104a8 8 0 0 1-16 0V59.32l-66.33 66.34a8 8 0 0 1-11.32-11.32L196.68 48H152a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm-40 24a8 8 0 0 0-8 8v72H48V80h72a8 8 0 0 0 0-16H48a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-72a8 8 0 0 0-8-8Z'/>
        </svg>
    )
}

function IconChevronUpDown({
                               className,
                               ...props
                           }: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            className={cn('h-4 w-4', className)}
            viewBox='0 0 256 256'
            {...props}
        >
            <path
                d='M181.66 170.34a8 8 0 0 1 0 11.32l-48 48a8 8 0 0 1-11.32 0l-48-48a8 8 0 0 1 11.32-11.32L128 212.69l42.34-42.35a8 8 0 0 1 11.32 0Zm-96-84.68L128 43.31l42.34 42.35a8 8 0 0 0 11.32-11.32l-48-48a8 8 0 0 0-11.32 0l-48 48a8 8 0 0 0 11.32 11.32Z'/>
        </svg>
    )
}

type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
    logo: (props: IconProps) => (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' {...props}>
            <rect width='256' height='256' fill='none'/>
            <line
                x1='208'
                y1='128'
                x2='128'
                y2='208'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <line
                x1='192'
                y1='40'
                x2='40'
                y2='192'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
        </svg>
    ),
    twitter: (props: IconProps) => (
        <svg
            {...props}
            height='23'
            viewBox='0 0 1200 1227'
            width='23'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'/>
        </svg>
    ),
    gitHub: (props: IconProps) => (
        <svg viewBox='0 0 438.549 438.549' {...props}>
            <path
                fill='currentColor'
                d='M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z'
            ></path>
        </svg>
    ),
    radix: (props: IconProps) => (
        <svg viewBox='0 0 25 25' fill='none' {...props}>
            <path
                d='M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z'
                fill='currentcolor'
            ></path>
            <path d='M12 0H4V8H12V0Z' fill='currentcolor'></path>
            <path
                d='M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z'
                fill='currentcolor'
            ></path>
        </svg>
    ),
    aria: (props: IconProps) => (
        <svg role='img' viewBox='0 0 24 24' fill='currentColor' {...props}>
            <path
                d='M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z'/>
        </svg>
    ),
    npm: (props: IconProps) => (
        <svg viewBox='0 0 24 24' {...props}>
            <path
                d='M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z'
                fill='currentColor'
            />
        </svg>
    ),
    yarn: (props: IconProps) => (
        <svg viewBox='0 0 24 24' {...props}>
            <path
                d='M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06zm.006.7c-.507.016-1.001 1.519-1.001 1.519s-1.27-.204-2.266.871c-.199.218-.468.334-.746.44-.079.028-.176.023-.417.672-.371.991.625 2.094.625 2.094s-1.186.839-1.626 1.881c-.486 1.144-.338 2.261-.338 2.261s-.843.732-.899 1.487c-.051.663.139 1.2.343 1.515.227.343.51.176.51.176s-.561.653-.037.931c.477.25 1.283.394 1.71-.037.31-.31.371-1.001.486-1.283.028-.065.12.111.209.199.097.093.264.195.264.195s-.755.324-.445 1.066c.102.246.468.403 1.066.398.222-.005 2.664-.139 3.313-.296.375-.088.505-.283.505-.283s1.566-.431 2.998-1.357c.917-.598 1.293-.76 2.034-.936.612-.148.57-1.098-.241-1.084-.839.009-1.575.44-2.196.825-1.163.718-1.742.672-1.742.672l-.018-.032c-.079-.13.371-1.293-.134-2.678-.547-1.515-1.413-1.881-1.344-1.997.297-.5 1.038-1.297 1.334-2.78.176-.899.13-2.377-.269-3.151-.074-.144-.732.241-.732.241s-.616-1.371-.788-1.483a.271.271 0 0 0-.157-.046z'
                fill='currentColor'
            />
        </svg>
    ),
    pnpm: (props: IconProps) => (
        <svg viewBox='0 0 24 24' {...props}>
            <path
                d='M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z'
                fill='currentColor'
            />
        </svg>
    ),
    react: (props: IconProps) => (
        <svg viewBox='0 0 24 24' {...props}>
            <path
                d='M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z'
                fill='currentColor'
            />
        </svg>
    ),
    tailwind: (props: IconProps) => (
        <svg viewBox='0 0 24 24' {...props}>
            <path
                d='M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z'
                fill='currentColor'
            />
        </svg>
    ),
    google: (props: IconProps) => (
        <svg role='img' viewBox='0 0 24 24' {...props}>
            <path
                fill='currentColor'
                d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
            />
        </svg>
    ),
    apple: (props: IconProps) => (
        <svg role='img' viewBox='0 0 24 24' {...props}>
            <path
                d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'
                fill='currentColor'
            />
        </svg>
    ),
    paypal: (props: IconProps) => (
        <svg role='img' viewBox='0 0 24 24' {...props}>
            <path
                d='M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z'
                fill='currentColor'
            />
        </svg>
    ),
    spinner: (props: IconProps) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            {...props}
        >
            <path d='M21 12a9 9 0 1 1-6.219-8.56'/>
        </svg>
    ),
}

export {
    IconEdit,
    IconNextChat,
    IconOpenAI,
    IconVercel,
    IconGitHub,
    IconSeparator,
    IconArrowDown,
    IconArrowRight,
    IconUser,
    IconPlus,
    IconArrowElbow,
    IconSpinner,
    IconMessage,
    IconTrash,
    IconRefresh,
    IconStop,
    IconSidebar,
    IconMoon,
    IconSun,
    IconCopy,
    IconCheck,
    IconDownload,
    IconClose,
    IconShare,
    IconUsers,
    IconExternalLink,
    IconChevronUpDown
}