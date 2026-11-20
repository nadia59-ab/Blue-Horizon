"use client";

import { Children, isValidElement, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";

const revealEase = [0.22, 1, 0.36, 1] as const;
const revealViewport = { once: true, amount: 0.15, margin: "-50px" } as const;

export function PageEntrance({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.main
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}

export function FadeIn({
  children,
  className,
  direction = "up",
  distance = 24,
  duration = 0.6,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const offset = direction === "left" ? { x: -distance } : direction === "right" ? { x: distance } : { y: distance };
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, ...offset }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: revealEase }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ className, children }: { className?: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(() => new Set());
  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, index) => {
        const childProps = isValidElement(child) ? child.props as { className?: unknown } : undefined;
        const childClass = typeof childProps?.className === "string" ? childProps.className : "";
        const tallPhoto = /photo-tile-(1|5)(\s|$)/.test(childClass);
        const visible = reduced || visibleItems.has(index);
        return (
          <motion.div
            key={index}
            className={`motion-stagger-item${tallPhoto ? " motion-stagger-item-tall" : ""}${visible ? " is-visible" : ""}`}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : Math.floor(index / 8) * 0.64 + (index % 8) * 0.08, ease: revealEase }}
            onAnimationComplete={() => setVisibleItems((items) => new Set(items).add(index))}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}

export function ImageReveal({ children, duration = 0.8 }: { children: ReactNode; duration?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="image-reveal"
      initial={reduced ? false : { opacity: 0, scale: 1.06 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      exit={reduced ? undefined : { opacity: 0, scale: 1 }}
      viewport={revealViewport}
      transition={{ duration: reduced ? 0 : duration, ease: revealEase }}
    >
      {children}
    </motion.div>
  );
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 0.8,
      anchors: { offset: -82 },
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
    });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return children;
}
