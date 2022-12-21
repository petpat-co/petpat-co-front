import { ChangeEvent, useCallback, useState } from 'react';
import { Button, DisplayGrid, Input, TextArea } from '../../shared/element';
import * as S from './QnaWrite.styled';

const initQna = {
  title: '',
  content: '',
  tag: [],
};
const QnaWriteTemplate = () => {
  const [qnaForm, setQnaForm] = useState(initQna);
  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setQnaForm((s) => ({ ...s, [name]: value }));
    },
    [qnaForm],
  );
  const onChangeTextArea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setQnaForm((s) => ({ ...s, [name]: value }));
    },
    [qnaForm],
  );
  return (
    <S.Wrap>
      {/* 주의사항 박스 */}
      <DisplayGrid
        height="252px"
        padding="40px 48px"
        bg="#d9d9d9"
        borderRadius="8px"
        flexDirection="column"
        justify="flex-start"
        align="flex-start"
      ></DisplayGrid>
      {/* input textArea tag박스 */}
      <DisplayGrid
        height="750px"
        padding="64px 0 0"
        flexDirection="column"
        align="flex-start"
        position="relative"
      >
        <DisplayGrid position="relative" height="50px">
          <Input
            onChange={onChangeInput}
            placeholder="제목을 입력하세요."
            defaultValue=""
            name="title"
            maxLength={20}
            isBorderBottom={true}
            border="none"
            height="50px"
          />
          <S.LengthText>{qnaForm.title.length}/20</S.LengthText>
        </DisplayGrid>
        <TextArea
          name="content"
          placeholder="설명을 입력해주세요."
          onChange={onChangeTextArea}
          maxLength={2000}
          height="389px"
        />
        <DisplayGrid height="205px" flexDirection="column">
          <Input
            onChange={onChangeInput}
            placeholder="태그를 입력하세요"
            defaultValue=""
            name="tag"
            maxLength={200}
            height="50px"
          />
        </DisplayGrid>
      </DisplayGrid>
      {/* 버튼 */}
      <S.ButtonWrap>
        <Button
          width="auto"
          isArrowIcon={false}
          height="66px"
          _onClick={() => {}}
          _disabled={false}
          activeBg="#929292"
          padding="0 20px"
          activeColor="#fff"
          radius="14px"
          margin="0 20px 0 0"
        >
          취소하기
        </Button>
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
          등록하기
        </Button>
      </S.ButtonWrap>
    </S.Wrap>
  );
};

export default QnaWriteTemplate;
