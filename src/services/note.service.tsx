import {collection, doc, getDocs, addDoc, updateDoc, deleteDoc, getDoc} from 'firebase/firestore';
import {db} from '../auth/firebase-env/firebase';
import IDocumentNoteType from '../types/document.note.type.tsx'


class NoteService {
    db = db;
    private static instance: NoteService;

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    static getInstance(): NoteService {
        if (!NoteService.instance) {
            NoteService.instance = new NoteService();
        }
        return NoteService.instance;
    }

    async getNotesByDocumentId(userId: string, documentId: string): Promise<IDocumentNoteType[]> {
        try {
            const notesRef = collection(this.db, `userdocumentsnotes/${userId}/documents/${documentId}/notes`);
            const querySnapshot = await getDocs(notesRef);
            const notes: IDocumentNoteType[] = [];

            querySnapshot.forEach((doc) => {
                const noteData = doc.data() as IDocumentNoteType;
                notes.push(noteData);
            });

            return notes;
        } catch (error) {
            console.error("Error fetching notes:", error);
            return [];
        }
    }

    async getNoteById(userId: string, documentId: string, noteId: string): Promise<IDocumentNoteType | null> {
        try {
            const noteRef = doc(this.db, `userdocumentsnotes/${userId}/documents/${documentId}/notes/${noteId}`);
            const noteSnapshot = await getDoc(noteRef);

            if (noteSnapshot.exists()) {
                const noteData = noteSnapshot.data() as IDocumentNoteType;
                return noteData;
            } else {
                return null; // Note not found
            }
        } catch (error) {
            console.error("Error fetching note by ID:", error);
            throw error;
        }
    }

    async addNote(userId: string, documentId: string, newNote: IDocumentNoteType): Promise<void | string> {
        try {
            const notesRef = collection(this.db, `userdocumentsnotes/${userId}/documents/${documentId}/notes`);
            const noteSnapshot = await addDoc(notesRef, newNote);
            return noteSnapshot.id;
        } catch (error) {
            console.error("Error adding note:", error);
            throw error;
        }
    }

    async updateNote(userId: string, documentId: string, noteId: string, updatedNote: Partial<IDocumentNoteType>): Promise<boolean> {
        try {
            const noteRef = doc(this.db, `userdocumentsnotes/${userId}/documents/${documentId}/notes/${noteId}`);
            await updateDoc(noteRef, updatedNote);
            return true;
        } catch (error) {
            console.error("Error updating note:", error);
            throw error;
        }
    }


    async deleteNote(userId: string, documentId: string, noteId: string): Promise<boolean> {
        try {
            const noteRef = doc(this.db, `userdocumentsnotes/${userId}/documents/${documentId}/notes/${noteId}`);
            await deleteDoc(noteRef);
            return true;
        } catch (error) {
            console.error("Error deleting note:", error);
            throw error;
        }
    }
}

export default NoteService;
