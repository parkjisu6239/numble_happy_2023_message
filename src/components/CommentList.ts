import { Comment } from "@/types";
import { createComment, deleteComment, type PostParams } from "@/utils/apis";

import "@/styles/postDetail.css";

interface Props {
  target: HTMLDivElement;
  postId: string;
  comments?: Comment[];
}

class CommentList {
  state: Props;

  constructor(props: Props) {
    this.state = props;
    this.render();
    this.addEventListener();
  }

  onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const content = data.get("content") as string;

    const res = await createComment(this.state.postId, content);
    location.reload();
  };

  _deleteComment = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const commentId = target.dataset.commentid;
    if (!commentId) {
      return;
    }
    const res = await deleteComment(commentId);
    location.reload();
  };

  addEventListener = () => {
    const form = document.querySelector(".add-comment");
    form.addEventListener("submit", this.onSubmit);

    const deleteList = document.querySelector(".commet-list");
    deleteList.addEventListener("click", this._deleteComment);
  };

  render() {
    const { target, comments } = this.state;
    const count = comments?.length || 0;

    /*html*/
    target.innerHTML = `
      <span>댓글 ${count} 개</span>
      <form class="add-comment">
        <input placeholder="댓글 쓰기" name="content">
        <button class="add-comment-btn">✏️</button>
      </form>
      <ul class="commet-list">
        ${
          count
            ? comments
                .map((comment) => {
                  /*html*/
                  return `<li>${comment.content} <button class="delete-comment-btn" data-commentid="${comment.commentId}">🗑</button></li>`;
                })
                .join("")
            : ""
        }
      </ul>
    `;
  }
}

export default CommentList;
