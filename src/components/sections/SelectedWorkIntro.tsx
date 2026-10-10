"use client";

import { motion, MotionConfig, type Variants } from "motion/react";

const editorialEase = [0.22, 1, 0.36, 1] as const;

const metadataMotion: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, ease: editorialEase },
  },
};

const headingLineMotion: Variants = {
  hidden: { opacity: 0, y: "105%" },
  visible: (delay: number) => ({
    opacity: 1,
    y: "0%",
    transition: { duration: 0.62, delay, ease: editorialEase },
  }),
};

const statementMotion: Variants = {
  hidden: { opacity: 0, y: 11 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, delay: 0.2, ease: editorialEase },
  },
};

export function SelectedWorkIntro() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="work" className="selected-work" aria-labelledby="selected-work-title">
        <motion.div
          className="container selected-work__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35, margin: "0px 0px -10% 0px" }}
        >
          <motion.p className="selected-work__meta text-meta" variants={metadataMotion}>
            Selected work / 2024—2026
          </motion.p>

          <h2 id="selected-work-title" className="selected-work__title">
            <span className="selected-work__title-mask">
              <motion.span custom={0.04} variants={headingLineMotion}>
                Selected
              </motion.span>
            </span>
            <span className="selected-work__title-mask">
              <motion.span custom={0.12} variants={headingLineMotion}>
                Work.
              </motion.span>
            </span>
          </h2>

          <motion.p className="selected-work__statement text-body" variants={statementMotion}>
            Selected production work across web and mobile products.
          </motion.p>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
