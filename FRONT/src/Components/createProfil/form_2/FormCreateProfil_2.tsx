import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Style from './FormCreateProfil_2.module.css';
import { monthArray, REGEX_DATE_NAISSANCE, REGEX_TEXTE_PROFIL } from '../../../Tools/config';
import { Security } from '../../../Tools/Security';
import { ProfilController } from '../../../Controllers/ProfilController';
import { UpdateProfil } from '../../../Types/Profil';
import { dateToTimestamp, deleteAndCreateLocalStorage, isEmpty, setDataLocalStorage } from '../../../Tools/function';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';

interface IFormCreateProfil_2Props {
  id_user: number | null,
  token: string | null,
  idParams: number | undefined
}

type Errors = {
  errorFirstName: boolean;
  errorLastName: boolean;
  errorDate: boolean;
  errorCity: boolean;
  errorContent: boolean;
}

const FormCreateProfil_2: React.FunctionComponent<IFormCreateProfil_2Props> = ({id_user, token, idParams}) => {

  const { updateUserContext } = useContext(UserContext);

  const [imgProfil, setImgProfil] = useState<string>('');
  const [imgBanner, setImgBanner] = useState<string>('');
  const [profilFile, setProfilFile] = useState<File | null>(null); 
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [form, setForm] = useState<boolean>(false);

  const [errors, setErrors] = useState<Errors>({
    errorFirstName: true,
    errorLastName: true,
    errorDate: true,
    errorCity: true,
    errorContent: true
  })
  
  const navigate = useNavigate();

  const updateProfil : UpdateProfil = {
    lastName: '',
    firstName: "",
    date: 0,
    profil: null ,
    bg: null ,
    city: "",
    content: "",
  };

  // Permet de set les données dans le localStorage
  // const setDataLocalStorage = (node:string, value: string):void => {
  //   if (localStorage.getItem('formData')) {
  //     const storedData = localStorage.getItem('formData');
  //     if (storedData) {
  //       const parseData = JSON.parse(storedData);
  //       if (node in parseData) {          
  //         parseData[node] = value
  //       }
  //       localStorage.setItem('formData', JSON.stringify(parseData))
  //     }
  //   }
  // }

  // Permet de visualiser la photo
  const previewImg = (e:React.ChangeEvent<HTMLInputElement>, profil: boolean = true):void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const filePreview = event.target?.result as string;
  
        if (profil) {
          setImgProfil(filePreview);
          setProfilFile(file);
          setDataLocalStorage('formData', 'profil', event.target?.result as string); 
        } else {
          setImgBanner(filePreview); 
          setBannerFile(file); 
          setDataLocalStorage('formData', 'banner', event.target?.result as string); 
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Permet de check le localStorage
  const checkFormText = ():void => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parseData = JSON.parse(storedData);
      Security.checkValidity(parseData.firstName, REGEX_TEXTE_PROFIL, 'errorFirstName', setErrors)
      Security.checkValidity(parseData.lastName, REGEX_TEXTE_PROFIL, 'errorLastName', setErrors)
      Security.checkValidity(parseData.city, REGEX_TEXTE_PROFIL, 'errorCity', setErrors)
      Security.checkValidity(parseData.content, REGEX_TEXTE_PROFIL, 'errorContent', setErrors)
    }
  }

  // Check la date de naissance
  const checkFormDate = (dateUser: string): void => {

    if (dateUser) {
      
      if (!REGEX_DATE_NAISSANCE.test(dateUser)) return;

      const [day, month, year] = dateUser.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) return;

      setErrors(prevErrors => ({
        ...prevErrors,
        errorDate: false, 
      }));

      return;
    }
  }

  // Permet de récup les données et de set les données dans les input
  useEffect(() => {
    if (localStorage.getItem('formData')) {
      const storedData = localStorage.getItem('formData');
      checkFormText();
      if (storedData) {
        const parseData = JSON.parse(storedData);
        if (parseData.profil)  {
          if (idParams && !isEmpty(idParams)) {
            setImgProfil(`${import.meta.env.VITE_URL_IMG}/imgProfil/${idParams}/profil/${parseData.profil}`)
          } else{
            setImgProfil(parseData.profil);      
          }
        } else {
          setImgProfil('../../../../public/images/profilDefault.png')
          setDataLocalStorage('formData', 'profil', '../../../../public/images/profilDefault.png')
        }
        if (parseData.banner)  {
          if (idParams && !isEmpty(idParams)) {
            setImgBanner(`${import.meta.env.VITE_URL_IMG}/imgProfil/${idParams}/bg/${parseData.banner}`)
          } else {
            setImgBanner(parseData.banner);      
          }
        } else {
          setImgBanner('../../../../public/images/bannerDefault.png')
          setDataLocalStorage('formData', 'banner', '../../../../public/images/bannerDefault.png')
        }
        if (parseData.day && parseData.month && parseData.year) {
          checkFormDate(parseData.day + '/' + (monthArray.findIndex((elmnt) => elmnt == parseData.month) + 1).toString().padStart(2, '0') +'/' + parseData.year);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Perment d'envoyer le formulaire
  const handleClick =  async (e: React.MouseEvent<HTMLButtonElement>): Promise<void | string> => {
    e.preventDefault();
     
    if (!errors.errorFirstName && !errors.errorLastName && !errors.errorDate && !errors.errorCity && !errors.errorContent && id_user && token) {  

      if (localStorage.getItem('formData')) {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
          const parseData = JSON.parse(storedData);

          const date: number = dateToTimestamp(parseData.day + '/' + (monthArray.findIndex((elmnt) => elmnt == parseData.month) + 1).toString().padStart(2, '0') +'/' + parseData.year);

          updateProfil.firstName = parseData.firstName;
          updateProfil.lastName = parseData.lastName;
          updateProfil.date = date;
          updateProfil.city = parseData.city;
          updateProfil.content = parseData.content;
          updateProfil.profil = profilFile;
          updateProfil.bg = bannerFile;

          await ProfilController.updateProfil(updateProfil, Number(id_user), token);
          // Redirection vers les feeds
          localStorage.removeItem('formData');
          localStorage.removeItem('formDataError');
          updateUserContext('is_actif', 1);
          navigate('/feeds', { replace: false});
          window.location.href = '/feeds';
        }
      }       
    } else {
      deleteAndCreateLocalStorage('formDataError', errors);
      console.error('Pb update profil');
      setForm(true);
      return;
    }
  }

  return (
    <>
      <div className={`${Style.div} form-group`}>
        <div className={Style.divImg}>
          <img className={Style.imgProfil} src={imgProfil} alt="Aperçu de la photo de profil" />
        </div>
        <input 
            className={Style.input} 
            type="file" 
            id="fileProfil"
            onChange={(e) => previewImg(e)}
          />
        <label className={Style.label} htmlFor="fileProfil">Photo de profil </label>
      </div>
      <div className={`${Style.div} form-group`}>
        <div className={Style.divImg}>
          <img src={imgBanner} alt="Aperçu de la photo banner" />
        </div>
        <input 
            className={Style.input} 
            type="file" 
            id="fileBanner"
            onChange={(e) => previewImg(e, false)}
          />
        <label className={Style.label} htmlFor="fileBanner">Photo banner </label>
      </div>
      {
        (form) && (<p className={`messageError ${Style.p}`}>Input mal remplit.</p>)
      }
      <button className='btnValid' onClick={(e) => handleClick(e)}>Valider</button>
    </>
  );
};

export default FormCreateProfil_2;
