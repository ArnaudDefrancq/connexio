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
      <img src={pathImg} alt="photo de profil" className={Style.imgProfil}/>
      <div className={Style.divAuthor}>
        <p className={Style.author}>{nom} {prenom}</p> 
        {
          (updatedAt == createdAt) ? <p className={Style.datePost}>{timestampToDate(createdAt)}</p> : <p className={Style.datePost}>{timestampToDate(updatedAt)}</p>
        }
      </div>
    </>
  );
};

export default Author;
