import React, {createContext, useContext,} from "react";
import IUser from "../types/IUser.tsx";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential
} from "firebase/auth";
import {useState} from "react";
import {auth} from "../auth/firebase_env/firebase.tsx";
import UserService from "../services/UserService.tsx";
import {sendPasswordResetEmail} from "firebase/auth";

type AuthContextType = {
    currentUser: IUser | null;
    signUp: (email: string, password: string) => Promise<UserCredential | Error>;
    signIn: (email: string, password: string) => Promise<IUser | Error>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const storedUser = localStorage.getItem('currentUser');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    const [currentUser, setCurrentUser] = useState<IUser | null>(initialUser);


    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const currentUser = await UserService.getInstance().getUser(userCredential.user.uid);

            if (currentUser != null) {
                setCurrentUser(currentUser);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                return currentUser;
            }
            throw new Error('User not found');

        } catch (error) {
            throw error;
        }
    };


    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            return userCredential;
        } catch (error) {
            throw error;
        }
    };


    const signOut = async () => {
        await auth.signOut();
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw error;
        }
    };

    const contextValue: AuthContextType = {
        currentUser: currentUser,
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
        resetPassword: resetPassword
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
