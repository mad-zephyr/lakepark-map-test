import { RefObject } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export const useAnimateHeroAndHeader = (container: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: container,

    offset: ['start start', 'end end'],
  })

  const width = useTransform(scrollYProgress, [0, 0.85], ['20vw', '100vw'])
  const height = useTransform(scrollYProgress, [0, 0.85], ['45vh', '100vh'])
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.85],
    ['240px', '0px']
  )
  const left = useTransform(scrollYProgress, [0, 0.85], ['-40vw', '0vw'])
  const top = useTransform(scrollYProgress, [0, 0.85], ['30%', '0%'])
  const contentTopOffset = useTransform(
    scrollYProgress,
    [0, 0.85],
    ['-30vh', '0vh']
  )

  const externalHeaderDisplay = useTransform(
    scrollYProgress,

    [0.83741, 0.83743],
    ['none', 'flex']
  )
  const internalHeaderDisplay = useTransform(
    scrollYProgress,
    [0.85, 0.8565],
    ['flex', 'none']
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

  return {
    containerRef: container,
    heroWrapperWidth: width,
    heroWrapperTop: top,
    heroWrapperLeft: left,
    heroWrapperHeight: height,
    heroWrapperBorderRadius: borderRadius,
    contentTopOffset,
    headerPadding: padding,
    headerBackdropFilter: backdropFilter,

    internalHeaderDisplay,
    externalHeaderDisplay,
  }
}
