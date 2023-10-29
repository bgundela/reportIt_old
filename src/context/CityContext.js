import { createContext, useState } from "react";

export const CityContext = createContext({});

export function CityContextProvider({ children }) {
    const [City, setCity] = useState(window.sessionStorage.getItem('city') || '');

    return (
        <CityContext.Provider value={{ City, setCity }}>
            {children}
        </CityContext.Provider>
    );
}