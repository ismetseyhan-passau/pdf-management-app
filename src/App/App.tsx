import '../App.css'
import ThemeProvider from "../theme/ThemeProvider.tsx";
import {useRoutes} from 'react-router-dom';
import router from '../router.tsx';

const App = () => {
    const content = useRoutes(router);
    return (

        <ThemeProvider>
            {content}
        </ThemeProvider>

    );
};

export default App;
