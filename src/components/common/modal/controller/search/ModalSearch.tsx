import { memo } from 'react';
import { Modal } from 'src/types/modal';
import ModalContainer from '../../container/ModalContainer';

const ModalSearch = (props: Modal.ModalPropsType) => {
  return (
    <ModalContainer
      {...props}
      wrapStyles={{ justify: 'flex-end', alignItems: 'flex-start' }}
      innerStyles={{ width: '780px', height: '680px' }}
    >
      dfsdfsd
    </ModalContainer>
  );
};

export default memo(ModalSearch);
