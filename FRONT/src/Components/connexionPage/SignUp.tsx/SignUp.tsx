import * as React from 'react';
import { useState } from 'react';
import Style from "./SignUp.module.css"
import { UserController } from '../../../Controllers/UserController';
import { Security } from '../../../Tools/Security';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISignUpProps {
}

type Errors = {
  errorMail: boolean,
  errorPassword: boolean,
  errorComfirmPassword: boolean,
}

const SignUp: React.FunctionComponent<ISignUpProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClick, setIsCLick] = useState(false);
  const [isValid, setIsValid] = useState(false); 

  const [errors, setErrors] = useState<Errors> ({
    errorMail: true,
    errorPassword: true,
    errorComfirmPassword: true,
  })

  const REGEX_CHECK_MAIL: RegExp = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
  const REGEX_CHECK_PASSWORD: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;

  // Permet de ckeck les inputs 
  const checkEmail = (value: string):void => {
    Security.checkValidity(value, REGEX_CHECK_MAIL, 'errorMail', setErrors);
  }

  const checkPassword = (value: string):void => {
    Security.checkValidity(value, REGEX_CHECK_PASSWORD, 'errorPassword', setErrors);
  }

  const checkSamePassword = (value: string):void => {
    Security.checkSamePassword(value, password, 'errorComfirmPassword', setErrors);
  }

  // Permet d'envoyer le formulaire
  const handelClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void | string> => {
      e.preventDefault();

      if (!errors.errorMail && !errors.errorPassword && !errors.errorComfirmPassword) {
        await UserController.signUp(email, password);
        setIsValid(true);
      } else {
        console.log("Bad Request");
      }
  }
  return (
    <>
      <form className={`${Style.form} form`}>
        {
            (isValid) && <p className='messageValid'>Compte créé ! Vous pouvez vous connecter !</p> 
        }
        <div className={`${Style.div} form-group`}>
            <input 
                className={Style.input} 
                type="email" 
                id="email"
                placeholder=" "
                required
                onChange={(e) => {checkEmail(e.target.value); setEmail(e.target.value)}}/>
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
                onChange={(e) => {checkPassword(e.target.value); setPassword(e.target.value)}} />
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
                onChange={(e) => {checkSamePassword(e.target.value);}} />
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
