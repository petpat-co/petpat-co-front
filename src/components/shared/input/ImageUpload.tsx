import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import Utils from 'src/utils';
import styled from 'styled-components';
//스타일 관련 타입
type ImageWrapStyleProps = {
  height?: string; // 높이 기본값 282px
  bg?: string; //배경색 기본값 #D9D9D9
  border?: string; //보더 기본값 없음
  borderRadius?: string; //기본값 0px
};

interface ImageUploadProps extends ImageWrapStyleProps {
  text?: string; // 이미지 넣는 박스 안에 글 기본값: 배경사진을 선택해주세요.
  setFile: Dispatch<SetStateAction<File | null>>; // 필수값 파일 state
  imgFile: any; //파일 객체
}
export const ImageUpload = (props: ImageUploadProps) => {
  const { text, setFile, imgFile, height, bg, border, borderRadius } = props;

  const styles = {
    height,
    bg,
    border,
    borderRadius,
  };
  const [preview, setPreview] = useState('');
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      // 이미지를 선택하지 않았을 경우
      if (!file) return;
      // 이미지가 30mb 이상일 경우
      if (file.size > 1024 * 1024 * 30) {
        return window.alert('30mb 이하의 파일만 첨부 가능합니다.');
      }
      // 이미지 임시 URL 생성하여 미리보기 구현
      const imgUrl = URL.createObjectURL(file);
      setPreview(imgUrl);
      setFile(file);
    },
    [imgFile, preview],
  );
  // input 사진 박스 클릭
  const onClickImageWrap = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    (uploadRef.current as HTMLInputElement).click();
  };
  // 미리보기 이미지 삭제
  const handleClose = useCallback((e: Event) => {
    e.stopPropagation();
    setFile(null);
    setPreview('');
  }, []);
  return (
    <>
      <ImageWrap {...styles} onClick={onClickImageWrap}>
        {preview ? (
          <>
            <ImageBox src={preview} alt={`미리보기`} {...styles} />
          </>
        ) : (
          <>
            <DisplayBox></DisplayBox>
          </>
        )}
      </ImageWrap>
      <input
        ref={uploadRef}
        style={{ display: `none`, margin: 0, padding: 0 }}
        type="file"
        name="file"
        accept={Utils.allowExt}
        onChange={handleFileChange}
      />
    </>
  );
};

const ImageWrap = styled.div<ImageWrapStyleProps>`
  width: 100%;
  height: ${({ height }) => (height ? height : '282px')};
  background-color: ${({ bg }) => (bg ? bg : '#D9D9D9')};
  border: ${({ border }) => (border ? border : null)};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0px')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const ImageBox = styled.img<ImageWrapStyleProps>`
  width: 100%;
  height: ${({ height }) => (height ? height : '120px')};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '10px'};
`;
const CloseIconBox = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DisplayBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
