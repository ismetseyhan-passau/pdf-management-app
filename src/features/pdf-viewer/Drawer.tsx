import React from 'react';
import Drawer from '@mui/material/Drawer';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NoteIcon from "@mui/icons-material/Note";

function NotesDrawer({open, onClose, notes}) {
    return (
        <Drawer anchor="right" variant="persistent" open={open} onClose={onClose}>
            <div style={{width: 300, padding: '16px'}}>
                <TextField
                    label="Add a note"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={"ss"}
                    onChange={()=>{}}
                />
                <Button
                    variant="contained"
                    startIcon={<NoteIcon/>}
                    onClick={()=>{}}
                    style={{marginTop: '16px'}}
                >
                    Save Note
                </Button>
                <List style={{marginTop: '16px'}}>
                    {notes.map((note, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={note}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    );
}

export default NotesDrawer;
