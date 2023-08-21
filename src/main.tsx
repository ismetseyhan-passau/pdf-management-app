import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.tsx";
import {SidebarProvider} from "./contexts/SiderBarContext.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <SidebarProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </SidebarProvider>
        </AuthProvider>
    </React.StrictMode>,
)
