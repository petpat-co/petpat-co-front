import React, { ReactElement } from "react"
import { useAppDispatch } from "src/core/store";
import { useNavigate } from "react-router-dom";

//api
import { logInApi } from "src/core/redux/user/userSlice";

//utills
import { KAKAO_AUTH_URL } from "src/core/OAuth";
import { emailCheck, passwordCheck } from "../shared/RegEx";
import { LogInTemplateStyle as S } from "./LogInTemplate.style";

// elements
import { Text } from "../shared/element/Text";
import { Button, Input } from "../shared/element";

//icons
import { ReactComponent as Kakao } from "src/asset/loginIcon/kakao.svg";
import { ReactComponent as Naver } from "src/asset/loginIcon/naver.svg";
import { ReactComponent as Google } from "src/asset/loginIcon/google.svg";
import { ReactComponent as Github } from "src/asset/loginIcon/github.svg";
import { ReactComponent as Facebook } from "src/asset/loginIcon/facebook.svg";


const LogInTemplate = (): ReactElement => {
  const appdispatch = useAppDispatch();
  const navigate = useNavigate();

  //user data
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  //login
  const logIn = () => {
    //data validation
    if (!userEmail || !userPassword) {
      window.alert("빈칸!!!!!!!!!!!!!!!!!!");
      return;
    } else if (!emailCheck(userEmail)) {
      console.log("이메일이 이상해용");
      return;
    } else if (!passwordCheck(userPassword)) {
      console.log("비밀번호가 이상해용");
      return;
    }
    //fetching data
    const userdata = {
      userEmail: userEmail,
      userPassword: userPassword,
    }
    //dispatching data
    appdispatch(logInApi(userdata));
  };

  const goSignUp = () => {
    navigate('/signup');
  }


  return (
    <S.Wrap>

      {/* 로그인 헤더 */}
      <S.GreetingWrap>
        <Text
          textStyle={{
            fontSize: '16px',
            fontWeight: '500',
            color: '#6B7280',
          }}>
          펫팻에 어서오세요!
        </Text>
        <Text
          textStyle={{
            margin: '-4px 0 0 0',
            fontSize: '40px',
            fontWeight: '800',
          }}
        >
          로그인
        </Text>
      </S.GreetingWrap>

      {/* 로그인 인풋 */}
      <S.InputWrap>
        <Text
          textStyle={{
            margin: '12px 0',
            fontSize: '16px',
          }}>
          아이디
        </Text>
        <Input
          placeholder=''
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          maxLength={50}
          name=''
        />
      </S.InputWrap>

      <S.InputWrap>
        <Text
          textStyle={{
            margin: '12px 0',
            fontSize: '16px',
          }}>
          비밀번호
        </Text>
        <Input
          placeholder=''
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
          maxLength={50}
          name=''
        />
      </S.InputWrap>

      {/* 로그인 정보 기억 및 로그인 완료 버튼 */}
      <S.CheckRememberMe>
        <input type="checkbox" />
        <Text textStyle={{
          margin: '0 12px',
          fontSize: '14px',
        }}>
          로그인 상태 유지하기
        </Text>
      </S.CheckRememberMe>

      <Button
        _onClick={logIn}
        _disabled={false}
        activeBg='#F35F4C'
        activeColor='#fff'
        fontSize='16px'
        radius='5px'
      >로그인
      </Button>

      {/* 소셜 로그인 */}
      <S.Section>
        <Text textStyle={{
          margin: '60px 0 0 0',
          fontSize: '16px',
          fontWeight: '700',
        }}>
          SNS 계정으로 로그인하기
        </Text>
      </S.Section>
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

      {/* 유저 정보 찾기 및 회원가입 */}
      <S.FindUser>
        <S.FindSection border>
          <Text textStyle={{
            fontSize: '14px',
            fontWeight: '400',
          }}>
            비밀번호 찾기
          </Text>
        </S.FindSection>
        <S.FindSection border>
          <Text textStyle={{
            fontSize: '14px',
            fontWeight: '400',
          }}>
            아이디 찾기
          </Text>
        </S.FindSection>
        <S.FindSection>
          {/* <Text
            textStyle={{
              fontSize: '14px',
              fontWeight: '400',
            }}
          >
            회원가입
          </Text> */}
          <Button
            _onClick={goSignUp}
            _disabled={false}
            fontSize="14px"
            fontWeight="400"
            >회원가입</Button>
        </S.FindSection>
      </S.FindUser>
    </S.Wrap>
  );
};




export default LogInTemplate;
