import React, { ReactElement } from "react";
import { Button, Text } from "../shared/element";

const SignOut = (): ReactElement => {


  const onClickSignOut = () => {

  };

  return (
    <React.Fragment>
      <Text>sign-out tap</Text>
      <Text textStyle={{
        weight: 'bold',
      }}>
        회원 탈퇴 시 작성하셨던 게시물, 정보는 삭제되지 않습니다.
      </Text>
      <Button
      _onClick={ onClickSignOut }
      >
        sign-out
      </Button>
    </React.Fragment>
  );
};

export default SignOut;

