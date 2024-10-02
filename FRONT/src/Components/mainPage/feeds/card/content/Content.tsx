import * as React from 'react';

interface IContentProps {
  content: string,
  media: string | null | undefined,
  id_profil: number | undefined
}

const Content: React.FunctionComponent<IContentProps> = ({ content, media, id_profil }) => {

  let pathImg = '';
  if (media) {
    pathImg = `http://localhost:5000/imgPost/${id_profil}/${media}`;
  }

  return (
    <>
    <div>
      <p>{content}</p>
      {
        (pathImg && <img src={pathImg} alt="photo poster" />)
      }
    </div>
    </>
  );
};

export default Content;
