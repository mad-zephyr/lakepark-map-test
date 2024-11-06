import {
  DetailedHTMLProps,
  FC,
  forwardRef,
  HTMLAttributes,
  useState,
} from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import PhoneIcon from '@/assets/images/phone.svg'
import Logo from '@/assets/images/logo.svg'

import classes from './classes.module.sass'

type THeader = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

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
      {isActive ? (
        <motion.div className={classes['active_bg']} layoutId="underline" />
      ) : null}
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

export const Header: FC<THeader> = forwardRef<HTMLElement, THeader>(
  ({ className, ...props }, ref) => {
    const [activeItem, setActiveItem] = useState(0)

    const handleSetActive = (itemTitle: string) => {
      const activeIndex = NAV_ITEM.findIndex((item) => itemTitle === item)
      setActiveItem(activeIndex)
    }

    return (
      <header ref={ref} className={cn(classes['header'], className)} {...props}>
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

        <div className={classes['right']}>{<PhoneIcon />}Отдел продаж</div>
      </header>
    )
  }
)

Header.displayName = 'Header'
