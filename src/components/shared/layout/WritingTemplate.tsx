import styled from 'styled-components';

interface WritingTemplatePropsType {
  title: string;
  isBorder: boolean;
}
const WritingTemplate = (props: WritingTemplatePropsType) => {
  const { title, isBorder } = props;
  return (
    <>
      <BorderWrap isBorder={isBorder}>
        <Title>{title}</Title>
      </BorderWrap>
    </>
  );
};

const BorderWrap = styled.div<{ isBorder: boolean }>`
  width: 1200px;
  margin: 0 auto;
  height: 96px;
  padding-bottom: 15px;
  border-bottom: ${({ isBorder }) => (isBorder ? '2px solid #878787' : null)};
  display: flex;
  align-items: center;
  margin-top: 74px;
  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;
const Title = styled.h2`
  width: 215px;
  height: 78px;
  font-weight: 700;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default WritingTemplate;
