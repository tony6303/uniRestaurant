import { createActions, handleActions } from "redux-actions";
// 모듈 = 약간 api 느낌?
/*
    어디선가 dispatch하게 되면
*/


/* 초기 state값 */
const initialState = {};

/* 액션 타입 설정 */
export const LOGIN = 'user/LOGIN';
export const RESET_LOGIN_USER = 'user/RESET_LOGIN_USER';

/* 유저 관련 액션 함수 */
/*
store: 앱의 상태를 보관하는 리덕스 저장소를 만든다. 리덕스에서는 한 애플리케이션당 하나의 스토어를 만든다
 이 안의 상태를 바꾸는 유일한 방법은 여기에 액션을 보내는 것 뿐입니다.
*/
// 외부에서도 이 함수(액션객체생성)를 사용할 수 있도록 export 로 정의 -> import만 하면 dispatch에서 바로 사용가능
export const { user : { login, resetLoginUser }} = createActions({
    [LOGIN]: (res) => ({ res }), // login(res) = return {type : user , payload : res}
    [RESET_LOGIN_USER]: (res = initialState) => ({ res }),
});

/* 리듀서 함수 */
// action은 dispatch 를 호출하는 쪽에서 전달해주는 값이고 행위의 종류와 state 변경에 대한 type과 내용(payload) 을 담고있다
// 리듀서 함수의 반환 값 = 새로운 state 반환
const userReducer = handleActions(
    {   
        [LOGIN]: (state, { payload : {res} }) => { 

            if(res) {
                /* HTML5 에서 추가된 저장소 
                브라우저 닫고 다시 열어도 상태유지, 로그인유지 :  localStorage
                브라우저를 닫으면 상태유지안함 : sessionStorage
                localStorage에 로그인 상태 저장 */
                localStorage.setItem("isLogin", true);
            } else {
                res = { message : 'LOGIN_FAIL'};
            }

            return res;

        },
        [RESET_LOGIN_USER]: (state, { payload : { res } }) => {
            
            return res;

        }
    },
    initialState
);

export default userReducer;

