// ** Import React
import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useAppDispatch } from '../../core/store';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// ** Import components
import TitleSection from '../shared/layout/TitleSection';
import Button from '../shared/element/Button';
import { Input, TextArea } from '../shared/element';
import ModalContainer from '../common/modal/container/ModalContainer';
import WriteResultView from '../common/modal/WriteResultView';
import InputErrorMessage from '../common/InputErrorMessage';

// ** Import lib
import styled from 'styled-components';
import Select from 'react-select';

// ** Import utils
import theme from '../../styles/theme';
import * as S from '../shared/board/WriteTemplate.style';

// ** Import api
import {
  addPostApi,
  getOnePostApi,
  modifyPostApi,
} from '../../core/redux/post/PostDetailSlice';

// ** Import svg
import { ReactComponent as Add } from 'src/asset/icon/add.svg';
import { ReactComponent as DeleteIcon } from 'src/asset/close.svg';

const GoodsWriteTemplate = () => {
  const [form, setForm] = useState({
    title: '',
    tradeCategoryDetailId: '',
    location: 'location',
    price: '',
    content: '',
  });
  const [imgFileList, setImgFileList] = useState<any[]>([]); // 서버 전달용
  const [previewImgList, setPreviewImgList] = useState<any[]>(
    new Array(5).fill(null),
  ); // 미리보기용
  const [showAddBtnIdx, setShowAddBtnIdx] = useState<number>(0);
  const [onModal, setOnModal] = useState<boolean>(false);
  const [formError, setFormError] = useState({ key: '', message: '' });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [firstCategoryList, setFirstCategoryList] = useState<any[]>([]);
  const [secondCategoryList, setSecondCategoryList] = useState<any>([]);
  const [thirdCategoryList, setThirdCategoryList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>({
    firstCategory: null,
    secondCategory: null,
    thirdCategory: null,
  });
  const [isFirstSelectOpen, setIsFirstSelectOpen] = useState(false);
  const [isSecondSelectOpen, setIsSecondSelectOpen] = useState(false);
  const [isThirdSelectOpen, setIsThirdSelectOpen] = useState(false);
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);
  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);
  const [isDistrictSelectOpen, setIsDistrictSelectOpen] = useState(false);
  const [isTownShipSelectOpen, setIsTownShipSelectOpen] = useState(false);
  const [post, setPost] = useState<any>({}); // 서버에서 받은 게시글 데이터

  // path
  const location = useLocation().pathname.split('/');
  const postType = location[1];
  const writeType = location[2];
  const postId = location[3];

  const appDispatch = useAppDispatch();
  const categoryListData = useSelector((state: any) => state.postList.category); // 카테고리 목록 정보
  // const postData = useSelector((state: any) => state.post.trade);

  const fileRef: any = React.useRef(null);
  const formRef = useRef<HTMLDivElement>(null);

  const isEmpty = (target: any) => {
    return Object.values(target).length === 0;
  };

  useLayoutEffect(() => {
    // 수정 시 데이터 조회 후 상태 업데이트
    if (writeType === 'modify') {
      appDispatch(getOnePostApi({ postType, postId })).then((res: any) => {
        setPost(res.payload.post);
      });
    }
  }, []);

  useEffect(() => {
    if (categoryListData.length === 0) return;

    // first 카테고리 옵션 데이터 설정
    let updateFirstCategoryList = categoryListData.map((category: any) => {
      return {
        id: category.firstCategoryId,
        label: category.firstCategoryName,
        value: category.firstCategoryName,
      };
    });

    setFirstCategoryList(updateFirstCategoryList);

    // 수정 페이지에서만 동작
    if (writeType === 'modify') {
      if (isEmpty(post)) return;

      // 서버에서 받은 tradeCategoryName으로 카테고리 데이터 페칭
      const oldCategoryData = findCategoryInfo();

      // 서버에서 받은 일부 데이터 페칭
      const oldFormData = {
        title: post.title,
        tradeCategoryDetailId: (oldCategoryData?.thirdCategory.id).toString(),
        location: '',
        price: post.price,
        content: post.content,
      };

      // 서버에서 받은 이미지 데이터 페칭
      let oldImageDataList = post.imageList.map((item: any) => {
        return {
          id: item.imageId === 0 ? item.imageId : item.imageId - 1,
          url: item.imagePath,
        };
      });

      // 이미지 데이터 최대 갯수 맞추기 (등록된 이미지 갯수 외 나머지는 null로 정의)
      oldImageDataList = oldImageDataList.concat(
        Array(5 - oldImageDataList.length).fill(null),
      );

      setForm(oldFormData);
      setPreviewImgList(oldImageDataList);
      setSelectedCategory(oldCategoryData);

      // second 카테고리 옵션 데이터 설정
      let updateSecondCategoryList = handleFilteredCategoryList(
        categoryListData,
        oldCategoryData?.firstCategory.id,
        1,
      );

      let targetSecondCategoryList = categoryListData
        .filter(
          (firstCategory: any) =>
            firstCategory.firstCategoryId === oldCategoryData?.firstCategory.id,
        )
        .pop().secondCategoryList;

      // third 카테고리 옵션 데이터 설정
      let updateThirdCategoryList = handleFilteredCategoryList(
        targetSecondCategoryList,
        oldCategoryData?.secondCategory.id,
        2,
      );

      setSecondCategoryList(updateSecondCategoryList);
      setThirdCategoryList(updateThirdCategoryList);
    }
  }, [post, categoryListData]);

  useEffect(() => {
    // 미리보기 상태 변경 시 데이터가 없는 첫번째 idx 추출
    let firstNullDataIdx = previewImgList.findIndex((item) => {
      return item == null;
    });

    setShowAddBtnIdx(firstNullDataIdx);
  }, [previewImgList]);

  // 하위 카테고리명으로 상위 카테고리 정보 조회
  const findCategoryInfo = () => {
    for (let i = 0; i < categoryListData.length; i++) {
      let firstCategory = categoryListData[i];

      for (let j = 0; j < firstCategory.secondCategoryList.length; j++) {
        let secondCategory = firstCategory.secondCategoryList[j];

        for (let k = 0; k < secondCategory.thirdCategoryList.length; k++) {
          let thirdCategory = secondCategory.thirdCategoryList[k];

          if (
            thirdCategory.thirdCategoryName === post.tradeCategoryDetailName
          ) {
            return {
              firstCategory: {
                id: firstCategory.firstCategoryId,
                value: firstCategory.firstCategoryName,
                label: firstCategory.firstCategoryName,
              },
              secondCategory: {
                id: secondCategory.secondCategoryId,
                value: secondCategory.secondCategoryName,
                label: secondCategory.secondCategoryName,
              },
              thirdCategory: {
                id: thirdCategory.thirdCategoryId,
                value: thirdCategory.thirdCategoryName,
                label: thirdCategory.thirdCategoryName,
              },
            };
          }
        }
      }
    }
    return null;
  };

  const handleChangeSelect = (e: any, type: number) => {
    let resultCategoryList: any[] = [];

    // 첫번째 카테고리 선택 시 하위 카테고리 목록 / 선택된 카데고리 정보 상태 업데이트
    if (type === 1) {
      resultCategoryList = handleFilteredCategoryList(
        categoryListData,
        e.id,
        type,
      );
      setSecondCategoryList(resultCategoryList);
      setSelectedCategory({ firstCategory: e });
    }

    // 두번째 카테고리 선택 시 하위 카테고리 목록 / 선택된 카데고리 정보 상태 업데이트
    else if (type === 2) {
      const filteredCategoryList = categoryListData
        .filter(
          (category: any) =>
            category.firstCategoryId === selectedCategory.firstCategory.id,
        )
        .pop().secondCategoryList;

      resultCategoryList = handleFilteredCategoryList(
        filteredCategoryList,
        e.id,
        type,
      );

      setThirdCategoryList(resultCategoryList);
      setSelectedCategory({
        ...selectedCategory,
        secondCategory: e,
        thirdCategory: null,
      });
    }
    // 세번째 카테고리 선택 시 선택된 카데고리 정보 상태 업데이트
    else if (type === 3) {
      setSelectedCategory({ ...selectedCategory, thirdCategory: e });
      setForm({ ...form, tradeCategoryDetailId: e.id });
    }
  };

  // 하위 목록 카테고리 정보 가져오는 함수
  const handleFilteredCategoryList = (
    targetList: any,
    targetId: number,
    type: number,
  ) => {
    let propertyName = type == 1 ? 'firstCategoryId' : 'secondCategoryId';

    // 선택한 카테고리에 대한 데이터만 추출
    let filteredCategoryList = targetList
      .filter((target: any) => target[propertyName] === targetId)
      .pop();

    // 추출된 데이터에서 배열인 프로퍼티를 찾아 해당 값으로 업데이트
    if (filteredCategoryList.length != 0) {
      for (const key in filteredCategoryList) {
        // 해당 속성의 값이 배열인 경우
        if (Array.isArray(filteredCategoryList[key])) {
          filteredCategoryList = filteredCategoryList[key];
        }
      }
    }

    // 하위 카테고리 형식에 맞게 가공 후 반환
    let updateCategoryList = filteredCategoryList.map((category: any) => {
      let propertyName = type == 1 ? 'secondCategory' : 'thirdCategory';

      return {
        id: category[propertyName + 'Id'],
        label: category[propertyName + 'Name'],
        value: category[propertyName + 'Name'],
      };
    });

    return updateCategoryList;
  };

  const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 가격 입력 시
    if (name === 'price') {
      // 숫자 및 빈문자열 외 문자열을 입력하거나 첫 글자가 0일 경우 입력 방지
      if (isNaN(Number(value)) || value.charAt(0) === '0') return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeImages = (e: ChangeEvent<HTMLInputElement>) => {
    // 엽로드한 파일들 불러오기
    const uploadFiles = e.target.files;

    if (uploadFiles) {
      let uploadFileArr = []; // 업로드 된 파일 정보가 담긴 배열
      let hasUploadFiles = imgFileList.length > 0; // 기존에 업로드된 파일이 있는지 여부

      // 업로드 한 파일 필요한
      uploadFileArr = Array.from(uploadFiles).map((file, idx) => {
        return {
          // 기존 파일이 있다면 배열 갯수 + idx부터 시작
          id: hasUploadFiles ? imgFileList.length + idx : idx,
          file: file,
        };
      });

      // 기존 파일이 있다면 추가 파일 데이터 병합
      if (hasUploadFiles) {
        uploadFileArr = imgFileList.concat(uploadFileArr);
      }

      if (uploadFileArr.length > 5) {
        window.alert('파일은 최대 5개까지만 업로드 가능합니다.');
        uploadFileArr = uploadFileArr.slice(0, 5);
      }

      setImgFileList(uploadFileArr);
      window.alert('업로드가 완료 되었습니다!');

      // 파일 데이터 > 미리보기용 url 세팅
      uploadFileArr.forEach((file, idx) => onReadFile(file, idx));
    } else {
      setImgFileList([]);
    }
  };

  // 영역별 에러 메세지 반환
  const handleErrorMessage = (key: string) => {
    let errorType = '';
    const requiredMessage =
      key === 'images' ? '등록해주세요.' : '입력해주세요.';

    // TODO: 카테고리 및 주소 관련 데이터 정의 결정 후 추가 반영 예정
    switch (key) {
      case 'title':
        errorType = '제목을 ';
        break;
      case 'tradeCategoryDetailId':
        errorType = '카테고리를 ';
        break;
      case 'location':
        errorType = '주소를 ';
        break;
      case 'price':
        errorType = '가격을 ';
        break;
      case 'content':
        errorType = '설명을 ';
        break;
      case 'images':
        errorType = '이미지를 ';
        break;
    }

    return errorType + requiredMessage;
  };

  // TODO: 추후 react-hook-form 적용 예정
  // 등록 버튼 클릭 시 호출
  const handleSubmit = () => {
    const currentFormArray = Object.entries(form);

    // console.log('최종 입력 값 --> ', form);

    // 유효성 검사
    for (const [key, value] of currentFormArray) {
      // console.log('key --> ', key, value);
      if (!value) {
        const message = handleErrorMessage(key);
        setFormError({ key, message });

        // 화면 스크롤 이동 처리
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (imgFileList.length == 0) {
      const message = handleErrorMessage('images');
      setFormError({ key: 'images', message });
      return;
    }

    // formData로 담아주기
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // TODO: 주소 관련 전송 데이터 항목 확인 필요
    formData.append('province', '서울특별시');
    formData.append('city', '');
    formData.append('district', '종로구');
    formData.append('town', '청운동');
    formData.append('detailAdName', '어쩌구 저쩌구 00동 00호');

    imgFileList.forEach((image: any) => {
      formData.append('images', image.file);
    });

    // 글 작성 진행
    handlePost(formData);
  };

  // 글 작성하기
  const handlePost = async (formData: FormData) => {
    try {
      const apiCall = writeType === 'write' ? addPostApi : modifyPostApi;

      await appDispatch(apiCall({ postType, formData }));
      setIsSuccess(true);
    } catch (e) {
      console.error('[TRADE WRITE] PostTrade Error : ', e);
    } finally {
      setOnModal(true);
    }
  };

  let fileUrls: any[] = [...previewImgList];

  // 이미지 파일 데이터 읽고 임시 url 생성
  const onReadFile = (data: any, idx: number) => {
    let fileReader = new FileReader();

    fileReader.readAsDataURL(data.file);
    fileReader.onload = (data) => {
      if (typeof data.target?.result === 'string') {
        // 파일 읽는 순으로 해당 배열의 데이터 교체
        for (let i = 0; i < previewImgList.length; i++) {
          if (i === idx) {
            fileUrls[i] = { id: i, url: data.target.result };
          }
        }
        setPreviewImgList(fileUrls);
      }
    };
  };

  // 업로드 한 이미지 삭제
  const handleDeleteImage = (targetId: number) => {
    // 파일 데이터 업데이트
    let updateImgFileList: any[] = imgFileList
      .filter((file) => file.id != targetId)
      .map((data, idx) => {
        return {
          id: idx,
          file: data.file,
        };
      });

    // 미리보기 데이터 업데이트
    let updatePreviewImgList: any[] = previewImgList
      .filter((file) => file && file.id != targetId)
      .map((data, idx) => {
        return {
          id: idx,
          url: data.url,
        };
      });

    updatePreviewImgList = updatePreviewImgList.concat(
      Array(5 - updatePreviewImgList.length).fill(null),
    );

    setImgFileList(updateImgFileList);
    setPreviewImgList(updatePreviewImgList);
  };

  // react-select 스타일 재정의
  const customSelectStyles = (isSelectOpen: boolean) => ({
    control: (provided: any) => ({
      ...provided,
      display: 'flex',
      gap: '10px',
      cursor: 'pointer',
      minWidth: '12rem',
      height: '50px',
      borderRadius: isSelectOpen ? '28px 28px 0 0' : '28px', // 메뉴가 열렸을 때 스타일 변경
      borderColor: `${theme.colors.primary}`,
      padding: '0 14px 0 24px',

      '&:hover': {
        borderColor: `${theme.colors.primary}`,
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '2px 0',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      margin: '0',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontSize: `${theme.fontSizes.regular}`,
      color: `${theme.colors.coolgray300}`,
    }),
    input: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: `${theme.colors.primary}`,

      '&:hover': {
        color: `${theme.colors.primary}`,
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0 0 28px 28px',
      border: `1px solid ${theme.colors.primary}`,
      boxShadow: 'none',
      marginTop: '0',
      overflow: 'hidden',
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: '10px 0',
    }),
    option: (provided: any) => ({
      ...provided,
      backgroundColor: `${theme.colors.white}`,
      color: `${theme.colors.black}`,
      marginBottom: '8px',
      padding: '8px 16px',

      '&:active': {
        backgroundColor: `${theme.colors.sub01}`,
      },

      '&:hover': {
        backgroundColor: `${theme.colors.sub02}`,
      },
    }),
    noOptionsMessage: (provided: any) => ({
      fontSize: '14px',
      padding: '6px 16px',
      color: `${theme.colors.coolgray400}`,
    }),
  });

  return (
    <div ref={formRef}>
      {onModal && (
        <ModalContainer
          zIndex={100000}
          id="goodsSubmitModal"
          onClickClose={() => setOnModal(false)}
        >
          <WriteResultView
            page={'trade'}
            isSuccess={isSuccess}
            setOnModal={setOnModal}
          />
        </ModalContainer>
      )}

      <TitleSection title={'물건 판매 글쓰기'} />

      {/*----------제목 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>제목</S.InputTitleText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <S.RowContainer>
            <Input
              borderRadius="28px"
              placeholder="제목을 입력해주세요."
              onChange={handleChangeInput}
              maxLength={20}
              name="title"
              padding="0 24px"
              value={form.title}
            />
            <S.InputSubText>{form.title.length}/20</S.InputSubText>
            {formError.key === 'title' && (
              <InputErrorMessage top={58} message={formError.message} />
            )}
          </S.RowContainer>
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      <S.DividerLine />

      {/*----------카테고리 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>카테고리</S.InputTitleText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <S.RowContainer>
            {/* first category name */}
            <Select
              // value는 객체 형태로 저장해야 동기화 됨 {id, value, label}
              value={selectedCategory.firstCategory}
              placeholder={'대분류 카테고리'}
              options={firstCategoryList}
              onChange={(e) => handleChangeSelect(e, 1)}
              onMenuOpen={() => setIsFirstSelectOpen(true)}
              onMenuClose={() => setIsFirstSelectOpen(false)}
              styles={customSelectStyles(isFirstSelectOpen)}
            />
            {/* second category name */}
            <Select
              value={selectedCategory.secondCategory}
              placeholder={'중분류 카테고리'}
              options={secondCategoryList}
              onChange={(e) => handleChangeSelect(e, 2)}
              noOptionsMessage={() => '대분류 카테고리를 먼저 선택해주세요.'}
              onMenuOpen={() => setIsSecondSelectOpen(true)}
              onMenuClose={() => setIsSecondSelectOpen(false)}
              styles={customSelectStyles(isSecondSelectOpen)}
            />
            {/* third category name */}
            <Select
              value={selectedCategory.thirdCategory}
              placeholder={'소분류 카테고리'}
              options={thirdCategoryList}
              onChange={(e) => handleChangeSelect(e, 3)}
              noOptionsMessage={() => '중분류 카테고리를 먼저 선택해주세요.'}
              onMenuOpen={() => setIsThirdSelectOpen(true)}
              onMenuClose={() => setIsThirdSelectOpen(false)}
              styles={customSelectStyles(isThirdSelectOpen)}
            />
            {formError.key === 'tradeCategoryDetailId' && (
              <InputErrorMessage top={58} message={formError.message} />
            )}
          </S.RowContainer>
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      {/*----------거래지역 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>거래지역</S.InputTitleText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <S.ColumnContainer>
            <S.RowContainer>
              <Select
                placeholder={'지역(필수)'}
                options={[]}
                onChange={(e) => handleChangeSelect(e, 1)}
                onMenuOpen={() => setIsCitySelectOpen(true)}
                onMenuClose={() => setIsCitySelectOpen(false)}
                styles={customSelectStyles(isCitySelectOpen)}
              />
              <Select
                placeholder={'시/군(선택)'}
                options={[]}
                onChange={(e) => handleChangeSelect(e, 2)}
                onMenuOpen={() => setIsCountrySelectOpen(true)}
                onMenuClose={() => setIsCountrySelectOpen(false)}
                styles={customSelectStyles(isCountrySelectOpen)}
              />
              <Select
                placeholder={'구(선택)'}
                options={[]}
                onChange={(e) => handleChangeSelect(e, 3)}
                onMenuOpen={() => setIsDistrictSelectOpen(true)}
                onMenuClose={() => setIsDistrictSelectOpen(false)}
                styles={customSelectStyles(isDistrictSelectOpen)}
              />
              <Select
                placeholder={'동/면/리(필수)'}
                options={[]}
                onChange={(e) => handleChangeSelect(e, 4)}
                noOptionsMessage={() => '해당 값은 필수입니다.'}
                onMenuOpen={() => setIsTownShipSelectOpen(true)}
                onMenuClose={() => setIsTownShipSelectOpen(false)}
                styles={customSelectStyles(isTownShipSelectOpen)}
              />
              {formError.key === 'location' && (
                <InputErrorMessage top={58} message={formError.message} />
              )}
            </S.RowContainer>
          </S.ColumnContainer>
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      {/*----------가격 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>가격</S.InputTitleText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <S.RowContainer>
            <Input
              borderRadius="28px"
              placeholder="숫자만 입력해 주세요"
              onChange={handleChangeInput}
              maxLength={7}
              name="price"
              padding="0 24px"
              width={'30%'}
              value={form.price}
            />
            <S.InputSubText>원</S.InputSubText>
            {formError.key === 'price' && (
              <InputErrorMessage top={58} message={formError.message} />
            )}
          </S.RowContainer>
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      {/*----------상세설명 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>상세설명</S.InputTitleText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <ContentContainer>
            <TextArea
              name="content"
              placeholder="설명을 입력해주세요."
              onChange={handleChangeTextArea}
              maxLength={2000}
              height="200px"
              borderRadius="28px"
              padding="24px;"
              fontSize={`${theme.fontSizes.regular}`}
              value={form.content}
            />
            <S.InputSubText>{form.content.length}/2000</S.InputSubText>
          </ContentContainer>
          {formError.key === 'content' && (
            <InputErrorMessage top={210} message={formError.message} />
          )}
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      {/*----------이미지 업로드 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>이미지</S.InputTitleText>
          <UploadImageCntText>
            ({previewImgList.filter((image) => image != null).length}/5)
          </UploadImageCntText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <UploadImageContainer>
            <UploadImageWrapper>
              {previewImgList.map((item: any, idx: number) => (
                <UploadImageBox
                  key={idx}
                  isShowAddBtn={idx === showAddBtnIdx}
                  // input file 요소 > ref를 통해 조작
                  onClick={() => {
                    idx === showAddBtnIdx && fileRef.current.click();
                  }}
                >
                  {item != null ? (
                    <>
                      <PreviewImageBox src={item.url} />
                      {item.id === 0 && <MainImgBadge>대표</MainImgBadge>}
                      <DeleteBtn
                        onClick={() => {
                          handleDeleteImage(idx);
                        }}
                      >
                        <DeleteIcon
                          width="8px"
                          height="8px"
                          fill={`${theme.colors.coolgray500}`}
                          stroke={`${theme.colors.coolgray500}`}
                        />
                      </DeleteBtn>
                    </>
                  ) : (
                    <>
                      {idx === showAddBtnIdx && (
                        <>
                          <Add width={60} height={60} />
                          <input
                            multiple
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                            ref={fileRef}
                            onChange={handleChangeImages}
                          />
                        </>
                      )}
                    </>
                  )}
                </UploadImageBox>
              ))}
            </UploadImageWrapper>
            <InfoText>
              * 부적절한 이미지를 등록할 경우 서비스 이용에 제한 및 어려움이
              있을 수 있습니다.
              <br />- 사진은 최대 1MB까지 업로드 가능합니다.
              <br />- 문제가 발생할 경우 관리자에게 문의해주세요.
            </InfoText>
            {formError.key === 'images' && (
              <InputErrorMessage top={234} message={formError.message} />
            )}
          </UploadImageContainer>
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      {/*----------하단 버튼 영역----------*/}
      <BtnSection>
        <Button
          width="auto"
          isArrowIcon={false}
          height="66px"
          _onClick={() => console.log('임시저장 클릭')}
          _disabled={false}
          activeBg={`${theme.colors.coolgray400}`}
          padding="0 20px"
          activeColor={`${theme.colors.white}`}
          radius="14px"
        >
          <span>임시저장</span>
        </Button>
        <Button
          width="auto"
          isArrowIcon={false}
          height="66px"
          _onClick={handleSubmit}
          _disabled={false}
          activeBg={`${theme.colors.main}`}
          padding="0 20px"
          activeColor={`${theme.colors.white}`}
          radius="14px"
        >
          <span>등록하기</span>
        </Button>
      </BtnSection>
    </div>
  );
};

const ContentContainer = styled(S.ColumnContainer)`
  align-items: flex-end;
`;

const UploadImageCntText = styled(S.InputSubText)`
  margin-top: 2%;
  color: ${theme.colors.gray70};
`;

const UploadImageContainer = styled(S.ColumnContainer)`
  align-items: flex-start;
  position: relative;
`;

const UploadImageWrapper = styled(S.RowContainer)`
  width: 100%;
  gap: 20px;
`;

const UploadImageBox = styled.div<{ isShowAddBtn: boolean }>`
  flex: 1;
  aspect-ratio: 1;
  background-color: ${theme.colors.sub03};
  border-radius: 28px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ isShowAddBtn }) =>
    isShowAddBtn && `2px dashed ${theme.colors.primary}`};
  position: relative;
`;

const PreviewImageBox = styled.div<{ src: string }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 28px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const DeleteBtn = styled.div`
  position: absolute;
  background: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

const MainImgBadge = styled.div`
  position: absolute;
  background: ${theme.colors.main};
  padding: 4px 8px;
  font-size: ${theme.fontSizes.xsmall};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.white};
  top: 10px;
  left: 10px;
  border-radius: 100px;
`;

const InfoText = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.grayText};
  line-height: 1.75;
`;

const BtnSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  padding: 4%;
  padding-bottom: 10%;
`;

export default GoodsWriteTemplate;
