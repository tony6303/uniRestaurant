import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { resetLoginUser } from "../../modules/UserModule";

function Navbar() {

    const loginStatus = !!localStorage.getItem('isLogin'); // !!연산 = 값이 있으면 true, 없으면false 하기 위한 형변환
    const navigate = useNavigate(); // v6에서 useHistory를 대체하는 함수. 쉽게 설명 하면 주소 이동하는 함수
    const dispatch = useDispatch(); // store의 내장함수 dispatch를 사용하게 해주는 hook

    /* 로그아웃 호출 시 localStorage 저장 값 삭제, userReducer 값 리셋, 루트로 이동  */
    const logoutHandler = () => {
        localStorage.removeItem('isLogin');   //  get, set이 아니라 아예 제거해버림
        dispatch(resetLoginUser());  // input창 두 개 상태를 공백으로 만드는 액션
  
        alert('로그아웃이 되어 메인화면으로 이동합니다.');
        navigate("/", { replace: true })
        window.location.reload();
    
    }

    return (
        <div>
            <ul>
                <li><NavLink to='/'>메인으로</NavLink></li>
                <li><NavLink to='/menu'>메뉴보기</NavLink></li>
                {/* localStorage 안의 값으로 로그인 여부 판단하여 조건부 랜더링 */}
                { !loginStatus ? (
                        <li><NavLink to='/login'>로그인</NavLink></li>
                    ) : (
                        <li onClick={ logoutHandler }><NavLink to="">로그아웃</NavLink></li>
                    )
                }

            </ul>
        </div>
    );
}

export default Navbar;