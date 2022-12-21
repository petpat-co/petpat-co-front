import { ChangeEvent, useCallback, useState } from 'react';
import useRehomingForm from '../../../hooks/useRehomingForm';
import { TextArea } from '../../shared/element';
import Button from '../../shared/element/Button';
import Input from '../../shared/element/Input';
import { ImageUpload } from '../../shared/input/ImageUpload';
import WritingTemplate from '../../shared/layout/WritingTemplate';
import * as S from './ReHomeWriteTemplate.style';

const RehomeWriteTemplate = () => {
  const [file, setFile] = useState<File | null>(null);
  const { form, setForm } = useRehomingForm();

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((s) => ({ ...s, [name]: value }));
    },
    [form],
  );
  const onChangeTextArea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((s) => ({ ...s, [name]: value }));
    },
    [form],
  );
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
        {/* 제목 */}
        <S.TitleInputWrap>
          <S.H2>제목</S.H2>
          <S.InputLengthBox>
            <S.InputWrap>
              <Input
                onChange={onChangeInput}
                placeholder="상품 제목을 입력하세요."
                defaultValue=""
                name="title"
                maxLength={20}
              />
            </S.InputWrap>
            <S.LengthWrap>{form.title.length}/20</S.LengthWrap>
          </S.InputLengthBox>
        </S.TitleInputWrap>
        {/* 카테고리 */}
        <S.GrayWrap>
          <S.H2>카테고리</S.H2>
          <S.GrayBox></S.GrayBox>
        </S.GrayWrap>
        <S.GrayWrap>
          <S.H2>상세설명</S.H2>
          <S.GrayBox></S.GrayBox>
        </S.GrayWrap>
        {/* 거래지역 */}
        <S.GrayWrap>
          <S.H2>거래지역</S.H2>
          <S.InputButtonWrap>
            <div>
              <Button
                width="auto"
                isArrowIcon={false}
                height="46px"
                border="1px solid #000"
                _onClick={() => {}}
                _disabled={false}
                activeBg="#fff"
                padding="0 10px"
                activeColor="#000"
                radius="8px"
              >
                주소검색
              </Button>
              <Button
                width="auto"
                isArrowIcon={false}
                height="46px"
                border="1px solid #000"
                _onClick={() => {}}
                _disabled={false}
                activeBg="#fff"
                padding="0 10px"
                activeColor="#000"
                radius="8px"
              >
                기본주소지
              </Button>
            </div>
            <Input
              onChange={() => {}}
              placeholder="지역을 설정해주세요."
              defaultValue=""
              name="rehomingPrice"
              maxLength={100}
            />
          </S.InputButtonWrap>
        </S.GrayWrap>
        {/* 책임비 */}
        <S.GrayWrap>
          <S.H2>책임비</S.H2>
          <S.InputBox>
            <Input
              width="355px"
              onChange={() => {}}
              placeholder="숫자만 입력해주세요."
              defaultValue=""
              name="price"
              maxLength={100}
            />
            <span>원</span>
          </S.InputBox>
        </S.GrayWrap>
        {/* 설명 */}
        <S.GrayWrap>
          <S.H2>설명</S.H2>
          <S.TextAreaBox>
            <TextArea
              name="description"
              placeholder="설명을 입력해주세요."
              onChange={onChangeTextArea}
              maxLength={2000}
              height="200px"
            />
            <S.LengthWrap>{form.description.length}/2000</S.LengthWrap>
          </S.TextAreaBox>
        </S.GrayWrap>
        {/* 연관태그 */}
        <S.GrayWrap isNoBorder={true}>
          <S.H2>연관태그</S.H2>
          <S.InputBox>
            <Input
              onChange={() => {}}
              placeholder="연관 태그를 입력해주세요."
              defaultValue=""
              name="tag"
              maxLength={100}
            />
          </S.InputBox>
        </S.GrayWrap>
      </S.Wrap>
      <S.ButtonWrap>
        <S.ButtonInner>
          <Button
            width="auto"
            isArrowIcon={false}
            height="66px"
            _onClick={() => {}}
            _disabled={false}
            activeBg="#0B0B0B"
            padding="0 20px"
            activeColor="#fff"
            radius="14px"
          >
            <span>등록하기</span>
          </Button>
        </S.ButtonInner>
      </S.ButtonWrap>
    </>
  );
};

export default RehomeWriteTemplate;
