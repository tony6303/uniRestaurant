import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { callLoginAPI } from '../../apis/UserAPICalls';
import { resetLoginUser } from "../../modules/UserModule";


function LoginForm() {
    
    const navigate = useNavigate(); // v6에서 useHistory를 대체하는 함수. 쉽게 설명 하면 주소 이동하는 함수
    const dispatch = useDispatch(); // store의 내장함수 dispatch를 사용하게 해주는 hook
    const result = useSelector(state => state.userReducer); // store에서 상태를 조회해오는 useSelector
    const loginStatus = !!localStorage.getItem('isLogin'); // !!연산 = 값이 있으면 true, 없으면false 하기 위한 형변환

    /* input 태그 입력 값 state 관리 */
    const [loginInfo, setLoginInfo] = useState(
        {
            id : '',
            password : ''
        }
    );

    /* 입력 값 변경 시 이벤트 핸들러 */
    const onChangeHandler = (e) => {
        setLoginInfo(
            {
                ...loginInfo,
                [e.target.name] : e.target.value
                // id, password
            }
        );
    }

    /* 로그인 버튼 클릭 시 동작 */
    const onClickHandler = () => {

        /* loginInfo에 대한 유효성 검사 후 호출 */
        dispatch(callLoginAPI(loginInfo));   // API 미들웨어 호출 ( 액션 > 미들웨어(여기) > 리듀서 > 스토어)

    }

    /* 로그인 후 성공 실패 동작 */
    useEffect(
        () => {
            
            if(result?.message) {
                alert('아이디와 비밀번호를 확인해주세요');
                setLoginInfo(
                    {
                        id : '',
                        password : ''
                    }
                );
                dispatch(resetLoginUser());    // 얘는 바로 리듀서 호출 ( 액션 > 리듀서 > 스토어)
            } else if(loginStatus){
                navigate('/');
            } 
        },// eslint-disable-next-line
        [result]
    );

    
    return (
            <>
                <div>
                    <label>ID : </label>
                    <input type="text" name="id" value={ loginInfo.id } onChange={ onChangeHandler }/> &nbsp;&nbsp;&nbsp;
                    <label>PASSWORD : </label>
                    <input type="password" name="password" value={ loginInfo.password } onChange={ onChangeHandler }/>&nbsp;
                    <button className ="button" onClick={ onClickHandler }>로그인</button>
                </div>
            </>
    );
}

export default LoginForm;