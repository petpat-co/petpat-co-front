import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { RootState, useAppDispatch } from 'src/core/store';
import { useSelector } from 'react-redux';
//utils
import { nickNameCheck} from '../../shared/RegEx';
// elements
import { Input, Text } from '../../shared/element';
import { ReactComponent as Camera } from '../../../asset/icon/camera.svg';
import { modifyProfileApi } from 'src/core/redux/user/myPage';

interface PropsType {
  img?: string;
}

const ModifyUserProfile = (): ReactElement => {
  const appdispatch = useAppDispatch();

  // user profile data
  const defaultProfile = useSelector((state: RootState) => state.user.user);
  const [username, setUsername] = React.useState<string | undefined>(
    defaultProfile.userNickname,
  );
  const useremail = 'qq@qq.com';
  const [imgUrl, setImgUrl] = React.useState<string>('');
  const [image, setImage] = React.useState<File | null>(null);
  const fileRef: any = React.useRef<HTMLInputElement | null>(null);

  // file/preview state
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      const imgurl = URL.createObjectURL(e.target.files[0]);
      setImgUrl(imgurl);
    }
  };

  // 이미지 변경 취소할 경우
  // const removeImage = () => {
  //   URL.revokeObjectURL(imgPreview);
  //   setImgPreview("");
  //   setImg(null);
  // }

  // dispatch
  const submit = () => {
    if (!username) {
      window.alert('닉네임이 비어있음');
      return;
    } else if (!nickNameCheck(username)) {
      console.log('닉네임이 이상해용');
      return;
    }
    // console.log(username);
    const formdata = new FormData();
    if(useremail && imgUrl){
    // if(useremail && imgUrl){
      formdata.append('username', username);
      formdata.append('email', useremail);
      formdata.append('profileImgFile', image?image:"");
      // 원래 프로필 url
      formdata.append('profileImgUrl', '');
      console.log('ddd');
      appdispatch(modifyProfileApi(formdata));
    }
  };

  return (
    <Wrap>
      <Text
        textStyle={{
          weight: 'bold',
          colors: 'primary',
          size: 'xlarge',
        }}
      >
        프로필 수정
      </Text>
      {/* image upload */}

      <UserImg img={imgUrl === ''? defaultProfile.userImg : imgUrl}>
        <ImgUploadBtn
          onClick={() => {
            fileRef.current.click();
          }}
        >
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            ref={fileRef}
            onChange={onChange}
          />
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
          setUsername(e.target.value);
        }}
        maxLength={8}
        name="nickname"
        margin="16px 0"
        borderRadius="5px"
      />

      {/* modify button */}
      <ModifyBtn onClick={submit}>저장하기</ModifyBtn>
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
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.xlg};
  font-weight: ${({ theme }) => theme.fontWeights.lbold};
`;

export default ModifyUserProfile;
