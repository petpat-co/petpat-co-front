import React, { ReactElement } from 'react'
import { useAppDispatch } from 'src/core/store';
import { useNavigate } from 'react-router-dom';
import { LogInTemplateStyle as S } from './LogInTemplate.style';

//api
import { logInApi } from 'src/core/redux/user/userSlice';

//utills
import { KAKAO_AUTH_URL } from 'src/core/OAuth';
import { emailCheck, passwordCheck } from '../shared/RegEx';

// elements
import { Text } from '../shared/element/Text';
import { Button, Input } from '../shared/element';

//icons
import { ReactComponent as Kakao } from 'src/asset/loginIcon/kakao.svg';
import { ReactComponent as Naver } from 'src/asset/loginIcon/naver.svg';
import { ReactComponent as Google } from 'src/asset/loginIcon/google.svg';
import { ReactComponent as Github } from 'src/asset/loginIcon/github.svg';
import { ReactComponent as Facebook } from 'src/asset/loginIcon/facebook.svg';


const LogInTemplate = (): ReactElement => {
  const appdispatch = useAppDispatch();
  const navigate = useNavigate();

  //user data
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  // remember email
  const [rememberChecked, setRememberChecked] = React.useState(false);
  const rememberMe = () => {
    if (!rememberChecked) {
      setRememberChecked(true);
      return;
    } else {
      setRememberChecked(false);
      return;
    }
  };


  //login
  const logIn = () => {
    console.log(rememberChecked)
    //data validation
    if (!userEmail || !userPassword) {
      console.log('빈 칸을 모두 채워주세요.');
      return;
    } else if (!emailCheck(userEmail)) {
      console.log('이메일 주소를 확인해주세요.');
      return;
    } else if (!passwordCheck(userPassword)) {
      console.log('비밀번호를 확인해주세요.');
      return;
    };
    //fetching data
    const userdata = {
      userEmail: userEmail,
      userPassword: userPassword,
      checked: rememberChecked
    };
    //dispatching data
    appdispatch(logInApi(userdata));
  };



  const goToSignUp = () => {
    navigate('/signup');
  };
  const goToFindPassword = () => {
    navigate('/user/fpw');
  };



  return (
    <S.Wrap>

      {/* 로그인 헤더 */}
      <S.GreetingWrap>
        <Text
          textStyle={{
            color: '#6B7280',
          }}>
          펫팻에 어서오세요!
        </Text>
        <Text
          textStyle={{
            margin: '-4px 0 0 0',
            size: 'title',
            weight: 'bold',
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
          name='email'
          placeholder=''
          maxLength={50}
          borderRadius='5px'
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
      </S.InputWrap>

      <S.InputWrap>
        <Text
          textStyle={{
            margin: '12px 0',
          }}>
          비밀번호
        </Text>
        <Input
          name='password'
          type='password'
          placeholder=''
          maxLength={50}
          borderRadius='5px'
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
      </S.InputWrap>

      {/* 로그인 정보 기억 및 로그인 완료 버튼 */}
      <S.CheckRememberMe>
        <input type='checkbox' checked={rememberChecked} onChange={rememberMe} />
        <Text textStyle={{
          margin: '0 12px',
          size: 'small',
        }}>
          로그인 상태 유지하기
        </Text>
      </S.CheckRememberMe>

      <Button
        _onClick={logIn}
        _disabled={false}
        activeBg='#F35F4C'
        activeColor='#fff'
        radius='5px'
      >로그인
      </Button>

      {/* 소셜 로그인 */}
      <S.Section>
        <Text textStyle={{
          margin: '60px 0 0 0',
          size: 'regular',
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
      <S.FindUserGrid>
        <Button
          _onClick={goToFindPassword}
          _disabled={false}
          width='fit-content'
          height='fit-content'
          size='small'
          weight='light'
        >비밀번호 찾기</Button>

        {/* <Text textStyle={{
          width: 'fit-content',
          margin: '0 14px',
        }}>|</Text>
        <Button
          _onClick={goToSignUp}
          _disabled={false}
          width='fit-content'
          height='fit-content'
          fontSize='14px'
          fontWeight='400'
        >아이디 찾기</Button> */}

        <Text textStyle={{
          width: 'fit-content',
          margin: '0 14px',
          size: 'small'
        }}>|</Text>
        <Button
          _onClick={goToSignUp}
          _disabled={false}
          width='fit-content'
          height='fit-content'
          size='small'
          weight='light'
        >회원가입</Button>
      </S.FindUserGrid>
    </S.Wrap>
  );
};




export default LogInTemplate;
