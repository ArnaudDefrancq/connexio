import * as React from 'react';
import { useState } from 'react';
import SignIn from './SignIn.tsx/SignIn';
import SignUp from './SignUp.tsx/SignUp';
import Style from './Connexion.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IConnexionProps {
}

const ConnexionPage: React.FC<IConnexionProps> = () => {
    const [modal, setModal] = useState<boolean>(true);

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement
        
        if (target.id == "inscription") {
            setModal(false)
        } else {
            setModal(true)
        }
    }

    return (
        <>
            <section className={Style.section}>
                <div className={Style.modalConnexion}>
                    <div className={Style.divBtn}>
                        <button onClick={(e) =>handleClick(e)} 
                            className={!modal ? `${Style.btn1} ${Style.btnSignUp} ${Style.isClick}` : `${Style.btn1} ${Style.btnSignUp} ${Style.isClickOtherTrue}`} id="inscription">Inscription
                        </button>
                        <button onClick={(e) =>handleClick(e)} 
                            className={!modal ? `${Style.btn2} ${Style.btnSignIn} ${Style.isClickOtherFalse}`: `${Style.btn2} ${Style.isClick}`} id="connexion">Connexion
                        </button>
                    </div>
                    <div>
                        { modal ?  <SignIn /> : <SignUp />}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ConnexionPage;