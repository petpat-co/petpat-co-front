import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding-top: 274px;
  width: 100%;
  min-width: 800px;
  max-width: 1440px;
  height: 100%;
`;

export const TopWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 80px;
  height: 100%;
`;

export const Hr = styled.hr`
  margin: 24px 0 80px 0;
  border: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Admin = styled.div`
  position: static;
  display: flex;
  justify-content: flex-end;
`;

export const Description = styled.div`
  font-size: 16px;
  margin-bottom: 240px;
  height: fit-content;
`;

export const ModalButtonWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
`;

