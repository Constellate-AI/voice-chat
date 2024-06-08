import {ThemeProvider as NextThemesProvider, useTheme} from 'next-themes'
import {ThemeProviderProps} from 'next-themes/dist/types'
import {TooltipProvider} from '@/components/ui/tooltip'
import {GeistProvider} from '@geist-ui/core'


export function Providers({children, ...props}: ThemeProviderProps) {
    const {theme} = useTheme()
    return (
        <NextThemesProvider {...props}>
            <TooltipProvider>
                <GeistProvider themeType={theme}>
                    {children}
                </GeistProvider>
            </TooltipProvider>
        </NextThemesProvider>
    )

}