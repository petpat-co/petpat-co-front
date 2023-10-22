import { modalSlice } from '../modal/modalSlice';
import { myPage } from '../user/myPage';
import { userSlice } from '../user/userSlice';
import { qnaSlice } from '../post/qnaSlice';

const Actions = {
  modal: modalSlice.actions,
  user: userSlice.actions,
  mypage: myPage.actions,
  qna: qnaSlice.actions,
};

export default Actions;
