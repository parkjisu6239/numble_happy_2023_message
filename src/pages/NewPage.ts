import { getRandomImage, createPost, type PostParams } from "@/utils/apis";
import { navigate } from "@/router";

import "@/styles/newPage.css";

interface Props {
  target: HTMLDivElement;
}

class NewPage {
  props: Props;

  constructor(props: Props) {
    this.props = props;
    this.render();
    this.addEventListener();
  }

  addIamge = async () => {
    const res = await getRandomImage();
    const url = res.urls.regular;

    const newImageBox: HTMLDivElement = document.querySelector(".add-image");
    newImageBox.style.backgroundImage = `url(${url})`;

    // form 요청을 위해 input value 추가
    const input: HTMLInputElement = document.querySelector(".image-input");
    input.value = url;
  };

  addPost = async (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const title = data.get("title");
    const content = data.get("content");
    const image = data.get("image");

    if (!title || !content || !image) {
      alert("모든 필드를 채워주세요");
      return;
    }

    const params = {
      title,
      content,
      image,
    } as PostParams;

    const res = await createPost(params);
    navigate({ to: `/post/${res.data.postId}` });
  };

  addEventListener = () => {
    const newImageBox = document.querySelector(".add-image");
    newImageBox.addEventListener("click", this.addIamge);

    const form = document.querySelector(".new-post");
    form.addEventListener("submit", this.addPost);
  };

  render() {
    /*html*/
    this.props.target.innerHTML = `
    <article>
      <a href="/" class="link-button default-hover move-to-main">메인으로</a>
      <form class="new-post">
        <fieldset class="new-field">
          <legend>신년 메시지 등록하기</legend>
          <div>
            <div class="add-image"></div>
            <input class="image-input" type="hidden" name="image">
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
