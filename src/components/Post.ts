import { type Post as PostType } from "@/types";
import "@/styles/postList.css";

interface Props {
  target: HTMLUListElement;
  post: PostType;
}
class Post {
  props: Props;
  postItem: HTMLAnchorElement;

  constructor(props: Props) {
    this.props = props;
    this.postItem = document.createElement("a");
    this.postItem.classList.add("post-item", "default-hover");
    this.postItem.href = `/post/${props.post.postId}`;
    this.props.target.insertAdjacentElement("beforeend", this.postItem);
    this.render();
  }

  render() {
    const { image, title, content } = this.props.post;
    const smallImg = image.replace(/w.*\d/, "&w=200");

    /*html*/
    this.postItem.innerHTML = `
      <div>
        <img class="post-image" src=${smallImg}/>
        <p class="post-title">${title}</p>
        <p class="post-content">${content}</p>
      </div>
    `;
  }
}

export default Post;
