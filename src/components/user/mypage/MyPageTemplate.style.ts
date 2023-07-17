import styled from "styled-components";

interface PropsType {
  img?: string,
}
export namespace MyPageTemplateStyle {
  export const Wrap = styled.div`
  margin: 200px auto 0 auto;
  padding: 0 18px;
  
  max-width: 1720px;
  min-width: 960px;
  `

  export const BottomSection = styled.div`
  display: flex;
  margin: 80px 0;
  height: fit-content;
  `

  export const MenuSection = styled.div`
  margin: 0 80px 0 0;
  width:200px;
  `

  export const ButtonAlign = styled.div`
  width:fit-content;
  height: fit-content;
  `

  export const UserProfileSection = styled.div`
  display: flex;
  position: relative;

  width: 100%;
  height: 146px;

  align-items: center;

  border-radius: 28px;
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`}
  `

  export const UserInfo = styled.div`
  width: fit-content;
  `

  export const Buttons = styled.div`
  position: absolute;
  display: flex;

  right: 40px;
  `

  export const UserProfileImg = styled.div<PropsType>`
  margin: 0 40px;

  width: 80px;
  height: 80px;

  border-radius: 50%;

  background-color: #a0a0a0;
  background-image: ${({ img }) => (
    img?
    `url(${img})`
    :'')};
  background-size: contain;
  `

  export const SelectedMenuSection = styled.div`
  width: 100%;
  height: auto;
  `
}