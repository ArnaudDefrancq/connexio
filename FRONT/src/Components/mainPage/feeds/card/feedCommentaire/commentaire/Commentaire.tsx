import * as React from 'react';
import { useContext, useState } from 'react';
import Style from "./Commentaire.module.css";
import { CommentaireWithProfil } from '../../../../../../Types/Commentaire';
import AuthorCom from './authorCom/AuthorCom';
import ComLike from './comLike/ComLike';
import { UserContext } from '../../../../../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ICommentaireProps {
    com: CommentaireWithProfil,
    id_post: number
}

const Commentaire: React.FunctionComponent<ICommentaireProps> = ({ com, id_post }) => {
  
  const { role, id_user } = useContext(UserContext);
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleClick = ():void => {
    setIsClick(prevState => !prevState);
  }

  const handleClickDelete =  ():void => {}


  return (
    <>
      <div className={Style.divCom}>
        {
          (role == 1 || com.id_profil == id_user) && <button className={Style.button} onClick={handleClick}><FontAwesomeIcon className={Style.icon} icon={faEllipsisVertical}/></button>
        }
        {
          (isClick) && 
          <div className={Style.divTools}>
            <button onClick={handleClickDelete}><FontAwesomeIcon className={Style.iconTools} icon={faTrash}/><span>Supprimer</span></button>
          </div> 
        }
        <div className={Style.authorCom}>
          <AuthorCom nom={com.nom} prenom={com.prenom} img={com.img_profil} id_profil={com.id_profil} createdAt={com.created_at}/>
        </div>
        <p className={Style.content}>{com.content}</p>
        <ComLike />
      </div>
    </>
  ) ;
};

export default Commentaire;
