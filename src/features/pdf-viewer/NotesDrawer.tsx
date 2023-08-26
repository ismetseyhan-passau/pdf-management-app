import React, {useEffect, useState} from 'react';
import {
    Drawer,
    List,
    ListItem,
    Typography,
    Divider,
    Box, Switch,
} from '@mui/material';
import IDocumentNoteType from '../../types/IDocumentNote.tsx';
import NoteListItem from "./NoteListItem.tsx";

interface DrawerProps {
    documentId: string;
    documentTitle: string;
    currentPage: number;
    numPages: number;
    noteList: IDocumentNoteType[];
    setSelectedNote: React.Dispatch<React.SetStateAction<IDocumentNoteType | null>>;
    selectedNote: IDocumentNoteType | null
}

const NotesDrawer: React.FC<DrawerProps> = ({
                                                documentTitle,
                                                currentPage,
                                                numPages,
                                                noteList,
                                                setSelectedNote,
                                                selectedNote
                                            }) => {


    const handlePageSelect = (noteId: string) => {
        setSelectedNote(noteList.find(note => note.id === noteId) || null);
    };

    const [filteredNoteList, setFilteredNoteList] = useState(noteList);
    const [showCurrentPageNotes, setShowCurrentPageNotes] = useState(true);

    useEffect(() => {
        if (showCurrentPageNotes) {
            const filteredNotes = noteList.filter(note => note.currentPageNumber === currentPage);
            setFilteredNoteList(filteredNotes);
        } else {
            setFilteredNoteList(noteList);
        }

    }, [currentPage, noteList, showCurrentPageNotes]);


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
                <Typography variant="h4" style={{marginBottom: 8, justifyContent: 'center'}}>
                    Document Title: {documentTitle}
                </Typography>
                <Divider/>
                <Box mt={2}>
                    <Typography variant="subtitle1">
                        Page: {currentPage} of {numPages}
                    </Typography>
                </Box>
                <Divider/>
                <Typography variant="h3" style={{marginTop: 16}}>
                    My Notes
                </Typography>
                <Box mt={2}>
                    <Typography variant="body1">
                        Show : All / Current Page Notes
                    </Typography>
                    <Switch
                        checked={showCurrentPageNotes}
                        onChange={() => setShowCurrentPageNotes(!showCurrentPageNotes)}
                    />
                </Box>
            </div>

            <List style={{flex: 1}}>
                {filteredNoteList.map((note) => (
                    <ListItem key={note.id} button onClick={() => handlePageSelect(note.id)}>
                        <div style={{
                            width: '100%',
                            borderRadius: 10,
                            border: selectedNote?.id === note.id ? "2px dotted red" : "none"
                        }}>
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
                                notePage={note.currentPageNumber}
                            />
                        </div>

                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default NotesDrawer;
