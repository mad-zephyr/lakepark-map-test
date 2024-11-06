import { Separator } from '@/components'
import { HeroMain } from '@/components/sections/mainHero/mainHero'

export default function Page() {
  return (
    <>
      <HeroMain />
      <Separator />
      <section style={{ height: '100vh', background: '#14232E' }}>
        Hello 2
      </section>
      <Separator />
      <section style={{ height: '100vh', background: 'green' }}>
        Hello 2
      </section>
    </>
  )
}
