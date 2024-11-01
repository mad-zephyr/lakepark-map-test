"use client";

import { useAnimate, useInView, useScroll, useTransform } from "framer-motion";
import classes from "./page.module.sass";
import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import { cubicBezier } from "framer-motion";

import FullLogo from "@/assets/images/fullLogo.svg";

import VideoBg from "@/assets/videos/lakepark_webm.webm";
import BgPicture from "@/assets/images/heroBg.png";

import { Header } from "@/modules";
import Image from "next/image";

const TITLE = "Lake Park - самое премиальное место для жизни в Молдове";

export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const inView = useInView(container);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (inView) {
      setIsOpen(true);
    }
  }, [inView]);

  const scope = useMenuAnimation(isOpen);

  const width = useTransform(scrollYProgress, [0, 0.85], ["25dvw", "100dvw"]);
  const height = useTransform(scrollYProgress, [0, 0.85], ["45dvh", "100dvh"]);
  const left = useTransform(scrollYProgress, [0, 0.85], ["-37.6dvw", "0dvw"]);
  const top = useTransform(scrollYProgress, [0, 0.85], ["30%", "0%"]);
  const top2 = useTransform(scrollYProgress, [0, 0.85], ["-30dvh", "0dvh"]);
  const opacity = useTransform(scrollYProgress, [0.85, 0.851], [0, 1]);
  const display = useTransform(
    scrollYProgress,
    [0.85, 0.851],
    ["none", "flex"]
  );
  const opacity2 = useTransform(scrollYProgress, [0.85, 0.851], [1, 0]);

  const padding = useTransform(
    scrollYProgress,
    [0.86, 1],
    ["48px 72px", "16px 72px"]
  );
  const backdropFilter = useTransform(
    scrollYProgress,
    [0.86, 1],
    ["blur(0px)", "blur(8px)"]
  );

  return (
    <div className={classes.page} ref={scope}>
      <Header
        style={{
          position: "fixed",
          opacity,
          padding,
          backdropFilter,
          display,
        }}
      />
      <motion.div style={{ opacity }}></motion.div>
      <section className={classes.hero} ref={container}>
        <motion.div
          id="HeroOpener"
          style={{ width, height, top }}
          className={classes.item}
          transition={{ easings: ["easeIn", "easeOut"] }}
        >
          <motion.div style={{ left, top: top2 }} className={classes.container}>
            <Header style={{ opacity: opacity2 }} />
            <div className={classes.content}>
              <FullLogo />
              <h1>{TITLE}</h1>
            </div>
            <video className={classes["cover"]} autoPlay loop playsInline muted>
              <source src={VideoBg} type={`video/webm`} />
              <Image src={BgPicture} alt={"fitness cover"} fill />
            </video>
          </motion.div>
        </motion.div>
      </section>
      <section>Hello 2</section>
      <section>Hello 2</section>
    </div>
  );
}

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();
  const easing = cubicBezier(0.25, 1, 0.5, 1);

  useEffect(() => {
    animate(
      "#HeroOpener",
      {
        transform: "translateY(0dvh)",
        opacity: 1,
        clipPath: "inset(0% 0%)",
      },
      {
        ease: easing,
        bounce: 0,
        delay: 0.3,
        duration: 1.5,
      }
    );
  }, [animate, isOpen, easing]);

  return scope;
}
