import React, {useState} from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Tooltip, Box,
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import NoteDialog from "./NoteDiolog.tsx";
import AlertDialog from "../../components/alert_dialog/AlertDialog.tsx";
import NoteService from "../../services/NoteService.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {toast} from "react-toastify";

interface NoteCardProps {
    noteId: string;
    documentId: string;
    documentTitle: string;
    noteTitle: string;
    selectedText: string;
    noteText: string;
    createdAt: string;
    noteX: number;
    noteY: number;
    notePage: number
}

const NoteListItem: React.FC<NoteCardProps> = ({
                                                   noteId,
                                                   documentId,
                                                   documentTitle,
                                                   noteTitle,
                                                   selectedText,
                                                   noteText,
                                                   createdAt,
                                                   noteX,
                                                   noteY,
                                                   notePage
                                               }) => {

    const {currentUser} = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mode, setMode] = useState<"show" | "edit">('show');
    const [deleteComfirmation, setDeleteComfirmation] = useState(false);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    return (
        <Card className="note-card">
            <CardContent>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                }}>

                    <Typography variant="h6">
                        <span style={{fontWeight: 'bold'}}>Note Title: </span> {noteTitle}
                    </Typography>
                    <div>
                        <Tooltip title="Edit Note" arrow>
                            <IconButton size="small" color="primary" onClick={() => {
                                setMode('edit');
                                setIsDialogOpen(true);
                            }}>
                                <EditTwoToneIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Note" arrow>
                            <IconButton size="small" color="error" onClick={() => {
                                setDeleteComfirmation(true)

                            }}>
                                <DeleteTwoToneIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    <span style={{fontWeight: 'bold'}}>Selected Text:</span> {selectedText.length > 200 ?
                    <span>{selectedText.substring(0, 200)}...</span> : selectedText}
                </Typography>
                <Typography variant="body2" component="p" className="note-text">
                    <span style={{fontWeight: 'bold'}}>Note:</span> {noteText.length > 200 ?
                    <span>{noteText.substring(0, 200)}...</span> : noteText}
                </Typography>


                <Typography variant="subtitle1" component="p" className="note-text">
                    <span style={{fontWeight: 'bold'}}>Page:</span> {notePage}
                </Typography>
                <div style={{display: 'flex', justifyContent: 'flex-start', marginTop: '8px'}}>
                    <Tooltip title="Look Note" arrow>
                        <IconButton size="small" color="success"
                                    onClick={() => {
                                        setMode("show")
                                        setIsDialogOpen(true)
                                    }}>
                            <SearchTwoToneIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </div>
            </CardContent>
            <NoteDialog
                open={isDialogOpen}
                mode={mode}
                onClose={handleDialogClose}
                noteDetails={{
                    noteId,
                    documentId,
                    documentTitle,
                    noteTitle,
                    selectedText,
                    noteText,
                    createdAt,
                    noteX,
                    noteY
                }}
            />

            <Box display="flex" justifyContent="center" p={2}>
                <AlertDialog
                    title="Confirm Deletion"
                    content="Are you sure you want to delete the selected note?"
                    agreeButtonText="Yes, Delete"
                    disagreeButtonText="Cancel"
                    onAgree={async () => {
                        if (currentUser?.uid != null) {
                            const result = await NoteService.getInstance().deleteNote(currentUser?.uid, documentId, noteId);
                            if (result) {
                                toast.success('Note deleted successfully!', {
                                    position: toast.POSITION.BOTTOM_RIGHT,
                                });
                                setDeleteComfirmation(false);
                            } else {
                                toast.warning(`There was an error: ${result}`, {
                                    position: toast.POSITION.BOTTOM_RIGHT,
                                });
                            }
                        }
                    }}
                    onDisagree={() => {
                        setDeleteComfirmation(false);
                    }}
                    open={deleteComfirmation}
                    onClose={() => setDeleteComfirmation(false)}
                />

            </Box>
        </Card>
    );
};

export default NoteListItem;
