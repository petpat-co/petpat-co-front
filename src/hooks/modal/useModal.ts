import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Actions from 'src/core/redux/action';

export const useModal = () => {
  const dispatch = useDispatch();

  const alert = useCallback((text: string, value?: any) => {
    dispatch(Actions.modal.open({ type: 'alert', text, value }));
    // eslint-disable-next-line
  }, []);

  const confirm = useCallback((text: string, value?: any) => {
    dispatch(Actions.modal.open({ type: 'confirm', text, value }));
    // eslint-disable-next-line
  }, []);

  const search = useCallback(() => {
    dispatch(Actions.modal.open({ type: 'search' }));
    // eslint-disable-next-line
  }, []);

  const close = useCallback((id: string) => {
    dispatch(Actions.modal.close({ id }));
    // eslint-disable-next-line
  }, []);

  const modal = {
    alert,
    confirm,
    search,
    close,
  };

  return modal;
};
