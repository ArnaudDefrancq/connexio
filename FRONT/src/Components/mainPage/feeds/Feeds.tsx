import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Style  from './Feeds.module.css'
import { Post } from '../../../Types/Post';
import Card from './card/Card';
import { PostController } from '../../../Controllers/PostController';
import { UserContext } from '../../../Context/UserContext';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFeedsProps {
}

const Feeds: React.FunctionComponent<IFeedsProps> = () => {

    const { token } = useContext(UserContext);
    const [loadPost, setLoadPost] = useState<Array<Post> | null>();

    useEffect(() => {
        const fetchPosts = async () => {
            if (token) {
                try {
                    const allPosts = await PostController.getAllPost(token);
                    setLoadPost(allPosts || []); 
                } catch (err) {
                    console.log(err);
                } 
            } 
        };

        fetchPosts();
    }, [token]);



    return (
        <>
            <section>
                <p>Publications récentes</p>
                {                    
                    loadPost?.map((post) => {
                        return <Card post={post} key={post.id_post}/>;
                    })
                }
            </section>
        </>
    );
};

export default Feeds;
