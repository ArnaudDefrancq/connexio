import * as React from 'react';

interface ICommentaireProps {
  id_post: number | undefined
}

const Commentaire: React.FunctionComponent<ICommentaireProps> = () => {
  return (
    <>
      <p>ICI les commentaires pour un post</p>
    </>
  );
};

export default Commentaire;
