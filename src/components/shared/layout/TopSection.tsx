import * as S from "./TopSection.styled";
const TopSection = ({ children }: { children: React.ReactNode }) => {
  return <S.TopSectionWrap>{children}</S.TopSectionWrap>;
};

export default TopSection;
