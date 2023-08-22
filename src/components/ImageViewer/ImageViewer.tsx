import { Dialog, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ImageViewerProps {
    imageUrl: string;
    onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl, onClose }) => {

    return (
        <Dialog open={true} onClick={onClose}>
            <Paper
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img src={imageUrl} alt="Document" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                <IconButton sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Paper>
        </Dialog>
    );
};

export default ImageViewer;
