import '../assets/styles/globals.css'

import cn from 'classnames'

import { SanFranciscoPro, UnboundedFont } from '@/assets/fonts/fontConfig'
import { ContextWrapper } from '@/context/context'
import { IntroWrapper } from '@/modules/Intro/intro'

type TRootLayout = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: TRootLayout) {
  const mainClass = cn(SanFranciscoPro.variable, UnboundedFont.variable)

  return (
    <html lang="en" style={{ overflow: 'hidden' }}>
      <body className={mainClass}>
        <ContextWrapper>
          <IntroWrapper>{children}</IntroWrapper>
        </ContextWrapper>
      </body>
    </html>
  )
}
