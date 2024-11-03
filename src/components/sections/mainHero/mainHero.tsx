'use client'

import Image from 'next/image'
import { FC, useEffect, useRef } from 'react'
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
  const svgRef = useRef<SVGRectElement | null>(null)

  const { contextSafe } = useGSAP({
    scope: svgRef,
  })

  const animateMask = contextSafe(() => {
    gsap
      .timeline({
        defaults: {
          ease: 'power4.inOut',
        },
        scrollTrigger: {
          trigger: '#HeroSection',
          start: '100px 10%',
          end: '500px 90%',
          markers: true,
          scrub: 10,
        },
      })
      .to(svgRef.current, {
        xPercent: 0,
        yPercent: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        rx: 0,
        ry: 0,
        duration: 3,
        ease: 'power4.inOut',
      })
  })

  useEffect(() => {
    if (svgRef.current) {
      animateMask()
    }
  }, [animateMask])

  return (
    <svg
      id="heroMask"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
      }}
      // width={width}
      // height={height}
      // viewBox={`0 0 ${width} ${height}`}
    >
      <clipPath id="pillClip">
        <rect ref={svgRef} rx="25" ry="25" fill="#4CAF50" />
      </clipPath>
    </svg>
  )
}

ClipPath.displayName = 'clipPath'

export const HeroMain = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isPageLoaded = usePageLoaded()
  useMainHeroAnimation(isPageLoaded)

  // const { scrollYProgress } = useScroll({
  //   offset: ['start start', 'end end'],
  // })

  // const width = useTransform(scrollYProgress, [0, 0.85], ['20vw', '100vw'])
  // const height = useTransform(scrollYProgress, [0, 0.85], ['45vh', '100vh'])

  return (
    <>
      <ClipPath />
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
        // clipPath: 'inset(100% 100%)',
        // borderRadius: '240px',
      },
      {
        duration: 1,
        ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: 1,
        translateY: '40vh',
        // clipPath: 'inset(0% 0%)',
        // borderRadius: '240px',
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
