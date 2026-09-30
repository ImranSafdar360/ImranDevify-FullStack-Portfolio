"use client";

import { MotionConfig, motion } from "motion/react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reveal = (delay: number, y: number) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.56,
      delay,
      ease: premiumEase,
    },
  });

  return (
    <MotionConfig reducedMotion="user">
      <section id="top" className="hero hero--blue-slash" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <motion.div className="hero__meta hero__meta--name text-meta" {...reveal(0.12, 7)}>
          PORTFOLIO / 2026
        </motion.div>
        <motion.div className="hero__meta hero__meta--location text-meta" {...reveal(0.17, 7)}>
          Lahore, PK <span aria-hidden="true">→</span> Remote
        </motion.div>

        <h1 id="hero-title" className="hero__title text-mega">
          <span className="hero__title-line-mask">
            <motion.span
              className="hero__title-line"
              initial={{ opacity: 0, y: "105%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.74, delay: 0.2, ease: premiumEase }}
            >
              SaaS <span className="hero__slash">/</span> Product
            </motion.span>
          </span>
          <span className="hero__title-line-mask">
            <motion.span
              className="hero__title-line"
              initial={{ opacity: 0, y: "105%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.31, ease: premiumEase }}
            >
              Engineer.
            </motion.span>
          </span>
        </h1>

        <motion.p className="hero__statement text-body-large" {...reveal(0.56, 12)}>
          Product-minded engineer building production web and mobile software.
        </motion.p>

        <motion.p className="hero__availability text-meta" {...reveal(0.63, 8)}>
          <span className="hero__status-mark" aria-hidden="true" />
          Available for remote product roles
        </motion.p>
        <motion.a className="hero__work-link text-meta" href="#work" {...reveal(0.66, 8)}>
          View selected work <span className="hero__work-arrow" aria-hidden="true">↓</span>
        </motion.a>
      </div>
      </section>
    </MotionConfig>
  );
}
