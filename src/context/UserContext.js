import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [Username, setUsername] = useState(window.sessionStorage.getItem('username') || '');

    return (
        <UserContext.Provider value={{ Username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
}