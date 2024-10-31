import { FC, useState } from "react";
import { DivProps } from "react-html-props";
import { motion } from "framer-motion";
import classes from "./classes.module.sass";
import cn from "classnames";

import Logo from "@/assets/images/logo.svg";

type THeader = {} & DivProps;

type TNavItem = {
  title: string;
  isActive: boolean;
  onClick: (item: string) => void;
};

const NavItem: FC<TNavItem> = ({ title, isActive, onClick }) => {
  return (
    <>
      <li
        className={cn({ [classes["active"]]: isActive })}
        onClick={() => onClick(title)}
      >
        {title}
        {isActive ? (
          <motion.div className={classes["active_bg"]} layoutId="underline" />
        ) : null}
      </li>
    </>
  );
};

const NAV_ITEM = [
  "Lake Park",
  "Расположение",
  "Ваш будущий дом",
  "Инфраструктура",
  "Рестораны",
  "Контакты",
];

export const Header: FC<THeader> = ({ ...props }) => {
  const [activeItem, setActiveItem] = useState(0);

  const handleSetActive = (itemTitle: string) => {
    const activeIndex = NAV_ITEM.findIndex((item) => itemTitle === item);
    setActiveItem(activeIndex);
  };
  return (
    <header className={classes["header"]} {...props}>
      <Logo />
      Ro
      <nav className={classes["nav"]}>
        <ul>
          {NAV_ITEM.map((item, i) => (
            <NavItem
              key={i}
              isActive={activeItem === i}
              title={item}
              onClick={handleSetActive}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
};
