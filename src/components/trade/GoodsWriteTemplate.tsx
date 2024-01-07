// ** Import React
import React from 'react';

// ** Import components
import TitleSection from '../shared/layout/TitleSection';
import Button from '../shared/element/Button';
import { Input, TextArea } from '../shared/element';

// ** Import lib
import styled from 'styled-components';

// ** Import utils
import theme from '../../styles/theme';
import * as S from '../shared/board/WriteTemplate.style';

// ** Import svg
import { ReactComponent as Add } from 'src/asset/icon/add.svg';

const GoodsWriteTemplate = () => {
  return (
    <>
      <TitleSection title={'물건 판매 글쓰기'} />

      {/*----------제목 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>제목</S.InputTitleText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <S.RowContainer>
            <Input
              borderRadius="28px"
              placeholder="제목을 입력해주세요."
              onChange={() => {
                console.log('변경 이벤트');
              }}
              maxLength={20}
              name="title"
              padding="0 32px"
            />
            <S.InputSubText>20/20</S.InputSubText>
          </S.RowContainer>
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      <S.DividerLine />

      {/*----------거래지역 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>거래지역</S.InputTitleText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <S.ColumnContainer>
            <LocationBtnWrapper>
              <Button
                width="auto"
                isArrowIcon={false}
                height="46px"
                _onClick={() => console.log('주소 검색 클릭 이벤트')}
                _disabled={false}
                activeBg="#F35F4C"
                padding="0 24px"
                activeColor="#fff"
                radius="10px"
              >
                주소검색
              </Button>
              <Button
                width="auto"
                isArrowIcon={false}
                height="46px"
                _onClick={() => console.log('기본 주소지 클릭 이벤트')}
                _disabled={false}
                activeBg={`${theme.colors.primary}`}
                padding="0 24px"
                activeColor={`${theme.colors.white}`}
                radius="10px"
              >
                기본주소지
              </Button>
            </LocationBtnWrapper>
            <Input
              margin="24px 0 0 0"
              borderRadius="28px"
              placeholder="지역을 설정해주세요."
              onChange={() => {}}
              maxLength={200}
              name="location"
              padding="0 24px"
            />
          </S.ColumnContainer>
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      {/*----------가격 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>가격</S.InputTitleText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <S.RowContainer>
            <Input
              borderRadius="28px"
              placeholder="숫자만 입력해 주세요"
              onChange={() => {
                console.log('변경 이벤트');
              }}
              maxLength={20}
              name="price"
              padding="0 32px"
              width={'30%'}
            />
            <S.InputSubText>원</S.InputSubText>
          </S.RowContainer>
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      {/*----------상세설명 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>상세설명</S.InputTitleText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <DescriptionContainer>
            <TextArea
              name="description"
              placeholder="설명을 입력해주세요."
              onChange={() => {
                console.log('변경 이벤트');
              }}
              maxLength={2000}
              height="200px"
              borderRadius="28px"
              padding="24px;"
              fontSize={`${theme.fontSizes.regular}`}
            />
            <S.InputSubText>2000/2000</S.InputSubText>
          </DescriptionContainer>
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      {/*----------이미지 업로드 영역----------*/}
      <S.InputSectionContainer>
        <S.InputTitleWrapper>
          <S.InputTitleText>이미지</S.InputTitleText>
          <UploadImageCntText>(0/5)</UploadImageCntText>
        </S.InputTitleWrapper>
        <S.InputSectionWrapper>
          <UploadImageContainer>
            <UploadImageWrapper>
              {/* TODO: 기능 붙이면서 보완 예정 */}
              <UploadImageBox isShowAddBtn={true}>
                <Add width={60} height={60} />
                <input
                  multiple
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/*"
                  // ref={fileRef}
                  // onChange={onChange}
                />
              </UploadImageBox>
              <UploadImageBox isShowAddBtn={false} />
              <UploadImageBox isShowAddBtn={false} />
              <UploadImageBox isShowAddBtn={false} />
              <UploadImageBox isShowAddBtn={false} />
            </UploadImageWrapper>
            <InfoText>
              * 부적절한 이미지를 등록할 경우 서비스 이용에 제한 및 어려움이
              있을 수 있습니다.
              <br />- 사진은 최대 1MB까지 업로드 가능합니다.
              <br />- 문제가 발생할 경우 관리자에게 문의해주세요.
            </InfoText>
          </UploadImageContainer>
        </S.InputSectionWrapper>
      </S.InputSectionContainer>

      {/*----------하단 버튼 영역----------*/}
      <BtnSection>
        <Button
          width="auto"
          isArrowIcon={false}
          height="66px"
          _onClick={() => console.log('임시저장 클릭')}
          _disabled={false}
          activeBg={`${theme.colors.coolgray400}`}
          padding="0 20px"
          activeColor={`${theme.colors.white}`}
          radius="14px"
        >
          <span>임시저장</span>
        </Button>
        <Button
          width="auto"
          isArrowIcon={false}
          height="66px"
          _onClick={() => console.log('등록하기 클릭')}
          _disabled={false}
          activeBg={`${theme.colors.main}`}
          padding="0 20px"
          activeColor={`${theme.colors.white}`}
          radius="14px"
        >
          <span>등록하기</span>
        </Button>
      </BtnSection>
    </>
  );
};

const LocationBtnWrapper = styled(S.RowContainer)`
  gap: 20px;

  & button {
    font-size: ${theme.fontSizes.xlg};
  }
`;

const DescriptionContainer = styled(S.ColumnContainer)`
  align-items: flex-end;
`;

const UploadImageCntText = styled(S.InputSubText)`
  margin-top: 2%;
  color: ${theme.colors.gray70};
`;

const UploadImageContainer = styled(S.ColumnContainer)`
  align-items: flex-start;
`;

const UploadImageWrapper = styled(S.RowContainer)`
  width: 100%;
  gap: 20px;
`;

const UploadImageBox = styled.div<{ isShowAddBtn: boolean }>`
  flex: 1;
  aspect-ratio: 1;
  background-color: ${theme.colors.sub03};
  border-radius: 28px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ isShowAddBtn }) =>
    isShowAddBtn && `2px dashed ${theme.colors.primary}`};
`;

const InfoText = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.grayText};
  line-height: 1.75;
`;

const BtnSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  padding: 4%;
  padding-bottom: 10%;
`;

export default GoodsWriteTemplate;
