import GoodsWriteTemplate from '../../components/trade/GoodsWriteTemplate';
import { useAppDispatch } from '../../core/store';
import { useEffect } from 'react';
import { getCategoryListApi } from '../../core/redux/post/PostListSlice';

const GoodsTradeWrite = () => {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    // 카테고리 목록 데이터 페칭
    appDispatch(getCategoryListApi('trade'));
  }, []);

  return <GoodsWriteTemplate />;
};

export default GoodsTradeWrite;
