import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
/*
store: 앱의 상태를 보관하는 리덕스 저장소를 만든다. 리덕스에서는 한 애플리케이션당 하나의 스토어를 만든다
 이 안의 상태를 바꾸는 유일한 방법은 여기에 액션을 보내는 것 뿐입니다.
*/
const store = createStore(
    rootReducer,  // combineReducer - user, menu 두 개 있음
    composeWithDevTools(applyMiddleware(ReduxThunk, logger))  // 미들웨어
    // https://redux-advanced.vlpt.us/2/01.html
    // reduxThunk : 가장 간단히 설명하자면, 이 미들웨어는 객체 대신 함수를 생성하는 액션 생성함수를 작성 할 수 있게 해줍니다
    // 여기서 dispatch, getState 는 어디서 오는건가요?
    // 간단합니다. redux-thunk 미들웨어에서, 전달받은 액션이 함수 형태 일 때, 그 함수에 dispatch 와 getState 를 넣어서 실행해줍니다.
);

export default store;