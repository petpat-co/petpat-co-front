import React, { ReactElement } from 'react';
import styled from 'styled-components';
// util
import { useAppDispatch } from 'src/core/store';
import { passwordCheck } from 'src/components/shared/RegEx';
import { changePwApi } from 'src/core/redux/user/myPage';
// element
import { Input, Text } from 'src/components/shared/element';

const ChangePassword = (): ReactElement => {
  const appdispatch = useAppDispatch();
  const [pw, setPw] = React.useState<string>('');
  const [pwc, setPwc] = React.useState<string>('');

  const submit = () => {
    if(!passwordCheck) {
      window.alert('8~12자의 영문, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 사용 가능합니다.');
      return;
    } else if(pw == null || pw === '' || pwc == null || pwc === '') {
      window.alert('빈 칸을 모두 채워주세요.');
      return;
    } else if(!pw.match(pwc)) {
      window.alert('비밀번호가 일치하지 않습니다.');
    }
    const data = {
      newPassword: pw,
      newPasswordChk: pwc,
    }
    appdispatch(changePwApi(data));
  }

  return (
    <React.Fragment>
      <Container>
        <Text
          textStyle={{
            weight: 'bold',
            colors: 'primary',
            size: 'xlarge',
          }}
        >
          비밀번호 변경
        </Text>
        <InputWrap>
          <Text textStyle={{ margin: '16px 0', fontWeight: '700' }}>
            새 비밀번호
          </Text>
          <Input
            name="newPW"
            onChange={(e) => {
              setPw(e.target.value);
            }}
            placeholder="8~12자의 영문, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 사용 가능합니다."
            maxLength={40}
            borderRadius="5px"
          />
          <Grid />
          <Text textStyle={{ margin: '16px 0', fontWeight: '700' }}>
            비밀번호 확인
          </Text>
          <Input
            name="newPWC"
            onChange={(e) => {
              setPwc(e.target.value);
            }}
            placeholder="8~12자의 영문, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 사용 가능합니다."
            maxLength={40}
            borderRadius="5px"
          />
        </InputWrap>
        <ModifyBtn onClick={submit}>저장하기</ModifyBtn>
      </Container>
    </React.Fragment>
  );
};

export const Container = styled.div`
  position: relative;
  width: 640px;
  height: 506px;
  padding: 40px;
  border: 1px solid #000;
  border-radius: 30px;
`;

export const InputWrap = styled.div`
  margin: 60px 0;
  width: 100%;
  height: fit-content;
`;

export const Grid = styled.div`
  width: 100%;
  height: 32px;
`;

const ModifyBtn = styled.button`
  position: absolute;
  right: 40px;
  bottom: 40px;
  width: 110px;
  height: 42px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.xlg};
  font-weight: ${({ theme }) => theme.fontWeights.lbold};
`;

export default ChangePassword;
