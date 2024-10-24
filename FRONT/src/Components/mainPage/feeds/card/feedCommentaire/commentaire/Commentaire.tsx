import * as React from 'react';
import { useEffect } from 'react';
import { CommentaireWithProfil } from '../../../../../../Types/Commentaire';

interface ICommentaireProps {
    com: CommentaireWithProfil
}

const Commentaire: React.FunctionComponent<ICommentaireProps> = ({ com }) => {
  return (
    <>
        <p>test</p>
    </>
  ) ;
};

export default Commentaire;
