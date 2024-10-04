import * as React from 'react';
import Style from './Card.module.css';
import { PostWithProfil } from '../../../../Types/Post';
import Author from './author/Author';
import Content from './content/Content';
import Commentaire from './commentaire/Commentaire';

interface ICardProps {
    post: PostWithProfil
}

const Card: React.FunctionComponent<ICardProps> = ({ post }) => {
  return (
    <>
      <div className={Style.card}>
        <div className={Style.cardAuthor}>
          <Author nom={post.nom} prenom={post.prenom} img={post.img_profil} createdAt={post.created_at} updatedAt={post.updated_at} id_profil={post.id_profil} />
        </div>
        <div className={Style.cardPost}>
          <Content content={post.content} media={post.media} id_profil={post.id_profil}/>
        </div>
        <div>
          <Commentaire id_post={post.id_post}/>
        </div>
      </div>
    </>
  );
};

export default Card;
