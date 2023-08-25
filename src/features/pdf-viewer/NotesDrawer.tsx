import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    Typography,
    Divider,
    Box,
} from '@mui/material';
import IDocumentNoteType from '../../types/document.note.type';
import NoteListItem from "./NoteListItem.tsx";

interface DrawerProps {
    documentId: string;
    documentTitle: string;
    currentPage: number;
    numPages: number;
    noteList: IDocumentNoteType[];
}

const NotesDrawer: React.FC<DrawerProps> = ({
                                                documentId,
                                                documentTitle,
                                                currentPage,
                                                numPages,
                                                noteList,
                                            }) => {
    const handlePageSelect = (documentId: string) => {
        // Implement your logic for handling page selection
    };

    return (
        <Drawer anchor="right" variant="persistent" open={true}>
            <div
                style={{
                    width: 300,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h4" style={{ marginBottom: 8 ,justifyContent: 'center' }}>
                    Document Title: {documentTitle}
                </Typography>
                <Divider />
                <Box mt={2}>
                    <Typography variant="subtitle1">
                        Page: {currentPage} of {numPages}
                    </Typography>
                </Box>
                <Divider />
                <Typography variant="h3" style={{ marginTop: 16 }}>
                    My Notes
                </Typography>
            </div>

            <List style={{ flex: 1 }}>
                {noteList.map((note) => (
                    <ListItem key={note.id} button onClick={() => handlePageSelect(note.id)}>
                        <NoteListItem
                            noteId={note.id}
                            documentId={note.documentId}
                            documentTitle={note.documentTitle}
                            noteTitle={note.noteTitle}
                            selectedText={note.selectedText}
                            noteText={note.noteText}
                            createdAt={note.createdAt}
                            noteX={note.xPdf}
                            noteY={note.yPdf}
                        />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default NotesDrawer;
