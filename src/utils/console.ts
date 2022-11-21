interface ErrorRes extends Error {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

export const errorMessage = (err: ErrorRes) => {
  if (err.response) {
    console.error(err.response.data);
    return err.response.data.message;
  }
  console.error(err);
  return '알 수 없는 에러가 발생했습니다.';
};
