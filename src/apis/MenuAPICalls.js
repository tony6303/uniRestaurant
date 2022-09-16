import { request } from "./Api"; 
import { getMenulist, getMenu, putMenu, postMenu, deleteMenu } from "../modules/MenuModule";
import menus from "../mock/db.json"


    // https://redux-advanced.vlpt.us/2/01.html
    // 여기서 dispatch, getState 는 어디서 오는건가요?
    // 간단합니다. redux-thunk 미들웨어에서, 전달받은 액션이 함수 형태 일 때, 그 함수에 dispatch 와 getState 를 넣어서 실행해줍니다.
export function callGetMenuListAPI() {
    
    console.log('getMenuList api calls...');
    
    /* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
    return async (dispatch, getState) => {  
        
        /* Api의 axios 처리 참조  */
        const result = await request('GET', '/menu');
        console.log('getMenuList result : ', result);
        
        /* action 생성 함수에 결과 전달하며 dispatch 호출 */
        dispatch(getMenulist(result)); // 모듈에 있는 액션 객체 생성 함수
        console.log('액션 객체 오브젝트가 나올려나');
        console.log(getMenulist(result));
        // getMenulist(result) 가 반환 되고 난 형태는 아래와 같다
        // dispatch({ type : 타입 , payload(menulist) : 내용 })  << 리듀서(함수)에  들어갈 수 있음 !!
    }
}

export function callGetMenuAPI(id) {
    
    console.log('getMenu api calls...');

    return async (dispatch, getState) => {
    
        const result = await request('GET', `/menu/${id}`);
        console.log('getMenu result : ', result);
    
        dispatch(getMenu(result));
    }
}


export function callGetMenuModifyAPI(id) {
    
    console.log('GetMenuModify api calls...');

    return async (dispatch, getState) => {
    
        const result = await request('GET', `/menu/${id}`);
        console.log('GetMenuModify result : ', result);
    
        dispatch(getMenu(result));
    }
}

export function callRegistMenuAPI(menu) {
    
    console.log('registMenu api calls...');

    return async (dispatch, getState) => {
    
        const result = await request('POST', '/menu/', menu);
        console.log('registMenu result : ', result);
    
        dispatch(postMenu(result));
    }
}

export function callModifyMenuAPI(menu) {
    
    console.log('modifyMenu api calls...');

    return async (dispatch, getState) => {
    
        const result = await request('PUT', `/menu/${menu.id}`, menu);
        console.log('modifyMenu result : ', result);
    
        dispatch(putMenu(result));
    }
}

export function callDeleteMenuAPI(id) {
    
    console.log('deleteMenu api calls...');

    return async (dispatch, getState) => {
    
        const result = await request('DELETE', `/menu/${id}`);
        console.log('deleteMenu result : ', result);
    
        dispatch(deleteMenu(result));
    }
}


// mock 폴더의 db.json 을 열어보니 user배열과 menu배열이 있는걸 확인.
export function searchMenu(menuName) {
    return menus.menu.filter(menu => menu.menuName.match(menuName))
}
