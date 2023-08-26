import {useState, useEffect, useCallback} from 'react';
import {Document, Page, Outline} from 'react-pdf';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import Box from "@mui/material/Box";


import PdfWrapperCanvas from "./PdfWrapperCanvas.tsx";
import AddNoteDialog from "./AddNoteDialog.tsx";
import NoteService from "../../services/NoteService.tsx";
import IDocumentNoteType from "../../types/IDocumentNote.tsx";
import NotesDrawer from "./NotesDrawer.tsx";
import {Switch} from "@mui/material";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Helmet} from "react-helmet-async";


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
    const [noteGroupsForEachPage, setNoteGroupsForEachPage] = useState<Array<{ [key: string]: any }>>([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [markerLocation, setMarkerLocation] = useState({
        xPDF: 0,
        yPDF: 0,
        xCanvas: 0,
        yCanvas: 0
    })

    const [hideMarkers, setHideMarkers] = useState(false);
    const [onlySelectedMarker, setOnlySelectedMarker] = useState(false);
    const [selectedNote, setSelectedNote] = useState<null | IDocumentNoteType>(null);

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


    useEffect(() => {
        const newGroupedNotes: {
            [key: string]: {
                xCanvas: number;
                yCanvas: number;
                xPDF: number;
                yPDF: number;
                noteId?: string;
                noteTitle?: string;

            };
        }[] = new Array(numPages).fill({}).map(() => ({}));
        notesOfDocument.forEach((note: IDocumentNoteType) => {
            const pageIndex = note.currentPageNumber - 1;
            if (!newGroupedNotes[pageIndex]) {
                newGroupedNotes[pageIndex] = {};
            }

            if (!newGroupedNotes[pageIndex][note.id]) {
                newGroupedNotes[pageIndex][note.id] = {
                    xCanvas: note.xCanvas,
                    yCanvas: note.yCanvas,
                    xPDF: note.xPdf,
                    yPDF: note.yPdf,
                    noteTitle: note.noteTitle,
                    noteId: note.id,

                };
            }
        });

        setNoteGroupsForEachPage(newGroupedNotes);
    }, [notesOfDocument]);

    useEffect(() => {
        if (onlySelectedMarker && selectedNote && selectedNote.selectedText.length > 10) {
            setSearchText(selectedNote.selectedText);
        } else {
            setSearchText("");
        }
    }, [selectedNote, onlySelectedMarker]);


    // @ts-ignore
    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages);
    };

    // @ts-ignore
    const onItemClick = ({pageNumber: itemPageNumber}) => {
        setCurrentPageNumber(itemPageNumber);
    };

    // @ts-ignore
    const handlePageChange = (offset) => {
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
        const noteService = NoteService.getInstance();

        if (!currentUser?.uid || !documentId) {
            return;
        }

        try {
            const noteId = await noteService.addNote(currentUser.uid, documentId, noteData);

            if (noteId) {
                const newNote = {...noteData, id: noteId};
                const result = await noteService.updateNote(currentUser.uid, newNote.documentId, noteId, newNote);

                if (result) {
                    setIsDialogOpen(false);
                    toast.success('Note added successfully!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else {
                    toast.error(result, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            }
        } catch (error) {
            console.error('Error saving note:', error);
            toast.error('An error occurred while saving the note.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };


    function highlightPattern(text: string, pattern: string) {

        return text.replace(pattern, (value) => `<mark>${value}</mark>`);
    }

    const textRenderer = useCallback(
        // @ts-ignore
        (textItem) => highlightPattern(textItem.str, searchText),
        [searchText]
    );


    // @ts-ignore
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
        <>
            <Helmet>
                <title> {documentTitle}</title>
            </Helmet>
            <div style={{position: "relative"}}>

                {pdfPrintBlocker && (
                    <NotesDrawer
                        documentId={documentId}
                        documentTitle={documentTitle}
                        currentPage={currentPageNumber}
                        numPages={numPages}
                        noteList={notesOfDocument}
                        setSelectedNote={setSelectedNote}
                        selectedNote={selectedNote}

                    />
                )}

                <div style={{width: "100%", height: "100vh"}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'start', m: 1}}>
                        <PdfWrapperCanvas
                            canvasWidth={canvasWidth}
                            canvasHeight={canvasHeight}
                            enableSelect={selectedText !== undefined && selectedText.length > 0}
                            enableDraw={true}
                            buttonLocationMap={markerMap}
                            updateButtonLocationMap={setMarkerMap}
                            currentPage={currentPageNumber}
                            addNoteFunction={handleAddNote}
                            noteCursorMapList={noteGroupsForEachPage}
                            hideMarkers={hideMarkers}
                            onlySelectedMarker={onlySelectedMarker}
                            selectedNote={selectedNote}
                        >

                            {pdfPrintBlocker && (
                                <div>
                                    <Document file={documentPath} onLoadSuccess={onDocumentLoadSuccess}>
                                        <Outline onItemClick={onItemClick}/>
                                        <Page pageNumber={currentPageNumber}
                                              customTextRenderer={textRenderer}/>
                                    </Document>
                                </div>

                            )}

                        </PdfWrapperCanvas>

                        <div style={{margin: '0.5rem', width: '15%'}}>
                            <TextField
                                placeholder="Search Text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon/>
                                        </InputAdornment>
                                    ),
                                    style: {padding: '0.1rem'}
                                }}
                            />
                        </div>
                    </Box>


                    <ToastContainer/>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', m: 1}}>
                        <Box>
                            {numPages > 1 && (
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        startIcon={<RemoveTwoToneIcon fontSize="small"/>}
                                        onClick={() => handlePageChange(-1)}
                                    >
                                        Previous Page
                                    </Button>
                                    <span style={{padding: 8, fontWeight: 600}}>
                    {currentPageNumber} of {numPages}
                </span>
                                    <Button
                                        sx={{ml: 1}}
                                        size="small"
                                        variant="contained"
                                        startIcon={<AddTwoToneIcon fontSize="small"/>}
                                        onClick={() => handlePageChange(1)}
                                    >
                                        Next Page
                                    </Button>
                                </Box>
                            )}
                        </Box>
                        <Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                Hide Markers
                                <Switch
                                    checked={hideMarkers}
                                    onChange={() => setHideMarkers(!hideMarkers)}
                                />
                                Show Only Selected Marker
                                <Switch
                                    checked={onlySelectedMarker}
                                    onChange={() => {
                                        setOnlySelectedMarker(!onlySelectedMarker);
                                        if (onlySelectedMarker) {
                                            setSelectedNote(null);
                                        }
                                    }}
                                />
                                {onlySelectedMarker && (
                                    <span>selectedMarker: {selectedNote ? selectedNote?.noteTitle : "No click a note in the drawer"}</span>
                                )}
                            </Box>
                        </Box>
                    </Box>


                    <AddNoteDialog
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
                        documentId={documentId}
                        selectedText={selectedText == undefined ? "" : selectedText}

                    />

                </div>
            </div>
        </>


    );
}

export default PdfViewer;





