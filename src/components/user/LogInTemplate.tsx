import React, { ReactElement } from 'react';
import { useAppDispatch } from 'src/core/store';
import { useNavigate } from 'react-router-dom';
import { LogInTemplateStyle as S } from './LogInTemplate.style';

//api
import { getProfileApi, logInApi } from 'src/core/redux/user/userSlice';

//utils
import { KAKAO_AUTH_URL } from 'src/core/OAuth';
import { emailCheck, passwordCheck } from '../shared/RegEx';

// component
import ModalContainer from '../common/modal/container/ModalContainer';
// elements
import { Text } from '../shared/element/Text';
import { Button, Input } from '../shared/element';

//icons
import { ReactComponent as Kakao } from 'src/asset/loginIcon/kakao.svg';
import { ReactComponent as Naver } from 'src/asset/loginIcon/naver.svg';
import { ReactComponent as Google } from 'src/asset/loginIcon/google.svg';
import { ReactComponent as Github } from 'src/asset/loginIcon/github.svg';
import { ReactComponent as Facebook } from 'src/asset/loginIcon/facebook.svg';
import { ReactComponent as FailIcon } from 'src/asset/modalicon/sadface.svg';

const LogInTemplate = (): ReactElement => {
  const appdispatch = useAppDispatch();
  const navigate = useNavigate();



  const ALERT = {
    loginFail: {
      title: '로그인에 실패했습니다.',
      content: '이메일 또는 비밀번호가 잘못되었습니다. 다시 시도해주세요.',
    },
    fieldEmpty: {
      title: '아이디 또는 비밀번호가 입력되지 않았습니다',
      content: '입력 후 다시 시도해주세요.',
    },
  };

  // modal
  const [onModal, setOnModal] = React.useState({
    status: false,
    message: { title: '', content: '' },
  });
  const onClickClose = async () => {
    setOnModal({ status: false, message: { title: '', content: '' } });
  };

  //user data
  const [userEmail, setUserEmail] = React.useState('rr@rr.com');
  const [userPassword, setUserPassword] = React.useState('qqq!1234');

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
    //data validation
    if (!userEmail || !userPassword) {
      setOnModal({ status: true, message: ALERT.fieldEmpty });
      return;
    } 
    //fetching data
    const userdata = {
      userEmail: userEmail,
      userPassword: userPassword,
      checked: rememberChecked,
    };
    //dispatching data
    appdispatch(logInApi(userdata)).then((res) => {
      // 로그인 성공 시
      if (res.payload) {
        // 사용자 정보 저장 및 메인 화면으로 이동
        appdispatch(getProfileApi(''));
        window.location.replace('/');
      } else {
        setOnModal({ status: true, message: ALERT.loginFail });
      }
    });
  };

  const goToSignUp = () => {
    navigate('/signup');
  };
  const goToFindPassword = () => {
    navigate('/user/fpw');
  };

  return (
    <S.Wrap>
      {onModal.status && (
        <ModalContainer
          zIndex={1000}
          id="fail"
          onClickClose={onClickClose}
          title={onModal.message.title}
          image={true}
        >
          <FailIcon/>
          <p>{onModal.message.content}</p>
          <Button modal width="80px" margin="32px 0 0 0" _onClick={() => {onClickClose()}}>
            확인
          </Button>
        </ModalContainer>
      )}



      {/* 로그인 헤더 */}
      <S.GreetingWrap>
        <Text
          textStyle={{
            color: '#6B7280',
          }}
        >
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
          }}
        >
          아이디
        </Text>
        <Input
          defaultValue={userEmail}
          name="email"
          placeholder="Email"
          maxLength={50}
          borderRadius="5px"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
      </S.InputWrap>

      <S.InputWrap>
        <Text
          textStyle={{
            margin: '12px 0',
          }}
        >
          비밀번호
        </Text>
        <Input
          defaultValue={userPassword}
          name="password"
          type="password"
          placeholder="Password"
          maxLength={50}
          borderRadius="5px"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
      </S.InputWrap>

      {/* 로그인 정보 기억 및 로그인 완료 버튼 */}
      <S.CheckRememberMe>
        <input
          type="checkbox"
          checked={rememberChecked}
          onChange={rememberMe}
        />
        <Text
          textStyle={{
            margin: '0 12px',
            size: 'small',
          }}
        >
          로그인 상태 유지하기
        </Text>
      </S.CheckRememberMe>

      <Button
        _onClick={logIn}
        _disabled={false}
        activeBg="#F35F4C"
        activeColor="#fff"
        radius="5px"
      >
        로그인
      </Button>

      {/* 소셜 로그인 */}
      <S.Section>
        <Text
          textStyle={{
            margin: '60px 0 0 0',
            size: 'regular',
            fontWeight: '700',
          }}
        >
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
          width="fit-content"
          height="fit-content"
          size="small"
          weight="light"
        >
          비밀번호 찾기
        </Button>

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

        <Text
          textStyle={{
            width: 'fit-content',
            margin: '0 14px',
            size: 'small',
          }}
        >
          |
        </Text>
        <Button
          _onClick={goToSignUp}
          _disabled={false}
          width="fit-content"
          height="fit-content"
          size="small"
          weight="light"
        >
          회원가입
        </Button>
      </S.FindUserGrid>
    </S.Wrap>
  );
};

export default LogInTemplate;
