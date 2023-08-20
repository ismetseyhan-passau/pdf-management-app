import {collection, getDocs, addDoc} from 'firebase/firestore';
import {db} from '../auth/firebase-env/firebase';
import IDocument from '../types/document.type';

class DocumentService {
    db = db;
    private static instance: DocumentService;

    private constructor() {
        // Private constructor to prevent direct instantiation
    }


    static getInstance(): DocumentService {
        if (!DocumentService.instance) {
            DocumentService.instance = new DocumentService();
        }
        return DocumentService.instance;
    }

    async getDocumentsByUserId(userId: string): Promise<IDocument[]> {
        try {
            const userDocumentsRef = collection(this.db, `documents/${userId}/document`);

            const querySnapshot = await getDocs(userDocumentsRef);
            const documents: IDocument[] = [];

            querySnapshot.forEach((doc) => {
                const documentData = doc.data() as IDocument;
                documents.push(documentData);
            });

            return documents;
        } catch (error) {
            console.error("Error fetching documents:", error);
            return [];
        }
    }

    async addDocument(userId: string, newDocument: IDocument): Promise<void> {
        try {
            const userDocumentsRef = collection(this.db, `documents/${userId}/document`);
            await addDoc(userDocumentsRef, newDocument);
        } catch (error) {
            console.error("Error adding document:", error);
            throw error;
        }
    }

}

export default DocumentService;
