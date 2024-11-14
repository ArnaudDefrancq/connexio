import * as React from 'react';
import { AmitieWithProfil } from '../../../Types/Amitie';

interface ICardFriendProps {
    profil: AmitieWithProfil
}

const CardFriend: React.FunctionComponent<ICardFriendProps> = ({ profil }) => {
  return (
    <>
        <div>
            <p>test</p>
        </div>
    </>
  );
};

export default CardFriend;
