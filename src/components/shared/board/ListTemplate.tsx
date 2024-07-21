// ** Import React
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../core/store';
import { useSelector } from 'react-redux';

// ** Import utils
import * as S from './BoardTemplate.style';

// ** Import api
import {
  getBannerListApi,
  getCategoryListApi,
  getPostListApi,
} from '../../../core/redux/post/commonSlice';

// ** Import components
import TitleSection from '../layout/TitleSection';
import AccordionMenu from './AccordionMenu';
import MenuIndicator from './MenuIndicator';
import Pagination from './Pagination';
import ListCard from '../list/ListCard';
import { AccordionPropsType } from '../list/Accordion';
import { Input } from '../element';
import { Icon } from 'src/asset/icon/Index';

const ListTemplate = () => {
  // path
  const locationNow = useLocation().pathname.split('/')[1];

  const navigate = useNavigate();

  // redux
  const appDispatch = useAppDispatch();
  const categoryData = useSelector((state: any) => state?.common.category);
  // bannerData
  const bannerListData = useSelector((state: any) => state?.common.banner);
  // postData
  const postListData = useSelector((state: any) => state?.common.list);
  const pageInfoData = useSelector((state: any) => state?.common.pageInfo);

  // state
  const [postType, setPostType] = useState<string>('');
  const [mainTitle, setMainTitle] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('');
  const [bannerTitle, setBannerTitle] = useState<string>('');
  const [bannerContent, setBannerContent] = useState<string>('');
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0); // 결과 전체 페이지
  const [searchCategory, setSearchCategory] = useState<string>(''); // 검색어
  const [categoryList, setCategoryList] = useState<any[]>(categoryData);

  // ref
  const listRef = useRef<HTMLDivElement>(null);

  // API 요청 시 각 url path에 맞는 postType 반환
  const getPostType = (targetLocation: string, isNeedConvert: boolean) => {
    if (targetLocation === 'rehome' && isNeedConvert) {
      targetLocation = 'rehoming';
    }

    return targetLocation;
  };

  // url path 변경 및 렌더링 이전 > 서버 데이터 페칭 처리
  useLayoutEffect(() => {
    // 카테고리 데이터 페칭
    appDispatch(getCategoryListApi(getPostType(locationNow, true)));

    // 게시글 목록 데이터 페칭
    appDispatch(
      getPostListApi({
        pageNo: totalPage,
        postType: getPostType(locationNow, true),
      }),
    );

    // 인기있는 게시물 목록 데이터 페칭
    // appDispatch(getBannerListApi(getPostType(locationNow, true)));
  }, [locationNow]);

  // url path 변경 시 > 관련 정보로 상태 변경 처리
  useEffect(() => {
    // TODO: pageInfoData.totalPage == 0일 때 return되서 타이틀 정보가 제대로 렌더링 안되는 이슈
    // if (!pageInfoData.totalPage) {
    //   return;
    // }

    let target;

    if (locationNow === 'trade') {
      target = '물품거래';
    } else if (locationNow === 'rehome') {
      target = '분양';
    }

    console.log('target-->', target);

    setPostType(getPostType(locationNow, true));
    setMainTitle(target + '게시판');
    setButtonText(target + '글 올리기');
    setBannerTitle('이번주에 관심\n' + '많이 받은 ' + target + '글');
    setBannerContent(
      '다른 ' +
        target +
        '글을 둘러보기 전에 관심을 많이 받은 게시글도 한번 보고 가세요!',
    );
    setTotalPage(pageInfoData.totalPage);
  }, [locationNow, pageInfoData]);

  // 카테고리 초기 데이터 페칭
  useEffect(() => {
    if (categoryData.length === 0) return;

    setCategoryList(categoryData);
  }, [categoryData]);

  const onClickWrite = () => {
    navigate(`/${getPostType(locationNow, false)}/write`);
  };

  // TODO: 분양 데이터 구조 변경으로 인한 불필요한 로직 제거 예정
  // 선택한 카테고리 정보 가져오는 함수
  const getSelectedCategoryInfo = (
    currentObj: AccordionPropsType,
    parentObj: AccordionPropsType,
    childObj?: AccordionPropsType | null,
  ) => {
    let currentSelectedList = [
      { id: parentObj.id, name: parentObj.value },
      { id: childObj?.id, name: childObj?.value },
      { id: currentObj.id, name: currentObj.value },
    ];

    // 존재하지 않는 필드 삭제 (Depth가 1개일 경우 = 분양)
    currentSelectedList = currentSelectedList.filter(
      (data) => data.name != undefined,
    );

    setSelectedCategoryInfo(currentSelectedList);

    // console.log('현재 선택한 카테고리', currentSelectedList);

    // TODO: 선택한 카테고리에 해당하는 데이터 조회 API 요청 (BE 확인)
  };

  // 선택한 카테고리 정보와 AccordionMenu 정보와 일치여부 판별 -> 클릭 표시 처리
  // TODO: 더 쉬운 방법?
  const handleMatchedCategoryIdx = (
    targetParentId: number,
    targetCurrentId: number,
  ) => {
    // console.log('선택한 정보 매칭 처리하기', targetParentId, targetCurrentId);

    if (selectedCategoryInfo.length === 0) {
      return;
    }

    // Depth가 2개일 경우 (= 거래)
    if (selectedCategoryInfo.length === 2) {
      return (
        targetParentId === selectedCategoryInfo[0].id &&
        targetCurrentId === selectedCategoryInfo[1].id
      );
    }
    // Depth가 1개일 경우 (= 분양)
    else {
      return (
        targetParentId === selectedCategoryInfo[0].id &&
        targetCurrentId == selectedCategoryInfo[2].id
      );
    }
  };

  const handlePageChange = (e: { selected: number }) => {
    console.log('선택한 페이지 번호로 게시글 데이터 가져오기', e.selected);

    // 선택한 페이지 번호로 게시글 데이터 페칭
    appDispatch(
      getPostListApi({
        pageNo: e.selected,
        postType: getPostType(locationNow, true),
      }),
    );

    // 페이지 전환 시 화면 스크롤 이동 처리
    listRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 검색 버튼 클릭 시 결과값 처리
  const onClickSearch = () => {
    console.log('현재 검색어 -->', searchCategory);
    // console.log('전체 카테고리 리스트 --> ', categoryData);

    // 기존 카테고리 구조와 동일
    let searchResultList: any[] = [];

    // TODO: 리팩토링 진행 예정
    for (let i = 0; i < categoryData.length; i++) {
      const firstCategory = categoryData[i]; // 현재 최상위 정보

      for (let j = 0; j < firstCategory.secondCategoryList.length; j++) {
        const secondCategory = firstCategory.secondCategoryList[j]; // 현재 상위 정보

        // 최상위 카테고리 정보 조회
        let firstCategoryInfo = searchResultList.find(
          (searchResultInfo: any) => {
            return (
              searchResultInfo.firstCategoryId === firstCategory.firstCategoryId
            );
          },
        );

        // 최상위 카테고리 정보가 존재하지 않을 경우 상위 카테고리 정보 생성
        if (!firstCategoryInfo) {
          firstCategoryInfo = {
            firstCategoryId: firstCategory.firstCategoryId,
            firstCategoryName: firstCategory.firstCategoryName,
            secondCategoryList: [],
          };

          searchResultList.push(firstCategoryInfo);
        }

        secondCategory.thirdCategoryList.forEach((item: any) => {
          // 검색어와 일치한 카테고리명이 있을 경우
          if (item.thirdCategoryName.includes(searchCategory)) {
            // 상위 카테고리 정보 조회
            let secondCategoryInfo = searchResultList[
              i
            ].secondCategoryList.find((searchResultInfo: any) => {
              return (
                searchResultInfo.secondCategoryId ===
                secondCategory.secondCategoryId
              );
            });

            // 상위 카테고리 정보가 존재하지 않을 경우 상위 카테고리 정보 생성
            if (!secondCategoryInfo) {
              secondCategoryInfo = {
                secondCategoryId: secondCategory.secondCategoryId,
                secondCategoryName: secondCategory.secondCategoryName,
                thirdCategoryList: [],
              };

              firstCategoryInfo.secondCategoryList.push(secondCategoryInfo);
            }

            // 최상위, 상위 카테고리 정보가 존재할 경우 검색 결과 정보만 추가
            let searchResultCategory = {
              thirdCategoryId: item.thirdCategoryId,
              thirdCategoryName: item.thirdCategoryName,
              thirdCategoryCnt: item.thirdCategoryCnt,
            };

            secondCategoryInfo.thirdCategoryList.push(searchResultCategory);
          }
        });
      }
    }

    setCategoryList(searchResultList);
  };

  return (
    <S.ComponentContainer>
      {/* ----------헤더 영역----------*/}
      <TitleSection
        title={mainTitle}
        buttonText={buttonText}
        onClick={onClickWrite}
      />

      {/*----------상단 배너(인기글) 영역-----`-----*/}
      <S.BestListSection>
        <S.SectionWrapper>
          <S.TextWrapper>
            <S.TitleText>{bannerTitle}</S.TitleText>
            <S.BodyText>{bannerContent}</S.BodyText>
          </S.TextWrapper>
          <S.ListWrapper rowNum={3}>
            {/*  TODO: 인기있는 게시글 API 연동 예정  */}
            {bannerListData.length === 0 ? (
              <div>인기있는 게시글 없음</div>
            ) : (
              <div>인기있는 게시글 있음</div>
            )}
          </S.ListWrapper>
        </S.SectionWrapper>
      </S.BestListSection>

      {/*----------게시글 리스트 영역----------*/}
      <S.PostListSection>
        <S.SectionWrapper>
          <S.TextWrapper>
            {postType === 'rehoming' && (
              <S.SearchWrapper>
                <Input
                  border="none"
                  padding="10px 36px 10px 10px"
                  placeholder="무엇을 찾고 계신가요?"
                  onChange={(e) => {
                    setSearchCategory(e.target.value);
                  }}
                  maxLength={50}
                  name="boardSearch"
                  isBorderBottom={true}
                />
                <S.SearchButton type="submit">
                  <Icon.Search size="20" color="#000" onClick={onClickSearch} />
                </S.SearchButton>
              </S.SearchWrapper>
            )}
            <AccordionMenu
              listData={categoryList}
              handleSelectedState={getSelectedCategoryInfo}
              handleSelectedIdx={handleMatchedCategoryIdx}
            />
          </S.TextWrapper>
          <S.ListContainer ref={listRef}>
            <S.ListWrapper rowNum={4} minHeight={750}>
              <MenuIndicator menuList={selectedCategoryInfo} />
              {postListData.map((item: any, idx: number) => {
                return (
                  <ListCard key={item + idx} item={item} postType={postType} />
                );
              })}
            </S.ListWrapper>
            <Pagination
              totalPage={totalPage}
              handlePageChange={handlePageChange}
            />
          </S.ListContainer>
        </S.SectionWrapper>
      </S.PostListSection>
    </S.ComponentContainer>
  );
};

export default ListTemplate;
