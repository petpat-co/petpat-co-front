import styled from 'styled-components';

export const TitleSection = styled.div``;

export const Table = styled.table`
  width: 100%;
  border-top: ${({ theme }) => `2px solid ${theme.colors.coolgray900}`};
  border-collapse: collapse;

  & > thead > tr > th {
    box-sizing: border-box;
    padding: 24px 0;
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.coolgray900}`};
  }

  & > tbody > tr {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.coolgray300}`};
  }

  & > thead > tr > .th-checkbox {
    width: 5%;
  }

  & > thead > tr > .th-title {
    width: 65%;
  }

  & > thead > tr > .th-date {
    width: 20%;
  }

  & > thead > tr > .th-view {
    width: 10%;
  }

  & > tbody > tr > td {
    padding: 24px;
  }

  & > tbody > tr > td > .check {
    accent-color: ${({theme}) => theme.colors.primary};
  }

  & > tbody > tr > .td-date, .td-view, .td-title__null  {
    text-align: center;    
  }

`;
