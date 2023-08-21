import React, {useState} from 'react';
import {ThemeProvider, styled} from '@mui/material';
import {themeCreator} from './base';

export const ThemeContext = React.createContext(
    (themeName: string): void => {
    }
);

const StylesProviderWrapper = styled('div')({
    /* Add your global styles here */
});

interface ThemeProviderWrapperProps {
    children: React.ReactNode; // Define the children prop
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = (props) => {
    const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
    const [themeName, _setThemeName] = useState(curThemeName);
    const theme = themeCreator(themeName);
    const setThemeName = (themeName: string): void => {
        localStorage.setItem('appTheme', themeName);
        _setThemeName(themeName);
    };

    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={setThemeName}>
                <StylesProviderWrapper>
                    {props.children}
                </StylesProviderWrapper>
            </ThemeContext.Provider>
        </ThemeProvider>
    );
};

export default ThemeProviderWrapper;
