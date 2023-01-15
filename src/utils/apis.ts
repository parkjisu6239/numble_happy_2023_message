const UNSPLASH_BASE_URL = "https://api.unsplash.com";

// TODO: api try-catch
export const getRandomImage = async () => {
  const headers = {
    Authorization: "Client-ID " + process.env.UNSPLASH_ACCESS,
  };
  const url = UNSPLASH_BASE_URL + "/photos/random";
  const response = await fetch(url, { headers });
  return response.json();
};
