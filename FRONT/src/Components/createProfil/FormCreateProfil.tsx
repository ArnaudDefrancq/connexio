import * as React from 'react';
import { useState } from 'react';
import Style from './FormCreateProfil.module.css';
import FormCreateProfil_1 from './form_1/FormCreateProfil_1';
import FormCreateProfil_2 from './form_2/FormCreateProfil_2';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormCreateProfilProps {
}

const FormCreateProfil: React.FunctionComponent<IFormCreateProfilProps> = () => {

  const [getForm, setGetForm] = useState<boolean>(true);

  // const handleClick = () => {
  //   if (getForm) {
  //     setGetForm(false);
  //   } else {
  //     setGetForm(true);
  //   }
  // }
  
  return (
    <>
      <section className={Style.section}>
        <div className={Style.formCreate}>
          <form className={`${Style.form} form`}>
          {
            getForm ? <FormCreateProfil_1 /> : <FormCreateProfil_2 /> 
          }
          </form>
          {/* <button onClick={() => handleClick()}>next</button> */}
        </div>
      </section>
    </>
  );
};

export default FormCreateProfil;
