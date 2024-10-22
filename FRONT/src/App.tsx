import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnexionPage from './Pages/ConnexionPage';
import HomePage from './Pages/HomePage';
import ProfilPage from './Pages/ProfilPage';
import ErrorPage from './Pages/ErrorPage';
import { UserContext } from './Context/UserContext';
import { useContext } from 'react';
import CreateProfil from './Pages/CreateProfil';

function App() {

  const { is_actif } = useContext(UserContext);

  return (
    <>      
      <Router>
        <Routes>
          <Route path='/' element={<ConnexionPage />} />
          {
            (is_actif == 1) ? (
              <>
                <Route path='/feeds' element={<HomePage />} />
                <Route path='/profil/:id' element={<ProfilPage />} />
              </>
            ) : (
              <>
                <Route path='/create-profil' element={<CreateProfil />}/>
              </>
            )
          }
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
