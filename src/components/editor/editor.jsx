import React from "react";
import CardAddForm from "../card_add_form/card_add_form";
import CardEditForm from "../card_edit_form/card_edit_form";
import styles from "./editor.module.css";

const Editor = ({ cards, addCard, updateCard, deleteCard }) => {
  return (
    <section className={styles.editor}>
      <h1 className={styles.title}>Card Maker</h1>

      {/* 
      cards는 배열이 아니기 때문에 map()을 사용할 수 있는 상태로 만들어줘야 합니다. => Object.keys()함수를 사용해주면 된다. 
      Object.keys()함수 사용하면 cards의 모든 키를 받아와 key를 빙글 빙글 돌아 value를 받아옵니다.
    */}
      {Object.keys(cards).map((key) => (
        <CardEditForm
          key={key}
          card={cards[key]}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      ))}
      <CardAddForm onAdd={addCard} />
    </section>
  );
};

export default Editor;
