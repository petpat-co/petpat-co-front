import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Actions from 'src/core/redux/action';
import { RootState } from 'src/core/store';
import { Modal } from 'src/types/modal';
import ModalSearch from './search/ModalSearch';

const ModalController = () => {
  const dispatch = useDispatch();
  const modalStore = useSelector((state: RootState) => state.modal);
  const { modalList } = modalStore;

  const clickClose = useCallback((id: string) => {
    dispatch(Actions.modal.close({ id }));
    // eslint-disable-next-line
  }, []);

  const modalContents = (item: Modal.ModalState) => {
    const type = item.type;
    const modalProps = {
      ...item,
      type,
      onClickClose: clickClose,
    };

    return (
      <div key={item.id}>
        {
          {
            alert: <p></p>,
            confirm: <p></p>,
            search: <ModalSearch {...modalProps} />,
          }[type as string]
        }
      </div>
    );
  };

  const modalListView = () => {
    return modalList?.map((item: Modal.ModalState) => modalContents(item));
  };

  return <div id="ModalController">{modalListView()}</div>;
};

export default ModalController;
