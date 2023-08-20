import {Routes, Route} from 'react-router-dom';
import Home from "../components/Home.tsx"; // Assuming you have a Home component
import SignInSide from "../components/SignIn.tsx";
import SignUp from "../components/SignUp.tsx";// Assuming you have a SignInSide component
import '../App.css'
import Error from '../components/Error.tsx';
import Dashboard from "../components/Dashboard.tsx";
import PrivateRoute from "../layout/PrivateRoute.tsx";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<SignInSide/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route element={<PrivateRoute/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route path="*" element={<Error/>}/>

        </Routes>
    );
};

export default App;
