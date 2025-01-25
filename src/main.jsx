import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Optional: Change theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'
import {ToastContainer} from 'react-toastify'
import {Provider} from "react-redux";
import Store from "./Redux/Store.js";
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Provider store={Store}>
              <PrimeReactProvider>
                  <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                  />
                  <App />
              </PrimeReactProvider>
          </Provider>
      </BrowserRouter>

  </StrictMode>,
)
