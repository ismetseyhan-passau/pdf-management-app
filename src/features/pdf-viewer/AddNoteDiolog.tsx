import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import IDocumentNoteType from "../../types/document.note.type.tsx";

interface LocationInformation {
    xPDF: number;
    yPDF: number;
    xCanvas: number;
    yCanvas: number;
}

interface NoteDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (noteData: IDocumentNoteType) => void;
    currentPageNumber: number;
    documentTitle: string;
    location: LocationInformation;
    selectedText: string;
}

const NoteDialog: React.FC<NoteDialogProps> = ({
                                                   open,
                                                   onClose,
                                                   onSave,
                                                   currentPageNumber,
                                                   documentTitle,
                                                   location,
                                                   selectedText,
                                               }) => {
    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");

    const handleSave = () => {
        const noteData: IDocumentNoteType = {
            id: "some_unique_id",
            noteTitle,
            documentId: "current_document_id",
            documentTitle,
            currentPageNumber,
            selectedText,
            noteText,
            xPdf: location.xPDF,
            yPdf: location.yPDF,
            xCanvas: location.xCanvas,
            yCanvas: location.yCanvas,
        };

        onSave(noteData);
        setNoteTitle("");
        setNoteText("");
        onClose();
    };

    const handleOnClose = () => {
        setNoteText("");
        setNoteTitle("");
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleOnClose}>
            <DialogTitle>Add a New Note</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Selected Text: {selectedText}
                    <br/>
                    Document Title: {documentTitle}
                    <br/>
                    X PDF Coordinate: {location.xPDF}
                    <br/>
                    Y PDF Coordinate: {location.yPDF}
                    <br/>
                    X Canvas Coordinate: {location.xCanvas}
                    <br/>
                    Y Canvas Coordinate: {location.yCanvas}
                    <br/>
                    Current Page : {currentPageNumber}
                </DialogContentText>
                <TextField
                    fullWidth
                    label="Note Title"
                    variant="outlined"
                    margin="normal"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Note Text"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NoteDialog;
