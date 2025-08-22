'use client'
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'
import type { ReactNode } from 'react'


const theme = extendTheme({
config: { initialColorMode: 'system', useSystemColorMode: true },
})
export default function Providers({ children }: { children: ReactNode }) {
return (
<>
<ColorModeScript initialColorMode={theme.config.initialColorMode} />
<ChakraProvider theme={theme}>{children}</ChakraProvider>
</>
)
}