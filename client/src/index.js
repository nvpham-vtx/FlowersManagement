import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.router';
import  "admin-lte/dist/css/adminlte.min.css";
import  "admin-lte/dist/js/adminlte.min.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
