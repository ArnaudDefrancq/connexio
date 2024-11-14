import * as React from 'react';
import { useContext, useEffect } from 'react';
import Style from "./FriendsHome.module.css";
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { getRelation } from '../../Store/Amitie/amitieSlice';
import { AmitieWithProfil } from '../../Types/Amitie';
import CardFriend from './cardFriend/CardFriend';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFriendsHomeProps {
}

const FriendsHome: React.FunctionComponent<IFriendsHomeProps> = () => {
    const { token, id_user } = useContext(UserContext);
    const idParams = useParams();
    const dispatch = useAppDispatch();
    const amisPending = useAppSelector(state => state.amitie.pending);

    useEffect(() => {
        if (idParams.id && token && id_user) {
            dispatch(getRelation({ id_profil:  id_user, slug: "pending", token}));
        }
    }, [])
    
    const displayCard = (array: Array<AmitieWithProfil>) => {        
        return array.map(profil => {           
            return <CardFriend profil={profil} key={profil.id_amitie} />
        })
    }

  return (
    <>
        <main>
            <section className={Style.friendsSection}>
                <button className={`${Style.btnFriends} ${Style.btnActive}`}>Amis</button>
                <button className={Style.btnFriends}>En attente</button>
            </section>
            <section className={Style.cardSection}>
            {
                (id_user && amisPending[id_user] && amisPending[id_user].length > 0) && (
                    <>
                        {displayCard(amisPending[id_user])}
                    </>
                )
            }
            </section>

        </main>
    </>
  );
};

export default FriendsHome;
