// ** Import React
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

// ** Import svg
import { ReactComponent as Arrow } from 'src/asset/arrowIcon.svg';

// ** Import lib
import styled from 'styled-components';

// ** Import utils
import theme from '../../../styles/theme';

// ** -------- AccordionRoot 영역 -------- ** /
const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw 'Error';
  }

  return context;
};

interface AccordionContextType {
  value: Set<string>; // 열려있는 아이템 정보
  setter: (item: string) => void; // 아이템 상태 변경
}

const AccordionContext = createContext<AccordionContextType | null>(null);

const AccordionRoot = (props: PropsWithChildren) => {
  const [item, setItem] = useState<Set<string>>(new Set()); // 열려있는 아이템 정보 상태관리

  // 아이템 상태를 변경해 줄 함수
  const setter = useCallback(
    (value: string) => {
      const newItem = new Set(item);

      // 이미 열려있다면 삭제, 닫혀있다면 추가
      if (item.has(value)) {
        newItem.delete(value);
      } else {
        newItem.add(value);
      }

      setItem(newItem);
    },
    [item],
  );

  return (
    <AccordionContext.Provider value={{ value: item, setter }}>
      {props.children}
    </AccordionContext.Provider>
  );
};

// ** -------- AccordionItem 영역 -------- ** /
const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw 'Error';
  }

  return context;
};

interface AccordionItemProps extends PropsWithChildren {
  value: string; // 해당 아코디언 아이템의 고유 값
}

const AccordionItemContext = createContext<string>('');

const AccordionItem = ({ value, children }: AccordionItemProps) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <ItemSection>{children}</ItemSection>
    </AccordionItemContext.Provider>
  );
};

const ItemSection = styled.div`
  margin: 24px 0;
`;

// ** -------- AccordionTitle 영역 -------- ** /
interface AccordionTitleProps extends PropsWithChildren {
  isMajor?: boolean;
}

const AccordionTitle = ({ isMajor, children }: AccordionTitleProps) => {
  const { value, setter } = useAccordionContext();
  const label = useAccordionItemContext();

  // 해당 아이템이 열려있는지 확인
  const isOpened = value.has(label);

  return (
    <TitleSection>
      <TitleWrapper
        isMajor={isMajor}
        onClick={() => {
          console.log('label => ', label);
          setter(label);
        }}
      >
        <TitleText isMajor={isMajor}>{children}</TitleText>
        <Arrow
          width={isMajor ? 24 : 18}
          height={isMajor ? 24 : 18}
          stroke={
            isMajor ? `${theme.colors.primary}` : `${theme.colors.coolgray900}`
          }
          strokeWidth="4"
          transform={`rotate(${isOpened ? -90 : 90})`}
          cursor={'pointer'}
        />
      </TitleWrapper>
      {isMajor && <DividerLine />}
    </TitleSection>
  );
};

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div<{ isMajor?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.isMajor ? `0 10px 20px 10px` : `0 2px 10px 0`)};
`;

const TitleText = styled.p<{ isMajor?: boolean }>`
  font-size: ${(props) =>
    props.isMajor ? theme.fontSizes.xxlg : theme.fontSizes.regular};
  font-weight: ${theme.fontWeights.lbold};
  color: ${(props) =>
    props.isMajor ? theme.colors.primary : theme.colors.coolgray900};
`;

export const DividerLine = styled.div`
  height: 1px;
  background: ${theme.colors.primary};
`;

// ** -------- AccordionContent 영역 -------- ** /
const AccordionContent = ({ children }: PropsWithChildren) => {
  const { value, setter } = useAccordionContext();
  const label = useAccordionItemContext();
  const isOpened = value.has(label);

  return (
    <ContentSection isOpened={isOpened}>
      {isOpened && <ContentText>{children}</ContentText>}
    </ContentSection>
  );
};

const ContentSection = styled.div<{ isOpened: boolean }>`
  max-height: ${(props) => (props.isOpened ? 800 : 0)}px;
  overflow: hidden;
  transition: ${(props) =>
    props.isOpened ? 'all 0.5s ease-in' : 'all 0.3s ease-out'};
`;

const ContentText = styled.p`
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.coolgray900};
  padding: 0 10px;
`;

// ** -------- AccordionDetail 영역 -------- ** /
const AccordionDetail = ({ children }: PropsWithChildren) => {
  const { value, setter } = useAccordionContext();
  const label = useAccordionItemContext();
  const isOpened = value.has(label);

  return <>{isOpened && <DetailText>{children}</DetailText>}</>;
};

const DetailText = styled.li`
  padding: 12px 0;
  cursor: pointer;
`;

const Root = AccordionRoot;
const Item = AccordionItem;
const Title = AccordionTitle;
const Content = AccordionContent;
const Detail = AccordionDetail;

export default { Root, Item, Title, Content, Detail };
