import * as React from 'react';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Style from './LikePost.module.css'
import { UserContext } from '../../../../../Context/UserContext';
import { PostLikeController } from '../../../../../Controllers/PostLikeController';

interface ILikePostProps {
    id_post: number | undefined
}

const LikePost: React.FunctionComponent<ILikePostProps> = ({ id_post }) => {

    const { token } = useContext(UserContext);

    const handleClickLike = async(): Promise<void> => {
        try {  
            console.log(token);
            
            if (id_post && token) {
                await PostLikeController.createPostLike(id_post, token);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <> 
        <div className={Style.likeDiv}>
            <p></p>
            <button onClick={handleClickLike}><FontAwesomeIcon className={Style.icon} icon={faThumbsUp}/></button>
        </div>
    </>
    );
};

export default LikePost;
