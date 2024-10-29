import * as React from 'react';
import { isEmpty, timestampToDate } from '../../../Tools/function';
import Style from "./ProfilSection.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import { Profil } from '../../../Types/Profil';

interface IProfilSectionProps {
    user: Profil | undefined
}

const ProfilSection: React.FunctionComponent<IProfilSectionProps> = ({ user }) => {

  return (
    <>
        <section className={Style.sectionProfil}>
            {
                (user && !isEmpty(user)) && (
                    <>
                        <div className={Style.divImg}>
                            <img className={Style.imgProfil} src={`${import.meta.env.VITE_URL_IMG}/imgProfil/${user.id_profil}/profil/${user.img_profil}`} alt="photo de profil" />
                            <img className={Style.imgBg} src={`${import.meta.env.VITE_URL_IMG}/imgProfil/${user.id_profil}/bg/${user.img_bg}`} alt="photo de profil" />
                            <div className={Style.divInfo}>
                                <div>
                                    <h1>{user.nom} {user.prenom}</h1>
                                    <p><FontAwesomeIcon className={Style.iconTools} icon={faCakeCandles}/> {timestampToDate(user.date_naissance)}</p>
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
    </>
  );
};

export default ProfilSection;
