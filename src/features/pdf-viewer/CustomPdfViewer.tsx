import {useState, useEffect} from 'react';
import {Document, Page} from 'react-pdf';
import {useParams} from 'react-router-dom';
import DocumentService from '../../services/document.service.tsx';
import {useAuth} from '../../contexts/AuthContext.tsx';

function CustomPdfViewer() {
    const {currentUser} = useAuth();
    const {documentId} = useParams<{ documentId: string }>(); // Type assertion added
    const [documentPath, setDocumentPath] = useState<string>('');
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    async function fetchDocument(documentId: string) {
        try {
            if (currentUser?.uid != null) {
                const documentSnapshot = await DocumentService.getInstance().getDocumentById(currentUser?.uid, documentId);
                documentSnapshot?.path != null && setDocumentPath(documentSnapshot.path);
            }
            console.log(document);
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }

    useEffect(() => {
        if (documentId !== undefined)
            fetchDocument(documentId);
        return () => {
            // Cleanup if needed
        };
    }, [documentId, currentUser]);

    function onDocumentLoadSuccess({numPages}: { numPages: number }): void {
        setNumPages(numPages);
    }


    return (
        <div>
            <Document
                file={documentPath}
                onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber}/>
            </Document>:
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
}

export default CustomPdfViewer;