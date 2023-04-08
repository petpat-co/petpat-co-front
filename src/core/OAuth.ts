// 카카오 
const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_ID;
const KAKAO_REDIRECT_URI = "http://localhost:3000/user/kakao/callback";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
