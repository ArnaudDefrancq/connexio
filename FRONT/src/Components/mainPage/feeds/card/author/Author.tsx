import * as React from 'react';
import { timestampToDate } from '../../../../../Tools/function';

interface IAuthorProps {
  nom: string,
  prenom: string,
  img: string,
  createdAt: number,
  updatedAt: number,
  id_profil: number | undefined
}

const Author: React.FunctionComponent<IAuthorProps> = ({ nom, prenom, img, createdAt, updatedAt, id_profil }) => {

  const pathImg = `http://localhost:5000/imgProfil/${id_profil}/profil/${img}`

  return (
    <>
      <div>
        <img src={pathImg} alt="photo de profil" />
      </div>
      <div>
        <p>{nom} {prenom}</p> 
        {
          (updatedAt == createdAt) ? timestampToDate(createdAt) : timestampToDate(updatedAt)
        }
      </div>
    </>
  );
};

export default Author;
