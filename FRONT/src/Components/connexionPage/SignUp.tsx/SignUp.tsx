import * as React from 'react';
import { useState } from 'react';
import Style from "./SignUp.module.css"
import { UserController } from '../../../Controllers/UserController';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISignUpProps {
}

const SignUp: React.FunctionComponent<ISignUpProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClick, setIsCLick] = useState(false);

  const [errors, setErrors] = useState ({
      errorPseudo: true,
      errorMail: true,
      errorPassword: true,
      errorComfirmPassword: true
  })

  const REGEX_CHECK_MAIL = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
  const REGEX_CHECK_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;

  const checkInput = (value: string, regex: RegExp) => {
      return regex.test(value) && value != "";
  }

  const checkValidity = (value: string, regex: RegExp, node: string) => {
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

  const checkSamePassword = (value: string, node: string) => {
      if (password == value) {
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

  const handelClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!errors.errorMail && !errors.errorPassword && !errors.errorComfirmPassword) {
          await UserController.signUp(email, password);
      } else {
          console.log("Bad Request");
      }
  }
  return (
    <>
      <form className={`${Style.form} form`}>
        <div className={`${Style.div} form-group`}>
            <input 
                className={Style.input} 
                type="email" 
                id="email"
                placeholder=" "
                required
                onChange={(e) => {checkValidity(e.target.value, REGEX_CHECK_MAIL, "errorMail"); setEmail(e.target.value)}}/>
            <label className={Style.label} htmlFor="email">Mail </label>
            {
                (errors.errorMail && isClick) && <p className="messageError">Veuillez entrer un mail valide.</p>
            }
        </div>
        <div className={`${Style.div} form-group`}>
            <input 
                className={Style.input} 
                type="password" 
                id="password"
                required
                placeholder=" "
                onChange={(e) => {checkValidity(e.target.value, REGEX_CHECK_PASSWORD, "errorPassword"); setPassword(e.target.value)}} />
            <label className={Style.label} htmlFor="password">Mot de passe </label>
            {
                (errors.errorPassword && isClick) && <p className="messageError">Veuillez entrer un mot de passe valide.</p>
            }
        </div>
        <div className={`${Style.div} form-group`}>
            <input 
                className={Style.input} 
                required
                type="password" 
                placeholder=" "
                id="comfirmPassword"
                onChange={(e) => {checkSamePassword(e.target.value, "errorComfirmPassword");}} />
            <label className={Style.label} htmlFor="comfirmPassword">Confirmer mot de passe </label>
            {
                (errors.errorComfirmPassword && isClick ) && <p className="messageError">Les mots de passe ne correspondent pas.</p>
            }
        </div>
        <button onClick={(e) => {setIsCLick(true); handelClick(e)}}  className='btnValid'>Valider</button>
      </form>
    </>
  );
};

export default SignUp;
