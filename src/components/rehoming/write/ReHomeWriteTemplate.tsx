import React, { ChangeEvent, useCallback, useState } from 'react';
import { TextArea } from '../../shared/element';
import Button from '../../shared/element/Button';
import Input from '../../shared/element/Input';
import { ImageUpload } from '../../shared/input/ImageUpload';
import WritingTemplate from '../../shared/layout/WritingTemplate';
import * as S from './ReHomeWriteTemplate.style';
import TopSection from 'src/components/shared/layout/TopSection';
import { useLocation, useParams } from 'react-router-dom';
import Select from 'src/components/shared/select/Select';
import styled from 'styled-components';
import { useAppDispatch } from 'src/core/store';
import { modifyRehomingApi, postRehomingApi } from 'src/core/redux/post/rehomingSlice';
import { editReHoming } from 'src/network/api/rehoming';

const initialFormState = {
  title: '',
  description: '',
  petName: '',
  petAge: '',
  type: '199',
  category: '1',
  cityName: '경기도 부천시',
  cityCountryName: '원미구',
  townShipName: '역곡동',
  detailAdName: '유나네집',
  fullAdName: '106동 1003호',
};

const RehomeWriteTemplate = () => {
  const appdispatch = useAppDispatch();
  const params = useLocation().pathname.split('/');
  const root = params[2];
  const postId = params[3] ? params[3] : null;

  const [form, setForm] = useState(initialFormState);
  const [gender, setGender] = useState('');
  const [check, setCheck] = useState(false);

  const fileRef: any = React.useRef(null);
  const [file, setFile] = React.useState<any>(null);
  const imageArr = ['', '', '', ''];
  const [mainImage, setMainImage] = React.useState(0);

  // 업로드한 파일 가져오기
  const onChange = (e: any) => {
    if (e.target.files.length > 5) {
      // 파일 갯수 5개 초과
      window.alert('파일 5개 초과');
      return;
    } else if (e.target.files) {
      // 업로드한 파일이 있는 경우
      setFile(Array.from(e.target.files));
      window.alert('파일 업로드 완료');
    } else {
      // 업로드 취소
      setFile([]);
      return;
    }
    // // 미리보기 세팅
    // const fileArr = e.target.files;
    // let fileURLs = [];
    // let filesLength = fileArr.length > 10 ? 10 : fileArr.length;
    // let files;

    // for (let i = 0; i < filesLength; i++) {
    //   files = fileArr[i];

    //   let reader = new FileReader();
    //   reader.onload = () => {
    //     fileURLs[i] = reader.result;
    //     // setPreview([fileURLs);
    //     // setPreview([...fileURLs]);
    //   };
    //   reader.readAsDataURL(files);
    // }
  };

  const onClickImageBox = (idx: number) => {
    setMainImage(idx);
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

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((s) => ({ ...s, [name]: value }));
    },
    [form],
  );

  const onChangeTextArea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((s) => ({ ...s, [name]: value }));
    },
    [form],
  );

  const onChangeCheck = (checked: any) => {
    if (checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  // 게시글 등록
  const submit = () => {
    // 데이터 유효성
    if (!form.title) {
      // 제목 작성
      window.alert('제목 없음');
      return;
    } else if (!form.description) {
      // 글 내용 작성
      window.alert('내용 없음');
      return;
    } else if (!file.length) {
      // 파일이 없을 경우
      window.alert('파일 없음');
      return;
    } else if (file.length > 5) {
      // 파일 갯수가 5개를 초과할 경우
      window.alert('파일 개수 초과');
      return;
    }

    // form => 폼데이터 세팅
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // gender 추가
    formData.append('gender', gender);

    // 이미지 추가
    for (let i = 0; i < file.length; i++) {
      formData.append('rehomingImg', file[i]);
    }

    // 이름 없음에 체크한 경우 petName '없음'으로 등록
    if (check === true) {
      formData.delete('petName');
      formData.append('petName', '없음');
    }

    // setOpenModal(true);
    console.log(formData.get('title'));
    console.log(formData.get('rehomingImg'));
    console.log(formData.get('description'));
    console.log(formData.get('type'));
    console.log(formData.get('category'));
    switch (root) {
      case 'write':
        return appdispatch(postRehomingApi(formData));
      case 'modify':
        return appdispatch(modifyRehomingApi({formData,postId}));
    }
  };

  const onClickSearchAdress = () => {};

  const onClickDefaultAdress = () => {};

  return (
    <>
      <TopSection>
        <S.TitleText>{root==="modify"?"분양 글 수정하기":"분양 글쓰기"}</S.TitleText>
      </TopSection>

      <S.Wrap>
        {/* 제목 */}
        <S.TitleInputWrap>
          <S.H2>제목</S.H2>
          <S.InputLengthBox>
            <S.InputWrap>
              <Input
                borderRadius="28px"
                placeholder="제목을 입력해 주세요"
                onChange={onChangeInput}
                maxLength={200}
                name="title"
                padding="0 32px"
              />
            </S.InputWrap>
            <S.LengthWrap>{form.title.length}/20</S.LengthWrap>
          </S.InputLengthBox>
        </S.TitleInputWrap>

        <S.InfoTitle>반려동물 정보</S.InfoTitle>
        <S.GrayWrap>
          <S.H2>종</S.H2>
          <S.InputWrap>
            <Input
              borderRadius="28px"
              placeholder="selectbox로 수정 필요"
              defaultValue="강아지"
              onChange={onChangeInput}
              maxLength={200}
              name="category"
              padding="0 32px"
              width="110px"
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
          </S.InputWrap>
        </S.GrayWrap>
        <S.GrayWrap>
          <S.H2>이름</S.H2>
          <S.InputWrap>
            <Input
              borderRadius="28px"
              placeholder="이름을 입력해 주세요"
              onChange={(e) => {
                onChangeInput(e);
                setCheck(false);
              }}
              maxLength={200}
              name="petName"
              padding="0 32px"
              width="400px"
            />
            <S.CheckboxWrapper>
              <Input
                type="checkbox"
                placeholder=""
                onChange={(e) => {
                  onChangeCheck(e.target.checked);
                }}
                maxLength={20}
                name="unNamed"
              />
              <p>없음</p>
            </S.CheckboxWrapper>
          </S.InputWrap>
        </S.GrayWrap>
        <S.GrayWrap>
          <S.H2>생일</S.H2>
          <S.InputWrap>
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
          </S.InputWrap>
        </S.GrayWrap>
        <S.GrayWrap>
          <S.H2>성별</S.H2>
          <S.InputWrap>
            <S.CheckboxWrapper width="60px">
              <Input
                type="radio"
                placeholder=""
                onChange={() => {
                  setGender('GIRL');
                }}
                maxLength={20}
                name="gender"
              />
              <p>여</p>
            </S.CheckboxWrapper>
            <S.CheckboxWrapper width="60px">
              <Input
                type="radio"
                placeholder=""
                onChange={() => {
                  setGender('BOY');
                }}
                maxLength={20}
                name="gender"
                check={true}
              />
              <p>남</p>
            </S.CheckboxWrapper>
          </S.InputWrap>
        </S.GrayWrap>

        {/* 분양지역 */}
        <S.GrayWrap>
          <S.H2>분양 지역</S.H2>
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
              defaultValue='경기도 부천시 원미구 역곡동 유나네집, 106동 1003호'
            />
          </S.InputButtonWrap>
        </S.GrayWrap>

        {/* 설명 */}
        <S.GrayWrap>
          <S.H2>상세 설명</S.H2>
          <S.TextAreaBox>
            <TextArea
              name="description"
              placeholder="설명을 입력해주세요."
              onChange={onChangeTextArea}
              maxLength={2000}
              height="200px"
              borderRadius="28px"
              padding="24px;"
            />

            <S.LengthWrap>{form.description.length}/2000</S.LengthWrap>
          </S.TextAreaBox>
        </S.GrayWrap>

        {/* 이미지 업로드 영역 */}
        <S.ImageInputWrap>
          <S.ImageTextBox>
            <S.ImageText>이미지</S.ImageText>
            <span>(0/00)</span>
          </S.ImageTextBox>

          <div>
            <ImageContainer>
              <UploadImage>
                <div
                  onClick={() => {
                    fileRef.current.click();
                  }}
                  style={{
                    width: '65px',
                    height: '65px',
                    backgroundColor: '#fff',
                    borderRadius: '36px',
                    border: '2px solid red',
                    position: 'relative',
                    margin: '90px auto',
                  }}
                >
                  <p
                    style={{
                      fontSize: '80px',
                      fontWeight: '100',
                      position: 'absolute',
                      top: '-24px',
                      left: '7px',
                      color: 'red',
                    }}
                  >
                    +
                  </p>
                  <input
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*"
                    ref={fileRef}
                    onChange={onChange}
                  />
                </div>
              </UploadImage>
              {imageArr.map((item, idx) => {
                if (mainImage === idx) {
                  return (
                    <ImageBox
                      key={idx}
                      onClick={() => {
                        onClickImageBox(idx);
                      }}
                      checked={true}
                    />
                  );
                } else {
                  return (
                    <ImageBox
                      key={idx}
                      onClick={() => {
                        onClickImageBox(idx);
                      }}
                      checked={false}
                    />
                  );
                }
              })}
            </ImageContainer>
            <WarnMessage>
              <p>
                * 부적절한 이미지를 등록할 경우 서비스 이용에 제한 및 어려움이
                있을 수 있습니다.
              </p>
              <p>- 사진은 최대 1MB까지 업로드 가능합니다.</p>
              <p>- 문제가 발생할 경우 관리자에게 문의해주세요.</p>
            </WarnMessage>
          </div>
        </S.ImageInputWrap>
      </S.Wrap>
      <S.ButtonWrap>
        <S.ButtonInner>
          <Button
            width="auto"
            isArrowIcon={false}
            height="66px"
            _onClick={submit}
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
    </>
  );
};

const ImageContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-left: -12px;
`;

const ImageBox = styled.div<{ checked: any }>`
  width: 236px;
  height: 236px;
  background-color: ${({ theme }) => theme.colors.sub03};
  border-radius: 28px;
  cursor: pointer;
  border: ${(props) => (props.checked === true ? ' 4px solid red' : 'none')};
`;

const UploadImage = styled.div`
  width: 236px;
  height: 236px;
  background-color: ${({ theme }) => theme.colors.sub03};
  border: ${({ theme }) => `4px dashed ${theme.colors.primary}`};
  border-radius: 28px;
  cursor: pointer;
`;

const WarnMessage = styled.div`
  margin: 12px 0;
  margin-left: -12px;
  color: #858585;
`;

export default RehomeWriteTemplate;
