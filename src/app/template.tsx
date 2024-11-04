'use client'

import { type ReactNode } from 'react'

import { Header } from '@/modules'

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
