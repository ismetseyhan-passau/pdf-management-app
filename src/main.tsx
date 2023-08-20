import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <BrowserRouter>
            <React.StrictMode>
                <App/>
            </React.StrictMode>,
        </BrowserRouter>
    </AuthProvider>
)
