import React, { ChangeEvent, useCallback, useState } from 'react';
import { TextArea } from '../../shared/element';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/core/store';

import styled from 'styled-components';
import TopSection from 'src/components/shared/layout/TopSection';
import ModalContainer from '../../common/modal/container/ModalContainer';
import InputErrorMessage from '../../common/InputErrorMessage';

import Button from '../../shared/element/Button';
import Input from '../../shared/element/Input';
import * as WT from '../../shared/board/WriteTemplate.style';
import * as S from './ReHomeWriteTemplate.style';

import theme from 'src/styles/theme';
import { ReactComponent as Add } from 'src/asset/icon/add.svg';
import { ReactComponent as DeleteIcon } from 'src/asset/close.svg';
import { ReactComponent as SuccessIcon } from 'src/asset/modalicon/success.svg';
import { ReactComponent as FailIcon } from 'src/asset/modalicon/sadface.svg';

import {
  addPostApi,
  modifyPostApi,
  selectOnAddPostError,
} from 'src/core/redux/post/postSlice';
import { useSelector } from 'react-redux';
import Select from 'src/components/shared/select/Select';

interface ALERT {
  [key: string]: { title: string; content: string };
}

const initialFormState = {
  title: '',
  content: '',
  petName: '',
  petAge: '',
  type: '199',
  category: '',
  cityName: '경기도 부천시',
  cityCountryName: '원미구',
  townShipName: '역곡동',
  detailAdName: '유나네집',
  fullAdName: '106동 1003호',
  // 강아지
  dhppl: false,
  covidEnteritis: false,
  kennelCough: false,
  influenza: false,
  // 고양이
  comprehensiveVaccine: false,
  fpv: false,
  felv: false,
  // 공통 
  rabies: false,
};

const RehomeWriteTemplate = () => {
  const navigate = useNavigate();
  const appdispatch = useAppDispatch();

  // --- location
  const location = useLocation().pathname.split('/');
  const pathname = location[2];
  const postId = location[3];

  // --- check box
  const [noName, setNoName] = useState(false);

  // --- select box
  const petCategory = ['강아지', '고양이', '기타'];
  const [selectedCategory, setSelectedCategory] = useState(0);

  // --- form data
  const fileRef: any = React.useRef(null);
  const [form, setForm] = React.useState(initialFormState);

  const [imgFileList, setImgFileList] = React.useState<any[]>([]);
  const [previewImgList, setPreviewImgList] = React.useState<any[]>(
    new Array(5).fill(null),
  );
  let fileUrls: any[] = [...previewImgList];
  const [showAddBtnIdx, setShowAddBtnIdx] = React.useState<number>(0);
  const [mainImgIdx, setMainImgIdx] = React.useState<number>(0);
  const [formError, setFormError] = React.useState({ key: '', message: '' });

  // --- error
  const onPostError = useSelector(selectOnAddPostError);

  // --- modal
  const [onModal, setOnModal] = React.useState(false);

  const onClickClose = () => {
    navigate('/rehome');
  };

  const ALERT: ALERT = {
    titleEmpty: {
      title: '제목이 입력되지 않았습니다.',
      content: '입력 후 다시 시도해주세요.',
    },
    contentEmpty: {
      title: '내용이 입력되지 않았습니다.',
      content: '입력 후 다시 시도해주세요.',
    },
    imageEmpty: {
      title: '이미지가 등록되지 않았습니다.',
      content: '등록 후 다시 시도해주세요.',
    },
    imageSizeOver: {
      title: '이미지 제한을 초과하였습니다.',
      content: '5장 이하의 이미지를 등록해주세요.',
    },
    imageUploadSuccess: {
      title: '이미지 등록에 성공했습니다.',
      content: '',
    },
    success: {
      title: '게시글 등록에 성공했습니다!',
      content: '게시글로 이동합니다.',
    },
    fail: {
      title: '등록에 실패했습니다.',
      content: '게시글 목록으로 이동합니다.',
    },
  };

  const onChangeDate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const date =
        '' + value.split('-')[0] + value.split('-')[1] + value.split('-')[2];
      setForm((s) => ({ ...s, [name]: date }));
    },
    [form],
  );

  const onChangeInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((s) => ({ ...s, [name]: value }));
    },
    [form],
  );

  const onChangeTextArea = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((s) => ({ ...s, [name]: value }));
    },
    [form],
  );

  const onChangeSelect = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((s) => ({ ...s, [name]: value }));
    },
    [form],
  );

  const onChangeCheckbox = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setForm((s) => ({ ...s, [name]: checked }));
    },
    [form],
  );

  const onChangeRadio = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((s) => ({ ...s, [name]: value }));
    },
    [form],
    );
    

  const onChangeNoName = (checked: any) => {
    if (checked) {
      setNoName(true);
    } else {
      setNoName(false);
    }
  };

  const onClickSearchAdress = () => {};

  const onClickDefaultAdress = () => {};

  // 엽로드한 파일들 불러오기
  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;

    if (uploadFiles) {
      let uploadFileArr = Array.from(uploadFiles).map((file, idx) => {
        return {
          id: idx,
          file: file,
        };
      });

      if (uploadFileArr.length > 5) {
        window.alert(ALERT.imageSizeOver.title);
        uploadFileArr = uploadFileArr.slice(0, 5);
      }

      setImgFileList(uploadFileArr);
      window.alert(ALERT.imageUploadSuccess.title);
      setFormError({ key: '', message: '' });

      // 파일 데이터 > 미리보기용 url 세팅
      uploadFileArr.forEach((file, idx) => onReadFile(file, idx));
    } else {
      setImgFileList([]);
    }
  };

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
          file: data,
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

  // 글 작성 전처리
  const handleSubmit = () => {
    form.category = selectedCategory+1+'';
    const currentFormArray = Object.entries(form);
    // 유효성 검사
    console.log('dddd')
    console.log(currentFormArray);
    for (const [key, value] of currentFormArray) {
      // if (!value) {
      //   console.log(key)
      //   const alertKey = `${key}Empty`;
      //   const message = ALERT[alertKey]?.title;
      //   setFormError({ key, message });
      //   return;
      // }
    }
    if (imgFileList.length == 0) {
      console.log('dddasasdfasdf')
      const message = ALERT.imageEmpty.title;
      setFormError({ key: 'images', message });
      return;
    }

    // formData 세팅
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        // boolean값 가진 데이터 string타입으로 변경
        formData.append(key, value ? 'true' : 'false');
      } else {
        // 그 외의 값은 그대로 추가
        formData.append(key, value);
      }
    });

    // --- formData 추가 세팅
    // 이름 없음 체크한 경우 이름 '없음'으로 저장
    if (noName === true) {
      formData.delete('petName');
      formData.append('petName', '없음');
    }
    // 이미지 파일
    for (let i = 0; i < imgFileList.length; i++) {
      //formData.append('images', imgFileList[i].file);
      formData.append('rehomingImg', imgFileList[i].file);
    }
    // 반려동물 종류 (1.강아지, 2.고양이, 3.기타)
    formData.append('category', selectedCategory + 1 + '');
    // TODO : 반려동물 종

    // 글 작성 진행
    console.log('ddd')
    post(formData);
  };

  // 글 작성하기
  // => 응답 대기하여 reject인 경우 onError true? > modal 메시지 분기
  const post = async (formData: FormData) => {
    try {
      // 현재 글 작성 루트에 따라 dispatch 분기
      switch (pathname) {
        case 'write':
          console.log(formData)
          await appdispatch(addPostApi({ postType: 'rehoming', formData }));
          return;
        case 'modify':
          await appdispatch(
            modifyPostApi({ postId, postType: 'rehoming', formData }),
          );
          return;
      }
    } catch (e) {
      // response = reject
      console.error('[REHOMING WRITE] PostRehoming Error : ', e);
    } finally {
      // modal popup
      // onPostError의 값에 따라 메시지 분기됨
      setOnModal(true);
    }
  };

  return (
    <>
      <TopSection>
        <S.TitleText>
          {pathname === 'modify' ? '분양 글 수정하기' : '분양 글쓰기'}
        </S.TitleText>
      </TopSection>

      <S.Wrap>
        {/* 제목 */}
        <WT.InputSectionContainer>
          <WT.InputTitleWrapper>
            <WT.InputTitleText>제목</WT.InputTitleText>
          </WT.InputTitleWrapper>
          <WT.InputSectionWrapper>
            <WT.RowContainer>
              <Input
                borderRadius="28px"
                placeholder="제목을 입력해 주세요"
                onChange={onChangeInput}
                maxLength={200}
                name="title"
                padding="0 32px"
              />
              <WT.InputSubText>{form.title.length}/20</WT.InputSubText>
              {formError.key === 'title' && (
                <InputErrorMessage top={58} message={formError.message} />
              )}
            </WT.RowContainer>
          </WT.InputSectionWrapper>
        </WT.InputSectionContainer>
      </S.Wrap>
      <S.HR />
      <S.Wrap>
        <S.InfoTitle>반려동물 정보</S.InfoTitle>

        {/* 반려동물 종/품종 카테고리 */}
        <WT.InputSectionContainer>
          <WT.InputTitleWrapper>
            <WT.InputTitleText>종</WT.InputTitleText>
          </WT.InputTitleWrapper>
          <WT.InputSectionWrapper>
            <WT.RowContainer>
              <Select
                data={petCategory}
                value={selectedCategory}
                setValue={setSelectedCategory}
                height={50}
                borderColor={theme.colors.primary}
              />
              <Input
                borderRadius="28px"
                placeholder="종을 선택해 주세요"
                onChange={onChangeInput}
                defaultValue="포메라니안"
                maxLength={200}
                name="category"
                padding="0 32px"
                width="400px"
              />
            </WT.RowContainer>
          </WT.InputSectionWrapper>
        </WT.InputSectionContainer>

        {/* 반려동물 이름 */}
        {/* 없음 선택시 '없음' 저장 */}
        <WT.InputSectionContainer>
          <WT.InputTitleWrapper>
            <WT.InputTitleText>이름</WT.InputTitleText>
          </WT.InputTitleWrapper>
          <WT.InputSectionWrapper>
            <WT.RowContainer>
              <Input
                borderRadius="28px"
                placeholder="이름을 입력해 주세요"
                onChange={(e) => {
                  onChangeInput(e);
                  setNoName(false);
                }}
                maxLength={200}
                name="petName"
                padding="0 32px"
                width="400px"
              />
              <S.CheckboxWrapper>
                <Input
                  name="noName"
                  type="checkbox"
                  placeholder=""
                  onChange={(e) => {
                    onChangeNoName(e.target.checked);
                  }}
                  maxLength={20}
                />
                <p>없음</p>
              </S.CheckboxWrapper>
            </WT.RowContainer>
          </WT.InputSectionWrapper>
        </WT.InputSectionContainer>

        {/* 반려동물 생일 */}
        <WT.InputSectionContainer>
          <WT.InputTitleWrapper>
            <WT.InputTitleText>생일</WT.InputTitleText>
          </WT.InputTitleWrapper>
          <WT.InputSectionWrapper>
            <WT.RowContainer>
              <Input
                type="date"
                borderRadius="28px"
                placeholder=""
                onChange={onChangeDate}
                maxLength={200}
                name="petAge"
                padding="0 32px"
                width="190px"
              />
            </WT.RowContainer>
          </WT.InputSectionWrapper>
        </WT.InputSectionContainer>

        {/* 반려동물 성별 */}
        {/* 성별 필수/중성화 선택/성별+중성화 중복선택 가능 */}
        <WT.InputSectionContainer>
          <WT.InputTitleWrapper>
            <WT.InputTitleText>성별</WT.InputTitleText>
          </WT.InputTitleWrapper>
          <WT.InputSectionWrapper>
            <WT.RowContainer>
              <S.CheckboxWrapper width="60px">
                <Input
                  placeholder=""
                  type="radio"
                  maxLength={20}
                  name="gender"
                  value="GIRL"
                  onChange={onChangeRadio}
                />
                <p>여</p>
              </S.CheckboxWrapper>
              <S.CheckboxWrapper width="60px">
                <Input
                  placeholder=""
                  type="radio"
                  maxLength={20}
                  name="gender"
                  value="BOY"
                  onChange={onChangeRadio}
                />
                <p>남</p>
              </S.CheckboxWrapper>
              <S.CheckboxWrapper>
                <Input
                  placeholder=""
                  type="checkbox"
                  maxLength={20}
                  name="isNeutralized"
                  value="isNeutralized"
                  onChange={onChangeCheckbox}
                />
                <p>중성화</p>
              </S.CheckboxWrapper>
            </WT.RowContainer>
          </WT.InputSectionWrapper>
        </WT.InputSectionContainer>
 


        {/* 예방접종 여부 */}
        {selectedCategory == 0 || selectedCategory == 1 ? (
          <WT.InputSectionContainer>
            <WT.InputTitleWrapper>
              <WT.InputTitleText>예방접종</WT.InputTitleText>
            </WT.InputTitleWrapper>
            <WT.InputSectionWrapper>
              {selectedCategory == 0 && (
                <S.Grid>
                  <S.CheckboxWrapper width="fit-content">
                    <Input
                      placeholder=""
                      type="checkbox"
                      maxLength={20}
                      name="dhppl"
                      value="DHPPL(종합 백신)"
                      onChange={onChangeCheckbox}
                    />
                    <p>DHPPL(종합 백신)</p>
                  </S.CheckboxWrapper>{' '}
                  <S.CheckboxWrapper width="fit-content">
                    <Input
                      placeholder=""
                      type="checkbox"
                      maxLength={20}
                      name="covidEnteritis"
                      value="코로나 장염"
                      onChange={onChangeCheckbox}
                    />
                    <p>코로나 장염</p>
                  </S.CheckboxWrapper>
                  <S.CheckboxWrapper width="fit-content">
                    <Input
                      placeholder=""
                      type="checkbox"
                      maxLength={20}
                      name="kennelCough"
                      value="컨넬코프"
                      onChange={onChangeCheckbox}
                    />
                    <p>켄넬 코프(기관지염)</p>
                  </S.CheckboxWrapper>
                  {/* 비필수 */}
                  <S.CheckboxWrapper width="fit-content">
                    <Input
                      placeholder=""
                      type="checkbox"
                      maxLength={20}
                      name="influenza"
                      value="인플루엔자"
                      onChange={onChangeCheckbox}
                      />
                    <p>인플루엔자</p>
                  </S.CheckboxWrapper>
                  <S.CheckboxWrapper width="fit-content">
                    <Input
                      placeholder=""
                      type="checkbox"
                      maxLength={20}
                      name="rabies"
                      value="광견병"
                      onChange={onChangeCheckbox}
                      />
                    <p>광견병</p>
                  </S.CheckboxWrapper>
                </S.Grid>
              )}
              {selectedCategory == 1 && (
                <S.Grid>
                  <S.CheckboxWrapper width="fit-content">
                    <Input
                      placeholder=""
                      type="checkbox"
                      maxLength={20}
                      name="comprehensiveVaccine"
                      value="종합접종"
                      onChange={onChangeCheckbox}
                      />
                    <p>종합 접종</p>
                  </S.CheckboxWrapper>
                  <S.CheckboxWrapper width="fit-content">
                    <Input
                      placeholder=""
                      type="checkbox"
                      maxLength={20}
                      name="rabies"
                      value="광견병"
                      onChange={onChangeCheckbox}
                      />
                    <p>광견병</p>
                  </S.CheckboxWrapper>
                  <S.CheckboxWrapper width="fit-content">
                    <Input
                      placeholder=""
                      type="checkbox"
                      maxLength={20}
                      name="fpv"
                      value="FPV"
                      onChange={onChangeCheckbox}
                      />
                    <p>FPV(범백혈구 감소증)</p>
                  </S.CheckboxWrapper>
                  <S.CheckboxWrapper width="fit-content">
                    <Input
                      placeholder=""
                      type="checkbox"
                      maxLength={20}
                      name="felv"
                      value="FeLV"
                      onChange={onChangeCheckbox}
                      />
                    <p>FeLV(고양이 백혈병)</p>
                  </S.CheckboxWrapper>
                </S.Grid>
              )}
            </WT.InputSectionWrapper>
          </WT.InputSectionContainer>
          ) : null}
         



        {/* 분양지역 */}
        {/* TODO
        : SELECTBOX로 변경
      */}
      <WT.InputSectionContainer>
          <WT.InputTitleWrapper>
            <WT.InputTitleText>분양지역</WT.InputTitleText>
          </WT.InputTitleWrapper>
          <WT.InputSectionWrapper>
            <WT.RowContainer>
              <S.InputButtonWrap>
                <div>
                  <Button
                    width="auto"
                    isArrowIcon={false}
                    height="46px"
                    _onClick={onClickSearchAdress}
                    _disabled={false}
                    activeBg="#F35F4C"
                    padding="0 24px"
                    activeColor="#fff"
                    radius="10px"
                    >
                    주소검색
                  </Button>
                  <Button
                    width="auto"
                    isArrowIcon={false}
                    height="46px"
                    _onClick={onClickDefaultAdress}
                    _disabled={false}
                    activeBg="#F35F4C"
                    padding="0 24px"
                    activeColor="#fff"
                    radius="10px"
                  >
                    기본주소지
                  </Button>
                </div>
                <Input
                  margin="24px 0 0 0"
                  borderRadius="28px"
                  placeholder="지역을 설정해주세요."
                  onChange={() => {}}
                  maxLength={200}
                  name="location"
                  padding="0 24px"
                  defaultValue="경기도 부천시 원미구 역곡동 유나네집, 106동 1003호"
                />
              </S.InputButtonWrap>
            </WT.RowContainer>
          </WT.InputSectionWrapper>
        </WT.InputSectionContainer>

        {/* 설명 */}
        <WT.InputSectionContainer>
          <WT.InputTitleWrapper>
            <WT.InputTitleText>상세 설명</WT.InputTitleText>
          </WT.InputTitleWrapper>
          <WT.InputSectionWrapper>
            <S.TextAreaBox>
              <TextArea
                name="content"
                placeholder="설명을 입력해주세요."
                onChange={onChangeTextArea}
                maxLength={2000}
                height="200px"
                borderRadius="28px"
                padding="24px;"
                fontSize={`${theme.fontSizes.regular}`}
              />

              <S.LengthWrap>{form.content.length}/2000</S.LengthWrap>
            </S.TextAreaBox>
            {formError.key === 'content' && (
              <InputErrorMessage top={210} message={formError.message} />
            )}
          </WT.InputSectionWrapper>
        </WT.InputSectionContainer>

        {/* 이미지 업로드 영역 */}
        <WT.InputSectionContainer>
          <WT.InputTitleWrapper>
            <WT.InputTitleText>이미지</WT.InputTitleText>
            <UploadImageCntText>
              ({previewImgList.filter((image) => image != null).length}/5)
            </UploadImageCntText>
          </WT.InputTitleWrapper>
          <WT.InputSectionWrapper>
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
                        <PreviewImageBox
                          src={item.url}
                          isMainImg={idx === mainImgIdx}
                          onClick={() => setMainImgIdx(idx)}
                        />
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
                <InputErrorMessage top={224} message={formError.message} />
              )}
            </UploadImageContainer>
          </WT.InputSectionWrapper>
        </WT.InputSectionContainer>
      </S.Wrap>

      {/* 글 작성 버튼 */}
      <S.ButtonWrap>
        <S.ButtonInner>
          <Button
            width="auto"
            isArrowIcon={false}
            height="66px"
            _onClick={handleSubmit}
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

      {/* ---------- 모달영역 ---------- */}
      {onModal && (
        <ModalContainer
          zIndex={1000}
          id="postDeleted"
          onClickClose={onClickClose}
          title={
            !onPostError ? '게시글이 등록되었습니다.' : '문제가 발생했습니다.'
          }
          image={true}
        >
          {!onPostError ? <SuccessIcon /> : <FailIcon />}
          <Button
            margin="20px 0 0 0"
            width="200px"
            _onClick={onClickClose}
            modal
          >
            목록으로 이동하기
          </Button>
        </ModalContainer>
      )}
    </>
  );
};

const UploadImageCntText = styled(WT.InputSubText)`
  margin-top: 2%;
  color: ${theme.colors.gray70};
`;

const UploadImageContainer = styled(WT.ColumnContainer)`
  align-items: flex-start;
  position: relative;
`;

const UploadImageWrapper = styled(WT.RowContainer)`
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

const InfoText = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.grayText};
  line-height: 1.75;
`;

export default RehomeWriteTemplate;
