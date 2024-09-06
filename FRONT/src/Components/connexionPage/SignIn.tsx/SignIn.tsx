import * as React from 'react';
import { useState } from 'react';
import Style from './SignIn.module.css'
import { UserController } from '../../../Controllers/UserController';
import { Security } from '../../../Tools/Security';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISignInProps {
}

const SignIn: React.FunctionComponent<ISignInProps> = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("")
  const [isClick, setIsCLick] = useState(false);

  const [errors, setErrors] = useState (true)

  const navigate = useNavigate();
  
  const handelClick = async (e:React.MouseEvent<HTMLButtonElement>): Promise<{id_role: number; token: number; id_user: number, is_actif: number} | boolean | void> => {
      e.preventDefault();

      if (mail.length > 0 && password.length > 0) {
        const connexion = await UserController.signIn(mail, password);
        if (typeof connexion !== 'boolean') {
          const encryptedData = Security.encryptData(connexion);
          localStorage.setItem('data', encryptedData);
          console.log( connexion.is_actif);
          
          if (connexion.is_actif == 1) {
            // Page feed
            navigate('/feeds');
          } else {
            // Page création profil
            navigate('/create-profil')
          }
        }
      } else {
        setErrors(true);
      }
  }

  return (
    <>
      <form className={`${Style.form} form`}>
          {
            (errors && isClick) && <p className={`${Style.messErrorLogin} messageError`}>Mail ou mot de passe invalide.</p>
          }
          <div className={`${Style.div} form-group`}>
              <input 
                  className={Style.input} 
                  required
                  type="text" 
                  id="email"
                  placeholder=" "
                  onChange={(e) => {setMail(e.target.value)}}
                />
                <label className={Style.label} htmlFor="email">Mail </label>
          </div>
          <div className={`${Style.div} form-group`}>
            <input 
                className={Style.input} 
                required
                type="password" 
                id="password"
                placeholder=" "
                onChange={(e) => {setPassword(e.target.value)}}
                />
              <label className={Style.label} htmlFor="password">Mot de passe </label>
          </div>
          <button 
              onClick={(e) => {setIsCLick(true); handelClick(e)}} 
              className='btnValid'
              >Valider
          </button>
        </form>
    </>
  );
};

export default SignIn;
