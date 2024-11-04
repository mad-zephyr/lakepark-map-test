import { HeroMain } from '@/components/sections/mainHero/mainHero'

export default function Page() {
  return (
    <>
      <HeroMain />
      <section style={{ height: '100vh', background: 'orange' }}>
        Hello 2
      </section>
      <section style={{ height: '100vh', background: 'green' }}>
        Hello 2
      </section>
    </>
  )
}
