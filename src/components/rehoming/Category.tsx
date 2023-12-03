import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from 'src/asset/arrowIcon.svg';
import { useAppDispatch } from 'src/core/store';
import { getRehomingCategory } from 'src/network/api/rehoming';
import { getRehomingCategoryApi } from 'src/core/redux/post/rehomingSlice';

const menulist = [
  {
    title: 'ㄱ',
    menu: [
      { subtitle: 'ㄱ강아지', count: 300 },
      { subtitle: 'ㄱ강아지', count: 300 },
      { subtitle: 'ㄱ강아지', count: 300 },
      { subtitle: 'ㄱ강아지', count: 300 },
      { subtitle: 'ㄱ강아지', count: 300 },
    ],
    count: 5000,
  },
  {
    title: 'ㄴ',
    menu: [
      { subtitle: 'ㄴ강아지', count: 300 },
      { subtitle: 'ㄴ강아지', count: 300 },
      { subtitle: 'ㄴ강아지', count: 300 },
      { subtitle: 'ㄴ강아지', count: 300 },
      { subtitle: 'ㄴ강아지', count: 300 },
    ],
    count: 5000,
  },
  {
    title: 'ㄷ',
    menu: [
      { subtitle: 'ㄷ강아지', count: 300 },
      { subtitle: 'ㄷ강아지', count: 300 },
      { subtitle: 'ㄷ강아지', count: 300 },
      { subtitle: 'ㄷ강아지', count: 300 },
      { subtitle: 'ㄷ강아지', count: 300 },
    ],
    count: 5000,
  },
];

const Category = () => {
  const appdispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = useState<number | null>();

  const menuClickHandler = (index: number) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const renderSubMenu = (subMenu: any) => (
    <SubMenu>
      {subMenu.map((item: any, index: number) => (
        <p key={index+item.subtitle}>
          {item.subtitle} <span className="count">({item.count})</span>
        </p>
      ))}
    </SubMenu>
  );

  React.useEffect(() => {
    appdispatch(getRehomingCategoryApi('분양'));
  },[])

  return (
    <MenuBox>
      <p className="pet_type">강아지</p>
      <SearchRehoming placeholder="무엇을 찾고 계신가요?" />
      <CategoryList>
        {menulist.map((item, idx) => {
          return (
            <React.Fragment key={idx+item.title}>
              <p onClick={() => menuClickHandler(idx)}>
                {item.title} ({item.count})
              </p>
              {openMenu === idx && renderSubMenu(item.menu)}
            </React.Fragment>
          );
        })}
      </CategoryList>
    </MenuBox>
  );
};

export const MenuBox = styled.div`
  width: 300px;

  & > .pet_type {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 24px;
    font-weight: 700;
  }
`;

export const CategoryList = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  display: grid;
  gap: 24px;
  & > p {
    cursor: pointer;
  }
`;

export const SubMenu = styled.div`
  font-weight: 500;
  display: grid;
  gap: 16px;
  & > p {
    cursor: pointer;
  }
  & > p > .count {
    color: ${({ theme }) => theme.colors.coolgray400};
  }
`;

const SearchRehoming = styled.input`
  box-sizing: border-box;
  padding: 16px 30px 16px 0;
  margin: 40px 0;

  width: 100%;

  border: none;
  border-bottom: 2px solid #000;
  outline: none;

  font-size: 14px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.coolgray400};
  }
`;

export default Category;
