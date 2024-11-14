'use client'

import { FC, PropsWithChildren, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import gsap from 'gsap'
import { LenisRef } from 'lenis/dist/lenis-react.js'

import { ReactLenis } from '@/libs/lenis/lenis'

const lenisOptions = {
  lerp: 0.15,
  duration: 1.5,
  smoothTouch: false, //smooth scroll for touch devices
  smooth: true,
  autoResize: true,
  smoothWheel: true,
}

export const ReactLenisScroll: FC<PropsWithChildren> = ({ children }) => {
  const lenisRef = useRef<LenisRef | null>(null)
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP)
    gsap.ticker.lagSmoothing(0)
  }

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis root options={lenisOptions} ref={lenisRef} autoRaf={false}>
      {children}
    </ReactLenis>
  )
}
