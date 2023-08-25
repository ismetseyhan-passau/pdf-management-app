import {useEffect, useState} from "react";
import {db} from "../../auth/firebase-env/firebase.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {collection, onSnapshot} from "firebase/firestore";
import IDocumentNoteType from "../../types/document.note.type.tsx";
import PdfViewer from "./PdfViewer.tsx";
import {useParams} from "react-router-dom";
import DocumentService from "../../services/document.service.tsx";


function PdfProvider() {
    const {currentUser} = useAuth();
    const {documentId} = useParams<{ documentId?: string }>();
    const [documentPath, setDocumentPath] = useState<string | undefined>(undefined);
    const [documentTitle, setDocumentTitle] = useState("");
    const [notesOfDocument, setNotesOfDocument] = useState<IDocumentNoteType[]>([]);


    useEffect(() => {
        if (documentId !== undefined) {
            fetchDocument(documentId);
        }
    }, [documentId, currentUser]);


    async function fetchDocument(documentId: string) {
        try {
            if (currentUser?.uid != null) {
                const documentSnapshot = await DocumentService.getInstance().getDocumentById(currentUser?.uid, documentId);
                documentSnapshot?.title != null && setDocumentTitle(documentSnapshot.title);
                documentSnapshot?.path != null && setDocumentPath(documentSnapshot.path);
            }
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }


    useEffect(() => {
        let path = "userdocumentsnotes/" + currentUser?.uid + "/documents/" + documentId + "/notes";
        const q = collection(db, path)
        // @ts-ignore
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newNotes: IDocumentNoteType[] = [];
            querySnapshot.forEach((doc) => {
                newNotes.push(doc.data() as IDocumentNoteType);
            });
            setNotesOfDocument(newNotes)
        });
    }, [currentUser, documentId]);


    return (
        <div>
            {documentId !== undefined && documentPath !== undefined && (
                <PdfViewer
                    currentUser={currentUser}
                    documentId={documentId}
                    documentPath={documentPath}
                    documentTitle={documentTitle}
                    notesOfDocument={notesOfDocument}
                />
            )}
            {documentId === undefined && <div>No PDF selected.</div>}
        </div>
    );
}

export default PdfProvider;
