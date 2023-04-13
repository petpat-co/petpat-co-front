import React, { ReactElement } from "react";
import styled from "styled-components";
import { RootState } from "src/core/store";
import { useSelector } from "react-redux";
//utils
import { nickNameCheck, passwordCheck } from "../shared/RegEx";
// elements
import { Button, Input, Text } from "../shared/element";


const ModifyUserProfile = (): ReactElement => {

  // user profile data
  const defaultProfile = useSelector((state: RootState) => state.user.user);

  const [userNickname, setUserNickname] = React.useState(defaultProfile.userNickname);
  const [userPassword, setUserPassword] = React.useState('');
  const [userPetBreed, setUserPetBreed] = React.useState(defaultProfile.userPetBreed);
  const [userPetName, setUserPetName] = React.useState(defaultProfile.userPetName);
  const [userLocation, setUserLocation] = React.useState(defaultProfile.userLocation);

  // data fetching
  const uploadImg = () => {
  }
  const modifyProfile = () => {
    if (!userNickname || !userPassword || !userPetBreed || !userPetName || !userLocation) {
      window.alert("빈칸!!!!!!!!!!!!!!!!!!");
      return;
    } else if (!nickNameCheck(userNickname)) {
      console.log("닉네임이 이상해용");
      return;
    } else if (!passwordCheck(userPassword)) {
      console.log("비밀번호가 이상해용");
      return;
    }

    const data = {
      userNickname: userNickname,
      userPassword: userPassword,
      userPetBreed: userPetBreed,
      userPetName: userPetName,
      userLocation: userLocation,
    }

    console.log('ModifyUserProfile', data);
    console.log('ModifyUserProfile - defaultProfile', defaultProfile);
    // dispatch
  }


  return (
    <Wrap>
      <Text
        textStyle={{
          fontSize: "20px",
          fontWeight: "500",
        }}
      >modify userinfo</Text>

      {/* image upload */}

      <UserImg />
      <Button
        _onClick={uploadImg}
        bgcolor='primary'
        colors='white'
        size='regular'
        width='100px'
        height='30px'
      >upload</Button>


      {/* modify profile input section */}

      <Text>nickname</Text>
      <Input
        defaultValue={defaultProfile.userNickname}
        placeholder="nickname"
        onChange={(e) => {
          setUserNickname(e.target.value);
        }}
        maxLength={8}
        name="nickname" />

      <Text>password</Text>
      <form>
        <Input
          type="password"
          autoComplete={false}
          placeholder="password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
          maxLength={40}
          name="password" />
      </form>

      <Text>pet Breed</Text>
      <Input
        defaultValue={defaultProfile.userPetBreed}
        placeholder="userpet"
        onChange={(e) => {
          setUserPetBreed(e.target.value)
        }}
        maxLength={40}
        name="pet" />

      <Text>pet Name</Text>
      <Input
        defaultValue={defaultProfile.userPetName}
        placeholder="petname"
        maxLength={40}
        name="petname"
        onChange={(e) => {
          setUserPetName(e.target.value)
        }} />

      <Text>location</Text>
      <Input
        defaultValue={defaultProfile.userLocation}
        placeholder="location"
        maxLength={40}
        name="location"
        onChange={(e) => {
          setUserLocation(e.target.value)
        }} />


      {/* modify button */}
      <Button
        _onClick={modifyProfile}
        _disabled={false}
        bgcolor='primary'
        colors='white'
        size='regular'
        margin='20px 0'
      >modify</Button>

    </Wrap>
  );
};


const Wrap = styled.div`
	width: 400px;
    height: auto;
`


const UserImg = styled.div`
	width: 100px;
    height: 100px;
    background-color: #a0a0a0;
`

export default ModifyUserProfile;
