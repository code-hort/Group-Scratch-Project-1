import App from './components/App';

import { BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import React from 'react'
import './index.css'



const domeNode = document.getElementById('root')
const root = createRoot(domeNode);

root.render(<BrowserRouter><App /></BrowserRouter>);