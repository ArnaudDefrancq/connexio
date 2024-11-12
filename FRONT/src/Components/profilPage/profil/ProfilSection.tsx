import * as React from 'react';
import { useContext } from 'react';
import { isEmpty, timestampToDate } from '../../../Tools/function';
import Style from "./ProfilSection.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faGear, faUserPlus, faHourglassHalf, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Profil } from '../../../Types/Profil';
import Feeds from '../../mainPage/feeds/Feeds';
import { UserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Store/store';
import { createRelation, deleteRelation } from '../../../Store/Amitie/amitieSlice';
import { Amitie, NewAmitie } from '../../../Types/Amitie';
import { AmitieStatus } from '../../../Types/StatusEnum';

interface IProfilSectionProps {
    user: Profil | undefined
}

const ProfilSection: React.FunctionComponent<IProfilSectionProps> = ({ user }) => {

    const { id_user, token } = useContext(UserContext);
    const profilPost = true;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const pendingAmitie = useAppSelector(state => state.amitie.pending);
    const amitieAccepted = useAppSelector(state => state.amitie.accepted);            

    const settingsProfil = (e:React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        navigate(`/update-profil/${user?.id_profil}`);
    }
    
    const handleClickFriends = (): void => {
        if (user?.id_profil && token && id_user) {
            const newRelation: NewAmitie = {
                id_profil: Number(id_user),
                id_profil_1: Number(user?.id_profil),
                status: AmitieStatus.Pending
            }
            dispatch(createRelation({ newRelation, token }));
        }
    }   
    
    const handleClickDeleteFriend = (): void => {
        if (amitieAccepted && id_user) {            
            const relation = amitieAccepted[id_user].find(e => e.id_profil_1 == user?.id_profil);            
            if (relation && token) {
                dispatch(deleteRelation({ idRelation: Number(relation.id_amitie), token }))
            }
        }
    }

    const goodIcon = (arrayPending: Array<Amitie>, arrayAccepted: Array<Amitie>, id: number): JSX.Element => {
        let icon = faUserPlus;
        let f = handleClickFriends;
        if (arrayPending) {
            arrayPending.forEach((e) => {
                if (e.id_profil_1 == id) icon = faHourglassHalf
            })
        }
        if (arrayAccepted) {
            arrayAccepted.forEach((e) => {
                if (e.id_profil_1 == id) {
                    icon = faUserCheck;
                    f = handleClickDeleteFriend
                }
            })
        }
        return <FontAwesomeIcon className={Style.iconSetting} onClick={f} icon={icon}/>;
    }

  return (
    <>
        <section className={Style.sectionProfil}>
            {
                (user && !isEmpty(user)) && (
                    <>
                        <div className={Style.divImg}>
                            {
                                (id_user == user.id_user) ? <button className={Style.btnTools} onClick={(e) => settingsProfil(e)}><FontAwesomeIcon className={Style.iconSetting} icon={faGear}/></button> : <button className={Style.btnTools} >{(id_user && user.id_profil) && goodIcon(pendingAmitie[id_user], amitieAccepted[id_user] ,user.id_profil) }</button>
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
