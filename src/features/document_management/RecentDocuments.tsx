import {Card} from '@mui/material';
import RecentDocumentsTable from './RecentDocumentsTable.tsx';
import IDocument from '../../types/IDocument.tsx';
import {useEffect, useState} from "react";
import {db} from "../../auth/firebase_env/firebase.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {collection, onSnapshot} from "firebase/firestore";


function RecentDocuments() {
    const {currentUser} = useAuth();
    const [documents, setDocuments] = useState<IDocument[]>([]);


    useEffect(() => {
        let path = "documents/" + currentUser?.uid + "/document";
        const q = collection(db, path)
        // @ts-ignore
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newDocuments: IDocument[] = [];
            querySnapshot.forEach((doc) => {
                newDocuments.push(doc.data() as IDocument);
            });
            setDocuments(newDocuments)
        });
    }, [currentUser]);


    return (
        <Card>
            <RecentDocumentsTable documents={documents}/>
        </Card>
    );
}

export default RecentDocuments;
