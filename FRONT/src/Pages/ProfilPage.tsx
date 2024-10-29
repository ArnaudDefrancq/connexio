import * as React from 'react';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';
import ProfilHome from '../Components/profilPage/ProfilHome';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProfilPageProps {
}

const ProfilPage: React.FunctionComponent<IProfilPageProps> = () => {
  return (
    <>
        <Header />
        <ProfilHome />
        <Footer />
    </>
  ) ;
};

export default ProfilPage;
