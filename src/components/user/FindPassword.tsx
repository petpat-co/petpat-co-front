import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Button, Input, Text } from '../shared/element';
import { emailCheck } from '../shared/RegEx';

const FindPassword = (): ReactElement => {
  const [userEmail, setUserEmail] = React.useState('');
  const onClickFindPW = () => {
    if (emailCheck(userEmail)) {
      console.log(userEmail);
    } else if (!userEmail) {
      console.log('blank');
    } else {
      console.log('none validated email');
    }
  };
  const handleChangeEmail = (email: string) => {
    setUserEmail(email);
  };
  return (
    <React.Fragment>
      <Wrap>
        <Text
          textStyle={{
            size: 'large',
          }}
        >
          find password
        </Text>
        <InputSection>
          <Input
            placeholder="email"
            maxLength={40}
            name="email"
            borderRadius="5px"
            onChange={(e) => {
              handleChangeEmail(e.target.value);
            }}
          />
        </InputSection>
        <Button
          colors="white"
          bgcolor="primary"
          radius="5px"
          _onClick={onClickFindPW}
        >
          find password
        </Button>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  margin: 200px auto;
  width: 400px;
`;

const InputSection = styled.div`
  margin: 20px 0;
`;

export default FindPassword;
