import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface NavigationContextType {
    navigationReady: boolean;
    setNavigationReady: (ready: boolean) => void;
}

export const NavigationContext = createContext<NavigationContextType>({} as NavigationContextType);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const [navigationReady, setNavigationReady] = useState(false);

    useEffect(() => {
        setNavigationReady(true);
    }, []);

    return (
        <NavigationContext.Provider value={{ navigationReady, setNavigationReady }}>
            {children}
        </NavigationContext.Provider>
    );
};
