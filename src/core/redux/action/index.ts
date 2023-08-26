import { modalSlice } from '../modal/modalSlice';
import { myPage } from '../user/myPage';
import { userSlice } from '../user/userSlice';

const Actions = {
  modal: modalSlice.actions,
  user: userSlice.actions,
  mp: myPage.actions,
};

export default Actions;
