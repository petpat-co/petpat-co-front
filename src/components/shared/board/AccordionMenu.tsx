// ** Import React
import React from 'react';

// ** Import Component
import Accordion from '../list/Accordion';

// ** Import util
import * as S from './BoardTemplate.style';

type AccordionMenuProps = {
  listData: any[];
  handleSelectedState: any;
  handleSelectedIdx: any;
};

const AccordionMenu = ({
  listData,
  handleSelectedState,
  handleSelectedIdx,
}: AccordionMenuProps) => {
  // Accordion Props 타입으로 변경해주는 함수
  const handleAccordionPropsType = (targetId: number, targetValue: string) => {
    return { id: targetId, value: targetValue };
  };

  // console.log('accordian menu ==> ', listData);

  // ** Depth에 따른 구조
  // Depth 1 ---------
  // <Root>
  // <Item>
  // <Title>
  // <Content>
  // <Detail>

  // Depth 2 ---------
  // <Root>
  // <Item>
  // <Title>
  // <Content>
  // <Item>
  // <Title>
  // <Detail>

  return (
    <Accordion.Root>
      {listData.map((firstData: any, idx: number) => (
        <Accordion.Item
          key={idx + firstData.firstCategoryId}
          value={firstData.firstCategoryName}
        >
          <Accordion.Title isMain={true}>
            {firstData.firstCategoryName}
          </Accordion.Title>
          <Accordion.Content>
            {firstData.secondCategoryList.map(
              (secondData: any, idx: number) => (
                <Accordion.Item
                  key={idx + secondData.secondCategoryId}
                  value={secondData.secondCategoryName}
                >
                  <Accordion.Title>
                    {secondData.secondCategoryName}
                  </Accordion.Title>
                  <ul>
                    {secondData.thirdCategoryList.map(
                      (thirdData: any, idx: number) => (
                        <Accordion.Detail
                          key={idx + thirdData.thirdCategoryId}
                          parentObj={handleAccordionPropsType(
                            firstData.firstCategoryId,
                            firstData.firstCategoryName,
                          )}
                          childObj={handleAccordionPropsType(
                            secondData.secondCategoryId,
                            secondData.secondCategoryName,
                          )}
                          currentObj={handleAccordionPropsType(
                            thirdData.thirdCategoryId,
                            thirdData.thirdCategoryName,
                          )}
                          sendData={handleSelectedState}
                          isSelected={handleSelectedIdx(
                            firstData.firstCategoryId,
                            thirdData.thirdCategoryId,
                          )}
                        >
                          {thirdData.thirdCategoryName}
                          <S.CategoryCntText>
                            ({thirdData.thirdCategoryCnt})
                          </S.CategoryCntText>
                        </Accordion.Detail>
                      ),
                    )}
                  </ul>
                </Accordion.Item>
              ),
            )}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default AccordionMenu;
