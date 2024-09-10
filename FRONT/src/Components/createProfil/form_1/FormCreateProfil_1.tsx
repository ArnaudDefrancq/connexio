import * as React from 'react';
import Style from './FormCreateProfil_1.module.css'
import { day, month } from '../../../Tools/config.ts'
import { allYears } from '../../../Tools/function.ts';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfil_1Props {
}

const FormCreateProfil_1: React.FunctionComponent<IFormCreateProfil_1Props> = () => {

  const years: Array<string> = allYears().reverse();

  const displaySelect = (array: Array<string>, year:boolean = false): JSX.Element[]  => {
    if (!year) {
      let i: number = 0;
      return array.map((elmnt) => {
        i++;
        return <option key={i} value={i}>{elmnt}</option>
      })
    } else{
      return array.map((elmnt) => {
        return <option key={elmnt} value={elmnt}>{elmnt}</option>
      })
    }
  }

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
                {
                  displaySelect(day)
                }
              </select>
          </div>
          <div className={`${Style.div} `}>
              <select 
                  className={Style.input} 
                  required
                  id="month"
              >
                <option defaultValue="">Mois</option>
                {
                  displaySelect(month)
                }
              </select>
          </div>
          <div className={`${Style.div} `}>
              <select 
                  className={Style.input} 
                  required
                  id="year"
              >
                <option defaultValue="">Année</option>
                {
                  displaySelect(years, true)
                }
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
