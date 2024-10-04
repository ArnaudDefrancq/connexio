import * as React from 'react';
import { useContext, useState } from 'react';
import Style from './Card.module.css';
import { PostWithProfil } from '../../../../Types/Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Author from './author/Author';
import Content from './content/Content';
import Commentaire from './commentaire/Commentaire';
import { UserContext } from '../../../../Context/UserContext';

interface ICardProps {
    post: PostWithProfil
}

const Card: React.FunctionComponent<ICardProps> = ({ post }) => {

  const { role, id_user } = useContext(UserContext);

  const [isClick, setIsClick] = useState<boolean>(false);

  const handleClick = ():void => {
    setIsClick(prevState => !prevState);
  }

  return (
    <>
      <div className={Style.card}>
        <div className={Style.cardAuthor}>
          <Author nom={post.nom} prenom={post.prenom} img={post.img_profil} createdAt={post.created_at} updatedAt={post.updated_at} id_profil={post.id_profil} />
          {
            (role === 1 || id_user === post.id_profil) && <button className={Style.button} onClick={handleClick}><FontAwesomeIcon className={Style.icon} icon={faEllipsisVertical}/></button>
          }
          {
            (isClick) && 
            <div className={Style.divTools}>
              <button><FontAwesomeIcon className={Style.iconTools} icon={faPencil}/><span>Modifier</span></button>
              <button><FontAwesomeIcon className={Style.iconTools} icon={faTrash}/><span>Supprimer</span></button>
            </div> 
          }
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
