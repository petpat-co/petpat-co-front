import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

interface StyledProps {
  width?: string;
  height?: string;
  padding?: string;
  radius?: string;
  alignItems?: string;
  justify?: string;
}
interface PropsType {
  children: ReactNode;
  zIndex: number;
  innerStyles?: StyledProps;
  wrapStyles?: StyledProps;
  id: string;
  title?: string;
  image?: boolean;
  onClickClose: (id: string) => void;
}

//  -----------------------------------------------
//    ModalContainer
//
//    - 호출 컴포넌트에 정의
//    const [onModal, setOnModal] = React.useState(false); ------ ※ modal open:true-close:false
//    const onClickClose = () => { ------------------------------ ※ modal 닫을 때 실행되는 함수
//    setOnModal(false);
//    };
//
//    - 호출
//    {onModal && (
//       <ModalContainer
//         zIndex={1000}
//         id="modaltest"
//         onClickClose={onClickClose}
//         title="모달 타이틀" --------- ※ primary 컬러로 표시될 제목 영역. 작성하지 않는 경우 노출x
//         image={true}>  ------------- ※ icon이 있는 경우 true 지정 후 바로 아랫줄과 같이 첫번째 children으로 icon을 전달
//           <ModalIcon />
//           <p>첫번째줄</p>
//           <p>두번째줄</p>
//      </ModalContainer>
//    )}
//
//
// 24.01 [유나] 컴포넌트 수정 = {
//   기본 스타일 지정,
//   title, image 등 props 유무에 따른 분기,
//   modal 호출 방법 정리,
// }
//  -----------------------------------------------

const ModalContainer = (props: PropsType) => {
  const {
    zIndex, // zIndex 지정.
    children,
    innerStyles,
    wrapStyles,
    onClickClose, // modal 닫힐 때 실행할 함수
    id,
    title,
    image, // icon 존재 여부 boolean
  } = props;

  // modal open state
  const [isActive, setIsActive] = useState(false);

  const styles = {
    ...innerStyles,
    ...wrapStyles,
    zIndex,
    isActive,
  };

  //이벤트 전파 방지
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  // 닫기 버튼 클릭
  const handleClickCloseButton = () => {
    setIsActive(false);
    setTimeout(() => {
      onClickClose(id);
    }, 500);
  };

  useEffect(() => {
    const clearTime = setTimeout(() => {
      setIsActive(true);
    }, 1);
    return () => {
      clearTimeout(clearTime);
    };
  }, [isActive]);

  // 2024-01 유나
  // props.children 가공
  // image == true인 경우 children[0]을 icon component로 간주하여 연관 props들을 가공합니다.
  const childrenArr = React.Children.toArray(props.children);
  const modalIcon = image && childrenArr.length > 0 ? childrenArr[0] : null;
  const content = image ? childrenArr.slice(1) : childrenArr;

  // 2024-01 유나
  // background 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, [isActive]);

  return (
    <>
      <OpacityDrop />
      <Wrap {...styles} onClick={handleClickCloseButton}>
        <ModalWrapper>
          <ModalColorBanner {...styles} />
          {image && <ImageSection>{modalIcon}</ImageSection>}
          <ContentSection>
            {title && <Title>{title}</Title>}
            <div onClick={(e) => stopPropagation(e)}>{content}</div>
          </ContentSection>
        </ModalWrapper>
      </Wrap>
    </>
  );
};

export default ModalContainer;

interface WrapStyledProps extends StyledProps {
  zIndex: number;
  isActive: boolean;
}

const Wrap = styled.div<WrapStyledProps>`
  display: flex;

  position: fixed;
  top: 0;

  box-sizing: border-box;
  padding: ${({ padding }) => (padding ? padding : '0')};

  width: 100%;
  height: 100vh;

  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  opacity: 0;

  transition: opacity 0.6s;

  z-index: ${({ zIndex }) => (zIndex ? zIndex * 10 : null)};

  & > div {
    width: ${({ width }) => (width ? width : '605px')};
    height: ${({ height }) => (height ? height : 'auto')};
    padding: ${({ padding }) => (padding ? padding : '0 ')};
    box-sizing: border-box;
    border-radius: ${({ radius }) => (radius ? radius : '30px')};
    transform: translateY(100px);
    transition: transform 0.6s;
    background-color: #fff;
  }

  ${({ isActive }) =>
    isActive &&
    `
  opacity: 1;
  transition: opacity 0.6s;
  & > div {
    transform: translateY(0);
  
  }
  `}
`;

const ModalWrapper = styled.div`
  width: 100%;
`;

const ModalColorBanner = styled.div<WrapStyledProps>`
  width: 100%;
  height: 216px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ radius }) =>
    radius ? `${radius} ${radius} 0 0` : `30px 30px 0 0`};
`;

const OpacityDrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.4;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
`;

// 2024-01 유나
const ImageSection = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 150px;
  height: 150px;

  border-radius: 100px;
  background-color: #fff;

  z-index: 10;
`;

const Title = styled.div`
  margin-bottom: 16px;

  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const ContentSection = styled.div`
  width: 100%;
  padding: 100px 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.coolgray700};

  /* 동물보호법에 따라 허가받지 않은 유료 가정분양은 불법으로 규정되고 있습니다. */

  line-height: 26px;
`;
