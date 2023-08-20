import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth} from '../firebase-env/firebase.tsx'; // Firebase ayarlarınızı içeren dosya
import {createUserWithEmailAndPassword, User, signInWithEmailAndPassword} from 'firebase/auth';

interface AuthContextType {
    currentUser: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContextProvider = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContextProvider);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}


const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
    }, []);

    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signOut = async () => {
        await auth.signOut();
    };

    const contextValue: AuthContextType = {
        currentUser,
        signUp,
        signIn,
        signOut,
    };

    return (
        <AuthContextProvider.Provider value={contextValue}>
            {children}
        </AuthContextProvider.Provider>
    );
};

export default AuthProvider;
