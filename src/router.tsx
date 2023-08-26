import {Navigate} from 'react-router-dom';
import {RouteObject} from 'react-router';
import SidebarLayout from './layout/SidebarLayout'
import PrivateRoute from "./layout/PrivateRoute.tsx";
import SignInSide from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Error from "./pages/Status404.tsx";
import DocumentManagement from "./features/document_management/DocumentManagement.tsx";
import PdfProvider from "./features/pdf-viewer/PdfProvider.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";


// Pages


const routes: RouteObject[] = [
    {
        path: '',
        element: <PrivateRoute/>, //Check Authentication control
        children: [{
            path: '',
            element: <SidebarLayout/>, // General Layout
            children: [
                {
                    path: '',
                    element: <Navigate to="documents" replace/>
                },
                {
                    path: 'documents',
                    element: <DocumentManagement/>
                },
                {
                    path: 'pdf-viewer',
                    element: <PdfProvider/>
                },
                {
                    path: 'pdf-viewer/:documentId',
                    element: <PdfProvider/>
                }
            ]
        },]
    },
    {
        path: 'login',
        element: <SignInSide/>,

    },
    {
        path: 'login?demo=active',  // Search Params
        element: <SignInSide/>,

    },
    {
        path: 'register',
        element: <SignUp/>,

    },
    {
        path: 'reset-password',
        element: <ResetPassword/>,

    },
    {
        path: '*',
        element: <Error/>,

    }
];

export default routes;
