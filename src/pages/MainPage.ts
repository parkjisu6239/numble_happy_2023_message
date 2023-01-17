import { type Post as PostType } from "../types";
import useState from "../hooks/useState";
import { getAllPost } from "utils/apis";
import Post from "components/Post";
import "../styles/postList.css";

interface Props {
  target: HTMLDivElement;
}

class MainPage {
  component: HTMLDivElement;
  posts = useState<PostType[]>([] as PostType[]);

  constructor({ target }: Props) {
    this.component = document.createElement("div");
    target.insertAdjacentElement("beforeend", this.component);
    this.addEventListener();
    this.render();
    this.posts.addWatcher(this.render.bind(this));
    this.getPostList();
  }

  getPostList = async () => {
    const res = await getAllPost();
    if (res.code >= 400) {
      window.alert(`오류가 발생했습니다.(${res.code})`);
      return;
    }

    this.posts.setValue(res.data.posts);
  };

  addEventListener = () => {};

  render() {
    /*html*/
    this.component.innerHTML = `
    <article>
      <h1>2023 신년 메시지 🐰</h1>
      <ul class="post-list">
        ${this.posts
          .getValue()
          .map((post) => {
            const PostComponent = new Post(post);
            return PostComponent.render();
          })
          .join("")}
      </ul>
    </article>
    `;
  }
}

export default MainPage;
