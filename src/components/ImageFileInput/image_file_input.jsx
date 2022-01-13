import React, { memo, useState } from "react";
import { useRef } from "react/cjs/react.development";
import styles from "./image_file_input.module.css";

const ImageFileInput = memo(({ imageUploader, name, onFileChange }) => {
  // 로딩스피너 //
  const [loading, setLoading] = useState(false); // 처음엔 로딩이 되지 않으니 false값을 기본으로 설정

  const inputRef = useRef();

  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (event) => {
    console.log(event.target.files[0], "clicked photo");
    setLoading(true); // 변화가 생겨 로딩이 되면 로딩을 true로 변경
    const uploaded = await imageUploader.upload(event.target.files[0]);
    setLoading(false); // 로딩이 끝난 걸 false로 다시 변경
    console.log(uploaded, "imageFileInput check uploaded");

    onFileChange({
      name: uploaded.original_filename, // 바뀐 파일 이름
      url: uploaded.url, // 이미지의 url
    });
  };

  return (
    <div className={styles.container}>
      {/*
        파일 선택을 위한 input을 css처리하는 방법은 많이 없습니다.
        보통은 css를 이용해서 input은 보이지 않게 하고
        click이 되면 input이 클릭되는 효과를 나타내야 합니다.
      */}
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {!loading && (
        <button
          className={`${styles.button} ${name ? styles.pink : styles.grey}`}
          onClick={onButtonClick}
        >
          {name || "No file"}
        </button>
      )}
      {loading && <div className={styles.loading}></div>}
    </div>
  );
});

export default ImageFileInput;
