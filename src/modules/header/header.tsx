'use client'

import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react'
import {} from 'framer-motion'

import PhoneIcon from '@/assets/images/phone.svg'
import Logo from '@/assets/images/logo.svg'
import Phone from '@/assets/images/phone.svg'

import classes from './classes.module.sass'
import { NavItem } from './components/headerNavItem/headerNavItem'

type THeader = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

const NAV_ITEM = [
  'Lake Park',
  'Расположение',
  'Ваш будущий дом',
  'Инфраструктура',
  'Рестораны',
  'Контакты',
]

export const Header: FC<THeader> = ({ ...props }) => {
  const [activeItem, setActiveItem] = useState(0)

    const handleSetActive = (itemTitle: string) => {
      const activeIndex = NAV_ITEM.findIndex((item) => itemTitle === item)
      setActiveItem(activeIndex)
    }

  return (
    <header className={classes['header']} {...props}>
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

      <div className={classes['right']}>
        <Phone /> Отдел продаж
      </div>
    </header>
  )
}
