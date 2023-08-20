import React, {createContext, useContext} from "react";
import IUser from "../types/user.type.tsx";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential} from "firebase/auth";
import {useState} from "react";
import {auth} from "../auth/firebase-env/firebase.tsx";
import UserService from "../services/user.service.tsx";


type AuthContextType = {
    currentUser: IUser | null;
    signUp: (email: string, password: string) => Promise<boolean | UserCredential>;
    signIn: (email: string, password: string) => Promise<boolean | IUser>;
    signOut: () => Promise<void>;
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

    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const currentUser = await UserService.getInstance().getUser(userCredential.user.uid)
            if (currentUser != null) {
                setCurrentUser(currentUser);
                return currentUser;
            }
            return false;
        } catch (e) {
            console.log(e);
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
        currentUser: currentUser,
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
