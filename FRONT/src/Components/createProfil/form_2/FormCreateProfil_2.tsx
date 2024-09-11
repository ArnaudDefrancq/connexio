import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../Context/UserContext';
import Style from './FormCreateProfil_2.module.css';
import { monthArray } from '../../../Tools/config';
import { Security } from '../../../Tools/Security';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfil_2Props {
}

type Errors = {
  errorFirstName: boolean;
  errorLastName: boolean;
  errorDate: boolean;
  errorCity: boolean;
  errorContent: boolean;
  errorProfil: boolean;
  errorBanner: boolean;
}

const FormCreateProfil_2: React.FunctionComponent<IFormCreateProfil_2Props> = () => {
  const { token, id_user } = useContext(UserContext);

  const [imgProfil, setImgProfil] = useState<string>('');
  const [imgBanner, setImgBanner] = useState<string>('');

  const [errors, setErrors] = useState<Errors>({
    errorFirstName: true,
    errorLastName: true,
    errorDate: true,
    errorCity: true,
    errorContent: true,
    errorProfil: true,
    errorBanner: true,
  })

  // Permet de récup les données et de set les données dans les input
  useEffect(() => {
    if (localStorage.getItem('formData')) {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        const parseData = JSON.parse(storedData);
        if (parseData.profil)  {
          setImgProfil(parseData.profil);      
        } else {
          setImgProfil('../../../../public/images/profilDefault.png')
        }
        if (parseData.banner)  {
          setImgBanner(parseData.banner);      
        } else {
          setImgBanner('../../../../public/images/bannerDefault.png')
        }
      }
    }
  }, [])
  
  // Permet de set les données dans le localStorage
  const setDataLocalStorage = (node:string, value: string):void => {
    if (localStorage.getItem('formData')) {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        const parseData = JSON.parse(storedData);
        if (node in parseData) {          
          parseData[node] = value
        }
        localStorage.setItem('formData', JSON.stringify(parseData))
      }
    }
  }

  // Permet de visualiser la photo
  const previewImg = (e:React.ChangeEvent<HTMLInputElement>, profil: boolean = true):void => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (profil) {
          setImgProfil(event.target?.result as string);
          setDataLocalStorage('profil', event.target?.result as string)
        } else {
          setImgBanner(event.target?.result as string);
          setDataLocalStorage('banner', event.target?.result as string)
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const REGEX_DATE_NAISSANCE: RegExp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const REGEX_TEXTE: RegExp = /^[a-zA-Z\s].{3,20}$/;

  // Permet de check le localStorage
  const checkFormText = ():void => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parseData = JSON.parse(storedData);
      Security.checkValidity(parseData.firstName, REGEX_TEXTE, 'errorFirstName', setErrors)
      Security.checkValidity(parseData.lastName, REGEX_TEXTE, 'errorLastName', setErrors)
      Security.checkValidity(parseData.city, REGEX_TEXTE, 'errorCity', setErrors)
      Security.checkValidity(parseData.content, REGEX_TEXTE, 'errorContent', setErrors)
      Security.checkValidity(parseData.profil, REGEX_TEXTE, 'errorProfil', setErrors)
      Security.checkValidity(parseData.banner, REGEX_TEXTE, 'errorBanner', setErrors)
    }
  }

  const checkFormDate = ():void => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parseData = JSON.parse(storedData);
      const dateNaissance:string = parseData.day + '/' + (monthArray.findIndex((elmnt) => elmnt == parseData.month) + 1).toString().padStart(2, '0') +'/' + parseData.year;
      
      if (!REGEX_DATE_NAISSANCE.test(dateNaissance)) return;

      const [day, month, year] = dateNaissance.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return;
      }
      setErrors(prevErrors => ({
        ...prevErrors,
        errorDate: false, 
      }));
    }
  }

  // const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void | string> => {
  //   e.preventDefault();

  //   if (!errors.errorFirstName && !errors.errorLastName && !errors.errorDate && !errors.errorCity && !errors.errorContent && !errors.errorProfil && !errors.errorBanner) {
  //     await 
  //   }
  // }

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
            required
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
            required
          />
        <label className={Style.label} htmlFor="fileBanner">Photo banner </label>
      </div>
      <button className='btnValid'>Valider</button>
    </>
  );
};

export default FormCreateProfil_2;
