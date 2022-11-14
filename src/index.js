import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { applyPolyfills, defineCustomElements } from 'h8k-components/loader';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
applyPolyfills().then(() => {
  defineCustomElements(window);
});
