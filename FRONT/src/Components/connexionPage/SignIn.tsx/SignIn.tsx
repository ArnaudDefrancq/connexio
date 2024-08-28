import * as React from 'react';
import { useState } from 'react';
import Style from './SignIn.module.css'
import { UserController } from '../../../Controllers/UserController';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISignInProps {
}

const SignIn: React.FunctionComponent<ISignInProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [isClick, setIsCLick] = useState(false);

  const [errors, setErrors] = useState (true)

  // const { updateUserContext } = useContext(UserContext);

  // const navigate = useNavigate();

  const handelClick = async (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (email.length > 0 && password.length > 0) {
          await UserController.signIn(email, password);
          
      } else {
          setErrors(true);
      }
  }

  return (
    <>
      <form className={Style.form}>
          {
              (errors && isClick) && <p className={Style.badText}>Adresse mail ou mot de passe invalide.</p>
          }
      <div className={Style.div}>
              <label className={Style.label} htmlFor="email">Mail </label>
              <input 
                  className={Style.input} 
                  type="text" 
                  id="email"
                  onChange={(e) => {setEmail(e.target.value)}}
                  />
          </div>
          <div className={Style.div}>
              <label className={Style.label} htmlFor="password">Mot de passe </label>
              <input 
                  className={Style.input} 
                  type="password" 
                  id="password"
                  onChange={(e) => {setPassword(e.target.value)}}
                  />
          </div>
          <div className={Style.div}>
              <button 
                  onClick={(e) => {setIsCLick(true); handelClick(e)}} 
                  className={Style.btn}
                  >Valider</button>
          </div>
      </form>
    </>
  );
};

export default SignIn;
