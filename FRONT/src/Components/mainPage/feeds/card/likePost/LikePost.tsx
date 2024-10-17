import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Style from './LikePost.module.css'

interface ILikePostProps {
    id_post: number | undefined
}

const LikePost: React.FunctionComponent<ILikePostProps> = ({ id_post }) => {
  return (
    <> 
        <div className={Style.likeDiv}>
            <p>0</p>
            <button><FontAwesomeIcon className={Style.icon} icon={faThumbsUp}/></button>
        </div>
    </>
    );
};

export default LikePost;
