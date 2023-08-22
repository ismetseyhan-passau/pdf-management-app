import {collection, doc, getDocs, addDoc, updateDoc,deleteDoc} from 'firebase/firestore';
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

    async addDocument(userId: string, newDocument: IDocument): Promise<void | string> {
        try {
            const userDocumentsRef = collection(this.db, `documents/${userId}/document`);
            const documentSnapshot = await addDoc(userDocumentsRef, newDocument);
            return documentSnapshot.id;
        } catch (error) {
            console.error("Error adding document:", error);
            throw error;
        }
    }

    async updateDocument(userId: string, documentId: string, updatedDocument: any): Promise<void> {
        try {
            const userDocumentRef = doc(this.db, `documents/${userId}/document/${documentId}`);
            await updateDoc(userDocumentRef, updatedDocument);
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }

    async deleteDocument(userId: string, documentId: string): Promise<void> {
        try {
            const userDocumentRef = doc(this.db, `documents/${userId}/document/${documentId}`);
            await deleteDoc(userDocumentRef);
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }


}

export default DocumentService;
