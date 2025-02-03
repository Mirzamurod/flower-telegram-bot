'use client'

import { ComponentProps } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import WindowWrapper from '../window-wrapper'

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <WindowWrapper>{children}</WindowWrapper>
    </NextThemesProvider>
  )
}
