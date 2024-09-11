import * as React from 'react';
import { useState, useEffect } from 'react';
import Style from './FormCreateProfil_2.module.css';
import { monthArray } from '../../../Tools/config';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfil_2Props {
}

const FormCreateProfil_2: React.FunctionComponent<IFormCreateProfil_2Props> = () => {
  const [imgProfil, setImgProfil] = useState<string>('');
  const [imgBanner, setImgBanner] = useState<string>('');

  interface Errors {
    errorFirstName: boolean;
    errorLastName: boolean;
    errorDate: boolean;
    errorCity: boolean;
    errorContent: boolean;
    errorProfil: boolean;
    errorBanner: boolean;
  }

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

  // Permet de check les inputs
  const checkInput = (value: string, regex: RegExp): boolean  => {
    return regex.test(value) && value != "";
  }

  const checkValidity = (value: string, regex: RegExp, node: string): void => {
    if (checkInput(value, regex)) {
        setErrors((elemnt) => ({
            ...elemnt,
            [node]: false
        }));
    } else {
        setErrors((elemnt) => ({
            ...elemnt,
            [node]: true
        }));
    }
  }

  const REGEX_DATE_NAISSANCE: RegExp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const REGEX_TEXTE: RegExp = /^[a-zA-Z\s].{3,20}$/;

  // Permet de check le localStorage
  const checkFormText = ():void => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parseData = JSON.parse(storedData);
      checkValidity(parseData.firstName, REGEX_TEXTE, 'errorFirstName')
      checkValidity(parseData.lastName, REGEX_TEXTE, 'errorLastName')
      checkValidity(parseData.city, REGEX_TEXTE, 'errorcity')
      checkValidity(parseData.content, REGEX_TEXTE, 'errorContent')
      checkValidity(parseData.profil, REGEX_TEXTE, 'errorProfil')
      checkValidity(parseData.banner, REGEX_TEXTE, 'errorBanner')
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
