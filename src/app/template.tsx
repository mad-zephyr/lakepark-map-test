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
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: document.documentElement,
        id: `externalHeader`,
        start: window.innerHeight / 3,
        end: 100,
        // markers: true,
        scrub: 1,
      },
    })

    tl.fromTo(
      headerRef.current,
      {
        top: -200,
        opacity: 0,
        // padding: '48px 72px',
        backdropFilter: 'blur(6px)',
      },
      {
        padding: '48px 72px',
        backdropFilter: 'blur(6px)',
        top: 0,
        opacity: 1,
        duration: 1,
      }
    ).to(headerRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        id: `externalHeader-secondStep`,
        start: window.innerHeight / 2,
        end: 100,
        // markers: true,
        scrub: 1,
      },

      padding: '12px 72px',
      // backdropFilter: 'blur(6px)',
      background: '#00000045',
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
