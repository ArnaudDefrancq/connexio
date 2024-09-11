import * as React from 'react';
import Style from './FormCreateProfil_1.module.css'
import { useState, useEffect } from 'react';
import { dayArray, monthArray } from '../../../Tools/config.ts'
import { allYears } from '../../../Tools/function.ts';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfil_1Props {
}

const FormCreateProfil_1: React.FunctionComponent<IFormCreateProfil_1Props> = () => {

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dayOption, setDayOption] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [content, setContent] = useState<string>("");
  
  // Permet de récup les données et de set les données dans les input
  useEffect(() => {
    if (localStorage.getItem('formData')) {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        const parseData = JSON.parse(storedData);
        if (parseData.firstName) setFirstName(parseData.firstName);      
        if (parseData.lastName) setLastName(parseData.lastName);      
        if (parseData.day) setDayOption(parseData.day);      
        if (parseData.month) setMonth(parseData.month);      
        if (parseData.year) setYear(parseData.year);      
        if (parseData.city) setCity(parseData.city);      
        if (parseData.content) setContent(parseData.content);      
      }
    }
  }, [])

  // Contruit le tableau avec les années 
  const yearsArray: Array<string> = allYears().reverse();

  // Permet d'afficher les options
  const displaySelect = (array: Array<string>): JSX.Element[]  => {
      return array.map((elmnt) => {
        return <option key={elmnt} value={elmnt}>{elmnt}</option>
      })
  }

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

  return (
    <>
      <div className={`${Style.div} form-group`}>
        <input 
            className={Style.input} 
            defaultValue={firstName}
            type="text" 
            id="firstName"
            placeholder=" "
            required
            onChange={(e) => setDataLocalStorage('firstName', e.target.value)}
          />
        <label className={Style.label} htmlFor="firstName">Prénom </label>
      </div>
      <div className={`${Style.div} form-group`}>
        <input 
            className={Style.input} 
            type="text" 
            defaultValue={lastName}
            id="lastName"
            required
            placeholder=" "
            onChange={(e) => setDataLocalStorage('lastName', e.target.value)}
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
                  onChange={(e) => setDataLocalStorage('day', e.target.value)}
              >
                {
                  (dayOption) ? <option defaultValue={dayOption}>{dayOption}</option> :  <option defaultValue="">Jour</option>
                }
                {                
                  displaySelect(dayArray)
                }
              </select>
          </div>
          <div className={`${Style.div} `}>
              <select 
                  className={Style.input} 
                  required
                  id="month"
                  onChange={(e) => setDataLocalStorage('month', e.target.value)}
                >
                {
                  (month) ? <option defaultValue={month}>{month}</option> : <option defaultValue="">Mois</option>
                }
                {
                  displaySelect(monthArray)
                }
              </select>
          </div>
          <div className={`${Style.div} `}>
              <select 
                  className={Style.input} 
                  required
                  id="year"
                  onChange={(e) => setDataLocalStorage('year', e.target.value)}
              >
                {
                  (year) ? <option defaultValue={year}>{year}</option> : <option defaultValue="">Année</option>
                }
                {
                  displaySelect(yearsArray)
                }
              </select>
          </div>

        </div>

      </div>
      <div className={`${Style.div} form-group`}>
          <input 
              className={Style.input} 
              required
              defaultValue={city}
              type="text" 
              placeholder=" "
              id="city"
              onChange={(e) => setDataLocalStorage('city', e.target.value)}
            />
          <label className={Style.label} htmlFor="city">Ville </label>
      </div>
      <div className={`${Style.div} form-group`}>
          <textarea 
              className={Style.input} 
              required
              defaultValue={content}
              placeholder=" "
              id="content"
              onChange={(e) => setDataLocalStorage('content', e.target.value)}
            />
          <label className={Style.label} htmlFor="content">Desciption </label>
      </div>
    </>
  );
};

export default FormCreateProfil_1;
