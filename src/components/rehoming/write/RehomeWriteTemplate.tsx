import { useState } from 'react';
import * as S from './RehomeWriteTemplate.style';
import { ImageUpload } from '../../shared/input/ImageUpload';
import WritingTemplate from '../../shared/layout/WritingTemplate';
import Input from '../../shared/element/Input';

const RehomeWriteTemplate = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <WritingTemplate title="분양 글쓰기" isBorder={true} />
      <S.Wrap>
        <S.ImageInputWrap>
          <S.ImageTextBox>
            <S.ImageText>이미지</S.ImageText>
            <span>(0/00)</span>
          </S.ImageTextBox>
          <S.ImageNoticeBox>
            <S.ImageWrap>
              {/* 이미지 박스 */}
              <S.ImageInner>
                <ImageUpload
                  setFile={setFile}
                  imgFile={file}
                  height="282px"
                  borderRadius="0"
                />
              </S.ImageInner>
              <S.ImageInner>
                <ImageUpload
                  setFile={setFile}
                  imgFile={file}
                  height="282px"
                  borderRadius="0"
                />
              </S.ImageInner>
              <S.ImageInner>
                <ImageUpload
                  setFile={setFile}
                  imgFile={file}
                  height="282px"
                  borderRadius="0"
                />
              </S.ImageInner>
            </S.ImageWrap>
            {/*  경고 메세지 박스 */}
            <S.NoticeBox>
              *이미지올릴때 경고문이 길게 있을것같아요 1:! 로 올리면 안잘리고
              아니면 잘리고
              <br />
              -몇MB 이상 올리면 용량이 초과 된다던가 <br />
              -이상한 사진을 올린다하면 님 강퇴같은 문구
            </S.NoticeBox>
          </S.ImageNoticeBox>
        </S.ImageInputWrap>
        <S.TitleInputWrap>
          <h2>제목</h2>
          <S.InputLengthBox>
            <S.InputWrap>
              <Input
                onChange={() => {}}
                placeholder="상품 제목을 입력하세요."
                defaultValue=""
                maxLength={20}
              />
            </S.InputWrap>
            <S.LengthWrap>0/20</S.LengthWrap>
          </S.InputLengthBox>
        </S.TitleInputWrap>
      </S.Wrap>
    </>
  );
};

export default RehomeWriteTemplate;
