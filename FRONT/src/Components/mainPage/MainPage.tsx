import * as React from 'react';
import Style from './MainPage.module.css'
import CreatePost from './createPost/CreatePost';
import Feeds from './feeds/Feeds';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IMainPageProps {
}

const MainPage: React.FunctionComponent<IMainPageProps> = () => {
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
