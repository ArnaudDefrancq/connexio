import * as React from 'react';
import { useState,useContext, useEffect } from 'react';
import Style from "./ComLike.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../../../../../Context/UserContext';
import { useAppDispatch, useAppSelector } from '../../../../../../../Store/store';
import { createCommentaireLike, deleteCommentaireLike, getAllCommentaireLike } from '../../../../../../../Store/CommentaireLike/commentaireLikeSlice';
import { isEmpty } from '../../../../../../../Tools/function';

interface IComLikeProps {
  id_commentaire: number;
}

const ComLike: React.FunctionComponent<IComLikeProps> = ({ id_commentaire }) => {

  const { token, id_user } = useContext(UserContext);
  const { commentaireLike } = useAppSelector(state => state.commentaireLike);
  const [isLike, setIsLike] = useState<boolean>();  

  const dispatch = useAppDispatch();

  const handleClickLike = (): void => {
    try {              
        if (id_commentaire && token && !isEmpty(token) && id_commentaire !== undefined) {
            dispatch(createCommentaireLike({ id_commentaire, token }))
        }
    } catch (error) {
        console.log(error);
    }
  }

  const handleClickUnlike = (): void => {
    try {              
        if (id_commentaire && token) { 
            dispatch(deleteCommentaireLike({id_commentaire, token}))
            setIsLike(false);
        }
    } catch (error) {
        console.log(error);
    }
  }

  const getNbLike = (id: number): number => {
    if (commentaireLike && commentaireLike[id] && Array.isArray(commentaireLike[id])) {
        return commentaireLike[id].length;
    }
    return 0;
  }

  
  const postIsLike = (id: number) : void => {
    if (commentaireLike && commentaireLike[id] && Array.isArray(commentaireLike[id])) {
        const oneComLike = commentaireLike[id].find((like) => like.id_profil === id_user);
        setIsLike(!!oneComLike);
    }
  }

  useEffect(() => {
    if (token && !isEmpty(token)) {
        dispatch(getAllCommentaireLike({ id_commentaire, token }));
    }
  }, [])

  useEffect(() => {
      if (commentaireLike) postIsLike(id_commentaire);
  }, [commentaireLike])

  return (
    <>
        <div className={Style.likeDiv}>
            <p>
                {
                    getNbLike(id_commentaire)
                }
            </p>
            {
                isLike ? <button onClick={handleClickUnlike}><FontAwesomeIcon className={`${Style.icon} ${Style.isLike}`} icon={faThumbsUp}/></button> : <button onClick={handleClickLike}><FontAwesomeIcon className={Style.icon} icon={faThumbsUp}/></button> 
            }
        </div>
    </>
  );
};

export default ComLike;
