import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { RootState } from 'src/core/store';
import { useSelector } from 'react-redux';
//utils
import { nickNameCheck, passwordCheck } from '../../shared/RegEx';
// elements
import { Button, Input, Text } from '../../shared/element';
import theme from 'src/styles/theme';
import { ReactComponent as Camera } from '../../../asset/icon/camera.svg';

interface PropsType {
  img?: string;
}

const ModifyUserProfile = (): ReactElement => {
  // user profile data
  const defaultProfile = useSelector((state: RootState) => state.user.user);

  const [userNickname, setUserNickname] = React.useState(
    defaultProfile.userNickname,
  );
  const [userPassword, setUserPassword] = React.useState('');
  const [userPetBreed, setUserPetBreed] = React.useState(
    defaultProfile.userPetBreed,
  );
  const [userPetName, setUserPetName] = React.useState(
    defaultProfile.userPetName,
  );
  const [userLocation, setUserLocation] = React.useState(
    defaultProfile.userLocation,
  );
  const [userImage, setUserImage] = React.useState(defaultProfile.userImg);

  // data fetching
  const uploadImg = () => {};
  const modifyProfile = () => {
    if (
      !userNickname ||
      !userPassword ||
      !userPetBreed ||
      !userPetName ||
      !userLocation
    ) {
      window.alert('빈칸!!!!!!!!!!!!!!!!!!');
      return;
    } else if (!nickNameCheck(userNickname)) {
      console.log('닉네임이 이상해용');
      return;
    } else if (!passwordCheck(userPassword)) {
      console.log('비밀번호가 이상해용');
      return;
    }

    const data = {
      username: userNickname,
      email: defaultProfile.userEmail,
      profileImgFile: defaultProfile.userImg,
    };

    console.log('ModifyUserProfile', data);
    console.log('ModifyUserProfile - defaultProfile', defaultProfile);
    // dispatch
  };

  return (
    <Wrap>

      <Text textStyle={{
        weight: 'bold',
        colors: 'primary',
        size: 'xlarge',
        }}>
        프로필 수정
      </Text>
      {/* image upload */}

      <UserImg img={userImage}>
        <ImgUploadBtn onClick={uploadImg}>
          <Camera />
        </ImgUploadBtn>
      </UserImg>

      {/* modify profile input section */}

      <Text
        textStyle={{
          fontWeight: '700',
        }}
      >
        닉네임
      </Text>
      <Input
        defaultValue={defaultProfile.userNickname}
        placeholder="2~6자의 한글/영문, 특수문자 입력 불가"
        onChange={(e) => {
          setUserNickname(e.target.value);
        }}
        maxLength={8}
        name="nickname"
        margin="16px 0"
        borderRadius="5px"
      />

      {/* modify button */}
      <ModifyBtn
        onClick={modifyProfile}
      >
        저장하기
      </ModifyBtn>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 40px;
  width: 640px;
  height: 640px;
`;

const UserImg = styled.div<PropsType>`
  position: relative;

  margin: 64px auto;
  width: 160px;
  height: 160px;

  border-radius: 50%;

  border: ${({ theme }) => `3px solid ${theme.colors.primary}`};

  background-color: #a0a0a0;
  background-image: ${({ img }) => (img ? `url(${img})` : '')};
  background-size: contain;
`;

const ImgUploadBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const ModifyBtn = styled.button`
  margin: 70px 0;
  float: right;
  width: 110px;
  height: 42px;
  border-radius: 30px;
  background-color: ${({theme}) => theme.colors.primary};
  color: #fff;
  font-size: ${({theme}) => theme.fontSizes.xlg};
  font-weight: ${({theme}) => theme.fontWeights.lbold};
`

export default ModifyUserProfile;
