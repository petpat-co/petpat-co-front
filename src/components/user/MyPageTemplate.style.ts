import styled from "styled-components";

export namespace MyPageTemplateStyle {
  export const Wrap = styled.div`
  display: flex;
  margin: 300px auto 0 auto;
  width: 1200px;
  `

  export const MenuSection = styled.div`
  width:400px;
  height: 400px; 
  `

  export const ButtonAlign = styled.div`
  width:fit-content;
  height: fit-content;
  `

  export const UserInfoSection = styled.div`
  width: 300px;
  height: 130px;
  `


  export const UserProfileSection = styled.div`
  display: flex;
  width: 400px;
  height: auto;
  `


  export const UserProfileImg = styled.div`
  background-color: #a0a0a0;
  width: 100px;
  height: 100px;
  `
  export const MyPageSelectedMenuSection = styled.div`
  width: 100%;
  height: auto;
  `
}