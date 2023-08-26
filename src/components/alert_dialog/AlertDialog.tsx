import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface AlertDialogProps {
    title: string;
    content: string;
    agreeButtonText: string;
    disagreeButtonText: string;
    onAgree: () => void;
    onDisagree?: () => void;
    open: boolean;
    onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
                                                     title,
                                                     content,
                                                     agreeButtonText,
                                                     disagreeButtonText,
                                                     onAgree,
                                                     onDisagree,
                                                     open,
                                                     onClose,
                                                 }) => {
    const handleAgree = () => {
        onAgree();
        onClose();
    };

    const handleDisagree = () => {
        if (onDisagree) {
            onDisagree();
        }
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {onDisagree && (
                    <Button onClick={handleDisagree} variant="outlined" color="secondary">
                        {disagreeButtonText}
                    </Button>
                )}
                <Button onClick={handleAgree} variant="contained" color="primary">
                    {agreeButtonText}
                </Button>

            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
