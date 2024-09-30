import * as React from 'react';
import { Post } from '../../../../Types/Post';

interface ICardProps {
    post: Post
}

const Card: React.FunctionComponent<ICardProps> = ({ post }) => {
  return (
    <>
      <div>
        <h2>{post.content}</h2>
        
      </div>
    </>
  );
};

export default Card;
