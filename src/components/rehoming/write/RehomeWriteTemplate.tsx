import { useState } from 'react';
import * as S from './RehomeWriteTemplate.style';
import { ImageUpload } from '../../shared/input/ImageUpload';
import WritingTemplate from '../../shared/layout/WritingTemplate';

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
          <S.ImageWrap>
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
        </S.ImageInputWrap>
      </S.Wrap>
    </>
  );
};

export default RehomeWriteTemplate;
