import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.tsx";
import {SidebarProvider} from "./contexts/SiderBarContext.tsx";
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;



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
