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
import StorageService from "../../services/StorageService.tsx";
import DocumentService from "../../services/DocumentService.tsx";
import IDocument from '../../types/IDocument.tsx';
import {toast, ToastContainer} from "react-toastify";

function PageHeader() {
    const {currentUser} = useAuth();
    const user = {
        name: currentUser?.firstName + ' ' + currentUser?.lastName,
        avatar: 'src/assets/images/avatars/1.png',
    };

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [errors, setErrors] = useState({fileName: '', file: ''});
    const [uploadProgress, setUploadProgress] = useState(0);
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        resetForm();
    };


    // @ts-ignore
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setUploadProgress(0);
        setErrors((prevErrors) => ({
            ...prevErrors,
            file: '',
        }));
    };

    // @ts-ignore
    const handleFileNameChange = (event) => {
        const value = event.target.value;
        setFileName(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            fileName: value ? '' : 'File name is required',
        }));
    };

    const handleAddDocument = async () => {
        if (!fileName) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                fileName: 'File name is required',
            }));
            return;
        }
        if (!selectedFile) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                file: ' Please select a file',
            }));
            return;
        }

        try {
            const storageService = StorageService.getInstance();
            const dowloandURL = await storageService.uploadFile("userId", selectedFile, setUploadProgress);

            if (dowloandURL != null) {
                const fileType = selectedFile.type.includes("pdf")
                    ? "pdf"
                    : selectedFile.type.includes("jpg")
                        ? "jpg"
                        : selectedFile.type.includes("png")
                            ? "png"
                            : "png";

                const newDocument: IDocument = {
                    id: fileName,
                    title: fileName,
                    path: dowloandURL,
                    createdAt: new Date().toISOString(),
                    type: fileType,
                };

                if (currentUser?.uid != null) {
                    const documentServiceInstance = DocumentService.getInstance();
                    const documentId = await documentServiceInstance.addDocument(currentUser.uid, newDocument);
                    if (documentId != null) {
                        newDocument.id = documentId;
                        await documentServiceInstance.updateDocument(currentUser.uid, documentId, newDocument);
                        handleDialogClose();
                    }
                }
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error(`Error: ${error}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
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
                            style={{display: 'none'}}
                            id="fileInput"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="fileInput">
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                startIcon={<CloudUploadIcon/>}
                            >
                                Choose a File
                            </Button>
                            <span>
                                 {selectedFile ? ` 1 File Selected - ${uploadProgress}% Uploaded` : ""}
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
            <ToastContainer/>
        </Grid>

    );
}

export default PageHeader;
