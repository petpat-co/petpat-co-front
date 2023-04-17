import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/core/store";
import { SignUpTemplateStyle as S } from "./SignUpTemplate.style";
//api
import { emailCheckApi, signUpApi } from "src/core/redux/user/userSlice";
//utils
import { KAKAO_AUTH_URL } from "src/core/OAuth";
import { emailCheck, nickNameCheck, passwordCheck } from "../shared/RegEx";
//elements
import { Text } from "../shared/element/Text";
import { Button, DisplayGrid, Input } from "../shared/element";
//icons
import { ReactComponent as Kakao } from "src/asset/loginIcon/kakao.svg";
import { ReactComponent as Naver } from "src/asset/loginIcon/naver.svg";
import { ReactComponent as Google } from "src/asset/loginIcon/google.svg";
import { ReactComponent as Github } from "src/asset/loginIcon/github.svg";
import { ReactComponent as Facebook } from "src/asset/loginIcon/facebook.svg";



const SignUpTemplate = (): ReactElement => {

  const appdispatch = useAppDispatch();
  const emailCheckStatus = useSelector((state: RootState) => state.user?.emailCheck);

  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userPasswordChk, setUserPasswordChk] = React.useState("");
  const [userNickname, setUserNickname] = React.useState("");

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

    if (!userEmail || !userPassword || !userPasswordChk || !userNickname) {
      window.alert("빈칸!!!!!!!!!!!!!!!!!!");
      return;
    } else if (!emailCheck(userEmail)) {
      console.log("이메일이 이상해용");
      return;
    } else if (!passwordCheck(userPassword)) {
      console.log("비밀번호가 이상해용");
      return;
    } else if (!nickNameCheck(userNickname)) {
      console.log("닉네임이 이상해용");
      return;
    } else if (userPassword !== userPasswordChk) {
      console.log("비밀번호가 달라용");
      return;
    } else if (!emailCheckStatus) {
      console.log("이메일 중복체크 필요")
      return;
    };

    const userdata = {
      userEmail: userEmail,
      nickname: userNickname,
      password: userPassword,
      profileImgPath: '',
      loginType: 'normal',
      location: '',
    }

    appdispatch(signUpApi(userdata));

  };

  return (
    <S.Wrap>

      <Text
        textStyle={{
          margin: '40px 0',
          fontSize: '40px',
          fontWeight: '700',
        }}
      >펫팻에 오신 것을 환영합니다!
      </Text>

      <Text
        textStyle={{
          margin: '18px 0',
          fontSize: '16px',
        }}
      >SNS로 간편한 회원가입
      </Text>

      <S.SnsLoginButtons>
        <S.Section>
          <a href={KAKAO_AUTH_URL}>
            <Kakao />
          </a>
        </S.Section>
        <S.Section>
          <Naver />
        </S.Section>
        <S.Section>
          <Google />
        </S.Section>
        <S.Section>
          <Github />
        </S.Section>
        <S.Section>
          <Facebook />
        </S.Section>
      </S.SnsLoginButtons>


      <DisplayGrid
        margin="62px 0"
        height="2px"
        bg="#F35F4C"
      />

      <S.InputGrid>
        <S.InputWrap>
          <S.Text>2 ~ 6자의 한글/영문, 특수문자 입력 불가</S.Text>
          <Input
            name="nickname"
            placeholder="nickname"
            maxLength={24}
            borderRadius="5px"
            onChange={(e) => {
              setUserNickname(e.target.value);
            }}
          />
        </S.InputWrap>

        <S.InputFlexWrap>
          <Input
            name="email"
            placeholder="e-mail"
            maxLength={40}
            borderRadius="5px"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
          <Button
            margin="0 0 0 16px"
            width="160px"
            radius="5px"
            fontSize="16px"
            activeBg="#F35F4C"
            activeColor="#fff"
            _onClick={emailDpCheck}
            _disabled={false}
          >중복 확인
          </Button>
        </S.InputFlexWrap>

        <S.InputWrap>
          <S.Text>8 ~ 12자, 영문자 숫자, 특수문자(‘!, @, #, $, %, ^, &, *’) 사용 가능</S.Text>
          <Input
            name="password"
            type="password"
            placeholder="password"
            maxLength={24}
            borderRadius="5px"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </S.InputWrap>

        <S.InputWrap>
          <Input
            name="passwordcheck"
            type="password"
            placeholder="password check"
            maxLength={24}
            borderRadius="5px"
            onChange={(e) => {
              setUserPasswordChk(e.target.value);
            }}
          />
        </S.InputWrap>


        <Button
          margin="16px 0"
          radius="5px"
          fontSize="16px"
          activeBg="#F35F4C"
          activeColor="#fff"
          _onClick={SignUp}
          _disabled={false}
        >가입하기
        </Button>
      </S.InputGrid>
    </S.Wrap>
  );
};

export default SignUpTemplate;