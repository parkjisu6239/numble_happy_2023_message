import { type Post as PostType } from "@/types";
import useState from "@/hooks/useState";
import { getAllPost } from "@/utils/apis";
import Post from "@/components/Post";

import "@/styles/mainPage.css";

interface Props {
  target: HTMLDivElement;
}

interface State {
  posts: PostType[];
}

class MainPage {
  props: Props;
  state = useState({
    posts: [],
  });

  constructor(props: Props) {
    this.props = props;
    this.render();
    this.state.addWatcher(this.render.bind(this));
    this.getPostList();
    this.addEventListener();
  }

  getPostList = async () => {
    const res = await getAllPost();
    this.state.setValue({ posts: res.data.posts });
  };

  addEventListener = () => {};

  render() {
    /*html*/
    this.props.target.innerHTML = `
    <article>
      <a href="/new" class="link-button default-hover move-to-new">메시지 추가하기 🖍</a>
      <h1>2023 신년 메시지 🐰</h1>
      <ul class="post-list"></ul>
    </article>
    `;

    const postList: HTMLUListElement = document.querySelector(".post-list");
    this.state.getValue().posts.forEach((post) => {
      new Post({ post, target: postList });
    });
  }
}

export default MainPage;
