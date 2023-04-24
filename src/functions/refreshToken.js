import axios from "axios";
async function refreshAccessToken(token) {
  const newToken = await axios.post(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/token"
      : "https://api.alexanderkoegel.xyz/token",
    { token: token }
  );
  if (newToken.data.accessToken) {
    return newToken.data.accessToken;
  } else {
    return false;
  }
}

export default refreshAccessToken;
