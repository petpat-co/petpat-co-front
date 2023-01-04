import { ReactElement, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from 'src/asset/arrowIcon.svg';
import { rehomingAPI } from 'src/network/api';
import Button from '../shared/element/Button';
import TopSection from '../shared/layout/TopSection';
import FrameList from '../shared/list/FrameList';
import Select from '../shared/select/Select';
import * as S from './ReHomingTemplate.style';

const RehomingTemplate = (): ReactElement => {
  const navigate = useNavigate();
  const [allValue, setAllValue] = useState<number>(0);
  const [dogCategory, setDogCategory] = useState<number>(0);
  const [category, setCategory] = useState<number>(0);
  const [pageno, setPageNo] = useState<number>(0);

  const { data, status } = useInfiniteQuery(
    ['rehomeList'],
    ({ pageParam = 1 }) =>
      rehomingAPI.getReHomingList({ params: { pageno: pageParam } }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.pageno + 1; // 다음 페이지를 호출할 때 사용 될 pageParam
      },
    },
  );
  // const { data, status } = useQuery('rehomeList', () =>
  //   rehomingAPI.getReHomingList({ params }),
  // );
  const onClickWrite = () => {
    navigate('/rehome/write');
  };
  return (
    <>
      <TopSection>
        <S.TitleText>분양글 게시판</S.TitleText>
        <Button
          width="auto"
          border="2px solid #2b2b2b"
          isArrowIcon={true}
          _onClick={() => {}}
          _disabled={false}
          activeBg="#fff"
          padding="0 20px"
          radius="120px"
        >
          <S.ButtonSpan onClick={onClickWrite}> 분양 글쓰러가기</S.ButtonSpan>
        </Button>
      </TopSection>
      <S.SelectSection>
        <S.LeftBox>
          <S.FirstBox>
            <S.HomeBox>
              <span> 홈 </span>
              <Arrow stroke="#333" strokeWidth="1" width="30" height="30" />
            </S.HomeBox>
            {firstData.map((el, idx) => {
              return (
                <S.SelectWrap key={idx}>
                  <Select
                    data={el.list}
                    value={idx ? category : dogCategory}
                    setValue={idx ? setCategory : setDogCategory}
                  />
                  {idx ? null : (
                    <Arrow
                      stroke="#333"
                      strokeWidth="1"
                      width="30"
                      height="30"
                    />
                  )}
                </S.SelectWrap>
              );
            })}
          </S.FirstBox>
          <S.SecondBox>
            {secendData.map((el, idx) => {
              return (
                <S.CategoryBox key={idx}>
                  <span>{el.text}</span>
                  <Arrow stroke="#333" strokeWidth="1" width="30" height="30" />
                </S.CategoryBox>
              );
            })}
          </S.SecondBox>
        </S.LeftBox>
        <S.RightBox>
          <Select data={mock1} value={allValue} setValue={setAllValue} />
        </S.RightBox>
      </S.SelectSection>
      <FrameList list={mockData} />
    </>
  );
};

export default RehomingTemplate;

const mock1 = ['전체보기', '최신순', '인기순'];
const firstData = [
  {
    list: ['강아지', '고양이', '기타'],
  },
  {
    list: ['강아지 간식 사료', '고양이 간식 츄르', '기타'],
  },
];
const secendData = [
  { text: '전체' },
  { text: '강아지 리빙' },
  { text: '강아지 리빙' },
  { text: '강아지 리빙' },
  { text: '강아지 리빙' },
];
const mockData = [
  {
    img: null,
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
  },
  {
    img: null,
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
  },
  {
    img: null,
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
  },
  {
    img: null,
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
  },
  {
    img: null,
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
  },
  {
    img: null,
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
  },
  {
    img: null,
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았습니다다다다다다다',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
  },

  {
    img: null,
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
  },
  {
    img: null,
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
  },
  {
    img: null,
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
  },
];
