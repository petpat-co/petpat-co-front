import React, { ReactElement } from "react";

//core
import { useAppDispatch } from "src/core/store";
import { kakaoLogInApi } from "src/core/redux/user/userSlice";



const Kakao = (): ReactElement => {
  const appdispatch = useAppDispatch();

  const code: string | null = new URL(window.location.href).searchParams.get("code");

  React.useEffect(() => {
    if (code) {
      const kakao = () => {
        appdispatch(kakaoLogInApi(code));
      };
      kakao();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;

};

export default Kakao;