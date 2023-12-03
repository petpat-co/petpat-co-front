import React from 'react';
import styled from 'styled-components';

const TopRehoming = (props: any) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  margin: 80px 16px;
  max-width: 1440px;
  margin: auto;

  & > .top_rehoming_text {
    width: 270px;
    flex-shrink: 0;
    margin-right: 144px;
  }

  & > .top_rehoming_text > .top_rehoming_text__title {
    font-size: 40px;
    font-weight: 700;
    text-align: right;
  }

  & > .top_rehoming_text > .top_rehoming_text__content {
    margin: 16px 0;
    font-size: 16px;
    font-weight: 500;
    text-align: right;
  }

  & > .top_rehoming_list {
    display: grid;
    width: 100%;

    grid-template-columns: repeat(3, auto);
    gap: 24px;
  }
`;

export default TopRehoming;
