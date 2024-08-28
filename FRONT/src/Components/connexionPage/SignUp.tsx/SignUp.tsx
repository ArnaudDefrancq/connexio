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
      <form className={Style.form}>
          <div className={Style.div}>
              <label className={Style.label} htmlFor="email">Email </label>
              <input 
                  className={Style.input} 
                  type="email" 
                  id="email"
                  onChange={(e) => {checkValidity(e.target.value, REGEX_CHECK_MAIL, "errorMail"); setEmail(e.target.value)}}/>
              {
                  (errors.errorMail && isClick) && <p className={Style.badText}>Veuillez entrer un mail valide.</p>
              }
          </div>
          <div>
              <div className={Style.div}>
                  <label className={Style.label} htmlFor="password">Mot de passe </label>
                  <input 
                      className={Style.input} 
                      type="password" 
                      id="password"
                      onChange={(e) => {checkValidity(e.target.value, REGEX_CHECK_PASSWORD, "errorPassword"); setPassword(e.target.value)}} />
                  {
                      (errors.errorPassword && isClick) && <p className={Style.badText}>Veuillez entrer un mot de passe valide.</p>
                  }
              </div>
              <div className={Style.div}>
                  <label className={Style.label} htmlFor="comfirmPassword">Confirmer mot de passe </label>
                  <input 
                      className={Style.input} 
                      type="password" 
                      id="comfirmPassword"
                      onChange={(e) => {checkSamePassword(e.target.value, "errorComfirmPassword");}} />
                  {
                      (errors.errorComfirmPassword && isClick ) && <p className={Style.badText}>Les mots de passe ne correspondent pas.</p>
                  }
              </div>
          </div>
          <div className={Style.div}>
              <button onClick={(e) => {setIsCLick(true); handelClick(e)}} className={Style.btn}>Valider</button>
          </div>
      </form>
    </>
  );
};

export default SignUp;
