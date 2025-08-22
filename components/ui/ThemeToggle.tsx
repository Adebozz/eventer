'use client'
import { IconButton, useColorMode, Tooltip } from '@chakra-ui/react'
import { Moon, Sun } from 'lucide-react'


export default function ThemeToggle() {
const { colorMode, toggleColorMode } = useColorMode()
const isDark = colorMode === 'dark'
return (
<Tooltip label="Toggle theme" openDelay={300}>
<IconButton aria-label="Toggle color mode" onClick={toggleColorMode} size="sm" variant="ghost" icon={isDark ? <Sun size={18}/> : <Moon size={18}/>}/>
</Tooltip>
)
}