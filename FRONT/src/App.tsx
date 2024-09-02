import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnexionPage from './Pages/ConnexionPage';
import HomePage from './Pages/HomePage';
import ProfilPage from './Pages/ProfilPage';
import ErrorPage from './Pages/ErrorPage';
import { UserContext } from './Context/UserContext';
import { useContext } from 'react';

function App() {

  const { actif } = useContext(UserContext);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ConnexionPage />} />
          {
            (actif == "1") && (
              <>
                <Route path='/feeds' element={<HomePage />} />
                <Route path='/profil/:id' element={<ProfilPage />} />
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
