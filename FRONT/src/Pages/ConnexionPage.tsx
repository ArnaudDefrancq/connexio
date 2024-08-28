import * as React from 'react';
import Connexion from '../Components/connexionPage/Connexion';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IConnexionPageProps {
}

const ConnexionPage: React.FunctionComponent<IConnexionPageProps> = () => {
  return(
    <>
      < Connexion />
    </>
  ) ;
};

export default ConnexionPage;
