'use client'

import { useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import FullLogo from '@/assets/images/fullLogo.svg'
import VideoBg from '@/assets/videos/lakepark_webm.webm'
import BgPicture from '@/assets/images/heroBg.png'
import { Header } from '@/modules'
import { useLenis } from '@/libs/lenis/lenis'
import { usePageLoaded } from '@/libs/hooks/usePageLoaded'

import classes from './page.module.sass'

const TITLE = 'Lake Park - самое премиальное место \n для жизни в Молдове'

export default function Page() {
  const container = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ['start start', 'end end'],
  })

  // const scope =
  useMenuAnimation(isOpen)

  const width = useTransform(scrollYProgress, [0, 0.85], ['20dvw', '100dvw'])
  const height = useTransform(scrollYProgress, [0, 0.85], ['45vh', '100vh'])
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.85],
    ['240px', '0px']
  )
  const left = useTransform(scrollYProgress, [0, 0.85], ['-39.8dvw', '0dvw'])
  const top = useTransform(scrollYProgress, [0, 0.85], ['30%', '0%'])
  const contentTopOffset = useTransform(
    scrollYProgress,
    [0, 0.85],
    ['-30vh', '0vh']
  )
  const opacity = useTransform(scrollYProgress, [0.85, 0.851], [0, 1])
  const display = useTransform(scrollYProgress, [0.85, 0.851], ['none', 'flex'])
  const internalHeaderOpacity = useTransform(
    scrollYProgress,
    [0.85, 0.851],
    [1, 0]
  )

  const padding = useTransform(
    scrollYProgress,
    [0.86, 1],
    ['48px 72px', '16px 72px']
  )
  const backdropFilter = useTransform(
    scrollYProgress,
    [0.86, 1],
    ['blur(0px)', 'blur(8px)']
  )

  const isPageLoaded = usePageLoaded()

  useEffect(() => {
    setIsOpen(isPageLoaded)
  }, [isPageLoaded])

  return (
    <div id="Page" className={classes.page}>
      <Header
        style={{
          position: 'fixed',
          opacity,
          padding,
          backdropFilter,
          display,
        }}
      />

      <section className={classes.hero} ref={container}>
        <motion.div
          id="hero"
          style={{ width, height, top, borderRadius }}
          className={classes.item}
        >
          <motion.div
            style={{ left, top: contentTopOffset }}
            className={classes.container}
          >
            <Header style={{ opacity: internalHeaderOpacity }} />
            <div className={classes.content}>
              <FullLogo />
              <h1>{TITLE}</h1>
            </div>
            <video className={classes['cover']} autoPlay loop playsInline muted>
              <source src={VideoBg} type={`video/webm`} />
              <Image src={BgPicture} alt={'fitness cover'} fill />
            </video>
          </motion.div>
        </motion.div>
      </section>
      <section>Hello 2</section>
      <section>Hello 2</section>
    </div>
  )
}

function useMenuAnimation(isOpen: boolean) {
  const lenis = useLenis()

  const { contextSafe } = useGSAP({
    revertOnUpdate: false,
  })

  const animateIn = contextSafe(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      '#hero',
      {
        opacity: 0,
        translateY: '100dvh',
        clipPath: 'inset(100% 100%)',
        borderRadius: '240px',
      },
      {
        duration: 1,
        ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: 1,
        translateY: '40dvh',
        clipPath: 'inset(0% 0%)',
        borderRadius: '240px',
      }
    ).to('#hero', {
      delay: 0,
      duration: 1,
      ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
      opacity: 1,
      translateY: '0dvh',

      onStart: () => {
        console.log('FIRST COMPLETE')
        lenis?.start()
      },
      onComplete: () => {
        console.log('SECOND')
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
