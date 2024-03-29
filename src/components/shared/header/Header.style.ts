import styled from 'styled-components';

export namespace HeaderStyle {
  export const HeaderWrap = styled.header<{ isBorder: boolean }>`
    width: 100%;
    max-width: 1440px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // ${({ isBorder }) => isBorder && `border-bottom: 2px solid #D9D9D9;`}
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 2;
    ${({ theme }) => theme.dragStyles.prventDrag};
    @media ${({ theme }) => theme.device.web} {
      width: 100%;
      padding: 0 18px;
    }
  `;
  export const LogoBox = styled.div`
    width: 182px;
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;

    & img {
      width: 182px;
    }
  `;
  export const GridBox = styled.div`
    display: flex;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  export const MenuBox = styled.div`
    width: 470px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  export const MenuItems = styled.div<{ isSelected: boolean; isMain: boolean }>`
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.xlg};
    color: ${({ isSelected, isMain }) =>
      isSelected ? '#fff' : isMain ? '#fff' : '#000'};
    border: 1px solid
      ${({ isSelected, theme, isMain }) =>
        isSelected ? theme.colors.main : isMain ? '#fff' : '#000'};
    background-color: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.main : 'none'};
    border-radius: 30px;
    cursor: pointer;
    padding: 8px 20px;
  `;
  export const WriteLoginSearchBox = styled.div`
    width: 323px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  export const WriteButton = styled.button`
    width: auto;
    padding: 0 20px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.xlg};
    border: 2px solid #2b2b2b;
    border-radius: 120px;
    color: #2b2b2b;
  `;
  export const LoginSearchBox = styled.div`
    width: fit-content;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 72px;
  `;
  export const LoginButton = styled.button<{ isMain: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;
    margin: 0 4px;
    width: fit-content;
    height: 42px;
    border-radius: 120px;
    font-weight: 700;
    border: ${({ isMain }) => (isMain ? '1px solid #fff' : '1px solid #000')};
    color: ${({ isMain }) => (isMain ? '#fff' : '#000')};
    font-size: ${({ theme }) => theme.fontSizes.xlg};
  `;
  //로그인 이후 스타일
  export const HeaderRightInner = styled.div`
    width: 180px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  export const CursorBox = styled.div`
    cursor: pointer;
    margin-right: 16px;
  `;
}
