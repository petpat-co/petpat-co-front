import React from "react";
import { ReactElement } from "react";
import { Button, Input } from "../shared/element";
import { SignUpTemplateStyle as S } from "./SignUpTemplate.style";
import { emailCheck, nickNameCheck, passwordCheck } from "../shared/RegEx";
import { emailCheckApi, signUpApi } from "src/core/redux/user/userSlice";
import { RootState, useAppDispatch } from "src/core/store";
import { useSelector } from "react-redux";

const SignUpTemplate = (): ReactElement => {

  const appdispatch = useAppDispatch();
  const emailCheckStatus = useSelector((state: RootState) => state.user?.emailCheck);
  // const [message, setMessage] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userPasswordChk, setUserPasswordChk] = React.useState("");
  const [userNickName, setUserNickName] = React.useState("");

  const emailDpCheck = () => {
    if (!userEmail) {
      window.alert("빈칸!!!!!!!!!!!");
      return;
    } else if (!emailCheck(userEmail)) {
      console.log("이메일이 이상해용");
      return;
    };
    console.log("중복확인")
    console.log(userEmail);
    appdispatch(emailCheckApi(userEmail));
  }

  const SignUp = () => {

    if (!userEmail || !userPassword || !userPasswordChk || !userNickName) {
      window.alert("빈칸!!!!!!!!!!!!!!!!!!");
      return;
    } else if (!emailCheck(userEmail)) {
      console.log("이메일이 이상해용");
      return;
    } else if (!passwordCheck(userPassword)) {
      console.log("비밀번호가 이상해용");
      return;
    } else if (!nickNameCheck(userNickName)) {
      console.log("닉네임이 이상해용");
      return;
    } else if (userPassword !== userPasswordChk) {
      console.log("비밀번호가 달라용");
      return;
    } else if(!emailCheckStatus) {
      console.log("이메일 중복체크 필요")
      return;
    };

    const userdata = {
      userEmail: userEmail,
      userNickName: userNickName,
      userPassword: userPassword,
      userPasswordCheck: userPasswordChk,
      userImg: '',
      userLocation: '',
    }

    appdispatch(signUpApi(userdata));

  };

  return (
    <S.Wrap>

      <Input
        placeholder="e-mail"
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
        maxLength={40}
        name="email" />

      <Button _onClick={emailDpCheck} _disabled={false}>중복확인</Button>

      <Input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setUserPassword(e.target.value);
        }}
        maxLength={24}
        name="password" />

      <Input
        type="password"
        placeholder="password check"
        onChange={(e) => {
          setUserPasswordChk(e.target.value);
        }}
        maxLength={24}
        name="passwordcheck" />

      <Input
        placeholder="nickname"
        onChange={(e) => {
          setUserNickName(e.target.value);
        }}
        maxLength={24}
        name="nickname" />

      <Button _onClick={SignUp} _disabled={false}>회원가입</Button>
    </S.Wrap>
  );
};

export default SignUpTemplate;