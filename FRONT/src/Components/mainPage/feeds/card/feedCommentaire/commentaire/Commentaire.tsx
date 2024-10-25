import * as React from 'react';
import { useEffect } from 'react';
import { CommentaireWithProfil } from '../../../../../../Types/Commentaire';

interface ICommentaireProps {
    com: CommentaireWithProfil,
    id_post: number
}

const Commentaire: React.FunctionComponent<ICommentaireProps> = ({ com, id_post }) => {

  // console.log(com);
  

  return (
    <>
        <p>{com.content}</p>
    </>
  ) ;
};

export default Commentaire;
