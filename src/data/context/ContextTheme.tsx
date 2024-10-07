import { FC, useState, createContext } from 'react';

const ContextTheme = createContext({} as any);

interface ThemeProviderProps {
    children: any;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };


    const ctx = {
        theme,
        toggleTheme,
        setTheme
    } as any;
    
    return (
        <ContextTheme.Provider value={ctx}>
            {props.children}
        </ContextTheme.Provider>
    );
}

export default ContextTheme;