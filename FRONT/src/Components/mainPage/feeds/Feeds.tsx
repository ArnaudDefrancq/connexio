import * as React from 'react';
import Style  from './Feeds.module.css'
import Card from './card/Card';
import { useAppSelector } from '../../../Store/store';
import { useParams } from 'react-router-dom';

interface IFeedsProps {
    profilPost: boolean;
}

const Feeds: React.FunctionComponent<IFeedsProps> = ({ profilPost }) => {
    const idParams = useParams();
    const { posts } = useAppSelector(state => state.post);       

    return (
        <>
            <section className={Style.sectionFeeds}>
                {                    
                    posts?.map((post) => {
                        if (profilPost) {
                            if (post.id_profil == Number(idParams.id)) {
                                return <Card post={post} key={post.id_post}/>;
                            }
                        } else {
                            return <Card post={post} key={post.id_post}/>;
                        }
                    })
                }
            </section>
        </>
    );
};

export default Feeds;
