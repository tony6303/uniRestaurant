import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MenuItem from '../items/MenuItem';
import { callGetMenuListAPI } from "../../apis/MenuAPICalls";
import { useNavigate } from 'react-router-dom';


function MenuList() {

    // MenuList가 렌더링 될 때, useEffect가 발동하면서  dispatch 에의해 result에 menulist 가 담겨진다.
    const result = useSelector(state => state.menuReducer);  // store의 상태를 조회해오는 useSelector
    console.log('MenuList.js  ta ta ta : '); // 예상 결과 : menu에 대한 모든 정보가 담겨있음, (실제 결과 MenuList 만 담겨있다)
    console.log(result);
    const menuList = result.menulist;
    const dispatch = useDispatch(); // store의 내장함수 dispatch를 사용하게 해주는 hook

    const [searchValue, setSearchValue] = useState('') // 검색 변수
    const navigate = useNavigate(); // v6에서 useHistory를 대체하는 함수. 쉽게 설명 하면 주소 이동하는 함수

    // console.log(menuList);
    /*
        실행 순서
        1. 렌더링 되면서 가장먼저 useEffect 에 있는 dispatch ( GetMenuListAPI ) 가 호출됨
        2. API 내부 동작 : MenuModule 파일 에있는 getMenuList 를 호출함  (  [GET_MENULIST]: (res) => ({ menulist : res })  )
        3. 그래서 result 에 MenuList 정보만 담기게 됨 ( useSelector )
        4. Menu 에서도 result 를 로그 찍어보니 똑같이 1,2,3 절차를 통해 Menu 정보만 담기고 있었음
    */

    useEffect(
        () => {
            /* menuList 호출 API */
            dispatch(callGetMenuListAPI());
        },// eslint-disable-next-line
        []
    );

    // 검색기능
    const onClickHandler = () =>{
        navigate(`/menu/search?menuName=${searchValue}`)
    }
    

    return (
        menuList && (
            <div className="menuBox">
                <div>
                    <input autoComplete='off' type="search" name="menuName" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                    <button onClick={onClickHandler}> 검색</button>
                </div>
                <div>
                    { menuList.map(menu => <MenuItem key={ menu.id } menu={ menu }/>) }
                </div>
            </div>
        )
    );
}

export default MenuList;