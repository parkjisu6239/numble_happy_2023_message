import { getRandomImage } from "../utils/apis";

const New = () => {
  const addIamge = async () => {
    const res = await getRandomImage();
    const url = res.urls.thumb;

    const image: HTMLImageElement = document.querySelector(".unsplash");
    image.src = url;
    image.classList.add("show");

    const addImageDiv = document.querySelector(".new-image");
    addImageDiv.classList.add("hide");
  };

  window.onload = () => {
    const addImageDiv = document.querySelector(".new-image");
    addImageDiv.addEventListener("click", addIamge);
  };

  /*html*/
  return `
    <form>
      <fieldset>
        <legend>신년 메시지 등록하기</legend>
        <div>
          <img class="add-image unsplash hide" alt="new"/>
          <div class="add-image new-image"></div>
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
