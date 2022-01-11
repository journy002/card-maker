import React from "react";
import Card from "../card/card";
import styles from "./preview.module.css";

const Preview = ({ cards }) => {
  return (
    <section className={styles.preview}>
      <h1 className={styles.title}>Card preview</h1>
      <ul className={styles.cards}>
        {/* preview  또한 Object.keys()를 사용해서 key를 이용하여 map()를 사용하는 효과를 가져오면 됩니다. */}
        {Object.keys(cards).map((key) => (
          <Card key={key} card={cards[key]} />
        ))}
      </ul>
    </section>
  );
};

export default Preview;
