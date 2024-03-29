import React, { Dispatch, SetStateAction } from 'react';

import * as S from './Select.styled';

interface PropsType {
  /** 목록 배열을 넣어주세요. */
  data: string[];
  /** useState의 value값
   *  초기값 -1의 경우: 아무것도 선택되지 않음
   *  초기값 0의 경우: 목록의 첫 인덱스 요소가 선택
   */
  value: number;
  /** useState의 setter 함수 */
  setValue: Dispatch<SetStateAction<number>>;
  /** 목록의 요소가 아닌 텍스트를 설정하고 싶은 경우
   *  value를 초기값을 -1로 설정하세요.
   */
  placeholder?: string;
  height?: number;
  borderColor?: string;
}

export default function Select(props: PropsType) {
  const { data, value, setValue, placeholder, height, borderColor } = props;
  const $dropDownList = React.useRef<HTMLUListElement>(null);
  const [dropDown, setDropDown] = React.useState<boolean>(false);

  const selectComponentWidth = React.useMemo(() => {
    const lengthOftheLongestText = Math.max(...data.map((v) => v.length));
    return lengthOftheLongestText * 35;
  }, [data]);

  const handleSelect = (idx: number) => {
    setValue(idx);
    setDropDown((prev) => !prev);
  };

  const handleFocusOut = React.useCallback(() => {
    setDropDown((prev) => !prev);
  }, []);

  React.useEffect(() => {
    if ($dropDownList.current === null) return;
    $dropDownList.current?.addEventListener('mouseleave', handleFocusOut);

    return () =>
      // eslint-disable-next-line react-hooks/exhaustive-deps
      $dropDownList.current?.removeEventListener('mouseleave', handleFocusOut);
  }, [handleFocusOut, dropDown, $dropDownList]);

  return (
    <S.SelectContainer>
      <S.SelectZone width={selectComponentWidth} height={height} borderColor={borderColor}>
        {placeholder && value === -1 ? placeholder : data[value]}
        <S.StyledArrow
          open={dropDown}
          onClick={() => setDropDown((prev) => !prev)}
        />
      </S.SelectZone>
      {dropDown && (
        <S.DropDownList
          select={placeholder && value === -1 ? 0 : value + 1}
          ref={$dropDownList}
          height={height}
          borderColor={borderColor}
        >
          {data.map((option, idx) => (
            <S.DropDownItem key={idx} onClick={() => handleSelect(idx)}>
              {option}
            </S.DropDownItem>
          ))}
        </S.DropDownList>
      )}
    </S.SelectContainer>
  );
}
