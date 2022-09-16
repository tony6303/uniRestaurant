import { request } from "./Api"; 
import { login } from "../modules/UserModule";

/* 로그인 정보 전달 받는 함수 */
// https://redux-advanced.vlpt.us/2/01.html
// 여기서 dispatch, getState 는 어디서 오는건가요?
// 간단합니다. redux-thunk 미들웨어에서, 전달받은 액션이 함수 형태 일 때, 그 함수에 dispatch 와 getState 를 넣어서 실행해줍니다.
export function callLoginAPI(loginInfo) {
    
    console.log('login api calls...');

    /* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
    return async (dispatch, getState) => {
        
        /* Api의 axios 처리 참조  */
        const userList = await request('GET', '/user');

        /* id와 password 일치 여부 확인 - 서버에서 이루어져야 하는 로직 */
        const result = await userList.find(user => user.id === loginInfo.id && user.password === loginInfo.password);

        console.log('login result : ', result);

        /* action 생성 함수에 결과 전달하며 dispatch 호출 */
        dispatch(login(result));

    }
}
