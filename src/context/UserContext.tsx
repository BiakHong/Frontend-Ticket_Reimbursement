// interface to define the shape of the context value

import { createContext, ReactNode, useContext, useState } from "react";



export interface User {
    username: string;
    password: string;
}

interface UserContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

// create the context with a default value
export const UserContext = createContext<UserContextType | undefined>(undefined);
export const AuthContext = createContext<AuthContextType | null>(null);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (username: string, password: string) => {
        setUser({username, password});
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )    
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}