import React, {useState, createContext} from 'react';

type SidebarContext = {
    sidebarToggle: any;
    toggleSidebar: () => void;
    closeSidebar: () => void;
};


export const SidebarContext = createContext<SidebarContext>(
    {} as SidebarContext
);

interface SiderbarProviderProps {
    children: React.ReactNode;
}

export const SidebarProvider: React.FC<SiderbarProviderProps> = ({children}) => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const toggleSidebar = () => {
        setSidebarToggle(!sidebarToggle);
    };
    const closeSidebar = () => {
        setSidebarToggle(false);
    };

    return (
        <SidebarContext.Provider
            value={{sidebarToggle, toggleSidebar, closeSidebar}}
        >
            {children}
        </SidebarContext.Provider>
    );
};
