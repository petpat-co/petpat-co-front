import { MainImages } from 'src/asset/main';
import { MainCardTemplateStyle as S } from './MainCard.style';

interface CardProps {
  el: {
    image: string;
    title: string;
    subtitle: string;
    nick: string;
    viewCnt: number;
    commentCnt: number;
  };
}

const MainCard = (props: CardProps) => {
  const { title, subtitle, nick, viewCnt, commentCnt } = props.el;

  return (
    <S.MainCardWrap>
      <div>
        <img src={MainImages.dogCatPic} alt="" width="412px" />
        <h1>{title}</h1>
        <p>{subtitle}</p>

        <div>
          <p>{nick}</p>
          <div>
            <p>{viewCnt}</p>
            <p>{commentCnt}</p>
          </div>
        </div>
      </div>
    </S.MainCardWrap>
  );
};

export default MainCard;
