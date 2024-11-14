import '../assets/styles/globals.css'

import cn from 'classnames'

import { SanFranciscoPro, UnboundedFont } from '@/assets/fonts/fontConfig'
import { ReactLenisScroll } from '@/context/reactLenisScroll'
import { IntroWrapper } from '@/modules/Intro/intro'

type TRootLayout = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: TRootLayout) {
  const mainClass = cn(SanFranciscoPro.variable, UnboundedFont.variable)

  return (
    <html lang="en">
      <body className={mainClass}>
        <ReactLenisScroll>
          <IntroWrapper>{children}</IntroWrapper>
        </ReactLenisScroll>
      </body>
    </html>
  )
}
