import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import Style from './FormCreateProfil.module.css';
import FormCreateProfil_1 from './form_1/FormCreateProfil_1';
import FormCreateProfil_2 from './form_2/FormCreateProfil_2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../Context/UserContext';
import { deleteAndCreateLocalStorage } from '../../Tools/function';

interface IFormCreateProfilProps {
  id_user: number | null,
  token: string | null
}

type StoredData = {
  firstName:string, 
  lastName: string, 
  day: string,
  month : string,
  year : string
  city: string, 
  content :string,
  profil : File | null,
  banner : File | null
}

const FormCreateProfil: React.FunctionComponent<IFormCreateProfilProps> = () => {

  const [getForm, setGetForm] = useState<boolean>(true);

  const { token, id_user } = useContext(UserContext);

  const defaultValue : StoredData =  {
    firstName : "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    city : "",
    content : "",
    profil: null,
    banner : null
  }

  // Changement du Form
  const handleClick = () : void => {
    if (getForm) {
      setGetForm(false);
    } else {
      setGetForm(true);
    }
  }

  // Permet de créer un item dans le localStorage
  useEffect(() => {
    deleteAndCreateLocalStorage('formData', defaultValue);
  }, [])

  // Gestion role du btn
  const roleButton = ():JSX.Element  => {
    return getForm ? <FontAwesomeIcon className={Style.icon} icon={faArrowRight}/> : <FontAwesomeIcon className={Style.icon} icon={faArrowLeft}/>;
  }
  
  return (
    <>
      <section className={Style.section}>
        <div className={Style.formCreate}>
          <form className={`${Style.form} form`}>
          {
            getForm ? <FormCreateProfil_1 /> : <FormCreateProfil_2 id_user={id_user} token={token}/> 
          }
          </form>
          <div className={Style.btnNextForm}>
            <button onClick={() => handleClick()}>{roleButton()}</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormCreateProfil;
