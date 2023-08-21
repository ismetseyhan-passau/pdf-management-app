import {Outlet, Navigate, useLocation} from "react-router-dom";
import {FC} from "react";

import {useAuth} from '../contexts/AuthContext';

const PrivateRoute: FC = () => {
    const location = useLocation();
    const {currentUser} = useAuth();

    return currentUser?.uid ? (
        <Outlet/>
    ) : (
        // Keep the previous navigation stack
        <Navigate to="/login" state={{from: location}} replace/>
    );
};

export default PrivateRoute;
