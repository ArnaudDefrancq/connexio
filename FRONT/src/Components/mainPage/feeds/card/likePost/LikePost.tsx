import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Style from './LikePost.module.css'
import { UserContext } from '../../../../../Context/UserContext';
import { useAppDispatch, useAppSelector } from '../../../../../Store/store';
import { createPostLike, deletePostLike, getAllPostLike } from '../../../../../Store/PostLike/postLikeSlice';
import { isEmpty } from '../../../../../Tools/function';

interface ILikePostProps {
    id_post: number
}

const LikePost: React.FunctionComponent<ILikePostProps> = ({ id_post }) => {

    const dispatch = useAppDispatch();
    const [isLike, setIsLike] = useState<boolean>();
    const { postLike } = useAppSelector(state => state.postLike);
    const { token, id_user } = useContext(UserContext);

    const handleClickLike = (): void => {
        try {              
            if (id_post && token && !isEmpty(token) && id_post !== undefined) {
                dispatch(createPostLike({ id_post, token }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickUnlike = (): void => {
        try {              
            if (id_post && token) { 
                dispatch(deletePostLike({id_post, token}))
                setIsLike(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getNbLike = (id: number): number => {
        if (postLike && postLike[id] && Array.isArray(postLike[id])) {
            return postLike[id].length;
        }
        return 0;
    }

    const postIsLike = (id: number) : void => {
        if (postLike && postLike[id] && Array.isArray(postLike[id])) {
            const onePostLike = postLike[id].find((like) => like.id_profil === id_user);
            setIsLike(!!onePostLike);
        }
    }
        
    useEffect(() => {
        if (token && id_post !== undefined && !isEmpty(token)) {
            dispatch(getAllPostLike({ id_post, token }));
        }
    }, [])

    useEffect(() => {
        if (postLike) postIsLike(id_post);
    }, [postLike])
    

  return (
    <> 
        <div className={Style.likeDiv}>
            <p>
                {
                    getNbLike(id_post)
                }
            </p>
            {
                isLike ? <button onClick={handleClickUnlike}><FontAwesomeIcon className={`${Style.icon} ${Style.isLike}`} icon={faThumbsUp}/></button> : <button onClick={handleClickLike}><FontAwesomeIcon className={Style.icon} icon={faThumbsUp}/></button> 
            }
        </div>
    </>
    );
};

export default LikePost;
