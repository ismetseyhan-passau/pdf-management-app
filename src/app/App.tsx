import '../App.css'
import ThemeProvider from "../theme/ThemeProvider.tsx";
import {useRoutes} from 'react-router-dom';
import router from '../router.tsx';
import {Suspense} from "react";

const App = () => {
    const content = useRoutes(router);
    return (

        <ThemeProvider>
            <Suspense fallback={<div>Loading...</div>}>
                {content}
            </Suspense>
        </ThemeProvider>

    );
};

export default App;
