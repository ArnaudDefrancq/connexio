import * as React from 'react';
import { useContext, useEffect } from 'react';
import FriendsHome from '../Components/friendsPage/FriendsHome';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../Store/store';
import { UserContext } from '../Context/UserContext';
import { getRelation } from '../Store/Amitie/amitieSlice';
import { AmitieStatus } from '../Types/StatusEnum';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFriendsPageProps {
}

const FriendsPage: React.FunctionComponent<IFriendsPageProps> = () => {

  const { token, id_user} = useContext(UserContext);
  const params = useParams();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (token && id_user && params.id) {
      dispatch(getRelation({ id_profil:  id_user, slug: AmitieStatus.Accepted, token }))
      dispatch(getRelation({ id_profil:  id_user, slug: AmitieStatus.Pending, token }))
    }
  }, [])

  return (
    <>
        <Header />
        <FriendsHome />
        <Footer />
    </>
  );
};

export default FriendsPage;
