import {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IDocument from '../../types/IDocument.tsx';
import DocumentService from '../../services/DocumentService';
import {useAuth} from '../../contexts/AuthContext';
import {toast} from "react-toastify";

interface EditDocumentDialogProps {
    open: boolean;
    onClose: () => void;
    document: IDocument;
}

function EditDocumentDialog({open, onClose, document}: EditDocumentDialogProps) {
    const [editedTitle, setEditedTitle] = useState("");
    const {currentUser} = useAuth();

    useEffect(() => {
        if (document) {
            setEditedTitle(document.title)
        }
    }, [document]);
    const handleSave = async () => {
        try {
            let newDocument: IDocument;
            newDocument = document;
            newDocument.title = editedTitle
            await DocumentService.getInstance().updateDocument(currentUser?.uid!, document.id, newDocument)
            toast.success('Document updated successfully!', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            onClose();
        } catch (error) {
            toast.error("An error occurred while updating the document.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }

    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Document Title</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit the title of the document:
                </DialogContentText>
                <TextField
                    value={editedTitle}
                    onChange={(e) => {
                        setEditedTitle(e.target.value)
                    }}
                    fullWidth
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
}

export default EditDocumentDialog;
