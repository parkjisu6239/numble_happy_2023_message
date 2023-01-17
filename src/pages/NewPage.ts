import { getRandomImage, createPost, type PostParams } from "utils/apis";

import "../styles/new.css";

interface Props {
  target: HTMLDivElement;
}

class NewPage {
  target: HTMLDivElement;

  constructor({ target }: Props) {
    this.target = target;
    this.addEventListener();
    this.render();
  }

  addIamge = async () => {
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

  addPost = async (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const params = {
      title: data.get("title"),
      content: data.get("content"),
      image: data.get("image"),
    } as PostParams;

    const res = await createPost(params);
    if (res.code >= 400) {
      window.alert(`일시적인 오류가 발생했습니다.(${res.code})`);
    }
  };

  addEventListener = () => {
    // DOM 업데이트 후 이벤트 추가
    window.onload = () => {
      const newImageBox = document.querySelector(".new-image");
      newImageBox.addEventListener("click", this.addIamge);

      const refreshImageBtn: HTMLButtonElement =
        document.querySelector(".refresh-image");
      refreshImageBtn.addEventListener("click", this.addIamge);

      const form = document.querySelector(".new-post");
      form.addEventListener("submit", this.addPost);
    };
  };

  render() {
    /*html*/
    this.target.innerHTML = `
    <article>
      <a href="/">메인으로</a>
      <form class="new-post">
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
    </article>
    `;
  }
}

export default NewPage;
