import React from 'react';
import Select from '../shared/select/Select';
import * as S from './QnaTemplate.style';
import QnaItem from './QnaItem';
import { ReactComponent as GlassIcon } from '../../asset/icon/glass.svg';
import { useAppDispatch } from 'src/core/store';
import { getQnaListApi } from 'src/core/redux/post/qnaSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '../shared/element';
import ModalContainer from '../common/modal/container/ModalContainer';
import TopSection from '../shared/layout/TopSection';
import { access, refresh } from 'src/core/redux/user/userSlice';

const QnaTemplate = () => {
  const appdispatch = useAppDispatch();
  const navigate = useNavigate();

  const mockSelect = ['최신순', '좋아요순', '댓글순'];
  const postList = useSelector((state: any) => state.qna.list?.content);
  const [value, setValue] = React.useState<number>(0);
  const [pageNo, setPageNo] = React.useState<number>(0);

  console.log(postList);
  const onClickWrite = () => {
    navigate('/qna/write');
  };

  const onClickClose = () => {
    window.alert('닫기');
  };

  React.useEffect(() => {
    appdispatch(getQnaListApi(pageNo));
    appdispatch(refresh(''));
    appdispatch(access(''));
  }, []);

  return (
    <React.Fragment>
      <S.Container>
        <TopSection>
          <S.TitleText>질문 게시판</S.TitleText>
          <Button
            width="auto"
            border="2px solid #111827"
            _onClick={() => {}}
            _disabled={false}
            activeBg="#fff"
            padding="0 20px"
            radius="120px"
            margin="0 8px 0 0"
          >
            <S.ButtonSpan onClick={onClickWrite}>질문 올리기</S.ButtonSpan>
          </Button>
        </TopSection>

        <S.BannerSection>
          <div>
            <S.MainText>질문 게시판에 무엇이든 물어보세요</S.MainText>
            <S.SubText>
              환영해요! 무엇이든 물어볼 수 있는 질문 게시판입니다.
            </S.SubText>
          </div>
          <div className="search">
            <S.SearchInput placeholder="검색어를 입력해주세요." />
            <GlassIcon className="icon" />
          </div>
        </S.BannerSection>
        <S.ContentsSection>
          <S.QnAToolWrapper>
            <div />
            <S.QnaTool>
              <Select data={mockSelect} value={value} setValue={setValue} />
              <S.CheckBoxes>
                <input type="checkbox" />
                <label>답변을 기다리는 질문</label>
              </S.CheckBoxes>
            </S.QnaTool>
          </S.QnAToolWrapper>
          {postList &&
            postList.length > 0 &&
            postList.map((item: any, idx: number) => (
              <QnaItem
                key={idx}
                qnaId={item.qnaId}
                title={item.title}
                // content={item.description}
                imagePath={item.imagePath}
                createdAt={item.createAt}
                nickname={item.nickname}
                viewCnt={item.viewCnt}
              />
            ))}
        </S.ContentsSection>
      </S.Container>
    </React.Fragment>
  );
};

export default QnaTemplate;
const mockQnA = [
  {
    qnaImg: ' ',
    postId: 5,
    postType: 'qna',
    title: '자꾸 다른 강아지를 보면 짖어요ㅠ',
    username: '오애렁',
    description:
      '한 달 전부터 산책을 나가면 자꾸 다른 강아지를 보고 짖어서 매번 마음편히 산책을 나갈 수가 없어요,, 왜 그러는 걸까요? 도움 부탁드려요ㅠ',
    createdAt: '2022-09-31T12:00:00',
    updatedAt: '2022-09-31T12:00:00',
    isBookmark: true,
    isCompleted: false,
    viewCount: 10,
    bookMarkCount: 3,
    tag: ['강아지', '고양이', '물고기', '동물병원'],
    commentCount: 10,
  },
  {
    qnaImg: ' ',
    postId: 5,
    postType: 'qna',
    title: '자꾸 다른 강아지를 보면 짖어요ㅠ',
    username: '오애렁',
    description:
      '한 달 전부터 산책을 나가면 자꾸 다른 강아지를 보고 짖어서 매번 마음편히 산책을 나갈 수가 없어요,, 왜 그러는 걸까요? 도움 부탁드려요ㅠ',
    createdAt: '2022-09-31T12:00:00',
    updatedAt: '2022-09-31T12:00:00',
    isBookmark: true,
    isCompleted: false,
    viewCount: 10,
    bookMarkCount: 3,
    tag: ['강아지', '고양이', '물고기', '동물병원'],
    commentCount: 10,
  },
];
