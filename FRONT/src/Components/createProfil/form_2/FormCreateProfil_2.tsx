import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../Context/UserContext';
import Style from './FormCreateProfil_2.module.css';
import { monthArray } from '../../../Tools/config';
import { Security } from '../../../Tools/Security';
import { ProfilController } from '../../../Controllers/ProfilController';
import { UpdateProfil } from '../../../Types/Profil';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfil_2Props {
}

type Errors = {
  errorFirstName: boolean;
  errorLastName: boolean;
  errorDate: boolean;
  errorCity: boolean;
  errorContent: boolean;
}

const FormCreateProfil_2: React.FunctionComponent<IFormCreateProfil_2Props> = () => {
  const { token, id_user } = useContext(UserContext);
  console.log(id_user);
    

  const [imgProfil, setImgProfil] = useState<string>('');
  const [imgBanner, setImgBanner] = useState<string>('');
  const [profilFile, setProfilFile] = useState<File | null>(null); 
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Errors>({
    errorFirstName: true,
    errorLastName: true,
    errorDate: true,
    errorCity: true,
    errorContent: true
  })

  const updateProfil : UpdateProfil = {
    lastName: '',
    firstName: "",
    date: 0,
    profil: null ,
    bg: null ,
    city: "",
    content: "",
  };

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
          setDataLocalStorage('profil', '../../../../public/images/profilDefault.png')
        }
        if (parseData.banner)  {
          setImgBanner(parseData.banner);      
        } else {
          setImgBanner('../../../../public/images/bannerDefault.png')
          setDataLocalStorage('banner', '../../../../public/images/bannerDefault.png')
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
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const filePreview = event.target?.result as string;
  
        if (profil) {
          setImgProfil(filePreview);
          setProfilFile(file);
          setDataLocalStorage('profil', file.name); 
        } else {
          setImgBanner(filePreview); 
          setBannerFile(file); 
          setDataLocalStorage('banner', file.name); 
        }
      };
  
      reader.readAsDataURL(file); // Lire le fichier pour l'affichage de l'aperçu
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
    }
  }

  const checkFormDate = (): number | void => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parseData = JSON.parse(storedData);
      const dateNaissance:string = parseData.day + '/' + (monthArray.findIndex((elmnt) => elmnt == parseData.month) + 1).toString().padStart(2, '0') +'/' + parseData.year;
      
      if (!REGEX_DATE_NAISSANCE.test(dateNaissance)) return;

      const [day, month, year] = dateNaissance.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      // console.log(date);

      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return;
      }
      setErrors(prevErrors => ({
        ...prevErrors,
        errorDate: false, 
      }));

      const timestamp = new Date(year, month - 1, day).getTime();      
      
      return timestamp / 1000;
    }
  }

  const handleClick =  async (e: React.MouseEvent<HTMLButtonElement>): Promise<void | string> => {
    e.preventDefault();

    checkFormText();
    const date: number | void = checkFormDate();

    if (typeof date != "number") return;

    if (localStorage.getItem('formData')) {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        const parseData = JSON.parse(storedData);
        updateProfil.firstName = parseData.firstName;
        updateProfil.lastName = parseData.lastName;
        updateProfil.date = date;
        updateProfil.city = parseData.city;
        updateProfil.content = parseData.content;
        updateProfil.profil = profilFile;
        updateProfil.bg = bannerFile;
      }
    }  


    
    if (!errors.errorFirstName && !errors.errorLastName && !errors.errorDate && !errors.errorCity && !errors.errorContent && id_user && token) {      
      await ProfilController.updateProfil(updateProfil, Number(id_user), token);
    } else {
      console.error('Pb update profil')
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
      <button className='btnValid' onClick={(e) => handleClick(e)}>Valider</button>
    </>
  );
};

export default FormCreateProfil_2;
