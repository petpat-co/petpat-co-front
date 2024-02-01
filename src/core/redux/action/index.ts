import { modalSlice } from '../modal/modalSlice';
import { myPage } from '../user/myPage';
import { userSlice } from '../user/userSlice';
import { qnaSlice } from '../post/qnaSlice';
import { rehomingSlice } from '../post/rehomingSlice';
import { postSlice } from '../post/postSlice';

const Actions = {
  modal: modalSlice.actions,
  user: userSlice.actions,
  mypage: myPage.actions,
  qna: qnaSlice.actions,
  rehoming: rehomingSlice.actions,
  post: postSlice.actions,
};

export default Actions;
