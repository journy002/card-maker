import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import AuthService from "./service/auth_service";
import ImageUploader from "./service/image_uploader";
import ImageFileInput from "./components/ImageFileInput/image_file_input";
import CardRepository from "./service/card_repository";

const authService = new AuthService();
const cardRepository = new CardRepository();
const imageUploader = new ImageUploader();
// 확장성을 위해 imageFileInput을 한단계 감싼것입니다.
// 보통 component prop같은 경우 보통 대문자로 시작합니다.
// 새로운 injection이 필요할때도 props를 자식 컴포넌트까지 내려줄 필요없이
// FileInput으로 한번 감싸주고 그 안에 <ImageFileInput />에 props를 넣어주면 한번의 injection으로 자식 컴포넌트까지 전달이 가능합니다.
const FileInput = (props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
);

ReactDOM.render(
  <React.StrictMode>
    <App
      authService={authService}
      FileInput={FileInput}
      cardRepository={cardRepository}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
