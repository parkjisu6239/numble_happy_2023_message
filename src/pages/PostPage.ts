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

class PostPage {
  target: HTMLDivElement;
  postId: string;
  post = useState<Post>({} as Post);
  comments = useState<Comment[]>([] as Comment[]);
  editMode = useState(false);

  constructor({ target }: Props) {
    this.target = target;
    this.postId = getParams(location.pathname);
    this.render();
    this.addEventListener();
    this.post.addWatcher(this.render.bind(this));
    this.comments.addWatcher(this.render.bind(this));
    this.editMode.addWatcher(this.render.bind(this));
    this.getPost();
  }

  getPost = async () => {
    const res = await getPostDetail(this.postId);
    if (res.code >= 400) {
      navigate({ to: "/" });
    }
    this.post.setValue(res.data.post);
    this.comments.setValue(res.data.comments);
  };

  addEventListener = () => {};

  render() {
    /*html*/
    this.target.innerHTML = `
    <article>
      <a href="/">메인으로</a>
      <div id="post-detail"></div>
      <div id="commets"></div>
    </article>
    `;

    const postDetailConatainer: HTMLDivElement =
      document.querySelector("#post-detail");
    new PostDetail({
      target: postDetailConatainer,
      post: this.post.getValue(),
      editMode: this.editMode.getValue(),
      setPost: this.post.setValue,
      setEditMode: this.editMode.setValue,
    });

    const commentContainer: HTMLDivElement = document.querySelector("#commets");
    new CommentList({
      target: commentContainer,
      comments: this.comments.getValue(),
      postId: this.postId,
    });
  }
}

export default PostPage;
