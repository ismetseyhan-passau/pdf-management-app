import React, {useState} from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Tooltip,
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import NoteDialog from "./NoteDiolog.tsx";

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
                                                   noteY
                                               }) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mode, setMode] = useState<"show" | "edit">('show');

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
                            <IconButton size="small" color="error">
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
        </Card>
    );
};

export default NoteListItem;
