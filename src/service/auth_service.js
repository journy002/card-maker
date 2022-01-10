import firebase from "firebase";

class AuthService {
  login(providerName) {
    // Firebase AuthProvider 생성자 생성 예시
    // const provider = new firebase.auth.GoogleAuthProvider();
    // Object['key']를 이용해서 인자를 받아오는것 같다.
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebase.auto().signInWithPopup(authProvider);
  }
}

export default AuthService;
