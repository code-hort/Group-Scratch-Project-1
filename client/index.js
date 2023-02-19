import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css'


// const domeNode = document.getElementById('root')
// const root = createRoot(domeNode);

ReactDOM.render(
  <BrowserRouter> 
   <App />
     </BrowserRouter>,
  document.getElementById('root')
);