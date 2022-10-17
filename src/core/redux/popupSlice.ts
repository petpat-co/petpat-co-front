import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface PopupState {
  id: number;
  list: Array<any>;
}

//slice 안에 들어갈 내용은 name, init, reducers

//리덕스는 root reducer 객체를 가지고 있는데 이 객체의 key/ value쌍을 slice 라고 한다  요걸 업데이트 하는 reducer 함수가 slice reducer

//immer
export const popupSlice = createSlice({
  name: "popup",

  initialState: [{ id: 1, list: [] }] as PopupState[],
  //reducer 안에 여러가지 함수가 들어갈 수 있음. 더하기 빼기 등등.. 그때마다 name 바꿔줄 필요 없음
  reducers: {
    //액션타입은 슬라이스 이름을 접두어로 사용해서 자동 생성 >> 나같은 경우엔 users/addTodo
    openPopup: (state, { payload }: PayloadAction<PopupState>) => {
      const { id, list } = payload;
      state.push({ id, list });
      // state.push(action.payload);
    },
  },
});

//위에 작성이 끝났다면 액션과 리듀서를 export 해준다.
// export const { addUser } = users.actions;
// export default users.reducer;
const { actions, reducer } = popupSlice;
export const { openPopup } = actions;

export default reducer;
