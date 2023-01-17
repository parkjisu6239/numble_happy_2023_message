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
    <a class="post-item" href="/post/${this.post.postId}">
      <img class="post-image" src=${this.post.image}/>
      <p class="post-title">${this.post.title}</p>
      <p class="post-content">${this.post.content}</p>
    </a>
    `;
  }
}

export default Post;
