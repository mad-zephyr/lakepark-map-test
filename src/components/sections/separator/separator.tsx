import { FC } from 'react'

import Symbol from '@/assets/images/logoSymbol.svg'

import classes from './styles.module.sass'

export const Separator: FC = () => {
  return (
    <div className={classes['separator']}>
      <Symbol />
    </div>
  )
}
