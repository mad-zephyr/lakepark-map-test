import { FC } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import classes from './classes.module.sass'

type TNavItem = {
  title: string
  isActive: boolean
  onClick: (item: string) => void
}

export const NavItem: FC<TNavItem> = ({ title, isActive, onClick }) => {
  return (
    <div
      className={cn(classes['item'], { [classes['active']]: isActive })}
      onClick={() => onClick(title)}
    >
      {title}
      {isActive ? (
        <motion.div className={classes['active_bg']} layoutId="underline" />
      ) : null}
    </div>
  )
}
