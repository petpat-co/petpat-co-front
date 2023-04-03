import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Modal } from 'src/types/modal';

const initialState: Modal.Store = {
  modalList: [],
  isProcessing: false,
  zIndex: -1000,
};
//immer
export const modalSlice = createSlice({
  name: 'modalReducer',
  initialState,
  reducers: {
    open: (state, { payload }: PayloadAction<Modal.Payload.On>) => {
      const { zIndex } = state;
      const { type, text, value } = payload;

      const object: Modal.ModalState[] = [
        {
          id: (type as string) + zIndex * -1,
          type,
          text,
          zIndex: zIndex * -1 + 1,
          value: value ? value : null,
        },
      ];

      return {
        ...state,
        modalList: state.modalList.concat(object),
      };
    },
    close: (state, { payload }: PayloadAction<Modal.Payload.Off>) => {
      let resultList = state.modalList;

      if (payload.id) {
        resultList = state.modalList.filter((item) => item.id !== payload.id);
        if (resultList.length === 0) {
          resultList = [];
        }
      }
      return { ...state, modalList: resultList };
    },
  },
});

const { actions, reducer } = modalSlice;
export const { open, close } = actions;

export default reducer;
