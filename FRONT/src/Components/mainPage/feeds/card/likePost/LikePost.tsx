import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Style from './LikePost.module.css'
import { UserContext } from '../../../../../Context/UserContext';
import { PostLikeController } from '../../../../../Controllers/PostLikeController';
import PostLike from '../../../../../Types/PostLike';

interface ILikePostProps {
    id_post: number | undefined
}

const LikePost: React.FunctionComponent<ILikePostProps> = ({ id_post }) => {

    const [nbLike, setNbLike] = useState<Array<PostLike>>([]);
    const [isLike, setIsLike] = useState<boolean>();

    const { token } = useContext(UserContext);

    const handleClickLike = async(): Promise<void> => {
        try {              
            if (id_post && token) {
                await PostLikeController.createPostLike(id_post, token);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickUnlike = async(): Promise<void> => {
        try {              
            if (id_post && token) {
                
                const arrayOnePostLike: Array<PostLike> | void = await PostLikeController.getAllPostLike(id_post, token);     

                if (arrayOnePostLike && arrayOnePostLike.length > 0) {
                    const postLike: PostLike = arrayOnePostLike[0];

                    if (postLike.id_post_like) {
                        await PostLikeController.deletePostLike(postLike.id_post_like, token);
                        setIsLike(false);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getNbLike = async(): Promise<void> => {
        if (token && id_post) {
            const arrayPostLike: Array<PostLike> | void = await PostLikeController.getAllPostLike(id_post, token);         

            if (arrayPostLike && arrayPostLike.length >= 0) {
                setNbLike(arrayPostLike);
            }

            const arrayOnePostLike: Array<PostLike> | void = await PostLikeController.getAllPostLike(id_post, token);     
            if (arrayOnePostLike && arrayOnePostLike.length > 0) {
                setIsLike(true);
            }
        }
    }

    useEffect(() => {
      getNbLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbLike])

  return (
    <> 
        <div className={Style.likeDiv}>
            <p>{nbLike.length}</p>
            {
                isLike ? <button onClick={handleClickUnlike}><FontAwesomeIcon className={`${Style.icon} ${Style.isLike}`} icon={faThumbsUp}/></button> : <button onClick={handleClickLike}><FontAwesomeIcon className={Style.icon} icon={faThumbsUp}/></button> 
            }
        </div>
    </>
    );
};

export default LikePost;
