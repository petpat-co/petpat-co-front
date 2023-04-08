import {
  ChangeEventHandler,
  KeyboardEventHandler,
  memo,
  useEffect,
  useState,
} from 'react';
import { Icon } from 'src/asset/icon/Index';
import { Text } from 'src/components/shared/element/Text';
import { SearchInput } from 'src/components/shared/input/SearchInput';
import { Modal } from 'src/types/modal';
import styled from 'styled-components';
import ModalContainer from '../../container/ModalContainer';

const ModalSearch = (props: Modal.ModalPropsType) => {
  const { onClickClose, id } = props;

  const [search, setSearch] = useState('');

  // 모달 백드롭 스크롤 막기 위한 코드
  useEffect(() => {
    document.body.style.cssText = `
	    position: fixed;
			top: -${window.scrollY}px;
	    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      console.log(search);
    }
  };

  const onClickSearch = () => {
    console.log(search);
  };

  return (
    <ModalContainer
      {...props}
      wrapStyles={{ justify: 'flex-end', alignItems: 'flex-start' }}
      innerStyles={{ width: '780px', height: '680px' }}
    >
      <Inner>
        <IconBox>
          <Icon.Close
            size="24"
            color="#000"
            onClick={() => {
              onClickClose(id);
            }}
          />
        </IconBox>
        <SearchBox>
          <SearchInput
            name={'search'}
            defaultValue={search}
            onChange={onChangeInput}
            maxLength={100}
            onClick={onClickSearch}
            onKeyUp={onKeyUp}
          />
        </SearchBox>
        <LastSearchBox>
          <Text textStyle={{ fontWeight: '700', fontSize: '18px' }}>
            최근 검색어
          </Text>
          <LastSearchInner>
            <Text textStyle={{ fontSize: '14px' }}>최근 검색어가 없어요.</Text>
          </LastSearchInner>
        </LastSearchBox>
        <PopularSearchBox>
          <Text textStyle={{ fontWeight: '700', fontSize: '18px' }}>
            인기 검색어
          </Text>
          <PopularSearchInner>
            {['포메라니안', '강아지', '고양이', '사료'].map((text) => (
              <Text textStyle={{ fontSize: '14px', margin: '14px 0 0' }}>
                {text}
              </Text>
            ))}
          </PopularSearchInner>
        </PopularSearchBox>
      </Inner>
    </ModalContainer>
  );
};

export default memo(ModalSearch);

const Inner = styled.div`
  padding: 47px 99px 0px;
  width: 100%;
  height: 513px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const IconBox = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 70px;
  margin-top: 70px;
`;
const LastSearchBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 40px;
`;
const LastSearchInner = styled.div`
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  margin-top: 16px;
  display: flex;
  align-items: center;
`;
const PopularSearchBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 40px;
`;
const PopularSearchInner = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;
