import * as React from 'react';
import { useState } from 'react';
import Style from './SignIn.module.css'
import { UserController } from '../../../Controllers/UserController';
// import { UserContext } from '../../../Context/UserContext';
// import { useNavigate } from 'react-router-dom';
import { Security } from '../../../Tools/Security';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISignInProps {
}

// interface UserState {
//   token: string | null;
//   role: string | null;
//   user_id: string | null;
//   actif: string | null;
// }

const SignIn: React.FunctionComponent<ISignInProps> = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("")
  const [isClick, setIsCLick] = useState(false);

  const [errors, setErrors] = useState (true)

  // const { updateUserContext } = useContext(UserContext);

  // const navigate = useNavigate();

  // const putIntoContext = (data: {id_role: string; token: string; id_user: string, is_actif: string} | boolean ): void => {
  //   if (typeof data !== 'boolean') {
  //     updateUserContext("role", data.id_role);
  //     updateUserContext("token", data.token);
  //     updateUserContext("user_id", data.id_user);
  //     updateUserContext("actif", data.is_actif);
  //   } else {
  //     console.log('Pas le bon type');
  //     return;
  //   }
  // }

  

  const handelClick = async (e:React.MouseEvent<HTMLButtonElement>): Promise<{id_role: string; token: string; id_user: string, is_actif: string} | boolean | void> => {
      e.preventDefault();

      if (mail.length > 0 && password.length > 0) {
        const connexion = await UserController.signIn(mail, password);
        if (typeof connexion !== 'boolean') {
          // putIntoContext(connexion);
          const encryptedData = Security.encryptData(connexion);
          localStorage.setItem('data', encryptedData);
          if (connexion.is_actif === "1") {
            // Page feed
          }
          // Page création profil
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
