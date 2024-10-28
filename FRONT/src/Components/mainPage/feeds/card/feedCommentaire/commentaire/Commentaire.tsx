import * as React from 'react';
import { useEffect } from 'react';
import Style from "./Commentaire.module.css";
import { CommentaireWithProfil } from '../../../../../../Types/Commentaire';
import AuthorCom from './authorCom/AuthorCom';
import ComLike from './comLike/ComLike';

interface ICommentaireProps {
    com: CommentaireWithProfil,
    id_post: number
}

const Commentaire: React.FunctionComponent<ICommentaireProps> = ({ com, id_post }) => {
  

  return (
    <>
      <div className={''}>
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
