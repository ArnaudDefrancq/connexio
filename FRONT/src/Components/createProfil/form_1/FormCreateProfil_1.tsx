import * as React from 'react';
import Style from './FormCreateProfil_1.module.css'
// import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfil_1Props {
}

const FormCreateProfil_1: React.FunctionComponent<IFormCreateProfil_1Props> = () => {

  return (
    <>
      <div className={`${Style.div} form-group`}>
        <input 
            className={Style.input} 
            type="text" 
            id="firstName"
            placeholder=" "
            required
          />
        <label className={Style.label} htmlFor="firstName">Prénom </label>
      </div>
      <div className={`${Style.div} form-group`}>
        <input 
            className={Style.input} 
            type="text" 
            id="lastName"
            required
            placeholder=" "
        />
        <label className={Style.label} htmlFor="lastName">Nom </label>
      </div>
      <div className={`${Style.div} ${Style.groupNaissance}`}>
        <p className={Style.p}>Date de naissance</p>
        <div className={Style.divNaissanceForm}>
          <div className={`${Style.div} `}>
              <select 
                  className={Style.input} 
                  required
                  id="day"
              >
                <option defaultValue="">Jour</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
          </div>
          <div className={`${Style.div} `}>
              <select 
                  className={Style.input} 
                  required
                  id="month"
              >
                <option defaultValue="">Mois</option>
                <option value="1">janvier</option>
                <option value="2">fevrier</option>
                <option value="3">mars</option>
              </select>
          </div>
          <div className={`${Style.div} `}>
              <select 
                  className={Style.input} 
                  required
                  id="year"
              >
                <option defaultValue="">Année</option>
                <option value="1">1900</option>
                <option value="2">1901</option>
                <option value="3">1903</option>
              </select>
          </div>

        </div>

      </div>
      <div className={`${Style.div} form-group`}>
          <input 
              className={Style.input} 
              required
              type="text" 
              placeholder=" "
              id="city"
            />
          <label className={Style.label} htmlFor="city">Ville </label>
      </div>
      <div className={`${Style.div} form-group`}>
          <textarea 
              className={Style.input} 
              required
              placeholder=" "
              id="content"
            />
          <label className={Style.label} htmlFor="content">Desciption </label>
      </div>
    </>
  );
};

export default FormCreateProfil_1;
