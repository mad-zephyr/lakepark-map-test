'use client'

import { FC, PropsWithChildren } from 'react'

import { ReactLenis } from '@/libs/lenis/lenis'

export const ContextWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReactLenis root options={{ autoResize: true }}>
      {children}
    </ReactLenis>
  )
}
