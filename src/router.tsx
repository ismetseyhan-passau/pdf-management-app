import {Navigate} from 'react-router-dom';
import {RouteObject} from 'react-router';
import SidebarLayout from './layout/SidebarLayout'
import Home from "./pages/Home.tsx";
import PrivateRoute from "./layout/PrivateRoute.tsx";
import SignInSide from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Error from "./pages/Error.tsx";
import DocumentManagement from "./features/document_management/DocumentManagement.tsx";
import CustomPdfViewer from "./features/pdf-viewer/CustomPdfViewer.tsx";


// Pages


const routes: RouteObject[] = [
    {
        path: '',
        element: <PrivateRoute/>,
        children: [{
            path: '',
            element: <SidebarLayout/>,
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
                    path: 'home',
                    element: <Home/>
                },
                {
                    path: 'pdf-viewer',
                    element: <CustomPdfViewer/>
                },
                {
                    path: 'pdf-viewer/:documentId',
                    element: <CustomPdfViewer/>
                }
            ]
        },]
    },
    {
        path: 'login',
        element: <SignInSide/>,

    },
    {
        path: 'register',
        element: <SignUp/>,

    },
    {
        path: '*',
        element: <Error/>,

    }
];

export default routes;
