import * as React from 'react';
import FriendsHome from '../Components/friendsPage/FriendsHome';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFriendsPageProps {
}

const FriendsPage: React.FunctionComponent<IFriendsPageProps> = () => {
  return (
    <>
        <FriendsHome />
    </>
  );
};

export default FriendsPage;
