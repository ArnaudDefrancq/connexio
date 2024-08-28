import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnexionPage from './Pages/ConnexionPage';
import HomePage from './Pages/HomePage';
import ProfilPage from './Pages/ProfilPage';
import ErrorPage from './Pages/ErrorPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ConnexionPage />} />
          <Route path='/feeds' element={<HomePage />} />
          <Route path='/profil/:id' element={<ProfilPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
