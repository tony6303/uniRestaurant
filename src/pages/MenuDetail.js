import Menu from "../components/items/Menu";
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDeleteMenuAPI } from '../apis/MenuAPICalls';

function MenuDetail() {

    /* 로그인 상태 확인 */
    const loginStatus = !!localStorage.getItem('isLogin'); // !!연산 = 값이 있으면 true, 없으면false 하기 위한 형변환
    const navigate = useNavigate(); // v6에서 useHistory를 대체하는 함수. 쉽게 설명 하면 주소 이동하는 함수
    const dispatch = useDispatch(); // store의 내장함수 dispatch를 사용하게 해주는 hook
    const { id } = useParams();  // 현재 url = localhost:3000/menu/{id} << 파라미터를 사용하게 해주는 hook

    // 아래에 <Menu/> 컴포넌트가 렌더링 되면서, callGetMenuAPI 가 호출 되고 state에 menu가 담겨 진다.
    const result = useSelector(state => state.menuReducer);  // store의 상태를 조회해오는 useSelector

    console.log('메뉴디테일!!!');
    console.log(result);

    const updateHandler = () => navigate(`/menu/modify/${id}`);
    const deleteHandler = () => dispatch(callDeleteMenuAPI(id)); 

    useEffect(
        () => {
            /* 메뉴 삭제 완료 확인 후 /menu로 이동 */
            if (result.delete) {
                alert('메뉴 삭제');
                navigate(`/menu`);
            }
        }, // eslint-disable-next-line
        [result]
    );

    return (
        <div>
            <h1>메뉴 상세</h1>
            <h1>
                { /* 로그인 된 상황에만 button이 보이도록 조건부 랜더링 */ }
                { (loginStatus) && 
                    <>
                        <button className ="button" onClick={ updateHandler }>메뉴 수정</button>
                        <button className ="button" onClick={ deleteHandler }>메뉴 삭제</button>
                    </>
                }
            </h1>
            <Menu id={ id }/>
        </div>
    );
}

export default MenuDetail;