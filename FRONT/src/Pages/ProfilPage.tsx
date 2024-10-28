import * as React from 'react';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';
import Profil from '../Components/profilPage/Profil';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProfilPageProps {
}

const ProfilPage: React.FunctionComponent<IProfilPageProps> = () => {
  return (
    <>
        <Header />
        <Profil />
        <Footer />
    </>
  ) ;
};

export default ProfilPage;
