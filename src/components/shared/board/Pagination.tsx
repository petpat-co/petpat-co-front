// ** Import React
import React from 'react';

// ** Import lib
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

// ** Import svg
import { ReactComponent as Arrow } from '../../../asset/arrow.svg';

// ** Import utils
import theme from '../../../styles/theme';

type PaginationPropsType = {
  totalPage: number;
  handlePageChange: (value: any) => void;
};

const Pagination = ({ totalPage, handlePageChange }: PaginationPropsType) => {
  return (
    <ComponentWrapper>
      <ReactPaginate
        pageCount={totalPage}
        containerClassName={'pagination'}
        pageClassName={'page-number'}
        activeClassName={'active'}
        onPageChange={handlePageChange}
        previousLabel={<Arrow transform={`rotate(90)`} />}
        nextLabel={<Arrow transform={`rotate(-90)`} />}
      />
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin: 30px auto;
  }

  .page-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.3s;

    &:hover {
      background-color: ${theme.colors.primary};
    }
  }

  .active {
    background-color: ${theme.colors.primary};

    a {
      color: ${theme.colors.white};
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: ${theme.fontSizes.small};
  }
`;

export default Pagination;
