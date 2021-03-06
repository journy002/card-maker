// import import firebase from "firebase/app";으로 해주면 authProvider값을 읽어오지 못한다.
import { firebaseAuth, githubPorvider, googleProvider } from "./firebase";

class AuthService {
  login(providerName) {
    // Firebase AuthProvider 생성자 생성 예시
    // const provider = new firebase.auth.GoogleAuthProvider();
    // Object['key']를 이용해서 인자를 받아오는것 같다.
    const authProvider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
  }

  logout() {
    firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName) {
    switch (providerName) {
      case "Google":
        return googleProvider;

      case "Github":
        return githubPorvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
