import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';
import { store } from './redux/store';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Provider store={store}>
        <App />
      </Provider>
      
    </BrowserRouter>
  </StrictMode>,
)
