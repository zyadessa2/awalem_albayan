"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, domAnimation, LazyMotion, m, MotionConfig, useReducedMotion } from "framer-motion";

type MotionExperienceProps = {
  children: ReactNode;
};

export default function MotionExperience({ children }: MotionExperienceProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], main article"));

    if (shouldReduceMotion) {
      elements.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          const siblingIndex = element.parentElement ? Array.from(element.parentElement.children).indexOf(element) : 0;
          const defaultDelay = element.tagName === "ARTICLE" ? Math.max(siblingIndex, 0) * 0.08 : 0;
          const delay = Math.min(Number(element.dataset.revealDelay || defaultDelay), 0.32);
          animate(
            element,
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
            { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
          ).then(() => {
            element.style.opacity = "";
            element.style.transform = "";
            element.style.willChange = "auto";
          });

          observer.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => {
      const direction = element.dataset.reveal;
      const startX = direction === "right" ? 22 : direction === "left" ? -22 : 0;
      element.style.opacity = "0";
      element.style.transform = `translate3d(${startX}px, ${startX === 0 ? 26 : 0}px, 0)`;
      element.style.willChange = "opacity, transform";
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname, shouldReduceMotion]);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          key={pathname}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
