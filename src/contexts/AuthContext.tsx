import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth} from '../auth/firebase-env/firebase.tsx'; // Firebase ayarlarınızı içeren dosya
import {createUserWithEmailAndPassword, User, signInWithEmailAndPassword, UserCredential} from 'firebase/auth';


interface AuthContextType {
    currentUser: User | null;
    signUp: (email: string, password: string) => Promise<boolean | UserCredential>;
    signIn: (email: string, password: string) => Promise<boolean | UserCredential>;
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

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);
            return userCredential;
        } catch (e) {
            return false;
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            return userCredential;
        } catch (e) {
            return false;
        }
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
