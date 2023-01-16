export type Post = {
  postId: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  commentId: string;
  postId: string;
  content: string;
};

export type PostWithComment = {
  post: Post;
  comments: Comment[];
};
