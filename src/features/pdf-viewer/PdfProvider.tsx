import {useEffect, useState} from "react";
import {db} from "../../auth/firebase-env/firebase.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {collection, onSnapshot} from "firebase/firestore";
import IDocumentNoteType from "../../types/document.note.type.tsx";
import PdfViewer from "./PdfViewer.tsx";
import {useParams} from "react-router-dom";
import DocumentService from "../../services/document.service.tsx";
import documentService from "../../services/document.service.tsx";
import IDocument from "../../types/document.type.tsx";
import {Typography} from "@mui/material";
import RecentDocumentsTable from "../document_management/RecentDocumentsTable.tsx";


function PdfProvider() {
    const {currentUser} = useAuth();
    const {documentId} = useParams<{ documentId?: string }>();
    const [documentPath, setDocumentPath] = useState<string | undefined>(undefined);
    const [documentTitle, setDocumentTitle] = useState("");
    const [notesOfDocument, setNotesOfDocument] = useState<IDocumentNoteType[]>([]);
    const [userDocuments, setUserDocuments] = useState<IDocument[]>([]);

    useEffect(() => {
        if (documentId !== undefined) {
            fetchDocument(documentId);
        } else {
            fetchPdfDocumentsOfUser(currentUser?.uid!)
        }
    }, [documentId, currentUser]);


    async function fetchPdfDocumentsOfUser(userId: string) {
        let list = await documentService.getInstance().getDocumentsByUserId(userId);
        const pdfDocuments = list.filter(doc => doc.type === "pdf");
        setUserDocuments(pdfDocuments);
    }

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
            {documentId !== undefined && documentPath !== undefined ? (
                <PdfViewer
                    currentUser={currentUser}
                    documentId={documentId}
                    documentPath={documentPath}
                    documentTitle={documentTitle}
                    notesOfDocument={notesOfDocument}
                />
            ) : (
                <div style={{margin: 14}}>
                    {userDocuments.length > 0 ? (
                        <Typography variant="h3">Please click the "show document" button to view the PDF</Typography>
                    ) : (
                        <Typography variant="h3">Please upload the PDF file via the documents section.</Typography>
                    )}
                    <RecentDocumentsTable documents={userDocuments} tableTitle="Your PDF Documents"/>
                </div>
            )}

        </div>
    );
}

export default PdfProvider;
