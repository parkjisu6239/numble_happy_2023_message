import { type Post as PostType } from "../types";

class Post {
  post: PostType;

  constructor(post: PostType) {
    this.addEventListener();
    this.post = post;
  }

  addEventListener = () => {};

  render() {
    /*html*/
    return `
      <li class="post-item">
        <img class="post-image" src=${this.post.image}/>
        <p class="post-title">${this.post.title}</p>
        <div class="post-content">${this.post.content}</div>
      </li>
    `;
  }
}

export default Post;
