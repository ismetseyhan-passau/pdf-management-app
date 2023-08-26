import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import {BrowserRouter} from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.tsx";
import {SidebarProvider} from "./contexts/SiderBarContext.tsx";
import {pdfjs} from 'react-pdf';
import {HelmetProvider} from 'react-helmet-async';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <AuthProvider>
            <SidebarProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </SidebarProvider>
        </AuthProvider>
    </HelmetProvider>
)
