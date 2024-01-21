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

// ** Import utils
import theme from '../../../styles/theme';
import * as S from './Accordion.style';

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
      <S.ItemSection>{children}</S.ItemSection>
    </AccordionItemContext.Provider>
  );
};

// ** -------- AccordionTitle 영역 -------- ** /
interface AccordionTitleProps extends PropsWithChildren {
  isMain?: boolean;
}

const AccordionTitle = ({ isMain, children }: AccordionTitleProps) => {
  const { value, setter } = useAccordionContext();
  const label = useAccordionItemContext();

  // 해당 아이템이 열려있는지 확인
  const isOpened = value.has(label);

  return (
    <S.TitleSection>
      <S.TitleWrapper
        isMain={isMain}
        onClick={() => {
          setter(label);
        }}
      >
        <S.TitleText isMain={isMain}>{children}</S.TitleText>
        <Arrow
          width={isMain ? 24 : 18}
          height={isMain ? 24 : 18}
          stroke={
            isMain ? `${theme.colors.primary}` : `${theme.colors.coolgray900}`
          }
          strokeWidth="4"
          transform={`rotate(${isOpened ? -90 : 90})`}
          cursor={'pointer'}
        />
      </S.TitleWrapper>
      {isMain && <S.DividerLine />}
    </S.TitleSection>
  );
};

// ** -------- AccordionContent 영역 -------- ** /
const AccordionContent = ({ children }: PropsWithChildren) => {
  const { value } = useAccordionContext();
  const label = useAccordionItemContext();
  const isOpened = value.has(label);

  return (
    <S.ContentSection isOpened={isOpened}>
      {isOpened && <S.ContentText>{children}</S.ContentText>}
    </S.ContentSection>
  );
};

// ** -------- AccordionDetail 영역 -------- ** /
const AccordionDetail = ({ children }: PropsWithChildren) => {
  const { value } = useAccordionContext();
  const label = useAccordionItemContext();
  const isOpened = value.has(label);

  return <>{isOpened && <S.DetailText>{children}</S.DetailText>}</>;
};

const Root = AccordionRoot;
const Item = AccordionItem;
const Title = AccordionTitle;
const Content = AccordionContent;
const Detail = AccordionDetail;

export default { Root, Item, Title, Content, Detail };
