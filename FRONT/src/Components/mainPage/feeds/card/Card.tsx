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
import { PostController } from '../../../../Controllers/PostController';
import LikePost from './likePost/LikePost';

interface ICardProps {
    post: PostWithProfil
}

const Card: React.FunctionComponent<ICardProps> = ({ post }) => {

  const { role, id_user, token } = useContext(UserContext);

  const [isClick, setIsClick] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [showCommentaire, setShowCommentaire] = useState<boolean>(false);

  const handleClick = ():void => {
    setIsClick(prevState => !prevState);
  }

  const handleClickUpdate = ():void => {
    setIsUpdate(prevState => !prevState);
    setIsClick(prevState => !prevState);
  }

  const handleClickDelete =  async ():Promise<void> => {
    try {
      await PostController.deletePost(Number(post.id_post), String(token))
    } catch (error) {
      console.log(error + "PB DELETE");
    }
  }

  const handleClickCommentaire = (): void => {
    setShowCommentaire(prevState => !prevState);
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
              <button onClick={handleClickUpdate}><FontAwesomeIcon className={Style.iconTools} icon={faPencil}/><span>{isUpdate ? "Annuler" : " Modifier"}</span></button>
              <button onClick={handleClickDelete}><FontAwesomeIcon className={Style.iconTools} icon={faTrash}/><span>Supprimer</span></button>
            </div> 
          }
        </div>
        <div className={Style.cardPost}>
          <Content id_post={post.id_post} content={post.content} media={post.media} id_profil={post.id_profil} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/>
        </div>
        <div className={`${Style.cardPost} ${Style.divLike}`}>
          <button onClick={handleClickCommentaire}>Commentaires</button>
          <LikePost id_post={post.id_post} />
        </div>
        <div>
          {
            (showCommentaire) && <Commentaire id_post={post.id_post}/> 
          }
        </div>
      </div>
    </>
  );
};

export default Card;
