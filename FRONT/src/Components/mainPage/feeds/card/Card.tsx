import * as React from 'react';
import { useContext, useState } from 'react';
import Style from './Card.module.css';
import { PostWithProfil } from '../../../../Types/Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Author from './author/Author';
import Content from './content/Content';
import CreateCommentaire from './createCommentaire/CreateCommentaire';
import { UserContext } from '../../../../Context/UserContext';
import LikePost from './likePost/LikePost';
import { useAppDispatch } from '../../../../Store/store';
import { deletePost } from '../../../../Store/Post/postSlice';
import { isEmpty } from '../../../../Tools/function';
import FeedCommentaire from './feedCommentaire/FeedCommentaire.tsx';

interface ICardProps {
    post: PostWithProfil
}

const Card: React.FunctionComponent<ICardProps> = ({ post }) => {
  const { id_role, id_user, token } = useContext(UserContext);  
  const dispatch = useAppDispatch();

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

  const handleClickDelete =  ():void => {
    try {
      if (token && !isEmpty(token) && post.id_post) {
        const id_post: number = post.id_post;
        dispatch(deletePost({ id_post, token }))
        setIsClick(prevState => !prevState);
      }
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
            (id_role == 1 || id_user === post.id_profil) && <button className={Style.button} onClick={handleClick}><FontAwesomeIcon className={Style.icon} icon={faEllipsisVertical}/></button>
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
            (showCommentaire) && 
            (
              <>
                <CreateCommentaire id_post={post.id_post}/>
                <div className={Style.cardCom}>
                  <FeedCommentaire id_post={post.id_post}/>
                </div>
              </>
            ) 
          }
        </div>
      </div>
    </>
  );
};

export default Card;
