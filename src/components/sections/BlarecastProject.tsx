"use client";

import { MotionConfig, motion, type Variants } from "motion/react";

const technologies = ["React Native", "Supabase", "Stripe", "Track Player"];
const premiumEase = [0.22, 1, 0.36, 1] as const;

const metaReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, delay, ease: premiumEase },
  }),
};

const titleReveal: Variants = {
  hidden: { opacity: 0, y: "105%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.72, delay: 0.08, ease: premiumEase },
  },
};

const screenReveal: Variants = {
  hidden: ({ y }: { y: number }) => ({ opacity: 0, y, scale: 0.985 }),
  visible: ({ delay }: { delay: number }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, delay, ease: premiumEase },
  }),
};

const lowerReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.54, delay, ease: premiumEase },
  }),
};

function ScreenLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="project-visual__frame-label">
      <span className="project-visual__frame-index text-meta">{index}</span>
      <span className="project-visual__frame-name text-meta">{label}</span>
    </div>
  );
}

function ProjectVisualPlaceholder() {
  return (
    <motion.div
      className="project-visual"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -8% 0px" }}
    >
      <motion.p className="project-visual__label text-meta" variants={metaReveal}>
        Product visual / Mobile
      </motion.p>

      <motion.div
        className="project-visual__frame project-visual__frame--left"
        custom={{ y: 40, delay: 0.11 }}
        variants={screenReveal}
      >
        <ScreenLabel index="02" label="Secondary" />
      </motion.div>

      <motion.div
        className="project-visual__frame project-visual__frame--main"
        custom={{ y: 28, delay: 0 }}
        variants={screenReveal}
      >
        <ScreenLabel index="01" label="Primary product screen" />
        <span className="project-visual__placeholder text-meta">Main mobile visual</span>
      </motion.div>

      <motion.div
        className="project-visual__frame project-visual__frame--right"
        custom={{ y: 40, delay: 0.18 }}
        variants={screenReveal}
      >
        <ScreenLabel index="03" label="Secondary" />
      </motion.div>
    </motion.div>
  );
}

export function BlarecastProject() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="blarecast" className="featured-project" aria-labelledby="blarecast-title">
        <div className="container">
          <motion.header
            className="featured-project__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
          >
            <motion.p
              className="featured-project__index text-meta"
              custom={0}
              variants={metaReveal}
            >
              01
            </motion.p>

            <div className="featured-project__identity">
              <h2 id="blarecast-title">
                <span className="featured-project__title-mask">
                  <motion.span variants={titleReveal}>Blarecast</motion.span>
                </span>
              </h2>
              <motion.p className="text-meta" custom={0.14} variants={metaReveal}>
                Mobile product engineering · 2025
              </motion.p>
            </div>

            <motion.p
              className="featured-project__role text-meta"
              custom={0.18}
              variants={metaReveal}
            >
              Product engineering / Mobile
            </motion.p>
          </motion.header>

          <ProjectVisualPlaceholder />

          <motion.div className="featured-project__details">
            <motion.div
              className="featured-project__focus"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
              custom={0}
              variants={lowerReveal}
            >
              <p className="featured-project__label text-meta">Engineering focus</p>
              <p className="featured-project__summary text-body-large">
                Mobile product engineering across authentication, payments and audio playback architecture.
              </p>
            </motion.div>

            <motion.div
              className="featured-project__technology"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -8% 0px" }}
              custom={0.08}
              variants={lowerReveal}
            >
              <p className="featured-project__label text-meta">Technology</p>
              <ul>
                {technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </motion.div>

            {/* TODO: connect the published Blarecast case study when available. */}
            <motion.span
              className="featured-project__link text-meta"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5, margin: "0px 0px -5% 0px" }}
              custom={0.16}
              variants={lowerReveal}
            >
              Case study / Pending
            </motion.span>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
