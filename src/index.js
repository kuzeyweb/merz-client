import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/style.css'
import { store } from './redux/Store'
import { Provider } from 'react-redux'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

