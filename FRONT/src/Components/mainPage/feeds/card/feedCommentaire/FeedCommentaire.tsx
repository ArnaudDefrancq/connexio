import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../Store/store';
import { UserContext } from '../../../../../Context/UserContext';
import { isEmpty } from '../../../../../Tools/function';
import { getAllCommentaire } from '../../../../../Store/Commentaire/commentaireSlice';
import Commentaire from './commentaire/Commentaire';

interface IFeedCommentaireProps {
    id_post: number
}

const FeedCommentaire: React.FunctionComponent<IFeedCommentaireProps> = ({ id_post }) => {

    const dispatch = useAppDispatch();

    const { token } = useContext(UserContext);
    const { commentaires } = useAppSelector(state => state.commentaire);
    useEffect(() => {
        if (token && !isEmpty(token)) {
            dispatch(getAllCommentaire({ id_post, token }));
        }
    }, [])
  
console.log(commentaires);

  return (
    <>
        {/* {
            commentaires[id_post]?.map((com) => {
                return <Commentaire com={com} key={com.id_commentaire}/>
            })
        } */}
    </>
  );
};

export default FeedCommentaire;
