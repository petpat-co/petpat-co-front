import { ReactElement } from "react"
import { Button, Input } from "../shared/element";
import { Text } from "../shared/element/Text";
import { LogInTemplateStyle as S } from "./LogInTemplate.style";

//icons
import { ReactComponent as Kakao } from "src/asset/loginIcon/kakao.svg";
import { ReactComponent as Facebook } from "src/asset/loginIcon/facebook.svg";
import { ReactComponent as Google } from "src/asset/loginIcon/google.svg";
import { ReactComponent as Naver } from "src/asset/loginIcon/naver.svg";
import { ReactComponent as Github } from "src/asset/loginIcon/github.svg";

const LogInTemplate = (): ReactElement => {

  const LogIn = () => {
  };

  return (
    <S.Wrap>
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
          onChange={LogIn}
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
          onChange={LogIn}
          maxLength={50}
          name=''
        />
      </S.InputWrap>
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
        _onClick={LogIn}
        _disabled={false}
        activeBg='#F35F4C'
        activeColor='#fff'
        fontSize='16px'
        radius='5px'
      >로그인
      </Button>
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
          <Kakao />
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
          <Text textStyle={{
            fontSize: '14px',
            fontWeight: '400',
          }}>
            회원가입
          </Text>
        </S.FindSection>
      </S.FindUser>
    </S.Wrap>
  );
};




export default LogInTemplate;
