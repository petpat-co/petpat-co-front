export const config = {
  local: {
    mode: process.env.REACT_APP_MODE,
    host: process.env.REACT_APP_HOST,
  },
  server: {
    host: process.env.REACT_APP_SERVER_HOST,
  },
};
