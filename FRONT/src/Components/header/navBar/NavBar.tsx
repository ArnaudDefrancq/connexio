import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface INavBarProps {
    menu: boolean,
    setMenu: Dispatch<SetStateAction<boolean>>
}

const NavBar: React.FunctionComponent<INavBarProps> = ({ menu, setMenu }) => {

    const navigate = useNavigate();

    const handleClick = (e:React.MouseEvent<HTMLLIElement>): void => {
        const target = e.target as HTMLElement;
        let path: string;
        
        switch (target.dataset.menu) {
            case 'accueil' :
                setMenu(false);
                path = '/feeds';
                navigate(path);
                break;
            case 'profil' :
                setMenu(false);
                path = '/profil';
                navigate(path);
                break;
            case 'deconnexion' :
                setMenu(false);
                path = '/';
                navigate(path);
                break;
        }
        
    }

    if (menu) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "auto"
    }

    const logOut = ():void => {
        localStorage.clear();
    }

  return (
  <>
    <nav className={menu ? 'navDisplay' : 'navHide'}>
        <ul>
            <li data-menu="accueil" onClick={(e) => handleClick(e)}>Acceuil</li>
            <li data-menu="profil" onClick={(e) => handleClick(e)}>Profil</li>
            <li data-menu="deconnexion" onClick={(e) => {handleClick(e); logOut()}}>Déconnexion</li>
        </ul>
    </nav>
  </>
  );
};

export default NavBar;
