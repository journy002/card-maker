// import import firebase from "firebase/app";으로 해주면 authProvider값을 읽어오지 못한다.
import firebase from "firebase";
import firebaseApp from "./firebase";

class AuthService {
  login(providerName) {
    // Firebase AuthProvider 생성자 생성 예시
    // const provider = new firebase.auth.GoogleAuthProvider();
    // Object['key']를 이용해서 인자를 받아오는것 같다.
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    console.log(authProvider, "provider");
    return firebaseApp.auth().signInWithPopup(authProvider);
  }
}

export default AuthService;
