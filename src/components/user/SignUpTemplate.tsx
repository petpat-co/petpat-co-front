import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/core/store';
import { SignUpTemplateStyle as S } from './SignUpTemplate.style';
// api
import { emailCheckApi, signUpApi } from 'src/core/redux/user/userSlice';
// utils
import { KAKAO_AUTH_URL } from 'src/core/OAuth';
import { emailCheck, nickNameCheck, passwordCheck } from '../shared/RegEx';
// elements
import { Text } from '../shared/element/Text';
import { Button, DisplayGrid, Input } from '../shared/element';
// icons
import { ReactComponent as Kakao } from 'src/asset/loginIcon/kakao.svg';
import { ReactComponent as Naver } from 'src/asset/loginIcon/naver.svg';
import { ReactComponent as Google } from 'src/asset/loginIcon/google.svg';
import { ReactComponent as Github } from 'src/asset/loginIcon/github.svg';
import { ReactComponent as Facebook } from 'src/asset/loginIcon/facebook.svg';
// modal icons
import { ReactComponent as SuccessIcon } from 'src/asset/modalicon/success.svg';
import { ReactComponent as FailIcon } from 'src/asset/modalicon/sadface.svg';
// component
import ModalContainer from '../common/modal/container/ModalContainer';

const SignUpTemplate = (): ReactElement => {
  const appdispatch = useAppDispatch();
  const emailCheckStatus = useSelector(
    (state: RootState) => state.user?.emailCheck,
  );

  // 긴 메시지 줄바꿈 필요
  const ALERT = {
    emailEmpty: {
      title: '이메일이 입력되지 않았습니다',
      content: '입력 후 다시 시도해주세요.',
    },
    nicknameEmpty: {
      title: '닉네임이 입력되지 않았습니다',
      content: '입력 후 다시 시도해주세요.',
    },
    pwEmpty: {
      title: '비밀번호가 입력되지 않았습니다',
      content: '입력 후 다시 시도해주세요.',
    },
    pwCheckEmpty: {
      title: '비밀번호를 한 번 더 입력해주세요',
      content: '입력 후 다시 시도해주세요.',
    },
    emailValidFail: {
      title: '이메일 형식이 올바르지 않습니다',
      content: '올바른 형식의 이메일을 입력한 뒤 다시 시도해주세요.',
    },
    nicknameValidFail: {
      title: '닉네임 형식이 올바르지 않습니다',
      content:
        '닉네임은 2자 이상 6자 이하의 한글, 영문만 사용 가능합니다. (자음, 모음, 특수문자 사용 불가)',
    },
    pwValidFail: {
      title: '비밀번호 형식이 올바르지 않습니다',
      content:
        '비밀번호는 8자 이상 12자 이하의 영문, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 사용 가능합니다.',
    },
    pwCheckValidFail: {
      title: '비밀번호가 일치하지 않습니다',
      content: '확인 후 다시 시도해주세요.',
    },
    emailDpCheckEmpty: {
      title: '이메일 중복확인이 되지 않았습니다',
      content: '중복확인 후 다시 시도해주세요.',
    },
    emailDpCheckSuccess: {
      title: '이메일 중복확인이 완료되었습니다',
      content: '사용 가능한 이메일 입니다.',
    },
    emailDpCheckFail: {
      title: '이미 사용중인 이메일 입니다',
      content: '다른 이메일을 사용해 주세요',
    },
  };

  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [userPasswordChk, setUserPasswordChk] = React.useState('');
  const [userNickname, setUserNickname] = React.useState('');

  // modal
  const [onModal, setOnModal] = React.useState({
    status: false,
    message: { title: '', content: '' },
  });
  const onClickClose = async () => {
    setOnModal({ status: false, message: { title: '', content: '' } });
  };

  // 이메일 중복 체크
  const emailDpCheck = async () => {
    if (!userEmail) {
      setOnModal({ status: true, message: ALERT.emailEmpty });
      return;
    } else if (!emailCheck(userEmail)) {
      setOnModal({ status: true, message: ALERT.emailValidFail });
      return;
    }

    const result = await appdispatch(emailCheckApi(userEmail));
    if (result.payload) {
      setOnModal({ status: true, message: ALERT.emailDpCheckSuccess });
    } else {
      setOnModal({ status: true, message: ALERT.emailDpCheckFail });
    }
  };

  const SignUp = () => {
    // empty check
    if (!userEmail) {
      setOnModal({ status: true, message: ALERT.emailEmpty });
      return;
    } else if (!userPassword) {
      setOnModal({ status: true, message: ALERT.pwEmpty });
      return;
    } else if (!userPasswordChk) {
      setOnModal({ status: true, message: ALERT.pwCheckEmpty });
      return;
    } else if (!userNickname) {
      setOnModal({ status: true, message: ALERT.nicknameEmpty });
      return;
    }

    // validation check
    if (!emailCheck(userEmail)) {
      setOnModal({ status: true, message: ALERT.emailValidFail });
      return;
    } else if (!passwordCheck(userPassword)) {
      setOnModal({ status: true, message: ALERT.pwValidFail });
      return;
    } else if (!nickNameCheck(userNickname)) {
      setOnModal({ status: true, message: ALERT.nicknameValidFail });
      return;
    } else if (userPassword !== userPasswordChk) {
      setOnModal({ status: true, message: ALERT.pwCheckValidFail });
      return;
    }

    if (!emailCheckStatus) {
      setOnModal({ status: true, message: ALERT.emailDpCheckEmpty });
    } 

    const userdata = {
      userEmail: userEmail,
      nickname: userNickname,
      password: userPassword,
      profileImgPath:
        'https://pbs.twimg.com/profile_images/1116573617645424640/u5h2q3jv_400x400.png',
    };

    appdispatch(signUpApi(userdata));
  };

  // 유효성 검사
  // 다른 유효성 검사와 함께 나중에 따로 분리 필요.
  const [nicknameMessage, setNicknameMessage] = React.useState('');
  const [emailMessage, setEmailMessage] = React.useState('');
  const [passwordMessage, setPasswordMessage] = React.useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = React.useState('');

  const handleChangeNickname = (nickname: string) => {
    if (nickNameCheck(nickname)) {
      setUserNickname(nickname);
      setNicknameMessage('');
    } else if (nickname === '') {
      setNicknameMessage('');
    } else {
      setNicknameMessage(ALERT.nicknameValidFail.content);
    }
  };
  const handleChangeEmail = (email: string) => {
    if (emailCheck(email)) {
      setUserEmail(email);
      setEmailMessage('');
    } else {
      setUserEmail(email);
      setEmailMessage(ALERT.emailValidFail.title);
    }
  };
  const handleChangePassword = (password: string) => {
    if (passwordCheck(password)) {
      setUserPassword(password);
      setPasswordMessage('');
      return;
    } else if (password === '') {
      setPasswordMessage('');
      return;
    } else {
      setPasswordMessage(ALERT.pwValidFail.content);
      return;
    }
  };
  const handleChangePasswordCheck = (password: string) => {
    if (userPassword && userPassword === password) {
      setUserPasswordChk(password);
      setPasswordCheckMessage('');
      return;
    } else if (password === '') {
      setPasswordCheckMessage('');
      return;
    } else {
      setPasswordCheckMessage(ALERT.pwCheckValidFail.title);
    }
  };


  return (
    <S.Container>
      {onModal.status && (
        <ModalContainer
          zIndex={1000}
          id="fail"
          onClickClose={onClickClose}
          title={onModal.message.title}
          image={true}
        >
          <SuccessIcon />
          <p>{onModal.message.content}</p>
          <Button modal width="80px" margin="32px 0 0 0" _onClick={() => {onClickClose()}}>
            확인
          </Button>
        </ModalContainer>
      )}
      <S.Wrap>
        <Text
          textStyle={{
            margin: '40px 0',
            fontSize: '40px',
            fontWeight: '700',
          }}
        >
          펫팻에 오신 것을 환영합니다!
        </Text>

        {/* sns sign-up */}
        <Text
          textStyle={{
            margin: '18px 0',
            fontSize: '16px',
          }}
        >
          SNS로 간편한 회원가입
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

        <DisplayGrid margin="62px 0" height="2px" bg="#F35F4C" />

        {/* sign-up form */}

        <S.InputGrid>
          <S.InputWrap>
            <S.Text>2 ~ 6자의 한글/영문, 특수문자 입력 불가</S.Text>
            <Input
              name="nickname"
              placeholder="nickname"
              maxLength={24}
              borderRadius="5px"
              onChange={(e) => {
                handleChangeNickname(e.target.value);
              }}
            />
          </S.InputWrap>

          {/* warning message - nickname */}
          <Text
            textStyle={{
              colors: 'error',
              size: 'small',
              weight: 'light',
            }}
          >
            {nicknameMessage}
          </Text>

          <S.InputFlexWrap>
            <Input
              name="email"
              placeholder="e-mail"
              maxLength={40}
              borderRadius="5px"
              onChange={(e) => {
                handleChangeEmail(e.target.value);
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
            >
              중복 확인
            </Button>
          </S.InputFlexWrap>

          {/* warning message - email */}
          <Text
            textStyle={{
              colors: 'error',
              size: 'small',
              weight: 'light',
            }}
          >
            {emailMessage}
          </Text>

          <S.InputWrap>
            <S.Text>
              8 ~ 12자, 영문자 숫자, 특수문자(‘!, @, #, $, %, ^, &, *’) 사용
              가능
            </S.Text>
            <Input
              name="password"
              type="password"
              placeholder="password"
              maxLength={24}
              borderRadius="5px"
              onChange={(e) => {
                handleChangePassword(e.target.value);
              }}
            />
          </S.InputWrap>

          {/* warning message - password */}
          <Text
            textStyle={{
              colors: 'error',
              size: 'small',
              weight: 'light',
            }}
          >
            {passwordMessage}
          </Text>

          <S.InputWrap>
            <Input
              name="passwordcheck"
              type="password"
              placeholder="password check"
              maxLength={24}
              borderRadius="5px"
              onChange={(e) => {
                handleChangePasswordCheck(e.target.value);
              }}
            />
          </S.InputWrap>

          {/* warning message - password check */}
          <Text
            textStyle={{
              colors: 'error',
              size: 'small',
              weight: 'light',
            }}
          >
            {passwordCheckMessage}
          </Text>

          <Button
            margin="16px 0"
            radius="5px"
            size="regular"
            bgcolor="primary"
            colors="white"
            _onClick={SignUp}
            _disabled={false}
          >
            가입하기
          </Button>
        </S.InputGrid>
      </S.Wrap>
    </S.Container>
  );
};

export default SignUpTemplate;
