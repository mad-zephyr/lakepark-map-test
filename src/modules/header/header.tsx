import { FC, useState } from 'react'
import { MotionStyle } from 'framer-motion'
import cn from 'classnames'

import Logo from '@/assets/images/logo.svg'

import classes from './classes.module.sass'

type THeader = { style?: MotionStyle }

type TNavItem = {
  title: string
  isActive: boolean
  onClick: (item: string) => void
}

const NavItem: FC<TNavItem> = ({ title, isActive, onClick }) => {
  return (
    <div
      className={cn(classes['item'], { [classes['active']]: isActive })}
      onClick={() => onClick(title)}
    >
      {title}
      {/* {isActive ? (
        <motion.div className={classes['active_bg']} layoutId="underline" />
      ) : null} */}
    </div>
  )
}

const NAV_ITEM = [
  'Lake Park',
  'Расположение',
  'Ваш будущий дом',
  'Инфраструктура',
  'Рестораны',
  'Контакты',
]

export const Header: FC<THeader> = () => {
  const [activeItem, setActiveItem] = useState(0)

  const handleSetActive = (itemTitle: string) => {
    const activeIndex = NAV_ITEM.findIndex((item) => itemTitle === item)
    setActiveItem(activeIndex)
  }
  return (
    <header className={classes['header']}>
      <div className={classes['left']}>
        <Logo />
        Ro
      </div>

      <div className={classes.center} style={{ boxSizing: 'border-box' }}>
        {NAV_ITEM.map((item, i) => (
          <NavItem
            key={i}
            isActive={activeItem === i}
            title={item}
            onClick={handleSetActive}
          />
        ))}
      </div>

      <div className={classes['right']}>Phone</div>
    </header>
  )
}
