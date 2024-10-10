import * as React from 'react';
import { SetStateAction, useState, useEffect } from 'react';
import Style from './Content.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faFile, faCircleXmark } from '@fortawesome/free-solid-svg-icons';


interface IContentProps {
  content: string,
  media: string | null | undefined,
  id_profil: number | undefined,
  isUpdate: boolean,
  setIsUpdate: React.Dispatch<SetStateAction<boolean>>
}

const Content: React.FunctionComponent<IContentProps> = ({ content, media, id_profil, isUpdate, setIsUpdate }) => {

  const [contentPost, setContentPost] = useState<string>(content);
  const [imgPost, setImgPost] = useState<string>("")

  useEffect(() => {
    if (media) {
      setImgPost(`${import.meta.env.VITE_URL_IMG}/imgPost/${id_profil}/${media}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    {
      (!isUpdate) ? (
        <div>
          <p>{contentPost}</p>
          <div className={Style.divImgPost}>
            {
              (imgPost && <img src={imgPost} alt="photo poster" className={Style.imgPost}/>)
            }
          </div>
        </div>
      ) : (
        <div>
          <form  className={`${Style.formPost} form`}>
            <div className={Style.contentDiv}>
                <div className={`${Style.group} form-group`}>
                    <textarea  
                        className={`${Style.input}`} 
                        defaultValue={content}
                        required
                        placeholder=" "
                        id='content'
                    />
                    <label className={''} htmlFor="content">Votre message </label>
                </div>
                <div className="">
                    <input 
                        className={Style.inputFile} 
                        type="file" 
                        id="files"
                        accept=".jpg, .jpeg, .png, .gif"
                    />
                    <label className={`${Style.label}`} htmlFor="files"><FontAwesomeIcon className={Style.icon} icon={faFile}/></label>
                </div>
              </div>
              <button className=''><FontAwesomeIcon className={Style.icon} icon={faCircleCheck}/></button>
            </form>
            <div className={Style.divImgPost}>
              {
                (imgPost && (
                  <>
                    <img src={imgPost} alt="photo poster" className={Style.imgPost} />
                    <button className={Style.btnImg}><FontAwesomeIcon className={Style.icon} icon={faCircleXmark} /></button>
                  </>
                ))
              }
            </div>
          </div>
      )
    }
    </>
  );
};

export default Content;
