import React, { ReactElement } from "react";
import { Button, Text } from "../shared/element";

const DeleteAccount = (): ReactElement => {


  const onClickDeleteAccount = () => {

  };

  return (
    <React.Fragment>
      <Text>delete account tap</Text>
      <Text textStyle={{
        weight: 'bold',
      }}>
        회원 탈퇴 시 작성하셨던 게시물, 정보는 삭제되지 않습니다.
      </Text>
      <Button
      _onClick={ onClickDeleteAccount }
      >
        탈퇴하기
      </Button>
    </React.Fragment>
  );
};

export default DeleteAccount;

