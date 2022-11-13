import styled from 'styled-components';

export const TitleText = styled.h1`
  font-weight: 700;
  font-size: 40px;
`;

export const SubText = styled.h2`
  font-weight: 500;
  font-size: 22px;
`;

export const SearchInput = styled.input`
  height: 60px;
  width: 792px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background: #d9d9d9;
`;

export const TagContainer = styled.div`
  display: flex;
  width: 792px;
  align-items: center;
  padding: 0 8px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;

  > span {
    margin-right: 7px;
  }
`;

export const QnAContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0px;
`;

export const QnAToolWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const QnAWrap = styled.ul`
  background-color: #f8f8f8;
  padding: 30px;
`;

export const QnAItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d9d9d9;

  svg:nth-of-type(2) {
    margin-left: 7px;
  }
`;
