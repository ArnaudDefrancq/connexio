import * as React from 'react';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Style from './Commentaire.module.css'
import { UserContext } from '../../../../../Context/UserContext';
import { Security } from '../../../../../Tools/Security';
import { REGEX_TEXTE } from '../../../../../Tools/config';
import { NewCommentaire } from '../../../../../Types/Commentaire';
import { useAppDispatch } from '../../../../../Store/store';
import { createCommentaire } from '../../../../../Store/Commentaire/commentaireSlice';
import { isEmpty } from '../../../../../Tools/function';

interface ICommentaireProps {
  id_post: number | undefined
}

type Errors = {
  errorContent: boolean
}

const Commentaire: React.FunctionComponent<ICommentaireProps> = ({ id_post }) => {

  const { id_user, token } = useContext(UserContext);

  const dispatch = useAppDispatch();

  const [content, setContent] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    errorContent: true
  })
  const [isClick, setIsClick] = useState<boolean>(false);

  const checkInput = (value: string): void => {
    Security.checkValidity(value, REGEX_TEXTE, 'errorContent', setErrors);
  }

  const handleClick = (e:React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    if (!errors.errorContent && id_user && token && id_post) {
      const newCommentaire: NewCommentaire = {
        content,
        id_post: Number(id_post),
        id_profil: Number(id_user)
      }      
      if (token && !isEmpty(token)) {
        dispatch(createCommentaire({ newCommentaire, token }));
        setContent('');
      }
    } else {
      console.log('aie');
    }

  }

  return (
    <>
      <form className={`${Style.formCom} form`}>
        <div className={Style.contentDiv}>
            <div className={`${Style.group} form-group`}>
                <textarea  
                    className={`${Style.input} ${((errors.errorContent && isClick) ? 'bad-input' : '')}`} 
                    required
                    placeholder=" "
                    id='commentaire'
                    onChange={(e) => {setContent(e.target.value); checkInput(e.target.value)}}
                />
                <label className={''} htmlFor="commentaire">Votre commentaire </label>
            </div>
        </div>
        <button className='' onClick={(e) => {handleClick(e); setIsClick(true)}}><FontAwesomeIcon className={Style.icon} icon={faPaperPlane}/></button>
      </form>
    </>
  );
};

export default Commentaire;
