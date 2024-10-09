import * as React from 'react';
import { useState } from 'react';
import Style from './Content.module.css'


interface IContentProps {
  content: string,
  media: string | null | undefined,
  id_profil: number | undefined
}

const Content: React.FunctionComponent<IContentProps> = ({ content, media, id_profil }) => {

  const [contentPost, setContentPost] = useState<string>(content);

  let pathImg = '';
  if (media) {
    pathImg = `${import.meta.env.VITE_URL_IMG}/imgPost/${id_profil}/${media}`;
  }

  return (
    <>
    <div>
      <p>{contentPost}</p>
      <div className={Style.divImgPost}>
        {
          (pathImg && <img src={pathImg} alt="photo poster" className={Style.imgPost}/>)
        }
      </div>
    </div>
    </>
  );
};

export default Content;
