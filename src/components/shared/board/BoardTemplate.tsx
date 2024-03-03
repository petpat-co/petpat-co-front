// ** Import React
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// ** Import utils
import * as S from './BoardTemplate.style';

// ** Import components
import TitleSection, { TitleSectionPropsType } from '../layout/TitleSection';
import ListCard from '../list/ListCard';
import Accordion, { AccordionPropsType } from '../list/Accordion';
import MenuIndicator from './MenuIndicator';

// ** Import types
import { Post } from '../../../types/post';

interface PropsType extends TitleSectionPropsType {
  bannerTitle: ReactNode;
  bannerContent: ReactNode;
  bannerData: any[];
  postListData: Post.BoardList[];
}

const BoardTemplate = (props: PropsType) => {
  const {
    title,
    buttonText,
    onClick,
    bannerTitle,
    bannerContent,
    bannerData,
    postListData,
  } = props;

  // ----------
  // 24.03.02
  // rehoming category
  const rehomingCategory = useSelector(
    (state: any) => state?.rehoming?.category,
  );
  // ----------

  const initCategory = useSelector((state: any) => state.trade.initCategory); // 열려있는 메뉴 초기 정보 (Accordion Menu 컴포넌트에서 해당 카테고리 값으로 초기 설정)
  const categoryListData = useSelector(
    (state: any) => state.trade.categoryList,
  ); // 카테고리 목록 정보

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategoryList, setSelectedCategoryList] = useState<any[]>([]); // 선택된 카테고리명 정보 목록
  const [selectedIdx, setSelectedIdx] = useState<any>({
    parentId: 0,
    currentId: 0,
  }); // 선택된 카테고리 id 정보

  // TODO: react-query 적용 예정
  useEffect(() => {
    if (categoryListData.length === 1) {
      return;
    }

    // 카테고리 정보가 업데이트되면 초기값 세팅 및 로딩 해제 처리
    handleSelectedCategoryState(
      initCategory.lastInfo,
      initCategory.parentInfo,
      initCategory.childInfo,
    );
    setIsLoading(false);
  }, [categoryListData]);

  const handleSelectedIdx = useCallback(
    (targetParentId: number, targetCurrentId: number) => {
      return (
        targetParentId == selectedIdx.parentId &&
        targetCurrentId == selectedIdx.currentId
      );
    },
    [selectedIdx],
  );

  // 선택한 카테고리 변경 처리 함수
  const handleSelectedCategoryState = (
    currentObj: AccordionPropsType,
    parentObj: AccordionPropsType,
    childObj?: AccordionPropsType | null,
  ) => {
    let currentSelectedList = [
      { name: parentObj.value },
      { name: childObj?.value },
      { name: currentObj.value },
    ];

    currentSelectedList = currentSelectedList.filter(
      (data) => data.name != undefined,
    );

    setSelectedCategoryList(currentSelectedList);
    setSelectedIdx({ parentId: parentObj.id, currentId: currentObj.id });
  };

  // Accordion Props 타입으로 변경해주는 함수
  const handleAccordionPropsType = (targetId: number, targetValue: string) => {
    return { id: targetId, value: targetValue };
  };

  return (
    <S.ComponentContainer>
      {/* ----------헤더 영역----------*/}
      <TitleSection title={title} buttonText={buttonText} onClick={onClick} />
        {/*----------상단 배너(인기글) 영역----------*/}
        <S.BestListSection>
          <S.SectionWrapper>
            <S.TextWrapper>
              <S.TitleText>{bannerTitle}</S.TitleText>
              <S.BodyText>{bannerContent}</S.BodyText>
            </S.TextWrapper>
            <S.ListWrapper rowNum={3}>
              {bannerData.map((item, idx) => {
                return <ListCard key={idx + item.title} item={item} />;
              })}
            </S.ListWrapper>
          </S.SectionWrapper>
        </S.BestListSection>

        {/*----------게시글 리스트 영역----------*/}
        <S.PostListSection>
          <S.SectionWrapper>
            <S.TextWrapper>
              {isLoading ? (
                <div>로딩중</div>
              ) : title === '분양 게시판' ? (
                // <---------- Depth 1 using example ----------> //
                <Accordion.Root initData={initCategory}>
                  {categoryListData.map((petCategory: any, idx: number) => (
                    <Accordion.Item
                      key={idx + petCategory.categoryId}
                      value={petCategory.categoryName}
                    >
                      <Accordion.Title isMain={true}>
                        {petCategory.categoryName}
                      </Accordion.Title>
                      <Accordion.Content>
                        <ul>
                          {petCategory.detailCategoryList.map(
                            (goodsCategory: any, idx: number) => (
                              <Accordion.Detail
                                key={idx + goodsCategory.tradeCategoryId}
                                parentObj={{
                                  id: petCategory.categoryId,
                                  value: petCategory.categoryName,
                                }}
                                currentObj={{
                                  id: goodsCategory.tradeCategoryId,
                                  value: goodsCategory.tradeCategoryName,
                                }}
                                sendData={handleSelectedCategoryState}
                                isSelected={handleSelectedIdx(
                                  petCategory.categoryId,
                                  goodsCategory.tradeCategoryId,
                                )}
                              >
                                {goodsCategory.tradeCategoryName}
                              </Accordion.Detail>
                            ),
                          )}
                        </ul>
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              ) : (
                // <---------- Depth 2 using ----------> //
                <Accordion.Root initData={initCategory}>
                  {categoryListData.map((petCategory: any, idx: number) => (
                    <Accordion.Item
                      key={idx + petCategory.categoryId}
                      value={petCategory.categoryName}
                    >
                      <Accordion.Title isMain={true}>
                        {petCategory.categoryName}
                      </Accordion.Title>
                      <Accordion.Content>
                        {petCategory.detailCategoryList.map(
                          (goodsCategory: any, idx: number) => (
                            <Accordion.Item
                              key={idx + goodsCategory.tradeCategoryId}
                              value={goodsCategory.tradeCategoryName}
                            >
                              <Accordion.Title>
                                {goodsCategory.tradeCategoryName}
                              </Accordion.Title>
                              <ul>
                                {goodsCategory.tradeCategoryDetailList.map(
                                  (detailGoodsCategory: any, idx: number) => (
                                    <Accordion.Detail
                                      key={
                                        idx +
                                        detailGoodsCategory.tradeCategoryDetailId
                                      }
                                      parentObj={handleAccordionPropsType(
                                        petCategory.categoryId,
                                        petCategory.categoryName,
                                      )}
                                      childObj={handleAccordionPropsType(
                                        goodsCategory.tradeCategoryId,
                                        goodsCategory.tradeCategoryName,
                                      )}
                                      currentObj={handleAccordionPropsType(
                                        detailGoodsCategory.tradeCategoryDetailId,
                                        detailGoodsCategory.tradeCategoryDetailName,
                                      )}
                                      sendData={handleSelectedCategoryState}
                                      isSelected={handleSelectedIdx(
                                        petCategory.categoryId,
                                        detailGoodsCategory.tradeCategoryDetailId,
                                      )}
                                    >
                                      {
                                        detailGoodsCategory.tradeCategoryDetailName
                                      }
                                      <S.CategoryCntText>
                                        (
                                        {
                                          detailGoodsCategory.tradeCategoryDetailCnt
                                        }
                                        )
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
              )}
            </S.TextWrapper>
            <S.ListWrapper rowNum={4}>
              <MenuIndicator menuList={selectedCategoryList} />
              {postListData.map((item, idx) => {
                return <ListCard key={idx + item.title} item={item} />;
              })}
            </S.ListWrapper>
          </S.SectionWrapper>
        </S.PostListSection>
    </S.ComponentContainer>
  );
};

export default BoardTemplate;
