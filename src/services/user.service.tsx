import {collection, getDocs, deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../auth/firebase-env/firebase';
import IUser from '../types/user.type';

class UserService {
    private static instance: UserService;
    db = db;


    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async getUsers(): Promise<IUser[]> {
        try {
            const usersRef = collection(this.db, 'users');
            const querySnapshot = await getDocs(usersRef);
            const users: IUser[] = [];

            querySnapshot.forEach((doc) => {
                const userData = doc.data() as IUser;
                users.push(userData);
            });

            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    async addUser(newUser: IUser): Promise<void> {
        try {
            await setDoc(doc(db, "users", newUser.uid), newUser);
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            const userDocRef = doc(this.db, 'users', userId);
            await deleteDoc(userDocRef);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }


    async getUser(userId: string): Promise<IUser | null> {
        try {
            const userDocRef = doc(this.db, `users/${userId}`);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data() as IUser;
                return userData;
            } else {
                console.log('User not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

}

export default UserService;
