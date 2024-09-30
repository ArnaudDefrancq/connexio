import * as React from 'react';
import { useState, useEffect } from 'react';
import Style  from './Feeds.module.css'
import { Post } from '../../../Types/Post';
import Card from './card/Card';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFeedsProps {
}

const Feeds: React.FunctionComponent<IFeedsProps> = () => {

    const [loadPost, setLoadPost] = useState<Array<Post>>([])

    useEffect(() => {
        
    }, loadPost)
    

    return (
        <>
            <section>
                <p>Publications récentes</p>
                {
                    loadPost.map((post) => {
                        return <Card post={post} key={post.id_post}/>
                    })
                }
            </section>
        </>
    );
};

export default Feeds;
