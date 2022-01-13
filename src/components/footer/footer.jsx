import React from "react";
import { memo } from "react/cjs/react.development";
import styles from "./footer.module.css";

const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <p className={styles.title}>Code your Dream</p>
    </footer>
  );
});

export default Footer;
