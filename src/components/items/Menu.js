import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { callGetMenuAPI } from '../../apis/MenuAPICalls';

function Menu({ id }) {
    // store의 상태를 조회해오는 useSelector
    // Menu가 렌더링 될 때, useEffect가 발동하면서  dispatch 에의해 result에 menu 가 담겨진다.
    const result = useSelector(state => state.menuReducer); 
    console.log('menu ta ta@@12');
    console.log(result);
    const menu = result.menu;
    const dispatch = useDispatch(); // store의 내장함수 dispatch를 사용하게 해주는 hook

    useEffect(
        () => {
            /* menu 호출 API */
            dispatch(callGetMenuAPI(id));
        },// eslint-disable-next-line
        []
    );

    return (
        menu && (
            <>
                <h3>메뉴 이름 : { menu.menuName }</h3>
                <h3>메뉴 가격 : { menu.menuPrice }</h3>
                <h3>메뉴 종류 : { menu.categoryName }</h3>
                <h3>메뉴 상세 : { menu.detail.description }</h3>
                <img src={ menu.detail.image } style={ { maxWidth: 500 } } alt={ menu.menuName }/>
            </>
        )
    );
}

export default Menu;