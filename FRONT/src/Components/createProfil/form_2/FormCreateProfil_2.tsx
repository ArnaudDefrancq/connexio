import * as React from 'react';
import { useState, useEffect } from 'react';
import Style from './FormCreateProfil_2.module.css';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfil_2Props {
}

const FormCreateProfil_2: React.FunctionComponent<IFormCreateProfil_2Props> = () => {
  const [imgProfil, setImgProfil] = useState<string>('');
  const [imgBanner, setImgBanner] = useState<string>('../../../../public/images/bannerDefault.png');

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
