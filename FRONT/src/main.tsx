import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './Style/baseStyle.css';
import './Style/Responsive/responsive.css'
import UserProvider from './Context/UserContext.tsx';
import { Provider } from 'react-redux';
import { store } from './Store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <UserProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserProvider>
  </StrictMode>,
)
