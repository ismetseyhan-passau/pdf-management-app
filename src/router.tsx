import {Navigate} from 'react-router-dom';
import {RouteObject} from 'react-router';
import SidebarLayout from './layout/SidebarLayout'
import Home from "./components/Home.tsx";
import Dashboard from "./components/Dashboard.tsx";
import PrivateRoute from "./layout/PrivateRoute.tsx";
import SignInSide from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import Error from "./components/Error.tsx";


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
                    element: <Navigate to="dashboard" replace/>
                },
                {
                    path: 'dashboard',
                    element: <Dashboard/>
                },
                {
                    path: 'home',
                    element: <Home/>
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
