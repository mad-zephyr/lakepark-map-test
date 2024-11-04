'use client'

import Image from 'next/image'
import { FC, useEffect, useLayoutEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { Header } from '@/modules'
import { useLenis } from '@/libs/lenis/lenis'
import VideoBg from '@/assets/videos/lakepark_webm.webm'
import FullLogo from '@/assets/images/fullLogo.svg'
import { usePageLoaded } from '@/libs/hooks/usePageLoaded'
import BgPicture from '@/assets/images/heroBg.png'

const TITLE = 'Lake Park - самое премиальное место \n для жизни в Молдове'

import classes from './styles.module.sass'

type TClipPath = {
  width?: number
  height?: number
  x?: number
  y?: number
}

const ClipPath: FC<TClipPath> = () => {
  const rectRef = useRef<SVGRectElement | null>(null)

  const { contextSafe } = useGSAP({
    scope: rectRef,
  })

  const updateYPosition = () => {
    if (!!rectRef.current) {
      const rectHeight = rectRef.current.getBBox().height

      return window.scrollY + (window.innerHeight - rectHeight) / 2
    }
  }

  const animateMask = contextSafe(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      scrollTrigger: {
        trigger: rectRef.current,
        start: 'clamp(bottom bottom)',
        end: 'clamp(bottom top)',
        pin: '#heroMask',
        pinSpacing: false,
        markers: true,
        scrub: true,
        // snap: 1,
        onUpdate: () => {
          const y = updateYPosition()

          gsap.set(rectRef.current, { y })
        },
      },
    })

    tl.fromTo(
      rectRef.current,
      {
        x: window.innerWidth / 2 - 120,
        y: window.innerHeight / 2 - 220,
        width: '240',
        height: '440',
      },
      {
        x: 0,
        y: 0,
        rx: 0,
        ry: 0,
        width: '100vw',
        height: '100vh',
        duration: 2,
      }
    )
  })

  useLayoutEffect(() => {
    animateMask()
  }, [animateMask])

  return (
    <svg
      id="heroMask"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      <defs>
        <clipPath id="pillClip">
          <rect ref={rectRef} rx="130" ry="130" fill="#4CAF50" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const HeroMain = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isPageLoaded = usePageLoaded()
  useMainHeroAnimation(isPageLoaded)

  return (
    <>
      <section
        id={'HeroSection'}
        ref={containerRef}
        style={{ clipPath: 'url(#pillClip)' }}
        className={classes.hero}
      >
        <div id="hero" className={classes.wrapper}>
          <div className={classes.container}>
            <Header />
            <div className={classes.content}>
              <FullLogo />
              <h1>{TITLE}</h1>
            </div>
            <video className={classes['cover']} autoPlay loop playsInline muted>
              <source src={VideoBg} type={`video/webm`} />
              <Image src={BgPicture} alt={'fitness cover'} fill />
            </video>
          </div>
        </div>
      </section>
      <ClipPath />
    </>
  )
}

function useMainHeroAnimation(isOpen: boolean) {
  const lenis = useLenis()

  const { contextSafe } = useGSAP({
    revertOnUpdate: false,
  })

  const animateIn = contextSafe(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      ['#hero'],
      {
        opacity: 0,
        translateY: '100vh',
      },
      {
        duration: 1,
        ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: 1,
        translateY: '40vh',
      }
    ).to('#hero', {
      delay: 0,
      duration: 1,
      ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
      opacity: 1,
      translateY: '0vh',

      onStart: () => {},
      onComplete: () => {
        lenis?.start()
      },
    })
  })

  useEffect(() => {
    if (isOpen) {
      animateIn()
    } else {
      lenis?.stop()
      return
    }
  }, [animateIn, isOpen, lenis])
}
