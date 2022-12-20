import { ChangeEvent, useCallback, useState } from 'react';
import { DisplayGrid, Input } from '../../shared/element';
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
        height="699px"
        padding="64px 0 0"
        flexDirection="column"
        align="flex-start"
      >
        <Input
          onChange={onChangeInput}
          placeholder="제목을 입력하세요."
          defaultValue=""
          name="title"
          maxLength={20}
          isBorderBottom={true}
          border="none"
        />
      </DisplayGrid>
    </S.Wrap>
  );
};

export default QnaWriteTemplate;
