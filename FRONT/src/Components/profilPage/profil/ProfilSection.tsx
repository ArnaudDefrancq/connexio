import * as React from 'react';
import { useContext,  useState, useEffect } from 'react';
import { UserContext } from '../../../Context/UserContext';
import { Profil } from '../../../Types/Profil';
import { ProfilController } from '../../../Controllers/ProfilController';
import { isEmpty, timestampToDate } from '../../../Tools/function';
import Style from "./ProfilSection.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProfilSectionProps {
}

const ProfilSection: React.FunctionComponent<IProfilSectionProps> = () => {

  const { id_user, token } = useContext(UserContext);
  const [user, setUser] = useState<Profil>()

    const getProfil = async (idProfil: number, token: string): Promise<void> => {
        try {
            if (token && !isEmpty(token) && idProfil) {
                const profil: Profil = await ProfilController.getOneProfil(idProfil, token);
              
                
                setUser(profil);
                return;
            }
        } catch (error) {
            console.log(error + 'Pb get Profil');
            throw error;
        }
    }

    useEffect(() => {
        if (id_user && token) {
            getProfil(id_user, token);
        }
    }, [])

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
