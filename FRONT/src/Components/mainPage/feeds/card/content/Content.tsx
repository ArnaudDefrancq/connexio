import * as React from 'react';
import { SetStateAction, useState, useEffect, useContext } from 'react';
import Style from './Content.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faFile, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Security } from '../../../../../Tools/Security';
import { REGEX_TEXTE } from '../../../../../Tools/config';
import { UserContext } from '../../../../../Context/UserContext';
import { NewPost } from '../../../../../Types/Post';
import { useAppDispatch } from '../../../../../Store/store';
import { updatePost } from '../../../../../Store/Post/postSlice';


interface IContentProps {
  id_post: number | undefined,
  content: string,
  media: string | null | undefined,
  id_profil: number | undefined,
  isUpdate: boolean,
  setIsUpdate: React.Dispatch<SetStateAction<boolean>>
}

type Errors = {
  errorContent: boolean,
  errorFile: boolean,
}

const Content: React.FunctionComponent<IContentProps> = ({ id_post, content, media, id_profil, isUpdate, setIsUpdate }) => {

  const { token, id_user } = useContext(UserContext);

  const dispatch = useAppDispatch();
  

  const [contentPost, setContentPost] = useState<string>(content);
  const [imgPost, setImgPost] = useState<string>("");
  const [imgPostUpdate, setImgPostUpdate] = useState<string>("");
  const [imgPostFile, setImgPostFile] = useState<File | null | string | undefined>(media);
  const [deletePicture, setDeletePicture] = useState<boolean>(false);

  const [errors, setErrors] = useState<Errors> ({
    errorContent: false,
    errorFile: false,
  }); 

  const checkInput = (value: string): void => {
    Security.checkValidity(value, REGEX_TEXTE, 'errorContent', setErrors);
  }

  const checkFile = (e:React.ChangeEvent<HTMLInputElement>):void => {

    if (e.target.files && e.target.files[0]) {           
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        
            if (allowedTypes.includes(file.type)) {        
              setImgPostFile(file);
                setErrors(prevError => ({
                    ...prevError,
                    errorFile: false,
                }));
            } else {
                console.error('Type de fichier non valide.');
                setErrors(prevError => ({
                    ...prevError,
                    errorFile: true,
                }));
            }
        } else {
            setErrors(prevError => ({
                ...prevError,
                errorFile: true,
            }));
    }
  }

  const previewImg = (e:React.ChangeEvent<HTMLInputElement>):void => {    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const filePreview = event.target?.result as string;
        setImgPostUpdate(filePreview);        
        setImgPostFile(file);
      };
      reader.readAsDataURL(file);
    }
  }

  const deleteImg = (): void => {
    setDeletePicture(true);
    setImgPostUpdate('');
    setImgPostFile(null);
  } 

  useEffect(() => {
    setImgPostUpdate('');
    setImgPostFile(media);
    setDeletePicture(false);
    if (media) {
      setImgPost(`${import.meta.env.VITE_URL_IMG}/imgPost/${id_profil}/${media}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate, media])

  const handleClickUpdatePost = (e:React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    if (!errors.errorContent && !errors.errorFile && id_user && id_post && token) {
      const newPost: NewPost = {
          content: contentPost,
          media: (imgPostFile ? imgPostFile : "null")
      };
      
      // await PostController.updatePost(newPost, id_user, id_post, token);
      dispatch(updatePost({ newPost, id_user, id_post, token }));
      setImgPostFile(media);
      setIsUpdate(prev => !prev);
    } else {
        console.log('input pas OK');
    }
  }

  return (
    <>
    {
      (!isUpdate) ? (
        <div>
          <p>{contentPost}</p>
          <div className={Style.divImgPost}>
            {              
              (media && <img src={imgPost} alt="photo poster" className={Style.imgPost}/>)
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
                        onChange={(e) => {setContentPost(e.target.value); checkInput(e.target.value)}}
                    />
                    <label className={''} htmlFor="content">Votre message </label>
                </div>
                <div className="">
                    <input 
                        className={Style.inputFile} 
                        type="file" 
                        id="fileUpdate"
                        accept=".jpg, .jpeg, .png, .gif"
                        onChange={(e) => {previewImg(e); checkFile(e)}}
                    />
                    <label className={`${Style.label}`} htmlFor="fileUpdate"><FontAwesomeIcon className={Style.icon} icon={faFile}/></label>
                </div>
              </div>
              <button className='' onClick={handleClickUpdatePost}><FontAwesomeIcon className={Style.icon} icon={faCircleCheck}/></button>
            </form>
            <div className={Style.divImgPost}>
              {
                (((media || imgPostUpdate ) && !deletePicture) && (
                  <>
                    <img src={(imgPostUpdate !== "") ? imgPostUpdate : imgPost} alt="photo poster" className={Style.imgPost} />
                    <button className={Style.btnImg} onClick={deleteImg}><FontAwesomeIcon className={Style.icon} icon={faCircleXmark} /></button>
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
