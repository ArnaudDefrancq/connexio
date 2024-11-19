import * as React from 'react';
import { useContext } from 'react';
import Style from "./CardFriend.module.css";
import { AmitieWithProfil } from '../../../Types/Amitie';
import { useAppDispatch } from '../../../Store/store';
import { UserContext } from '../../../Context/UserContext';
import { updateRelation } from '../../../Store/Amitie/amitieSlice';
import { AmitieStatus } from '../../../Types/StatusEnum';

interface ICardFriendProps {
    profil: AmitieWithProfil,
    isClick: boolean
}

const CardFriend: React.FunctionComponent<ICardFriendProps> = ({ profil, isClick }) => {

  const { token } = useContext(UserContext);
  const dispatch = useAppDispatch();

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
      default:
        console.log('pas bonne action');
    }
    
  }

  return (
    <>
        <div className={Style.cardFriend}>
            <div className={Style.imgFriends}>
              <img src={`${import.meta.env.VITE_URL_IMG}/imgProfil/${profil.id_profil_1}/profil/${profil.img_profil}`} alt="Photo de profil" className={Style.img}/>
            </div>
            <div  className={Style.infoContainer}>
              <div>
                <p>{profil.nom} {profil.prenom}</p>
              </div>
              {
                !isClick && (
                  <>
                    <div className={Style.btnContainer}>
                      <button className={Style.accept} data-updatefriends='accept' onClick={e => actionFriends(e)}>Accepter</button>
                      <button className={Style.reject} data-updatefriends='reject' onClick={e => actionFriends(e)}>Refuser</button>
                    </div>
                  </>
                )
              }
            </div>
        </div>
    </>
  );
};

export default CardFriend;
