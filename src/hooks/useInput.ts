import React, { useState, useCallback } from "react";
import { nickNameCheck } from "src/components/shared/RegEx";
import { passwordCheck } from "src/components/shared/RegEx";
import { emailCheck } from "src/components/shared/RegEx";

// const useInput = (initialValue: string) => {
//   const [value, setValue] = useState(initialValue);
//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // 구조 분해 할당
//     const {
//       target: { value },
//     } = event;
//     setValue(value);
//   };

//   const reset = useCallback(() => setValue(initialValue), [initialValue]);

//   return { value, onChange, reset };
// };

interface ValueType {
	email: string,
  password: string,
  nickname: string,
}





const useInput = (initialValue: ValueType, validator: Function) => {
	const [value, setValue] = React.useState(initialValue);

	const validate = {
  	email: emailCheck(value.email),
    password: passwordCheck(value.password),
    nickname: nickNameCheck(value.nickname)
  }

	

  // const onChange = event => {
  //   console.log('event')
  // } 

  // return { value, onChange };
}

const message = {
  email: '이메일의 형식이 올바르지 않습니다',
  password: '비밀번호는 8자 이상 12자 이하의 영문, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 사용 가능합니다.',
  nickname: '닉네임은 2자 이상 6자 이하의 한글, 영문만 사용 가능합니다. (자음, 모음, 특수문자 제외)'
}




export default useInput;
