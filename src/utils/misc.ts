export const getParams = (path: string) => {
  try {
    return path.slice(1).split("/")[1];
  } catch {
    alert("잘못된 경로입니다.");
  }
};
