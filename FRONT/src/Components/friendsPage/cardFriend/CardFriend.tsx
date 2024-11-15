import * as React from 'react';
import Style from "./CardFriend.module.css";
import { AmitieWithProfil } from '../../../Types/Amitie';

interface ICardFriendProps {
    profil: AmitieWithProfil
}

const CardFriend: React.FunctionComponent<ICardFriendProps> = ({ profil }) => {

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
              <div className={Style.btnContainer}>
                <button className={Style.accept}>Accepter</button>
                <button className={Style.reject}>Refuser</button>
              </div>
            </div>
        </div>
    </>
  );
};

export default CardFriend;
