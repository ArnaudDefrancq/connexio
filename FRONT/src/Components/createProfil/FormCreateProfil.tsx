import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import Style from './FormCreateProfil.module.css';
import FormCreateProfil_1 from './form_1/FormCreateProfil_1';
import FormCreateProfil_2 from './form_2/FormCreateProfil_2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../Context/UserContext';
import { deleteAndCreateLocalStorage, isEmpty, timestampToDate } from '../../Tools/function';
import { useParams } from 'react-router-dom';
import { Profil } from '../../Types/Profil';
import { ProfilController } from '../../Controllers/ProfilController';
import { monthArray } from '../../Tools/config';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfilProps {
  // id_user: number | null,
  // token: string | null
}

type StoredData = {
  firstName:string, 
  lastName: string, 
  day: string,
  month : string,
  year : string
  city: string, 
  content :string,
  profil : File | null | string,
  banner : File | null | string,
  isClickProfil: boolean,
  isClickBanner: boolean
}

const FormCreateProfil: React.FunctionComponent<IFormCreateProfilProps> = () => {

  const idParams = useParams();
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
    banner : null,
    isClickProfil:  false,
    isClickBanner: false
  }

  const getBirht = (date: string): Array<string> => {
    return date.split('/');
  }


  const getProfil = async(id: number, token: string): Promise<void> => {
    try {
      const res = await ProfilController.getOneProfil(id, token);
      const profilUser: Profil = res;
      defaultValue.firstName = profilUser.prenom;
      defaultValue.lastName = profilUser.nom;
      defaultValue.city = profilUser.ville;
      defaultValue.content = profilUser.description;
      defaultValue.profil = profilUser.img_profil;
      defaultValue.banner = profilUser.img_bg
      defaultValue.day = getBirht(timestampToDate(profilUser.date_naissance))[0];
      defaultValue.month = monthArray[parseInt(getBirht(timestampToDate(profilUser.date_naissance))[1], 10) - 1];
      defaultValue.year = getBirht(timestampToDate(profilUser.date_naissance))[2];

      deleteAndCreateLocalStorage('formData', defaultValue);
      return;
      
    } catch (error) {
      console.log(error + "Pg update Get Profil");
      throw error;
    }
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
    if (idParams.id && !isEmpty(idParams.id) && token) {
      getProfil(Number(idParams.id), token);      
    } else {
      deleteAndCreateLocalStorage('formData', defaultValue);
    }
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
            getForm ? <FormCreateProfil_1 /> : <FormCreateProfil_2 id_user={id_user} token={token} idParams={Number(idParams.id)}/> 
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
