import React, { ReactElement, useEffect } from 'react';
import { Button, Text } from '../shared/element';
import { useAppDispatch } from 'src/core/store';
import { kakaoLogInApi } from 'src/core/redux/user/userSlice';

const Kakao = (): ReactElement => {
  const appdispatch = useAppDispatch();
  const code: string | null = new URL(window.location.href).searchParams.get(
    'code',
  );

  useEffect(() => {
    // console.log(code);
    if (code) {
      appdispatch(kakaoLogInApi(code));
      return;
    }
  }, []);

  return (
    <React.Fragment>
      <div style={{width: '500px', margin: '150px auto'}}>
        <Text
          textStyle={{
            size: 'title',
          }}
        >
          {'카카오로그인진행중^^)/'}
        </Text>
        <Text>CODE : {code}</Text>
      </div>
    </React.Fragment>
  );
};

export default Kakao;
