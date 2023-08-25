import {useState, useEffect, useCallback} from 'react';
import {Document, Page, Outline} from 'react-pdf';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import Box from "@mui/material/Box";


import PdfWrapperCanvas from "./PdfWrapperCanvas.tsx";
import NoteDialog from "./AddNoteDiolog.tsx";
import NoteService from "../../services/note.service.tsx";
import IDocumentNoteType from "../../types/document.note.type.tsx";
import NotesDrawer from "./NotesDrawer.tsx";


function highlightPattern(text: string, pattern: string) {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}


interface PdfViewerProps {
    currentUser: any;
    documentId: string;
    documentPath: string;
    documentTitle: string;
    notesOfDocument: IDocumentNoteType[];
}


function PdfViewer(props: PdfViewerProps) {


    const {currentUser, documentId, documentPath, documentTitle, notesOfDocument} = props;

    const [numPages, setNumPages] = useState<number>(0);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [pdfPrintBlocker, setPdfPrintBlocker] = useState<boolean>(true);
    const [searchText, setSearchText] = useState('');
    const [selectedText, setSelectedText] = useState<string | undefined>(undefined);
    const [markerMap, setMarkerMap] = useState({});
    const canvasWidth = 595;
    const canvasHeight = 842;
    const signatureWidth = 50;
    const signatureHeight = 50;


    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [markerLocation, setMarkerLocation] = useState({
        xPDF: 0,
        yPDF: 0,
        xCanvas: 0,
        yCanvas: 0
    })


    useEffect(() => {
        window.addEventListener('beforeprint', preventPrint);
        window.addEventListener('afterprint', handleAfterPrint);

        return () => {
            window.removeEventListener('beforeprint', preventPrint);
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    }, []);


    useEffect(() => {
        function handleSelectionChange() {
            if (!isDialogOpen) {
                const selectedText = window.getSelection()?.toString();
                if (selectedText) {
                    setSelectedText(selectedText);
                    console.log(selectedText);
                }
            }
        }

        window.addEventListener('mouseup', handleSelectionChange);
        window.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            window.removeEventListener('mouseup', handleSelectionChange);
            window.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, [isDialogOpen]);


    function onDocumentLoadSuccess({numPages}: { numPages: number }): void {
        setNumPages(numPages);
    }

    function onItemClick({pageNumber: itemPageNumber}) {
        setCurrentPageNumber(itemPageNumber);
    }


    const handlePageChange = (offset: number) => {
        const newPageNumber = currentPageNumber + offset;
        if (newPageNumber >= 1 && newPageNumber <= numPages) {
            setCurrentPageNumber(newPageNumber);
        }
    };


    const handleAddNote = (xPDF: number, yPDF: number, xCanvas: number, yCanvas: number) => {
        console.log("handled," + xPDF + "," + yPDF + "," + xCanvas + "," + yCanvas + "," + selectedText);
        setMarkerLocation({xPDF, yPDF, xCanvas, yCanvas});
        setIsDialogOpen(true);
        return true;
    };


    const handleSaveNote = async (noteData: IDocumentNoteType) => {
        if (currentUser?.uid != null && documentId != null) {
            await NoteService.getInstance().addNote(currentUser?.uid, documentId!, noteData).then(() => {
                setIsDialogOpen(false);
                toast.success('Note added successfully!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            })
        }
    };


    const textRenderer = useCallback(
        (textItem) => highlightPattern(textItem.str, searchText),
        [searchText]
    );

    function onChange(event) {
        setSearchText(event.target.value);
    }


    const preventPrint = (event) => {
        event.preventDefault();
        console.log('Printing operations have been blocked for security reasons.');
        setPdfPrintBlocker(false);


    };

    const handleAfterPrint = () => {
        console.log('Closed print dialog');
        setPdfPrintBlocker(true);
        toast.warning('Printing operations have been blocked for security reasons.', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };


    // Inside CustomPdfViewer component


    return (
        <div style={{position: "relative"}}>
            <NotesDrawer
                documentId={documentId}
                documentTitle={documentTitle}
                currentPage={currentPageNumber}
                numPages={numPages}
                noteList={notesOfDocument}

            />
            <div style={{width: "100%", height: "100vh"}}>

                <PdfWrapperCanvas
                    signatureWidth={signatureWidth}
                    signatureHeight={signatureHeight}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    enableSelect={selectedText !== undefined && selectedText.length > 0}
                    enableDraw={true}
                    signatureMap={markerMap}
                    updateSignatureMap={setMarkerMap}
                    currentPage={currentPageNumber}
                    textPlaceholder="Your sign will be here!"
                    addNoteFunction={handleAddNote}

                >
                    {pdfPrintBlocker && (
                        <div>
                            <Document file={documentPath} onLoadSuccess={onDocumentLoadSuccess}>
                                <Outline onItemClick={onItemClick}/>
                                <Page pageNumber={currentPageNumber}
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
                                 {currentPageNumber} of {numPages}
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
                </PdfWrapperCanvas>
                <NoteDialog
                    open={isDialogOpen}
                    onClose={() => {
                        setIsDialogOpen(false)
                    }}
                    onSave={handleSaveNote}
                    currentPageNumber={currentPageNumber}
                    documentTitle={documentTitle}
                    location={{
                        xPDF: markerLocation.xPDF,
                        yPDF: markerLocation.yPDF,
                        xCanvas: markerLocation.xCanvas,
                        yCanvas: markerLocation.yCanvas
                    }}
                    selectedText={selectedText == undefined ? "" : selectedText}

                />


            </div>

        </div>

    )
        ;
}

export default PdfViewer;





