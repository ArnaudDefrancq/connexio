import * as React from 'react';
import { useContext } from 'react';
import Style from "./CardFriend.module.css";
import { AmitieWithProfil } from '../../../Types/Amitie';
import { useAppDispatch } from '../../../Store/store';
import { UserContext } from '../../../Context/UserContext';
import { deleteRelation, updateRelation } from '../../../Store/Amitie/amitieSlice';
import { AmitieStatus } from '../../../Types/StatusEnum';
import { useNavigate } from 'react-router-dom';

interface ICardFriendProps {
    profil: AmitieWithProfil,
    isClick: boolean
}

const CardFriend: React.FunctionComponent<ICardFriendProps> = ({ profil, isClick }) => {

  const { token, id_user } = useContext(UserContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const actionFriends = (e:React.MouseEvent<HTMLButtonElement>):void => {
    const target = e.target as HTMLElement;

    switch(target.dataset.updatefriends) {
      case 'accept':
        if (token) {
          dispatch(updateRelation({idRelation: profil.id_amitie, slug: AmitieStatus.Accepted, token}));
        }
        break;
      case 'reject':
        if (token) {
          dispatch(updateRelation({idRelation: profil.id_amitie, slug: AmitieStatus.Rejected, token}));        }
        break;
      case 'supprimer':
        if (token) {
          dispatch(deleteRelation({idRelation: profil.id_amitie, token}));
        }
        break;
      default:
        console.log('pas bonne action');
    }
    
  }

  const handleClick = () => {
    const path = `/profil/${profil.id_profil_1}`;
    navigate(path);
  }
  return (
    <>
      <div className={Style.cardFriend}>
        <div className={Style.imgFriends}>
          <img 
            src={`${import.meta.env.VITE_URL_IMG}/imgProfil/${profil.id_profil_1}/profil/${profil.img_profil}`} 
            alt="Photo de profil" 
            className={Style.img} 
          />
        </div>
        <div className={Style.infoContainer}>
          <div>
            <p onClick={handleClick}>{profil.nom} {profil.prenom}</p>
          </div>
          {!isClick ? (
            profil.ask !== id_user ? (
              <>
                <div className={Style.btnContainer}>
                  <button 
                    className={Style.accept} 
                    data-updatefriends="accept" 
                    onClick={(e) => actionFriends(e)}
                  >
                    Accepter
                  </button>
                  <button 
                    className={Style.reject} 
                    data-updatefriends="reject" 
                    onClick={(e) => actionFriends(e)}
                  >
                    Refuser
                  </button>
                </div>
              </>
            ) : (
              <p>En attente</p>
            )
          ) : (
            <>
              <div className={Style.btnContainer}>
                <button 
                  className={Style.reject} 
                  data-updatefriends="supprimer" 
                  onClick={(e) => actionFriends(e)}
                >
                  Supprimer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CardFriend;
