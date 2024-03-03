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

export type AccordionPropsType = {
  id: number;
  value: string;
};

// ** -------- AccordionRoot 영역 -------- ** /
const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionContext is undefined');
  }

  return context;
};

interface AccordionContextType {
  value: Set<string>; // 열려있는 아이템 정보
  setter: (item: string) => void; // 아이템 상태 변경
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionRootProps extends PropsWithChildren {
  initData: {
    lastInfo: AccordionPropsType;
    parentInfo: AccordionPropsType;
    childInfo?: AccordionPropsType | null;
  }; // 열려있는 아이템 초기 정보
}

const AccordionRoot = ({ initData, children }: AccordionRootProps) => {
  const initItems = [
    initData.parentInfo.value,
    initData.childInfo?.value,
  ].filter((value): value is string => value !== undefined);

  const [item, setItem] = useState<Set<string>>(new Set(initItems)); // 열려있는 아이템 정보 상태관리

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
      {children}
    </AccordionContext.Provider>
  );
};

// ** -------- AccordionItem 영역 -------- ** /
const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionItemContext is undefined');
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
  isMain?: boolean; // 최상위 정보 여부
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
interface AccordionDetailProps extends PropsWithChildren {
  parentObj: AccordionPropsType; // 상위 그룹 정보
  childObj?: AccordionPropsType | null; // 하위 그룹 정보 (nullable)
  currentObj: AccordionPropsType; // 최종 선택 정보
  sendData: (
    currentObj: AccordionPropsType,
    parentObj: AccordionPropsType,
    childObj?: AccordionPropsType | null,
  ) => void;
  isSelected: boolean; // 선택 상태 여부
}

const AccordionDetail = ({
  currentObj,
  parentObj,
  childObj,
  sendData,
  isSelected,
  children,
}: AccordionDetailProps) => {
  const { value } = useAccordionContext();
  const label = useAccordionItemContext();
  const isOpened = value.has(label);

  // 카테고리 클릭 시 부모 컴포넌트로 선택한 카테고리 정보 전달
  const handleClick = () => {
    sendData(currentObj, parentObj, childObj);
  };

  return (
    <>
      {isOpened && (
        <S.DetailText isSelected={isSelected} onClick={handleClick}>
          {children}
        </S.DetailText>
      )}
    </>
  );
};

const Root = AccordionRoot;
const Item = AccordionItem;
const Title = AccordionTitle;
const Content = AccordionContent;
const Detail = AccordionDetail;

export default { Root, Item, Title, Content, Detail };
