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
import Scroll from '@/assets/images/scroll.svg'
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
  const lenis = useLenis()

  const { contextSafe } = useGSAP({
    scope: rectRef,
    revertOnUpdate: false,
  })

  const updatePosition = () => {
    if (!!rectRef.current) {
      const rectHeight = rectRef.current.getBBox().height

      const y = window.scrollY + (window.innerHeight - rectHeight) / 2

      return { y }
    }
    return { y: 0 }
  }

  const animateMask = contextSafe(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: rectRef.current,
        start: 'clamp(bottom bottom)',
        end: 'clamp(+=650vh +=0vh)',
        pin: '#heroMask',
        pinSpacing: false,
        markers: true,
        scrub: true,
        onUpdate: () => {
          const { y } = updatePosition()
          console.log('onUpdate: ')
          gsap.set(rectRef.current, { y })
        },

        onLeave: () => {
          const scrollHash = document.getElementById('HeroSection')

          console.log('onLeave: ')
          console.log('scrollHash: ', scrollHash)
          gsap.set(scrollHash, { height: '100vh', clipPath: 'unset' })
          gsap.set(rectRef.current, { display: 'none' })

          // setRevealFinished(true)
          lenis?.scrollTo(0, { immediate: true })
        },
        once: true,
      },
    })

    tl.fromTo(
      rectRef.current,
      {
        x: window.innerWidth / 2 - 120,
        y: window.innerHeight / 2 - 220,
        width: '240',
        height: '400',
      },
      {
        x: 0,
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
        width: '100%',
        height: '200vh',
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
      <ClipPath />
      <section id={'HeroSection'} ref={containerRef} className={classes.hero}>
        <div id="hero" className={classes.wrapper}>
          <Header />
          <div className={classes.container}>
            <div className={classes.content}>
              <FullLogo />
              <h1>{TITLE}</h1>
              <Scroll style={{ marginBottom: '12px' }} />
              <div className={classes.vertical} />
            </div>
            <div className={classes.gradient} />

            <video className={classes['cover']} autoPlay loop playsInline muted>
              <source src={VideoBg} type={`video/webm`} />
              <Image src={BgPicture} alt={'fitness cover'} fill />
            </video>
          </div>
        </div>
      </section>
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
