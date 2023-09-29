import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

const body = document.querySelector('body');
body.style.backgroundColor = '#E7ECF2';
body.style.padding = '40px';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="goit-react-hw-05-movies">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
