import * as React from 'react';
import FriendsHome from '../Components/friendsPage/FriendsHome';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFriendsPageProps {
}

const FriendsPage: React.FunctionComponent<IFriendsPageProps> = () => {
  return (
    <>
        <Header />
        <FriendsHome />
        <Footer />
    </>
  );
};

export default FriendsPage;
