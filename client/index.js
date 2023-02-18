import App from './components/App';

import { BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import React from 'react'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';



const domeNode = document.getElementById('root')
const root = createRoot(domeNode);

root.render(
    <GoogleOAuthProvider clientId='989108669360-g0tjcev8a5qehpn6q8gccfbl37tk8b23.apps.googleusercontent.com'>
<BrowserRouter>
<App />
</BrowserRouter>
    </GoogleOAuthProvider>

);