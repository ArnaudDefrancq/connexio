import * as React from 'react';
import Style  from './Feeds.module.css'
import Card from './card/Card';
import { useAppSelector } from '../../../Store/store';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFeedsProps {
}

const Feeds: React.FunctionComponent<IFeedsProps> = () => {
    const { posts } = useAppSelector(state => state.post);   

    return (
        <>
            <section className={Style.sectionFeeds}>
                {                    
                    posts?.map((post) => {
                        return <Card post={post} key={post.id_post}/>;
                    })
                }
            </section>
        </>
    );
};

export default Feeds;
