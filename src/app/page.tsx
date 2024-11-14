import { Section01, Sections02 } from '@/components'
import { Separator } from '@/components/sections/components/separator/separator'
import { HeroMain } from '@/components/sections/mainHero/mainHero'

export default function Page() {
  return (
    <main>
      <HeroMain />

      <Section01 />
      <Sections02 />
      <section style={{ height: '100vh', background: '#14232E' }}>
        <Separator />
        Hello 2
      </section>

      <section style={{ height: '100vh', background: 'green' }}>
        <Separator />
        Hello 2
      </section>
    </main>
  )
}
