import { FC } from 'react'
import Image from 'next/image'

import SectionBg from '@/assets/images/section1.png'
import { Button } from '@/components/ui'

import { Separator } from '../components/separator/separator'
import styles from './styles.module.sass'

export const Section01: FC = () => {
  return (
    <section className={styles.section}>
      <Separator />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2>Уникальное место</h2>
          <p>
            Элитный жилой поселок Lake Park - уникальный проект на территории
            Молдовы, который объединяет современные архитектурные решения,
            комфорт, безопасность, развитую инфраструктуру и возможность
            насладиться всеми преимуществами жизни за городом.
          </p>
          <p>
            Проект разработан как эксклюзивное пространство, где каждый элемент
            отражает высочайшие стандарты строительства, дизайна и архитектуры.
            Резиденты Lake Park наслаждаются исключительной экосистемой,
            привилегией приватности и элитной инфраструктурой, создающей новое
            качество жизни.
          </p>
          <Button title={'Полная информация о поселке'} />
        </div>
      </div>
      <div className={styles.bg}>
        <Image src={SectionBg} alt={'bg'} fill />
      </div>
    </section>
  )
}
