import * as React from 'react';
import { useContext, useState } from 'react';
import Style from "./Commentaire.module.css";
import { CommentaireWithProfil } from '../../../../../../Types/Commentaire';
import AuthorCom from './authorCom/AuthorCom';
import ComLike from './comLike/ComLike';
import { UserContext } from '../../../../../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../../../../Store/store';
import { isEmpty } from '../../../../../../Tools/function';
import { deleteCommentaire } from '../../../../../../Store/Commentaire/commentaireSlice';

interface ICommentaireProps {
    com: CommentaireWithProfil,
}

const Commentaire: React.FunctionComponent<ICommentaireProps> = ({ com }) => {
  
  const { role, id_user, token } = useContext(UserContext);
  const [isClick, setIsClick] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleClick = ():void => {
    setIsClick(prevState => !prevState);
  }

  const handleClickDelete =  ():void => {
    try {
      if (token && !isEmpty(token) && com.id_commentaire) {
        dispatch(deleteCommentaire({idCommentaire: com.id_commentaire, token}));
        setIsClick(prev => !prev);
      }
    } catch (error) {
      console.log(error + "Pb delete Com")
    }
  }


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
