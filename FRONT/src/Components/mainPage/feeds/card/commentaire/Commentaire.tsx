import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Style from './Commentaire.module.css'

interface ICommentaireProps {
  id_post: number | undefined
}

const Commentaire: React.FunctionComponent<ICommentaireProps> = () => {

  
  return (
    <>
       <form className={`${Style.formCom} form`}>
          <div className={Style.contentDiv}>
              <div className={`${Style.group} form-group`}>
                  <textarea  
                      className={`${Style.input}`} 
                      required
                      placeholder=" "
                      id='commentaire'
                  />
                  <label className={''} htmlFor="commentaire">Votre commentaire </label>
              </div>
          </div>
          <button className=''><FontAwesomeIcon className={Style.icon} icon={faPaperPlane}/></button>
        </form>
    </>
  );
};

export default Commentaire;
