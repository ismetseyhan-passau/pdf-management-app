import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography} from '@mui/material';
import {useAuth} from "../../contexts/AuthContext.tsx";
import NoteService from "../../services/note.service.tsx";
import {toast} from "react-toastify";

interface NoteDialogProps {
    open: boolean;
    mode: 'show' | 'edit';
    onClose: () => void;
    noteDetails: {
        noteId: string;
        documentId: string;
        documentTitle: string;
        noteTitle: string;
        selectedText: string;
        noteText: string;
        createdAt: string;
        noteX: number;
        noteY: number;
    };
}

const NoteDialog: React.FC<NoteDialogProps> = ({open, mode, onClose, noteDetails}) => {
    const [editedNote, setEditedNote] = useState({
        noteTitle: noteDetails.noteTitle,
        noteText: noteDetails.noteText,
    });
    const {currentUser} = useAuth();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setEditedNote(prevNote => ({
            ...prevNote,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        if (mode !== 'edit') {
            return; // No need to proceed if not in edit mode
        }

        try {
            const result = await NoteService.getInstance().updateNote(currentUser?.uid!, noteDetails.documentId, noteDetails.noteId, editedNote);

            if (result === true) {
                toast.success('Note updated successfully!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                onClose();
            } else {
                toast.warning(`There was an error: ${result}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        } catch (error) {
            console.error("Error updating note:", error);
            toast.error("An error occurred while updating the note.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth={'md'}>
            <DialogTitle>{mode === 'edit' ? 'Edit Note' : 'Note Details'}</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Document Id:</Typography>
                <Typography>{noteDetails.documentId}</Typography>

                <Typography variant="h6">Note Id:</Typography>
                <Typography>{noteDetails.noteId}</Typography>

                <Typography variant="h6">Note X:</Typography>
                <Typography>{noteDetails.noteX}</Typography>

                <Typography variant="h6">Note Y:</Typography>
                <Typography>{noteDetails.noteY}</Typography>


                <Typography variant="h6">Document Title:</Typography>
                <Typography>{noteDetails.documentTitle}</Typography>


                <Typography variant="h6">Selected Text:</Typography>
                <Typography>{noteDetails.selectedText}</Typography>

                <Typography variant="h6">Note Title:</Typography>
                {mode === 'edit' ? (
                    <TextField
                        name="noteTitle"
                        value={editedNote.noteTitle}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                ) : (
                    <Typography>{noteDetails.noteTitle}</Typography>
                )}

                <Typography variant="h6">Note Text:</Typography>
                {mode === 'edit' ? (
                    <TextField
                        name="noteText"
                        value={editedNote.noteText}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                        multiline
                        rows={4}
                    />
                ) : (
                    <Typography>{noteDetails.noteText}</Typography>
                )}
            </DialogContent>
            <DialogActions>
                {mode === 'edit' && (
                    <Button onClick={handleSaveChanges} color="primary">
                        Save Changes
                    </Button>
                )}
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NoteDialog;
