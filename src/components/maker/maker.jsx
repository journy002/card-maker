import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "munseok",
      company: "naver",
      theme: "dark",
      title: "Frontend Engineer",
      email: "oms@naver.com",
      message: "Go for it",
      fileName: "oms",
      fileURL: null,
    },
    {
      id: 2,
      name: "jjona",
      company: "amole",
      theme: "colorful",
      title: "Frontend Engineer",
      email: "jjona@naver.com",
      message: "Go for it",
      fileName: "jjona",
      fileURL: "jjona.png",
    },
    {
      id: 3,
      name: "seok",
      company: "baemin",
      theme: "light",
      title: "Frontend Engineer",
      email: "seok@naver.com",
      message: "Go for it",
      fileName: "seok",
      fileURL: null,
    },
  ]);

  const history = useNavigate();
  // Logout func
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history("/");
      }
    });
  });

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
