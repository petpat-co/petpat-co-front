import React from 'react';
import styled from 'styled-components';

import { useAppDispatch } from 'src/core/store';
import { useLocation, useNavigate } from 'react-router-dom';

import WriteSuccess from './modal/WriteSuccess';
import InputErrorMessage from '../common/InputErrorMessage';

import theme from 'src/styles/theme';
import TopSection from '../shared/layout/TopSection';
import * as S from '../shared/board/WriteTemplate.style';
import { Button, Input, TextArea } from '../shared/element';
import ModalContainer from '../common/modal/container/ModalContainer';

import { ReactComponent as Add } from 'src/asset/icon/add.svg';
import { ReactComponent as DeleteIcon } from 'src/asset/close.svg';
import {
  modifyQnaApi,
  postQnaApi,
  postQnaError,
} from 'src/core/redux/post/qnaSlice';
import { useSelector } from 'react-redux';
import { ReactComponent as SuccessIcon } from 'src/asset/modalicon/success.svg';
import { ReactComponent as FailIcon } from 'src/asset/modalicon/sadface.svg';

const initialFormState = {
  title: '질문 글 제목',
  content: '질문 글 내용',
};

interface ALERT {
  [key: string]: { title: string; content: string };
}

// TODO : 
// - modify 루트 image 매핑
// - modify 에러 발생 - 서버 문의 필요
// {
//  "message": "Content type 'multipart/form-data;boundary=----WebKitFormBoundaryRasIKcpvmGU7hG4l;charset=UTF-8' not supported",
//  "httpStatus": "INTERNAL_SERVER_ERROR"
// }
const QnaWrite = (): React.ReactElement => {
  const appdispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation().pathname.split('/');
  const pathname = location[2];
  const postId = location[3];

  const ALERT: ALERT = {
    titleEmpty: {
      title: '제목이 입력되지 않았습니다.',
      content: '입력 후 다시 시도해주세요.',
    },
    contentEmpty: {
      title: '질문 내용이 입력되지 않았습니다.',
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

  // --- modal
  const [onModal, setOnModal] = React.useState(false);

  // useSelector
  // -- postData
  const qnaData = useSelector((state: any) => state?.qna?.post);
  // --- error
  const onPostQnaError = useSelector(postQnaError);

  const onClickClose = () => {
    navigate('/qna');
  };

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

  // 엽로드한 파일들 불러오기
  // 현재 QNA image idx 적용되어있지 않음
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

  // 글 작성
  const handleSubmit = () => {
    const currentFormArray = Object.entries(form);

    // 유효성 검사
    for (const [key, value] of currentFormArray) {
      if (!value) {
        const alertKey = `${key}Empty`;
        const message = ALERT[alertKey]?.title;
        setFormError({ key, message });
        return;
      }
    }

    if (imgFileList.length == 0) {
      const message = ALERT.imageEmpty.title;
      setFormError({ key: 'images', message });
      return;
    }

    // formData 세팅
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    for (let i = 0; i < imgFileList.length; i++) {
      formData.append('images', imgFileList[i].file);
    }

    // 글 작성
    post(formData);
  };

  // 글 작성하기
  // => 응답 대기하여 reject인 경우 onError true? > modal 메시지 분기
  const post = async (formData: FormData) => {
    try {
      // 현재 글 작성 루트에 따라 dispatch 분기
      switch (pathname) {
        case 'write':
          await appdispatch(postQnaApi(formData));
          return;
        case 'modify':
          await appdispatch(modifyQnaApi({postId, formData}));
          return;
      }
    } catch (e) {
      // response = reject
      console.error('[QNA WRITE] PostQna Error : ', e);
    } finally {
      // modal popup
      // onPostError의 값에 따라 메시지 분기됨
      setOnModal(true);
    }
  };

  React.useEffect(() => {
    // 미리보기 상태 변경 시 데이터가 없는 첫번째 idx 추출
    let firstNullDataIdx = previewImgList.findIndex((item) => {
      return item == null;
    });
    setShowAddBtnIdx(firstNullDataIdx);
  }, [previewImgList]);

  return (
    <>
      <TopSection>
        <TitleText>
          {pathname === 'modify'
            ? '질문 게시글 수정하기'
            : '질문 게시판 글쓰기'}
        </TitleText>
      </TopSection>
      <Container>
        <S.InputSectionContainer>
          <S.InputTitleWrapper>
            <S.InputTitleText>제목</S.InputTitleText>
          </S.InputTitleWrapper>
          <S.InputSectionWrapper>
            <S.RowContainer>
              <Input
                borderRadius="28px"
                placeholder="제목을 입력해주세요."
                onChange={onChangeInput}
                maxLength={20}
                name="title"
                padding="0 24px"
                defaultValue={pathname === 'modify' ? qnaData?.title : ''}
              />
              <S.InputSubText>{form.title.length}/20</S.InputSubText>
              {formError.key === 'title' && (
                <InputErrorMessage top={58} message={formError.message} />
              )}
            </S.RowContainer>
          </S.InputSectionWrapper>
        </S.InputSectionContainer>

        <S.DividerLine />

        <S.InputSectionContainer>
          <S.InputTitleWrapper>
            <S.InputTitleText>질문 내용</S.InputTitleText>
          </S.InputTitleWrapper>
          <S.InputSectionWrapper>
            <ContentContainer>
              <TextArea
                name="content"
                placeholder="설명을 입력해주세요."
                onChange={onChangeTextArea}
                maxLength={2000}
                height="400px"
                borderRadius="28px"
                padding="24px;"
                fontSize={`${theme.fontSizes.regular}`}
                defaultValue={pathname==='modify'?qnaData?.content:''}
              />
              <S.InputSubText>{form.content.length}/2000</S.InputSubText>
            </ContentContainer>
            {formError.key === 'content' && (
              <InputErrorMessage top={210} message={formError.message} />
            )}
          </S.InputSectionWrapper>
        </S.InputSectionContainer>
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
          </S.InputSectionWrapper>
        </S.InputSectionContainer>

        <Buttons>
          <Button
            _onClick={() => {
              // window.alert('글작성');
              // submit();
              handleSubmit();
            }}
            width="fit-content"
            bgcolor="primary"
            colors="white"
            padding="20px 70px 20px 70px"
            radius="50px"
          >
            등록하기
          </Button>
        </Buttons>
      </Container>

      {/* ---------- 모달영역 ---------- */}
      {onModal && (
        <ModalContainer
          zIndex={1000}
          id="postDeleted"
          onClickClose={onClickClose}
          title={
            !onPostQnaError
              ? '게시글이 등록되었습니다.'
              : '문제가 발생했습니다.'
          }
          image={true}
        >
          {!onPostQnaError ? <SuccessIcon /> : <FailIcon />}
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

const ContentContainer = styled(S.ColumnContainer)`
  align-items: flex-end;
`;

export const TitleText = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: #fff;
`;

const Buttons = styled.div`
  padding: 60px;
  display: flex;
  justify-content: flex-end;
  & > button {
    display: flex;
    align-items: center;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  margin-bottom: 120px;
  width: 100%;
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

export default QnaWrite;
