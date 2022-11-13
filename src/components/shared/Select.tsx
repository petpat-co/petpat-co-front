import React, { Dispatch, SetStateAction } from 'react';

import * as S from './Select.styled';

interface SelectProps {
  data: string[];
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  placeholder?: string;
}

export default function Select({
  data,
  value,
  setValue,
  placeholder,
}: SelectProps) {
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
      <S.SelectZone width={selectComponentWidth}>
        {placeholder && value === -1 ? placeholder : data[value]}
        <S.StyledArrow
          stroke="black"
          strokeWidth="1"
          transform="rotate(90)"
          open={dropDown}
          onClick={() => setDropDown((prev) => !prev)}
        />
      </S.SelectZone>
      {dropDown && (
        <S.DropDownList
          select={placeholder && value === -1 ? 0 : value + 1}
          ref={$dropDownList}
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
