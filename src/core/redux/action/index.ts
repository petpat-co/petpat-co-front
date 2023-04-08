import { modalSlice } from '../modal/modalSlice';
import { userSlice } from '../user/userSlice';

const Actions = {
  modal: modalSlice.actions,
  user: userSlice.actions,
};

export default Actions;
