import React from 'react';
import { Button, DisplayGrid, Text } from 'src/components/shared/element';
import styled from 'styled-components';
import theme from 'src/styles/theme';

const MyPost = () => {
  const onClickReadMore = () => {};

  const ButtonStyle = {
    margin: '12px',
    padding: '0 20px',
    width: '118px',
    height: '42px',
    border: '1px solid black',
    radius: '30px',
    fontSize: '18px',
    fontWeight: '700',
  };

  const TextStyle = {
    margin: '32px 0',
    size: 'xxlarge',
    weight: 'lbold',
    colors: 'primary',
  };

  return (
    <React.Fragment>
      <PostPreviewContainer>
        <DisplayGrid height='fit-content'>
          <Text textStyle={{ ...TextStyle }}>최근 거래</Text>
          <Button {...ButtonStyle} _onClick={onClickReadMore}>
            더 보기
          </Button>
        </DisplayGrid>
        <Table>
          <th className="th-date">거래일</th>
          <th className="th-title">거래내역</th>
          <th className="th-username">거래자</th>
          <tr>
            <td>2023.06.09</td>
            <td className="td-title">
              <div />
              <Text>강아지, 푸들 / 멍멍이 / 2022년 12월 19일생 / 남</Text>
            </td>
            <td>댕댕이집사</td>
          </tr>
        </Table>
      </PostPreviewContainer>

      <PostPreviewContainer>
        <DisplayGrid height="fit-content">
          <Text textStyle={{ ...TextStyle }}>내가 좋아요 한 글</Text>
          <Button {...ButtonStyle} _onClick={onClickReadMore}>
            더 보기
          </Button>
        </DisplayGrid>
        <Table>
          <th className="th-date">거래일</th>
          <th className="th-title">거래내역</th>
          <th className="th-username">거래자</th>
          <tr>
            <td>2023.06.09</td>
            <td className="td-title">
              <div />
              <Text>강아지, 푸들 / 멍멍이 / 2022년 12월 19일생 / 남</Text>
            </td>
            <td>댕댕이집사</td>
          </tr>
        </Table>
      </PostPreviewContainer>
    </React.Fragment>
  );
};

export const PostPreviewContainer = styled.div`
  margin: 0 0 80px 0;
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-top: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  border-collapse: collapse;

  & > th {
    box-sizing: border-box;
    padding: 32px 0;
    border-bottom: 1px solid #111827;
  }

  & > tr {
    border-bottom: 1px solid #d1d5db;
  }

  & > .th-date {
    padding: 16px;
  }

  & > .th-username {
    width: 158px;
  }

  & > tr > td {
    text-align: center;
  }

  & > tr > .td-title {
    display: flex;
    align-items: center;
    text-align: left;
  }

  & > tr > td > div {
    margin: 40px 30px;
    width: 80px;
    height: 80px;
    background: #ddd;
  }
`;

export default MyPost;
