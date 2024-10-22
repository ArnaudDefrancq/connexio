import * as React from 'react';
import { useContext, useEffect } from 'react';
// import Style from './MainPage.module.css';
import CreatePost from './createPost/CreatePost';
import Feeds from './feeds/Feeds';
import { UserContext } from '../../Context/UserContext';
import { useAppDispatch } from '../../Store/store';
import { isEmpty } from '../../Tools/function';
import { getAllPost } from '../../Store/Post/postSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IMainPageProps {
}

const MainPage: React.FunctionComponent<IMainPageProps> = () => {

  const { token } = useContext(UserContext);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token && !isEmpty(token)) dispatch(getAllPost(token))
  }, [])

  return (
    <>
        <main>
            <CreatePost />
            <Feeds />
        </main>
    </>
  );
};

export default MainPage;
