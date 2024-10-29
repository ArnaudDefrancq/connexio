import * as React from 'react';
import ProfilSection from './profil/ProfilSection';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProfilHomeProps {
}

const ProfilHome: React.FunctionComponent<IProfilHomeProps> = () => {
  return (
    <>
       <main>
          <ProfilSection />
       </main>
    </>
  );
};

export default ProfilHome;
