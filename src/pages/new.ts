import { getRandomImage } from "../utils/apis";

import "../styles/new.css";

const New = () => {
  const addIamge = async () => {
    const res = await getRandomImage();
    const url = res.urls.thumb;

    // image 표시
    const image: HTMLImageElement = document.querySelector(".unsplash");
    image.src = url;
    image.classList.add("show");

    // image 추가 div 숨기기
    const newImageBox = document.querySelector(".new-image");
    newImageBox.classList.add("hide");

    // form 요청을 위해 input value 추가
    const input: HTMLInputElement = document.querySelector(".image-input");
    input.value = url;

    // 이미지 새로고침 버튼 활성화
    const refreshImageBtn: HTMLButtonElement =
      document.querySelector(".refresh-image");
    refreshImageBtn.disabled = false;
  };

  // DOM 업데이트 후 이벤트 추가
  window.onload = () => {
    const newImageBox = document.querySelector(".new-image");
    newImageBox.addEventListener("click", addIamge);

    const refreshImageBtn: HTMLButtonElement =
      document.querySelector(".refresh-image");
    refreshImageBtn.addEventListener("click", addIamge);
  };

  /*html*/
  return `
    <form action="http://43.201.103.199/post" method="POST">
      <fieldset>
        <legend>신년 메시지 등록하기</legend>
        <div>
          <img class="add-image unsplash hide" alt="new"/>
          <div class="add-image new-image"></div>
          <input class="image-input" type="hidden" name="image">
          <button type="button" class="refresh-image" disabled>🔄</button>
        </div>
        <div>
          <label for="title">제목</label>
          <input type="text" name="title" placeholder="글 제목을 입력해주세요">
        </div>
        <div>
          <label for="content">내용</label>
          <textarea type="text" name="content" placeholder="글 내용을 입력해주세요"></textarea>
        </div>
        <button type="submit">등록하기</button>
    </fieldset>
    </form>
  `;
};

export default New;
