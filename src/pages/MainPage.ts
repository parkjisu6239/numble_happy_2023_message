import { type Post as PostType } from "../types";
import useState from "../hooks/useState";
import { getAllPost } from "utils/apis";
import Post from "components/Post";
import "../styles/postList.css";

interface Props {
  target: HTMLDivElement;
}

class MainPage {
  target: HTMLDivElement;
  posts = useState<PostType[]>([] as PostType[]);

  constructor({ target }: Props) {
    this.target = target;
    this.addEventListener();
    this.render();
    this.posts.addWatcher(this.render.bind(this));
    this.getPostList();
  }

  getPostList = async () => {
    const res = await getAllPost();
    this.posts.setValue(res.data.posts);
  };

  addEventListener = () => {};

  render() {
    /*html*/
    this.target.innerHTML = `
    <article>
      <a href="/new">새글쓰기</a>
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
