import * as React from 'react';
import Style from './AuthorCom.module.css'
import { timestampToDate } from '../../../../../../../Tools/function';

interface IAuthorComProps {
    nom: string,
    prenom: string,
    img:  string,
    id_profil: number,
    createdAt: number
}

const AuthorCom: React.FunctionComponent<IAuthorComProps> = ({ nom, prenom, img, id_profil, createdAt }) => {

  const pathImg = `${import.meta.env.VITE_URL_IMG}/imgProfil/${id_profil}/profil/${img}`

  return (
    <>
      <img src={pathImg} alt="photo de profil" className={Style.imgProfil}/>
      <div className={Style.divAuthor}>
        <p className={Style.author}>{nom} {prenom}</p> 
        <p className={Style.datePost}>{timestampToDate(createdAt)}</p>
      </div>
    </>
  );
};

export default AuthorCom;
