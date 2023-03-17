import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ClickToComponent } from 'click-to-react-component';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ClickToComponent />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
