import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  const history = useNavigate();
  const goToMaker = (userId) => {
    // 그냥 url로 이동하기보다는 사용자가 로그인을 했다면 사용자와 관련된 정보를 함께 전달해야 합니다.
    // 그래야 사용자의 정보를 이용해서 해당하는 데이터를 DB에 저장할 수 있습니다.

    // push()를 이용하면 원하는 url로 이동이 가능합니다.
    // Router v5까지는 history.push(...) 이렇게 사용하지만 v6부턴 push()는 빼고 적어줘야 동작합니다.

    history({
      pathname: "/maker",
      state: { id: userId },
    });
  };
  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then((data) => goToMaker(data.user.uid));
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToMaker(user.uid);
    });
  });

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
