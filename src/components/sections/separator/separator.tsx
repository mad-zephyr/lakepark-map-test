import { FC } from 'react'

import LogoSymbol from '@/assets/images/logoSymbol.svg'

import styles from './styles.module.sass'

export const Separator: FC = () => {
  return (
    <div className={styles['separator']}>
      <LogoSymbol />
    </div>
  )
}
