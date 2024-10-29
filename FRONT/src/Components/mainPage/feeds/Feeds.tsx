import * as React from 'react';
import { useContext } from 'react';
import Style  from './Feeds.module.css'
import Card from './card/Card';
import { useAppSelector } from '../../../Store/store';
import { UserContext } from '../../../Context/UserContext';

interface IFeedsProps {
    profilPost: boolean;
}

const Feeds: React.FunctionComponent<IFeedsProps> = ({ profilPost }) => {
    const { id_user } = useContext(UserContext);
    const { posts } = useAppSelector(state => state.post);   

    return (
        <>
            <section className={Style.sectionFeeds}>
                {                    
                    posts?.map((post) => {
                        if (profilPost) {
                            if (post.id_profil == id_user) {
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
