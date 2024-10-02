import * as React from 'react';
import Style from './Author.module.css';
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

  const pathImg = `${import.meta.env.VITE_URL_IMG}/imgProfil/${id_profil}/profil/${img}`

  return (
    <>
      <div>
        <img src={pathImg} alt="photo de profil" className={Style.imgProfil}/>
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
