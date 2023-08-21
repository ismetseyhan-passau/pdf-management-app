import {useState} from 'react';
import {
    Typography,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useAuth} from '../../contexts/AuthContext.tsx';

function PageHeader() {
    const {currentUser} = useAuth();
    const user = {
        name: currentUser?.firstName + ' ' + currentUser?.lastName,
        avatar: 'src/assets/images/avatars/1.png',
    };

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [errors, setErrors] = useState({fileName: '', file: ''});

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        resetForm();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        setErrors((prevErrors) => ({
            ...prevErrors,
            file: '',
        }));
    };

    const handleFileNameChange = (event) => {
        const value = event.target.value;
        setFileName(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            fileName: value ? '' : 'File name is required',
        }));
    };

    const handleAddDocument = () => {
        if (!fileName) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                fileName: 'File name is required',
            }));
        }
        if (!selectedFile) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                file: ' Please select a file',
            }));
        }

        // If both file name and file are valid, proceed to add the document
        if (fileName && selectedFile) {

            handleDialogClose();
        }
    };

    const resetForm = () => {
        setSelectedFile(null);
        setFileName('');
        setErrors({fileName: '', file: ''});
    };

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Documents
                </Typography>
                <Typography variant="subtitle2">
                    Dear <span style={{fontWeight: 600}}>{user.name}</span>, these are your recent documents
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    sx={{mt: {xs: 2, md: 0}}}
                    variant="contained"
                    startIcon={<AddTwoToneIcon fontSize="small"/>}
                    onClick={handleDialogOpen}
                >
                    New document
                </Button>
                <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>Add New Document</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="File Name"
                            variant="outlined"
                            margin="normal"
                            value={fileName}
                            onChange={handleFileNameChange}
                            error={Boolean(errors.fileName)}
                            helperText={errors.fileName}
                        />
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            style={{display: 'none'}} // Hide the default file input
                            id="fileInput"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="fileInput">
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                startIcon={<CloudUploadIcon/>} // Use the CloudUpload icon
                            >
                                Choose a File
                            </Button>
                            <span>
                                {selectedFile != null ? "  1 File Selected" : ""}
                            </span>

                        </label>
                        {errors.file && (
                            <Typography color="error" variant="caption">
                                {errors.file}
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button onClick={handleAddDocument} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
