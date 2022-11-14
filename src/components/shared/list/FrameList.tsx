import React from 'react';
import * as S from './FrameList.style';
import { ReactComponent as View } from '../../../asset/viewIcon.svg';
import { ReactComponent as Comment } from '../../../asset/commentIcon.svg';

type listType = {
  img: null | string;
  title: string;
  status: string;
  nickname: string;
  view: string;
  comment: string;
};
interface FrameListPropsType {
  list: Array<listType>;
}
const FrameList = (props: FrameListPropsType) => {
  const { list } = props;
  // props로 data list 받아서 화면에 뿌려줌
  return (
    <S.ContentWrap>
      {list.map((el, idx) => {
        return (
          <S.ListWrap key={idx}>
            <S.ImageWrap
              src="https://news.nateimg.co.kr/orgImg/hn/2019/01/21/00501111_20190121.JPG"
              alt="이미지"
            />
            <S.ContentsWrap>
              <S.StatusBox>{el.status}</S.StatusBox>
              <S.TitleBox>{el.title}</S.TitleBox>
              <S.InfoBox>
                <S.NicknameBox>{el.nickname}</S.NicknameBox>
                <S.IconBox>
                  <View />
                  <S.grayText>{el.view}</S.grayText>
                  <Comment />
                  <S.grayText>{el.comment}</S.grayText>
                </S.IconBox>
              </S.InfoBox>
            </S.ContentsWrap>
          </S.ListWrap>
        );
      })}
    </S.ContentWrap>
  );
};

export default FrameList;
