import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService, cardRepository }) => {
  // useState([ ... ]) 배열안에 객체를 담아서 map()을 이용하여 객체를 브라우저 화면에 뿌려줬었다.
  // 하지만, 상태를 업데이트 할때, 주기적으로 발생하는 이벤트에 map()을 이용하면 성능에 매우 좋지 않습니다.
  // {} 안에 'key' : {객체} 를 만들어서 불러온 다면 object['key'] : value를 이용해서 성능을 향상 시킬 수 있습니다.
  // 즉, useState()에 [] 배열형태가 아닌, {} 오브잭트 형태로 관리를 해주는 것 입니다.

  const location = useLocation();
  const locationState = location?.state;
  const navigate = useNavigate();

  const [userId, setUserId] = useState(locationState && locationState.id);

  const [cards, setCards] = useState({
    // 1: {
    //   id: 1,
    //   name: "munseok",
    //   company: "naver",
    //   theme: "dark",
    //   title: "Frontend Engineer",
    //   email: "oms@naver.com",
    //   message: "Go for it",
    //   fileName: null,
    //   fileURL: null,
    // },
    // 2: {
    //   id: 2,
    //   name: "jjona",
    //   company: "amole",
    //   theme: "colorful",
    //   title: "Frontend Engineer",
    //   email: "jjona@naver.com",
    //   message: "Go for it",
    //   fileName: null,
    //   fileURL: null,
    // },
    // 3: {
    //   id: 3,
    //   name: "seok",
    //   company: "baemin",
    //   theme: "light",
    //   title: "Frontend Engineer",
    //   email: "seok@naver.com",
    //   message: "Go for it",
    //   fileName: null,
    //   fileURL: null,
    // },
  });

  const history = useNavigate();

  // Logout func
  // 함수 컴포넌트에서 함수가 계속 호출이 되어도 동일한 데이터를 사용하려면 useCallback()을 사용해줘야 합니다.
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      console.log(cards, "stopSync");
      setCards(cards);
    });

    // syncCards()함수 안에 return된 함수를 호출하는 상황입니다.
    // 고로 stopSync에는 리던된 함수가 지정이 되어져 있기때문에 stopSync()라고 호출해야 합니다.
    return () => stopSync();
  }, [userId, cardRepository]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
        console.log(userId, "userId");
      } else {
        history("/");
      }
    });
  }, [authService, userId, history]);

  const createOrUpdateCard = (card) => {
    // 전체 state를 업데이트 해야하기 때문에 기존의 cards를 다 복사해 온 후
    // update되는 id key를 이용해서 object 전체를 card로 변경해 줍니다.
    // setCards함수를 이용해서 업데이트를 설정해 주면 됩니다.

    // const updated = { ...cards };
    // updated[card.id] = card;
    // 상단 두 줄의 코드가 setCards(updated) 바깥에 있어도 상태는 업데이트가 됩니다.
    // 하지만, 이렇게 사용하면  ...cards를 불러왔을때 오래전의 데이터가 들어올 수도 있기 때문에
    // setCards(prev => ...) 를 이용하여 업데이트한 내용 바로전의 상태를 가져와서 업데이트 해주는게 훨씬 안전합니다.

    // setCards를 부를 때의 이 상태(cards), 즉 바로 그 시점(cards)에
    setCards((cards) => {
      // setCards의 상태를 그대로 복사해 와서
      const updated = { ...cards };
      // card의 id 즉, { ...cards }라는 object의 key를 이용해서 해당하는 key에 새로 업데이트 되는 card를 변경해주고
      updated[card.id] = card;
      console.log(card.id, "setCards card.id"); // key값을 가져온다.
      // updated된 상태를 리턴해 줍니다.
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
