import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/core/store";
// component
import ModifyUserProfile from "./ModifyUserProfile";
// style, elements
import { MyPageTemplateStyle as S } from "./MyPageTemplate.style";
import { Button, Text } from "../shared/element";





const MyPageTemplate = (): ReactElement => {

  const defaultProfile = useSelector((state: RootState) => state.user.user);
  const [tapName, setTapName] = React.useState('main');
  const tapList: { [key: string]: any } = {
    main: <></>,
    modify: <ModifyUserProfile />,
    rehoming: <></>,
    trade: <></>,
    qna: <></>,
    like: <></>,
  }


  return (
    <>
      <S.Wrap>

        {/* menu section */}
        <S.MenuSection>
          <S.ButtonAlign>
            <Button
              _onClick={() => { setTapName('main'); }}
              _disabled={false}
            >개인정보</Button>
            <Button
              _onClick={() => { setTapName('modify'); }}
              _disabled={false}
              fontSize="20px"
            >개인정보 수정</Button>
            <Button
              _onClick={() => { setTapName('rehoming'); }}
              _disabled={false}
            >내가 쓴 글</Button>
            <Button
              _onClick={() => { setTapName('rehoming'); }}
              _disabled={false}
              fontSize="20px"
            >분양글</Button>
            <Button
              _onClick={() => { setTapName('trade'); }}
              _disabled={false}
              fontSize="20px"
            >용품 거래</Button>
            <Button
              _onClick={() => { setTapName('qna'); }}
              _disabled={false}
              fontSize="20px"
            >QnA</Button>
            <Button
              _onClick={() => { setTapName('like'); }}
              _disabled={false}
            >관심글</Button>
          </S.ButtonAlign>
        </S.MenuSection>

        {/* selected tap section */}
        <S.MyPageSelectedMenuSection>
          
          <S.UserProfileSection>
            <S.UserInfoSection>
              <Text>nickname : {defaultProfile.userNickname}</Text>
              <Text>e-mail : {defaultProfile.userEmail}</Text>
              <Text>location : {defaultProfile.userLocation} </Text>
              <Text>pet : {defaultProfile.userPetName} ({defaultProfile.userPetBreed})</Text>
            </S.UserInfoSection>
            <S.UserProfileImg />
          </S.UserProfileSection>
          
          {tapList[tapName]}
        
        </S.MyPageSelectedMenuSection>
      </S.Wrap>
    </>
  );
};

export default MyPageTemplate;