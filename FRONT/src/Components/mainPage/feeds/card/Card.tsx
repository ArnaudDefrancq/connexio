import * as React from 'react';
import { PostWithProfil } from '../../../../Types/Post';

interface ICardProps {
    post: PostWithProfil
}

const Card: React.FunctionComponent<ICardProps> = ({ post }) => {
  return (
    <>
      <div>
        <h2>{post.nom}</h2>
        
      </div>
    </>
  );
};

export default Card;
