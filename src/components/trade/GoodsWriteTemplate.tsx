// ** Import React
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ** Import components
import TitleSection from '../shared/layout/TitleSection';
import Button from '../shared/element/Button';
import { Input, TextArea } from '../shared/element';
import ModalContainer from '../common/modal/container/ModalContainer';
import WriteResultView from '../common/modal/WriteResultView';

// ** Import lib
import styled from 'styled-components';
import Select from 'react-select';

// ** Import utils
import theme from '../../styles/theme';
import * as S from '../shared/board/WriteTemplate.style';
import { useAppDispatch } from '../../core/store';
import { postTradeApi } from '../../core/redux/post/tradeSlice';

// ** Import svg
import { ReactComponent as Add } from 'src/asset/icon/add.svg';

const tempCategoryList = [
  { id: 0, value: 'feed', label: '강아지 사료' },
  { id: 1, value: 'snack', label: '강아지 간식' },
  { id: 2, value: 'vitamin', label: '강아지 영양제' },
];

const GoodsWriteTemplate = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    content: '',
    location: '',
    tradeCategoryDetailId: 18,
  });
  const [imgFileList, setImgFileList] = useState<any>(null); // 서버 전달용
  const [previewImgList, setPreviewImgList] = useState<any[]>(
    new Array(5).fill(null),
  ); // 미리보기용
  const [showAddBtnIdx, setShowAddBtnIdx] = useState<number>(0);
  const [mainImgIdx, setMainImgIdx] = useState<number>(0);
  const [categoryGroup, setCategoryGroup] = useState<any>([]);
  const [tradeCategoryGroup, setTradeCategoryGroup] = useState<any[]>([]);
  const [tradeDetailGroup, setTradeDetailGroup] = useState<any[]>([]);
  const [isOpenSubmitModal, setIsOpenSubmitModal] = useState<boolean>(false);

  const appDispatch = useAppDispatch();
  const isSuccess = useSelector((state: any) => state.trade.isSuccess);
  const navigate = useNavigate();

  const fileRef: any = React.useRef(null);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
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
    let uploadFiles = e.target.files;

    if (uploadFiles!.length > 5) {
      window.alert('파일은 최대 5개까지만 업로드 가능합니다.');
      return;
    }

    if (uploadFiles) {
      const uploadFileArr = Array.from(uploadFiles);
      setImgFileList(uploadFileArr);
      window.alert('업로드가 완료 되었습니다!');

      // 파일 데이터 > 미리보기용 url 세팅
      uploadFileArr.forEach((file, idx) => onReadFile(file, idx));
    } else {
      setImgFileList([]);
    }
  };

  // 등록 버튼 클릭 시 호출
  const handleSubmit = () => {
    // TODO: 유효성 검사 필요
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value == 'number') {
        value = value.toString();
      }
      formData.append(key, value);
    });

    // TODO: 주소 관련 전송 데이터 항목 확인 필요
    formData.append('cityName', '서울특별시');
    formData.append('cityCountryName', '영등포구');
    formData.append(
      'fullAdName',
      '서울특별시 노원구 하계동 어쩌구 저쩌구 00동 00호',
    );
    formData.append('detailAdName', '어쩌구 저쩌구 00동 00호');
    formData.append('townShipName', '하계동');

    imgFileList.forEach((file: File) => {
      formData.append('images', file);
    });

    appDispatch(postTradeApi(formData)).then(() => {
      setIsOpenSubmitModal(true);
    });

    // console.log('title?', formData.get('title'));
    // console.log('content?', formData.get('content'));
    // console.log('location?', formData.get('location'));
    // console.log('category?', formData.get('tradeCategoryDetailId'));
    // console.log('price?', formData.get('price'));
    // console.log('images?', formData.get('images'));
  };

  let fileUrls: any[] = [...previewImgList];

  // 이미지 파일 데이터 읽고 임시 url 생성
  const onReadFile = (file: any, idx: number) => {
    let fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      if (typeof data.target?.result === 'string') {
        // 파일 읽는 순으로 해당 배열의 데이터 교체
        for (let i = 0; i < previewImgList.length; i++) {
          if (i === idx) {
            fileUrls[i] = data.target.result;
          }
        }
        setPreviewImgList(fileUrls);
      }
    };
  };

  useEffect(() => {
    // TODO: 만약 삭제 기능이 있다면 예외처리 변경 필요
    const isInitArr = previewImgList.every((data) => data === null);

    if (isInitArr) {
      return;
    }

    // 미리보기 상태 변경 시 데이터가 없는 첫번째 idx 추출
    let firstNullDataIdx = previewImgList.findIndex((item) => {
      return item == null;
    });

    setShowAddBtnIdx(firstNullDataIdx);
  }, [previewImgList]);

  return (
    <>
      {isOpenSubmitModal && (
        <ModalContainer
          zIndex={100000}
          id="0"
          onClickClose={() => setIsOpenSubmitModal(false)}
        >
          <WriteResultView page={'trade'} isSuccess={isSuccess} />
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
            {/* category group name */}
            <CustomSelect
              placeholder={'카테고리를 선택해주세요.'}
              options={tempCategoryList}
            />
            {/* trade category name */}
            <CustomSelect
              placeholder={'카테고리를 선택해주세요.'}
              options={tempCategoryList}
            />
            {/* trade category detail */}
            <CustomSelect
              placeholder={'카테고리를 선택해주세요.'}
              options={tempCategoryList}
            />
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
            <LocationBtnWrapper>
              <Button
                width="auto"
                isArrowIcon={false}
                height="46px"
                _onClick={() => console.log('주소 검색 클릭 이벤트')}
                _disabled={false}
                activeBg={`${theme.colors.primary}`}
                padding="0 24px"
                activeColor={`${theme.colors.white}`}
                radius="10px"
              >
                주소검색
              </Button>
              <Button
                width="auto"
                isArrowIcon={false}
                height="46px"
                _onClick={() => console.log('기본 주소지 클릭 이벤트')}
                _disabled={false}
                activeBg={`${theme.colors.primary}`}
                padding="0 24px"
                activeColor={`${theme.colors.white}`}
                radius="10px"
              >
                기본주소지
              </Button>
            </LocationBtnWrapper>
            <Input
              margin="24px 0 0 0"
              borderRadius="28px"
              placeholder="지역을 설정해주세요."
              onChange={handleChangeInput}
              maxLength={200}
              name="location"
              padding="0 24px"
            />
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
            />
            <S.InputSubText>{form.content.length}/2000</S.InputSubText>
          </ContentContainer>
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
              {previewImgList.map((item: string, idx: number) => (
                <UploadImageBox
                  key={idx}
                  isShowAddBtn={idx === showAddBtnIdx}
                  // input file 요소 > ref를 통해 조작
                  onClick={() => {
                    idx === showAddBtnIdx && fileRef.current.click();
                  }}
                >
                  {item != null ? (
                    <PreviewImageBox
                      src={item}
                      isMainImg={idx === mainImgIdx}
                      onClick={() => setMainImgIdx(idx)}
                    />
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
    </>
  );
};

// react-select lib custom style 적용을 위한 스타일 재정의
const CustomSelect = styled(Select)`
  // select box 전체 영역
  & .css-13cymwt-control,
  .css-t3ipsp-control {
    height: 50px;
    border-radius: 28px;
    border-color: ${theme.colors.primary};
    padding: 0 14px 0 24px;
    display: flex;
    gap: 10px;
    cursor: pointer;
  }

  // default > hover
  & .css-13cymwt-control:hover {
    border-color: ${theme.colors.primary};
  }

  // click > hover
  & .css-t3ipsp-control:hover {
    border-color: ${theme.colors.primary};
  }

  // input 전체 영역
  & .css-1fdsijx-ValueContainer {
    padding: 2px 0;
  }

  & .css-1u9des2-indicatorSeparator {
    display: none;
  }

  & .css-1jqq78o-placeholder {
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  & .css-qbdosj-Input {
    display: none;
  }

  & .css-1jqq78o-placeholder {
    font-size: ${theme.fontSizes.regular};
    color: ${theme.colors.coolgray300};
  }

  // icon
  & .css-tj5bde-Svg {
    color: ${theme.colors.primary};
  }

  // list > selected 상태
  & .css-tr4s17-option {
    background-color: ${theme.colors.primary};
  }

  // list > hover 상태
  & .css-d7l1ni-option {
    background-color: ${theme.colors.sub02};
  }
`;

const LocationBtnWrapper = styled(S.RowContainer)`
  gap: 20px;

  & button {
    font-size: ${theme.fontSizes.xlg};
  }
`;

const ContentContainer = styled(S.ColumnContainer)`
  align-items: flex-end;
`;

const UploadImageCntText = styled(S.InputSubText)`
  margin-top: 2%;
  color: ${theme.colors.gray70};
`;

const UploadImageContainer = styled(S.ColumnContainer)`
  align-items: flex-start;
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
`;

const PreviewImageBox = styled.div<{ src: string; isMainImg: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 28px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  border: ${({ isMainImg }) =>
    isMainImg && `2px solid ${theme.colors.primary}`};
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
