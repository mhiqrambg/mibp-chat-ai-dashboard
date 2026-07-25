"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.globeContainer}>
        <div className={styles.globe}>
          <div className={styles.globeShine} />
        </div>
        <div className={styles.globeGlow} />
      </div>
      <p className={styles.heroLabel}>W E L C O M E &nbsp; B A C K</p>
      <h1 className={styles.heroTitle}>Bring your ideas to life today</h1>
    </section>
  );
}
