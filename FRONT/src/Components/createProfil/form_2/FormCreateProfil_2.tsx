import * as React from 'react';
import { useState } from 'react';
import Style from './FormCreateProfil_2.module.css';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfil_2Props {
}

const FormCreateProfil_2: React.FunctionComponent<IFormCreateProfil_2Props> = () => {
  const [imgProfil, setImgProfil] = useState<string>('../../../../public/images/profilDefault.png');
  const [imgBanner, setImgBanner] = useState<string>('../../../../public/images/bannerDefault.png');

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
            // placeholder=" "
            required
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
            placeholder=" "
            required
          />
        <label className={Style.label} htmlFor="fileBanner">Photo banner </label>
      </div>
      <button className='btnValid'>Valider</button>
    </>
  );
};

export default FormCreateProfil_2;
