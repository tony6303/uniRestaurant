import MenuList from "../components/lists/MenuList";
import { useNavigate } from "react-router-dom";

function Menus() {
    

    const loginStatus = !!localStorage.getItem('isLogin');  // !!연산 = 값이 있으면 true, 없으면false 하기 위한 형변환
    const navigate = useNavigate(); // v6에서 useHistory를 대체하는 함수. 쉽게 설명 하면 주소 이동하는 함수

    return (
        <div>
            <h1>메뉴 목록 </h1>
            { (loginStatus) && <button className ="button" onClick={ () => navigate(`/menu/regist`) }>메뉴 추가</button> } 
            <MenuList/>
        </div>
    );
}

export default Menus;