import { type Post as PostType } from "../types";
import { updatePost, deletePost, type PostParams } from "utils/apis";
import { navigate } from "../router";

import "../styles/postDetail.css";

interface Props {
  target: HTMLDivElement;
  post: PostType;
  editMode: boolean;
  setPost: (post: PostType) => void;
  setEditMode: (editMode: boolean) => void;
}

class PostDetail {
  state: Props;

  constructor(props: Props) {
    this.state = props;
    this.render();
    this.addEventListener();
  }

  onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const params = {
      title: data.get("title"),
      content: data.get("content"),
      image: data.get("image"),
    } as PostParams;

    const res = await updatePost(this.state.post.postId, params);
    this.state.setEditMode(false);
    this.state.setPost(res.data.post);
  };

  _deletePost = async () => {
    const res = await deletePost(this.state.post.postId);

    if (res.code >= 400) {
      window.alert(`오류가 발생했습니다.(${res.code})`);
      return;
    }

    window.alert(`게시물이 정상적으로 삭제되었습니다.`);
    navigate({ to: "/" });
  };

  addEventListener = () => {
    const editBtn = document.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => this.state.setEditMode(true));

    const cancelEditBtn = document.querySelector(".cancel-edit-btn");
    cancelEditBtn.addEventListener("click", () =>
      this.state.setEditMode(false)
    );

    const form = document.querySelector(".post-detail");
    form.addEventListener("submit", this.onSubmit);

    const deleteBtn = document.querySelector(".delete-post");
    deleteBtn.addEventListener("click", this._deletePost);
  };

  render() {
    const { target, post, editMode } = this.state;
    /*html*/
    target.innerHTML = `
    <button class="delete-post">삭제</button>
    <form class="post-detail">
        <img src="${post.image}" alt="img"/>
        <input
          class="image-input"
          type="hidden"
          name="image"
          value="${post.image}"
          >
      <div>
        <label for="title">제목</label>
        <input type="text" name="title" value="${post.title}" ${
      !editMode && "readonly disabled"
    }>
      </div>
      <div>
        <label for="content">내용</label>
        <textarea type="text" name="content" ${
          !editMode && "readonly disabled"
        }>${post.content}</textarea>
      </div>
      <button type="submit" class="${!editMode ? "hide" : "show"}">완료</button>
      <button type="submit" action="/" class="cancel-edit-btn ${
        !editMode ? "hide" : "show"
      }">취소</button>
      <button type="button" class="edit-btn ${editMode ? "hide" : "show"}"
      >수정</button>
  </fieldset>
  </form>
    `;
  }
}

export default PostDetail;
