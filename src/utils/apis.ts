import { Post, PostWithComment, Comment } from "@/types";

const UNSPLASH_BASE_URL = "https://api.unsplash.com";
const NUMBLE_BASE_URL = "http://43.201.103.199";

const request = async <T>(
  url: string,
  option?: RequestInit
): Promise<T | undefined> => {
  try {
    const response = await fetch(url, option);
    const res = await response.json();
    if (!response.ok) {
      alert(`${res.message} (${res.code})`);
    }
    return res;
  } catch (e) {
    console.error(e);
  }
};

/**
 * unsplash 에서 랜덤이미지를 가져옵니다.
 * @returns
 */
export const getRandomImage = async () => {
  const headers = {
    Authorization: "Client-ID " + process.env.UNSPLASH_ACCESS,
  };
  const url = UNSPLASH_BASE_URL + "/photos/random";
  const response = await request<{
    urls: {
      thumb: string;
      small: string;
      regular: string;
    };
  }>(url, { headers });

  return response;
};

/**
 * 모든 게시물을 가져옵니다.
 * @returns
 */
export const getAllPost = async () => {
  return await request<{
    code: number;
    data: { posts: Post[] };
  }>(NUMBLE_BASE_URL + "/posts", {
    mode: "no-cors",
  });
};

/**
 * 게시물 상세 내용을 가져옵니다
 * @param postId
 * @returns
 */
export const getPostDetail = async (postId: string) => {
  return await request<{
    code: number;
    data: PostWithComment;
  }>(NUMBLE_BASE_URL + "/post" + `/${postId}`);
};

export type PostParams = {
  title: string;
  content: string;
  image: string;
};
/**
 * 새로운 게시물을 추가합니다.
 * @param params
 * @returns
 */
export const createPost = async (params: PostParams) => {
  return await request<{
    code: number;
    data: Post;
  }>(NUMBLE_BASE_URL + "/post", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * 게시물을 수정합니다.
 * @param postId
 * @param params
 * @returns
 */
export const updatePost = async (
  postId: string,
  params: Partial<PostParams>
) => {
  return await request<{
    code: number;
    data: { post: Post };
  }>(NUMBLE_BASE_URL + "/post" + `/${postId}`, {
    method: "PATCH",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * 게시물을 삭제합니다.
 * @param postId
 * @returns
 */
export const deletePost = async (postId: string) => {
  return await request<{
    code: number;
  }>(NUMBLE_BASE_URL + "/post" + `/${postId}`, {
    method: "DELETE",
  });
};

/**
 * 댓글을 추가합니다.
 * @param postId
 * @param content
 * @returns
 */
export const createComment = async (postId: string, content: string) => {
  return await request<{
    code: number;
    message?: string;
    data: { post: Comment };
  }>(NUMBLE_BASE_URL + "/comment" + `/${postId}`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * 댓글을 삭제합니다.
 * @param commentId
 * @returns
 */
export const deleteComment = async (commentId: string) => {
  return await request<{
    code: number;
  }>(NUMBLE_BASE_URL + "/comment" + `/${commentId}`, {
    method: "DELETE",
  });
};
