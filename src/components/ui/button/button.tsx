import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import styles from './styles.module.sass'

type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  title: string
}

export const Button: FC<TButton> = ({ title, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {title}
    </button>
  )
}
