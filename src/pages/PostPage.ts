import { type Post, Comment } from "@/types";
import useState from "@/hooks/useState";
import { getPostDetail } from "@/utils/apis";
import { getParams } from "@/utils/misc";
import PostDetail from "@/components/PostDetail";
import CommentList from "@/components/CommentList";
import { navigate } from "@/router";

import "@/styles/postList.css";

interface Props {
  target: HTMLDivElement;
}

interface State {
  postId: string;
  post: Post;
  comments: Comment[];
  editMode: boolean;
}

class PostPage {
  target: HTMLDivElement;
  state = useState<State>({
    postId: "",
    post: {} as Post,
    comments: [],
    editMode: false,
  });

  constructor({ target }: Props) {
    this.target = target;
    this.state.setValue({
      ...this.state.getValue(),
      postId: getParams(location.pathname),
    });
    this.render();
    this.state.addWatcher(this.render.bind(this));
    this.addEventListener();
    this.getPost();
  }

  getPost = async () => {
    const res = await getPostDetail(this.state.getValue().postId);
    if (res.code >= 400) {
      navigate({ to: "/" });
    }
    this.state.setValue({
      ...this.state.getValue(),
      post: res.data.post,
      comments: res.data.comments,
    });
  };

  addEventListener = () => {};

  setEditMode = (editMode: boolean) => {
    this.state.setValue({
      ...this.state.getValue(),
      editMode,
    });
  };

  setPost = (post: Post) => {
    this.state.setValue({
      ...this.state.getValue(),
      post,
    });
  };

  render() {
    const { postId, post, comments, editMode } = this.state.getValue();
    /*html*/
    this.target.innerHTML = `
    <article>
      <div id="post-detail"></div>
      <div id="commets"></div>
    </article>
    `;

    const postDetailConatainer: HTMLDivElement =
      document.querySelector("#post-detail");
    new PostDetail({
      target: postDetailConatainer,
      post,
      editMode,
      setPost: this.setPost.bind(this),
      setEditMode: this.setEditMode.bind(this),
    });

    const commentContainer: HTMLDivElement = document.querySelector("#commets");
    new CommentList({
      target: commentContainer,
      comments,
      postId,
    });
  }
}

export default PostPage;
