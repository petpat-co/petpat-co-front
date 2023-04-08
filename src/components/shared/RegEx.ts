


export const emailCheck = (email:string) => {
    const emailRegEx = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return emailRegEx.test(email);
};

export const passwordCheck = (password:string) => {
    const passwordRegEx = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,12}$/;
    return passwordRegEx.test(password);
}

export const nickNameCheck = (nickname:string) => {
    const nickNameRegEx = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,6}$/;
    return nickNameRegEx.test(nickname);
}