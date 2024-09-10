import * as React from 'react';
import { useState } from 'react';
import Style from './FormCreateProfil.module.css';
import FormCreateProfil_1 from './form_1/FormCreateProfil_1';
import FormCreateProfil_2 from './form_2/FormCreateProfil_2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfilProps {
}

const FormCreateProfil: React.FunctionComponent<IFormCreateProfilProps> = () => {

  const [getForm, setGetForm] = useState<boolean>(true);

  // Changement du Form
  const handleClick = () : void => {
    if (getForm) {
      setGetForm(false);
    } else {
      setGetForm(true);
    }
  }

  if (!localStorage.getItem('formData')) {
    interface storedData {
      firstName:string, 
      lastName: string, 
      day: string,
      mounth : string,
      year : string
      city: string, 
      content :string,
      profil : string,
      banner : string
    }
    const defaultValue : storedData =  {
      firstName : "",
      lastName: "",
      day: "",
      mounth: "",
      year: "",
      city : "",
      content : "",
      profil: "",
      banner : ""
    }
    localStorage.setItem('formData', JSON.stringify(defaultValue));
  }

  const roleButton = ():JSX.Element  => {
    return getForm ? <FontAwesomeIcon className={Style.icon} icon={faArrowRight}/> : <FontAwesomeIcon className={Style.icon} icon={faArrowLeft}/>;
  }
  
  return (
    <>
      <section className={Style.section}>
        <div className={Style.formCreate}>
          <form className={`${Style.form} form`}>
          {
            getForm ? <FormCreateProfil_1 /> : <FormCreateProfil_2 /> 
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
