import React, { ReactElement } from 'react';

import * as S from './PostList.style';
import { useLocation, useNavigate } from 'react-router-dom';

type listType = {
  title: string;
  nickname: string;
  view: string;
  comment: string;
};
interface PropsType {
  list: Array<listType>;
}
const PostList = (props: PropsType | any): ReactElement => {
  const { list } = props;
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/')[3];
  const [notice, setNotice] = React.useState('작성된 게시글');

  React.useEffect(() => {
    switch (location) {
      case 'rehoming':
      case 'trade':
      case 'qna':
        setNotice('작성된 게시글');
        break;
      case 'comment':
        setNotice('작성된 댓글');
        break;
      case 'like':
        setNotice('좋아요를 누른 게시글');
        break;
      case 'bookmark':
        setNotice('북마크 한 게시글');
        break;
      default:
        window.alert('문제가 발생했습니다.');
        navigate('/mypage');
    }
  }, [location, navigate]);

  return (
    <S.TitleSection>
      <S.Table>
        <thead>
          <tr>
            <th className="th-checkbox"></th>
            <th className="th-title">제목</th>
            <th className="th-date">작성일</th>
            <th className="th-view">조회</th>
          </tr>
        </thead>
        <tbody>
          {list ? (
            list.map((data: any, i: any) => {
              return (
                <tr>
                  <td>
                    <input type="checkbox" className='check'/>
                  </td>
                  <td>{data.title}</td>
                  <td className='td-date'>{data.date}</td>
                  <td className='td-view'>{data.view}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td className="td-title__null">아직 {notice}이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </S.Table>
    </S.TitleSection>
  );
};

export default PostList;
