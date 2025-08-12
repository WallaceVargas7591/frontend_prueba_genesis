import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log('ARRANCA index.js');

if (process.env.NODE_ENV === 'development') {
  import('react-scan').then(({ inject }) => {
    inject({
      include: [/.*/], // Analiza todos los componentes
      log: true,       // Muestra en consola cuando renderiza
      trackUpdates: true // Muestra re-renderizados
    });
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
