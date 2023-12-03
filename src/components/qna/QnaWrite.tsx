import React from 'react';
import styled from 'styled-components';
import { Button, Input } from '../shared/element';
import { useAppDispatch } from 'src/core/store';
import { modifyQnaApi, postQnaApi } from 'src/core/redux/post/qnaSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalContainer from '../common/modal/container/ModalContainer';
import WriteSuccess from './modal/WriteSuccess';

const QnaWrite = (): React.ReactElement => {
  const appdispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation().pathname.split('/');
  const pathname = location[2];
  const postId = location[3];

  const imageArr = ['', '', '', ''];
  const [mainImage, setMainImage] = React.useState(0);

  const [file, setFile] = React.useState<any>(null);

  const fileRef: any = React.useRef(null);
  const [preview, setPreview] = React.useState<any>(null);
  const [message, setMessage] = React.useState<null | number | string>(null);

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const onClickImageBox = (idx: number) => {
    setMainImage(idx);
  };

  const titleHandler = (value: string) => {
    return;
  };

  const contentHandler = (value: string) => {
    return;
  };

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

  const [openModal, setOpenModal] = React.useState(false);

  // 게시글 등록
  const submit = () => {
    // 데이터 유효성
    if (!title) {
      // 제목 작성
      window.alert('제목');
      return;
    } else if (!content) {
      // 글 내용 작성
      window.alert('내용');
      return;
    } else if (!file.length) {
      // 파일이 없을 경우
      window.alert('파일');
      return;
    } else if (file.length > 5) {
      // 파일 갯수가 5개를 초과할 경우
      window.alert('파일!');
      return;
    }
    // 폼데이터 세팅
    const formData = new FormData();
    const qnaImg: any = {
      qnaImgFile: file,
      qnaImgUrl: '',
    };

    // formData.append('title', title);
    // formData.append('content', content);
    // formData.append('images', file);
    // 이건 안 되고

    formData.append('title', title);
    formData.append('content', content);
    for (let i = 0; i < file.length; i++) {
      formData.append('images', file[i]);
    }
    // 이건 된다??

    setOpenModal(true);
    if (pathname === 'modify') {
      appdispatch(modifyQnaApi({formData:formData, postId:postId}));
    } else {
      appdispatch(postQnaApi(formData));
    }
  };

  const onClickClose = () => {
    navigate('/qna');
  };

  return (
    <Container>
      {openModal && (
        <ModalContainer zIndex={100000} id="0" onClickClose={onClickClose}>
          <WriteSuccess />
        </ModalContainer>
      )}
      <TitleBanner>
        {pathname === 'modify' ? '질문 게시글 수정하기' : '질문 게시판 글쓰기'}
      </TitleBanner>
      <FormContainer>
        <FlexSection>
          <p>제목</p>
          <Input
            borderRadius="28px"
            placeholder="제목을 입력해 주세요"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            maxLength={200}
            name="qnaTitle"
            padding="0 32px"
          />
        </FlexSection>
        <Line />
        <FlexSection>
          <p>질문 내용</p>
          <TextArea
            placeholder="중성화 여부 O / 1차 접종 X … "
            onChange={(e) => setContent(e.target.value)}
          />
        </FlexSection>
        <FlexSection>
          <p>
            이미지 <span>(0/5)</span>
          </p>
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

          
        </FlexSection>
      </FormContainer>
      <Buttons>
        <Button
          _onClick={() => {
            window.alert('임시저장');
          }}
          width="fit-content"
          bgcolor="coolgray400"
          colors="white"
          padding="20px 70px 20px 70px"
          radius="50px"
        >
          임시저장
        </Button>
        <Button
          _onClick={() => {
            // window.alert('글작성');
            submit();
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
  );
};

const Line = styled.hr`
  margin: 60px 0;
  width: 100%;
  height: 1px;
  border: none;
  background-color: #d9d9d9;
`;

const FlexSection = styled.div`
  display: flex;
  margin-bottom: 60px;

  & > p {
    width: 200px;
  }
`;

const Buttons = styled.div`
  position: absolute;
  right: 100px;
  bottom: 0;
  display: flex;
  gap: 24px;
  & > button {
    display: flex;
    align-items: center;
  }
`;

const Container = styled.div`
  padding-top: 150px;
  margin-bottom: 120px;
  width: 100%;
`;

const TitleBanner = styled.div`
  padding: 0 180px;
  width: 100%;
  height: 128px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
`;

const FormContainer = styled.div`
  padding: 80px 100px;
  & > input {
    border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  }
`;

const TextArea = styled.textarea`
  outline: none;
  padding: 32px;
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  border-radius: 28px;
  width: 100%;
  height: 320px;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-left: -12px;
`;

const ImageBox = styled.div<{ checked: any }>`
  width: 260px;
  height: 260px;
  background-color: ${({ theme }) => theme.colors.sub03};
  border-radius: 28px;
  cursor: pointer;
  border: ${(props) => (props.checked === true ? ' 4px solid red' : 'none')};
`;

const UploadImage = styled.div`
  width: 260px;
  height: 260px;
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

export default QnaWrite;
