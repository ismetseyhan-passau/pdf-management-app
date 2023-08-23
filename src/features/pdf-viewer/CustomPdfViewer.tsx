import {useState, useEffect, useCallback} from 'react';
import {Document, Page, Outline} from 'react-pdf';
import {useParams} from 'react-router-dom';
import DocumentService from '../../services/document.service.tsx';
import {useAuth} from '../../contexts/AuthContext.tsx';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import Box from "@mui/material/Box";

import TextSelectionPopupButton from "./TextSelectionPopupButton.tsx";
import NoteDialog from "./AddNoteDiolog.tsx";


function highlightPattern(text: string, pattern: string) {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}


function CustomPdfViewer() {
    const {currentUser} = useAuth();
    const {documentId} = useParams<{ documentId: string }>();
    const [documentPath, setDocumentPath] = useState<string>('');
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [visibility, setVisibility] = useState<boolean>(true);
    const [searchText, setSearchText] = useState('');
    const [selectedText, setSelectedText] = useState<string | undefined>(undefined);


    const [signatureMap, setSignatureMap] = useState({});
    const canvasWidth = 595;
    const canvasHeight = 842;


    const signatureWidth = 50;
    const signatureHeight = 50;

    const [dialogOpen, setDialogOpen] = useState(false);
    const [location, setLocation] = useState({
        xPDF: 0,
        yPDF: 0,
        xCanvas: 0,
        yCanvas: 0
    })


    const handleAddNote = (xPDF: number, yPDF: number, xCanvas: number, yCanvas: number) => {
        console.log("handled," + xPDF + "," + yPDF + "," + xCanvas + "," + yCanvas + "," + selectedText);
        setLocation({xPDF, yPDF, xCanvas, yCanvas});
        setDialogOpen(true);
        return true;
    };
    const handleSaveNote = (noteData) => {
        console.log('Saved note:', noteData);
    };


    const textRenderer = useCallback(
        (textItem) => highlightPattern(textItem.str, searchText),
        [searchText]
    );

    function onChange(event) {
        setSearchText(event.target.value);
    }


    async function fetchDocument(documentId: string) {
        try {
            if (currentUser?.uid != null) {
                const documentSnapshot = await DocumentService.getInstance().getDocumentById(currentUser?.uid, documentId);
                documentSnapshot?.path != null && setDocumentPath(documentSnapshot.path);
            }
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }

    const preventPrint = (event) => {
        event.preventDefault();
        console.log('Printing operations have been blocked for security reasons.');
        setVisibility(false);


    };

    const handleAfterPrint = () => {
        console.log('Closed print dialog');
        setVisibility(true);
        toast.warning('Printing operations have been blocked for security reasons.', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };

    const handlePageChange = (offset: number) => {
        const newPageNumber = pageNumber + offset;
        if (newPageNumber >= 1 && newPageNumber <= numPages) {
            setPageNumber(newPageNumber);
        }
    };

    // Inside CustomPdfViewer component


    useEffect(() => {
        if (documentId !== undefined) {
            fetchDocument(documentId);
        }

        window.addEventListener('beforeprint', preventPrint);
        window.addEventListener('afterprint', handleAfterPrint);

        return () => {
            window.removeEventListener('beforeprint', preventPrint);
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    }, [documentId, currentUser]);


    useEffect(() => {
        function handleSelectionChange() {
            if (!dialogOpen) {
                const selectedText2 = window.getSelection()?.toString();
                if (selectedText2) {
                    setSelectedText(selectedText2);
                    console.log(selectedText2);
                }
            }
        }

        window.addEventListener('mouseup', handleSelectionChange);
        window.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            window.removeEventListener('mouseup', handleSelectionChange);
            window.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, [dialogOpen]);

    function onDocumentLoadSuccess({numPages}: { numPages: number }): void {
        setNumPages(numPages);
    }

    function onItemClick({pageNumber: itemPageNumber}) {
        setPageNumber(itemPageNumber);
    }

    return (
        <div style={{position: "relative"}}>
            <div style={{width: "100%"}}>
                <TextSelectionPopupButton
                    signatureWidth={signatureWidth}
                    signatureHeight={signatureHeight}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    enableSelect={selectedText !== undefined && selectedText.length > 0}
                    enableDraw={true}
                    signatureMap={signatureMap}
                    updateSignatureMap={setSignatureMap}
                    currentPage={pageNumber}
                    textPlaceholder="Your sign will be here!"
                    addNoteFunction={handleAddNote}

                >
                    {visibility && (
                        <div>
                            <Document file={documentPath} onLoadSuccess={onDocumentLoadSuccess}>
                                <Outline onItemClick={onItemClick}/>
                                <Page pageNumber={pageNumber}
                                      customTextRenderer={textRenderer}/>
                            </Document>
                            {numPages > 1 && (
                                <Box sx={{m: 1}}>
                                    <Button
                                        variant="contained"
                                        size={"small"}
                                        startIcon={<RemoveTwoToneIcon fontSize="small"/>}
                                        onClick={() => handlePageChange(-1)}

                                    >
                                        Previous Page
                                    </Button>
                                    <span style={{padding: 8, fontWeight: 600}}>
                                 {pageNumber} of {numPages}
                            </span>
                                    <Button sx={{m: 1}}
                                            size={"small"}
                                            variant="contained"
                                            startIcon={<AddTwoToneIcon fontSize="small"/>}
                                            onClick={() => handlePageChange(1)}
                                    >
                                        Next Page
                                    </Button>

                                </Box>
                            )
                            }
                        </div>

                    )}
                    <ToastContainer/>
                </TextSelectionPopupButton>
                <NoteDialog
                    open={dialogOpen}
                    onClose={() => {
                        setDialogOpen(false)
                    }}
                    onSave={handleSaveNote}
                    currentPageNumber={pageNumber}
                    documentTitle={"documentTitle"}
                    location={{
                        xPDF: location.xPDF,
                        yPDF: location.yPDF,
                        xCanvas: location.xCanvas,
                        yCanvas: location.yCanvas
                    }}
                    selectedText={selectedText == undefined ? "" : selectedText}
                />

            </div>

        </div>

    )
        ;
}

export default CustomPdfViewer;





