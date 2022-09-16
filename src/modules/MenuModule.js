import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {};

/* 액션 타입 설정 */
// 액션타입에서 정의한 스네이크케이스 문자는 액션으로 만들어질때 카멜케이스로 자동 변환 된다 !!!
// 이해를 돕기위해서 일부러 어색하게 수정 했음
const GET_MENULIST = 'menu/GET_MENULIST';  // callGetMenuListAPI 에서 부르는 함수 명도 수정 했음
const GET_MENU = 'menu/GET_MENU';
const POST_MENU = 'menu/POST_MENU';
const PUT_MENU = 'menu/PUT_MENU';
const DELETE_MENU = 'menu/DELETE_MENU';

/* 메뉴 관련 액션 함수 */
/*
store: 앱의 상태를 보관하는 리덕스 저장소를 만든다. 리덕스에서는 한 애플리케이션당 하나의 스토어를 만든다
 이 안의 상태를 바꾸는 유일한 방법은 여기에 액션을 보내는 것 뿐입니다.

*/

// 외부에서도 이 함수(액션객체생성)를 사용할 수 있도록 export 로 정의 -> import만 하면 dispatch에서 바로 사용가능
  // 액션객체생성 = payload 에 값을 담는 과정
export const { menu : { getMenulist, getMenu, postMenu, putMenu, deleteMenu }} = createActions({
    [GET_MENULIST]: (res) => ({ menulist : res }),   // getMenulist(res) = return {type : mmenu , menulist(payload) : res}
    [GET_MENU]: (res) => ({ menu : res }), // getMenu(res) = return {type : mmenu , menu(payload) : res}
    [POST_MENU]: (res) => ({ regist : res }),
    [PUT_MENU]: (res) => ({ modify : res }),
    [DELETE_MENU]: (res) => ({ delete : res }),
});

/* 리듀서 함수 */
// action은 dispatch 를 호출하는 쪽에서 전달해주는 값이고 행위의 종류와 state 변경에 대한 type과 내용(payload) 을 담고있다
// 리듀서 함수의 반환 값 = 새로운 state 반환
// 각각의 상태가 필요한 곳에서 
const menuReducer = handleActions(
    {   
        [GET_MENULIST]: (state, action) => { // 
            return action.payload;
        },
        [GET_MENU]: (state, action) => {
            return action.payload;
        },
        [POST_MENU]: (state, a) => {
            return a.payload;
        },
        [PUT_MENU]: (state, { payload }) => {
            return payload;
        },
        [DELETE_MENU]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default menuReducer;

