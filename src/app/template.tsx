'use client'

import { type ReactNode, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { Header } from '@/modules'

export default function Template({ children }: { children: ReactNode }) {
  const headerRef = useRef(null)
  const { contextSafe } = useGSAP({
    scope: headerRef,
  })

  const animateHeader = contextSafe(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: document.documentElement,
        id: `externalHeader`,
        start: window.innerHeight,
        end: window.innerHeight + 280,
        markers: true,
        scrub: 1,
      },
    })

    tl.fromTo(
      headerRef.current,
      {
        top: -200,
      },
      {
        position: 'fixed',
        backdropFilter: 'blur(6px)',
        padding: '48px 72px',
        top: 0,
        duration: 2,
      }
    ).to(headerRef.current, {
      padding: '12px 72px',
      ease: 'power4.inOut',
      duration: 1,
    })
  })

  useEffect(() => {
    animateHeader()
  }, [animateHeader])

  return (
    <>
      <Header ref={headerRef} />
      {children}
    </>
  )
}
