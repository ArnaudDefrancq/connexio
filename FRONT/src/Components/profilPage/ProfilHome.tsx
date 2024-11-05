import * as React from 'react';
import ProfilSection from './profil/ProfilSection';
import { useContext,  useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Profil } from '../../Types/Profil';
import { isEmpty } from '../../Tools/function';
import { ProfilController } from '../../Controllers/ProfilController';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../Store/store';
import { getAllPost } from '../../Store/Post/postSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProfilHomeProps {
}

const ProfilHome: React.FunctionComponent<IProfilHomeProps> = () => {

  const { id_user, token } = useContext(UserContext);
  const [user, setUser] = useState<Profil>()
  const idProfilShow = useParams();
  const dispatch = useAppDispatch();

  const getProfil = async (idProfil: number, token: string): Promise<void> => {
      try {
          if (token && !isEmpty(token) && idProfil) {
              const profil: Profil = await ProfilController.getOneProfil(idProfil, token);
              setUser(profil);
              return;
          }
      } catch (error) {
          console.log(error + 'Pb get Profil');
          throw error;
      }
    }

  useEffect(() => {
    if (id_user && token) {
        getProfil(Number(idProfilShow.id), token);
        dispatch(getAllPost(token));
    }
  }, [idProfilShow.id])
  return (
    <>
       <main>
          <ProfilSection user={user}/>
       </main>
    </>
  );
};

export default ProfilHome;
