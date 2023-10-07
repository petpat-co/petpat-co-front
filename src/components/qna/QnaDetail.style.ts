import styled from 'styled-components';

export const Container = styled.div`
  margin: 150px auto;
  padding: 124px 102px 0 102px;
  width: 100%;
  height: 100%;
`;

export const MainInfoSection = styled.div`
  margin: auto;
  display: flex;
  width: fit-content;
  max-width: 1920px;
  background: #fff;
  padding-bottom: 136px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.primary}`};
`;

export const Info = styled.div`
  width: 100%;
  margin: 0 0 0 168px;
`;

export const ProfileBox = styled.div<{src:string}>`
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
    background-position:center;
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

export const ImageBox = styled.div`
  max-width: 800px;
`;

export const Image = styled.div`
  width: 700px;
  height: 700px;
  background: #ddd;
  border-radius: 30px;
`;

export const CommentSection = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1920px;

  & > hr {
    height: 1px;
    background-color: ${({theme}) => theme.colors.coolgray300};
    border: none;
  }
`;

export const CommentTitleBox = styled.div<{selected?: string}>`
  margin: 40px 10px 0 10px;
  display: flex;
  align-items: center;
  & > .qna_detail_commentTitle{
    font-size: ${({ theme }) => theme.fontSizes.xxlarge};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    margin-right: 52px;
  }

  & > p  {
    margin-right:20px;
    color: ${({ theme }) => theme.colors.coolgray400};
  }

  & > .qna_detail_select__old {
    font-weight: ${({selected}) => selected==='oldest'? 800 : 500};
    color: ${({selected, theme}) => selected === 'oldest' ? '#000' : theme.colors.coolgray400};
    cursor: pointer;
  }
  
  & > .qna_detail_select__new {
    font-weight: ${({selected}) => selected==='newest'? 800 : 500};
    color: ${({selected, theme}) => selected === 'newest' ? '#000' : theme.colors.coolgray400};
    cursor: pointer;
  }
`;

export const CommentWrite = styled.div`
  width: 100%;
  margin: 40px 0;
  padding: 24px 0 32px 0;
  border: ${({theme}) => `1px solid ${theme.colors.default}`};
  border-radius: 10px;

  & > .qna_comment_write__username {
    padding: 0 24px 24px 24px;
    font-size: 24px;
    font-weight: 700;
  }  
  
  & > .qna_comment_write__textarea {
    width: 100%;
    height: 100px;
    padding: 0 24px;
    border: none;
    margin: 2px 0;
    font-size: 16px;
  }
  
  & > .qna_comment_write__submit {
    float: right;
    padding: 0 32px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.coolgray500};
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
    background-color: ${({theme}) => theme.colors.coolgray100};
    display: flex;
    align-items: center;
  }

  & > button > .qna_detail_icon__arrow {
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
    margin: 0 4px 0 0;
  }
`