import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { searchMenu } from '../apis/MenuAPICalls';
import MenuItem from './../components/items/MenuItem';

function MenuSearchResult() {
    // useSearchParams : 순수 자바스크립트 URLSearchParams을 이용한 react router dom 의 라이브러리 인듯하다
    const [searchParams] = useSearchParams();

    const menuName = searchParams.get('menuName');

    const [menuList, setMenuList] = useState([]); // 검색 결과가 하나가 아닐수있기 때문에 배열로 관리

    useEffect(() => {
      setMenuList(searchMenu(menuName))    // API 파일에 searchMenu 함수 추가 
    }, [menuName])
    
    // MenuItem 컴포넌트를 뿌린다 (반복문)
    // key 값으로 menu.menuCode 가 아닌 menu.id 할당 (mock폴더의 db.json 참고)
    return(
        <>
            <h1>검색된 메뉴</h1>
            <div className="menuBox">
                {menuList.map(menu => <MenuItem key={menu.id} menu={menu}/>)}
                
            </div>
        </>
    )
}

export default MenuSearchResult;