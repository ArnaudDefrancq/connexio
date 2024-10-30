import * as React from 'react';
import { useContext } from 'react';
import { isEmpty, timestampToDate } from '../../../Tools/function';
import Style from "./ProfilSection.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faGear } from '@fortawesome/free-solid-svg-icons';
import { Profil } from '../../../Types/Profil';
import Feeds from '../../mainPage/feeds/Feeds';
import { UserContext } from '../../../Context/UserContext';

interface IProfilSectionProps {
    user: Profil | undefined
}

const ProfilSection: React.FunctionComponent<IProfilSectionProps> = ({ user }) => {

    const { id_user } = useContext(UserContext);
    const profilPost = true;
    
  return (
    <>
        <section className={Style.sectionProfil}>
            {
                (user && !isEmpty(user)) && (
                    <>
                        <div className={Style.divImg}>
                            {
                                (id_user == user.id_user) && <button><FontAwesomeIcon className={Style.iconTools} icon={faGear}/></button>
                            }
                            <img className={Style.imgProfil} src={`${import.meta.env.VITE_URL_IMG}/imgProfil/${user.id_profil}/profil/${user.img_profil}`} alt="photo de profil" />
                            <img className={Style.imgBg} src={`${import.meta.env.VITE_URL_IMG}/imgProfil/${user.id_profil}/bg/${user.img_bg}`} alt="photo de profil" />
                            <div className={Style.divInfo}>
                                <div>
                                    <h1>{user.nom} {user.prenom}</h1>
                                    <p><FontAwesomeIcon icon={faCakeCandles}/> {timestampToDate(user.date_naissance)}</p>
                                </div>
                                <p>Membre depuis le : <span>{timestampToDate(user.created_at)}</span></p>
                            </div>
                        </div>  
                        <div className={Style.divContent}>
                            <h2>Descritpion : <span>{user.description}</span></h2>
                        </div>
                    </>
                )
            }
        </section>
        <Feeds profilPost={profilPost} />
    </>
  );
};

export default ProfilSection;
