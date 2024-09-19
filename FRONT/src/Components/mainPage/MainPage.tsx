import * as React from 'react';
import Style from './MainPage.module.css'
import CreatePost from './createPost/CreatePost';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IMainPageProps {
}

const MainPage: React.FunctionComponent<IMainPageProps> = () => {
  return (
    <>
        <main>
            <CreatePost />
        </main>
    </>
  );
};

export default MainPage;
