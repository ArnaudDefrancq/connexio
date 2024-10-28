import * as React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Style from './Header.module.css'
import NavBar from './navBar/NavBar';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = () => {

    const [menu, setMenu] = useState<boolean>(false);

  return (
  <>
    <header>
        <img src="/public/images/logo.png" alt="Logo" />
        <button className={Style.btn} onClick={() => !menu ? setMenu(true) : setMenu(false)}>
            {!menu ? <FontAwesomeIcon icon={faBars} className={'iconHeader'} /> : <FontAwesomeIcon icon={faTimes} className={'iconHeader'} />}
        </button>
        <NavBar menu={menu} setMenu={setMenu}/>
    </header>
  </>);
};

export default Header;
