import * as React from 'react';
import Style from './Author.module.css';
import { timestampToDate } from '../../../../../Tools/function';
import { useNavigate } from 'react-router-dom';

interface IAuthorProps {
  nom: string,
  prenom: string,
  img: string,
  createdAt: number,
  updatedAt: number,
  id_profil: number
}

const Author: React.FunctionComponent<IAuthorProps> = ({ nom, prenom, img, createdAt, updatedAt, id_profil }) => {

  const navigate = useNavigate();

  const pathImg = `${import.meta.env.VITE_URL_IMG}/imgProfil/${id_profil}/profil/${img}`;

  const showProfil = (e:React.MouseEvent<HTMLParagraphElement>, id: number): void => {
    navigate(`/profil/${id}`)
  }

  return (
    <>
      <img src={pathImg} alt="photo de profil" className={Style.imgProfil}/>
      <div className={Style.divAuthor}>
        <p className={Style.author} onClick={(e) => showProfil(e, id_profil)}>{nom} {prenom}</p> 
        {
          (updatedAt == createdAt) ? <p className={Style.datePost}>{timestampToDate(createdAt)}</p> : <p className={Style.datePost}>{timestampToDate(updatedAt)}</p>
        }
      </div>
    </>
  );
};

export default Author;
