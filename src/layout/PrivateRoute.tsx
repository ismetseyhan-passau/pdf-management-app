import {Outlet, useLocation, Navigate} from "react-router-dom";
import {auth} from "../auth/firebase-env/firebase.tsx";
import {FC} from "react";

const PrivateRoute: FC = () => {
    const location = useLocation();

    return auth.currentUser ? (
        <Outlet/>
    ) : (
        // Keep the previous navigation stack
        <Navigate to="/login" state={{from: location}} replace/>
    );
};

export default PrivateRoute;
