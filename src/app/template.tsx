'use client'

// import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { ReactNode } from 'react'
// import { useScreen } from 'usehooks-ts'

// import { useAnimateHeroAndHeader } from '@/libs/hooks/useAnimateHeroAndHeader'
import { Header } from '@/modules'

export default function Template({ children }: { children: ReactNode }) {
  // const containerRef = useRef<HTMLDivElement | null>(null)
  // const { scrollY } = useScroll()
  // const { height } = useScreen()

  // const { headerBackdropFilter } = useAnimateHeroAndHeader(containerRef)

  // const getHeight = (size: number) => height * 2 * size

  // const padding = useTransform(
  //   scrollY,
  //   [getHeight(0.8), getHeight(0.85)],
  //   ['48px 72px', '16px 72px']
  // )

  // useMotionValueEvent(scrollY, 'change', (latest) => {
  //   if (latest >= height * 2) {
  //     console.log('Page scroll: ', latest)
  //   }
  // })

  return (
    <>
      <Header />
      {children}
    </>
  )
}
