import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto 0 auto;
  padding: 274px 0 50px 0;
  width: 100%;
  max-width: 1440px;
  height: 100%;
`;

export const MainInfoSection = styled.div`
  position: relative;
  margin: auto;
  display: flex;
  width: 100%;
  background: #fff;
  padding-bottom: 136px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.primary}`};
`;

export const Info = styled.div`
  width: 100%;
  margin: 0 0 0 168px;
`;

export const ProfileBox = styled.div<{ src: string }>`
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  & > div {
    width: 76px;
    height: 76px;
    border-radius: 36px;
    background: #ddd;

    background-image: ${({ src }) => `url(${src})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  & > p {
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
    font-weight: 700;
    margin: 0 24px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  & > p {
    min-width: 300px;
    max-width: 544px;
    font-size: ${({ theme }) => theme.fontSizes.title};
    font-weight: 700;
    margin-right: 136px;
  }
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  & > div {
    display: flex;
    align-items: center;
    & > p {
      margin: 0 12px 0 2px;
      color: #d9d9d9;
    }
  }
`;

export const ContentBox = styled.div`
  margin-top: 80px;
`;

export const Location = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  color: ${({ theme }) => theme.colors.coolgray400};
  font-size: 24px;
  font-weight: 700;
`;

export const PetInfoSection = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 8px;
  grid-template-columns: 44px 1fr;
  grid-column-gap: 48px;

  font-size: 24px;
  color: ${({ theme }) => theme.colors.coolgray400};
`;

export const MngButtons = styled.div`
  position: absolute;
  bottom: 24px;
  right: 12px;

  display: flex;
  width: fit-content;
  gap: 20px;
  & > button {
    color: ${({ theme }) => theme.colors.coolgray400};
  }
`;

export const ImageBox = styled.div`
  max-width: 800px;
`;

export const Image = styled.div<{ src?: string }>`
  width: 700px;
  height: 700px;
  background: #ddd;
  border-radius: 30px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
`;

export const ContentSection = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1440px;
  padding: 80px 0;

  & > hr {
    height: 1px;
    background-color: ${({ theme }) => theme.colors.coolgray300};
    border: none;
  }
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.primary}`};
`;

export const CommentSection = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1920px;

  & > hr {
    height: 1px;
    background-color: ${({ theme }) => theme.colors.coolgray300};
    border: none;
  }
`;

export const CommentTitleBox = styled.div<{ selected?: string }>`
  margin: 40px 10px 0 10px;
  display: flex;
  align-items: center;
  & > .detail_commentTitle {
    font-size: ${({ theme }) => theme.fontSizes.xxlarge};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    margin-right: 52px;
  }

  & > p {
    margin-right: 20px;
    color: ${({ theme }) => theme.colors.coolgray400};
  }

  & > .detail_select__old {
    font-weight: ${({ selected }) => (selected === 'oldest' ? 800 : 500)};
    color: ${({ selected, theme }) =>
      selected === 'oldest' ? '#000' : theme.colors.coolgray400};
    cursor: pointer;
  }

  & > .detail_select__new {
    font-weight: ${({ selected }) => (selected === 'newest' ? 800 : 500)};
    color: ${({ selected, theme }) =>
      selected === 'newest' ? '#000' : theme.colors.coolgray400};
    cursor: pointer;
  }
`;

export const CommentWrite = styled.div`
  width: 100%;
  margin: 40px 0;
  padding: 24px 0 32px 0;
  border: ${({ theme }) => `1px solid ${theme.colors.default}`};
  border-radius: 10px;

  & > .comment_write__username {
    padding: 0 24px 24px 24px;
    font-size: 24px;
    font-weight: 700;
  }

  & > .comment_write__textarea {
    width: 100%;
    height: 100px;
    padding: 0 24px;
    border: none;
    margin: 2px 0;
    font-size: 16px;
  }

  & > .comment_write__submit {
    float: right;
    padding: 0 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.coolgray500};
    cursor: pointer;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  margin: 40px 0;
  display: flex;
  gap: 16px;
  justify-content: right;
  & > button {
    font-size: 16px;
    width: fit-content;
    height: fit-content;
    padding: 8px 20px;
    border-radius: 16px;
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.coolgray100};
    display: flex;
    align-items: center;
  }

  & > button > .detail_icon__arrow {
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
    margin: 0 4px 0 0;
  }
`;


export const ModalButtonWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
`