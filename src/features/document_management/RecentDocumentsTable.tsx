import {FC, ChangeEvent, useState,} from 'react';
import PropTypes from 'prop-types';
import Label from '../../components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import BulkActions from './BulkActions';
import IDocument, {DocumentTypeStatus} from "../../types/document.type.tsx";
import DocumentService from "../../services/document.service.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";


import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,
    Card,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    MenuItem,
    Typography,
    useTheme,
    CardHeader
} from '@mui/material';
import AlertDialog from "../../components/AlertDialog/AlertDialog.tsx";
import ImageViewer from "../../components/ImageViewer/ImageViewer.tsx";
import {useNavigate} from "react-router-dom";


interface RecentDocumentsTableProps {
    className?: string;
    documents: IDocument[];
    tableTitle?: string;
    hideEdit?: boolean;
    hideEDelete?: boolean;
}

interface Filters {
    types?: DocumentTypeStatus;
}

const getStatusLabel = (documentTypeStatus: DocumentTypeStatus): JSX.Element => {
    const map = {
        pdf: {
            text: 'pdf',
            color: 'error'
        },
        png: {
            text: 'png',
            color: 'success'
        },
        jpg: {
            text: 'jpg',
            color: 'warning'
        }
    };

    const {text, color}: any = map[documentTypeStatus];

    return <Label color={color}>{text}</Label>;
};

const applyFilters = (
    documents: IDocument[],
    filters: Filters
): IDocument[] => {
    return documents.filter((document) => {
        let matches = true;

        if (filters.types && document.type !== filters.types) {
            matches = false;
        }

        return matches;
    });
};

const applyPagination = (
    documents: IDocument[],
    page: number,
    limit: number
): IDocument[] => {
    return documents.slice(page * limit, page * limit + limit);
};

const RecentDocumentsTable: FC<RecentDocumentsTableProps> = ({documents, tableTitle}) => {
    const navigate = useNavigate();
    const {currentUser} = useAuth();
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>(
        []
    );
    const selectedBulkActions = selectedDocuments.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    // @ts-ignore
    const [filters, setFilters] = useState<Filters>({
        // @ts-ignore
        types: null
    });

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
    const statusOptions = [
        {
            id: 'all',
            name: 'ALL'
        },
        {
            id: 'jpg',
            name: 'JPG'
        },
        {
            id: 'png',
            name: 'PNG'
        },
        {
            id: 'pdf',
            name: 'PDF'
        },
    ];

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
        // @ts-ignore
        let value = null;
        if (e.target.value !== 'all') {
            value = e.target.value;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            // @ts-ignore
            types: value
        }));
    };

    const handleSelectAllDocuments = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedDocuments(
            event.target.checked
                ? documents.map((document) => document.id)
                : []
        );
    };

    const handleSelectOneDocument = (
        // @ts-ignore
        event: ChangeEvent<HTMLInputElement>,
        documentId: string
    ): void => {
        if (!selectedDocuments.includes(documentId)) {
            setSelectedDocuments((prevSelected) => [
                ...prevSelected,
                documentId
            ]);
        } else {
            setSelectedDocuments((prevSelected) =>
                prevSelected.filter((id) => id !== documentId)
            );
        }
    };

    // @ts-ignore
    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const filteredDocuments = applyFilters(documents, filters);
    const paginatedDocuments = applyPagination(
        filteredDocuments,
        page,
        limit
    );
    const selectedSomeDocuments =
        selectedDocuments.length > 0 &&
        selectedDocuments.length < documents.length;
    const selectedAllDocuments =
        selectedDocuments.length === documents.length;
    const theme = useTheme();


    const [viewerOpen, setViewerOpen] = useState(false);
    const [viewerImageUrl, setViewerImageUrl] = useState('');

    const handleOpenImageViewer = (imageUrl: string) => {
        setViewerImageUrl(imageUrl);
        setViewerOpen(true);
    };

    const [selectedOperationId, setSelectedOperationId] = useState<string | null>(null);
    return (
        <Card>
            {selectedBulkActions && (
                <Box flex={1} p={2}>
                    <BulkActions/>
                </Box>
            )}
            {!selectedBulkActions && (
                <CardHeader
                    action={
                        <Box width={150}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.types || 'all'}
                                    // @ts-ignore
                                    onChange={handleStatusChange}
                                    label="Status"
                                    autoWidth
                                >
                                    {statusOptions.map((statusOption) => (
                                        <MenuItem key={statusOption.id} value={statusOption.id}>
                                            {statusOption.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    }
                    title={tableTitle ? tableTitle : "Documents"}
                />
            )}
            <Divider/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={selectedAllDocuments}
                                    indeterminate={selectedSomeDocuments}
                                    onChange={handleSelectAllDocuments}
                                />
                            </TableCell>
                            <TableCell>Document Id</TableCell>
                            <TableCell>Document title</TableCell>
                            <TableCell align="right">Document Created</TableCell>
                            <TableCell align="right">Document Type</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedDocuments.map((document) => {
                            const isDocumentSelected = selectedDocuments.includes(
                                document.id
                            );
                            return (
                                <TableRow
                                    hover
                                    key={document.id}
                                    selected={isDocumentSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isDocumentSelected}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleSelectOneDocument(event, document.id)
                                            }
                                            value={isDocumentSelected}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {document.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {document.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {document.createdAt}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {document.createdAt}
                                        </Typography>
                                    </TableCell>


                                    <TableCell align="right">
                                        {getStatusLabel(document.type)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Show Document" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {

                                                        background: theme.colors.secondary.lighter
                                                    },
                                                    color: "#080808"
                                                }}
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    if (document.type != "pdf") {
                                                        handleOpenImageViewer(document.path);
                                                    } else {
                                                        const pdfPath = "/pdf-viewer/" + document.id
                                                        navigate(pdfPath, {replace: false});
                                                    }

                                                }}
                                            >
                                                <SearchTwoToneIcon fontSize="small"/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit Document" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background: theme.colors.primary.lighter
                                                    },
                                                    color: theme.palette.primary.main
                                                }}
                                                color="inherit"
                                                size="small"
                                            >
                                                <EditTwoToneIcon fontSize="small"/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Document" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {background: theme.colors.error.lighter},
                                                    color: theme.palette.error.main
                                                }}
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setSelectedOperationId(document.id)
                                                    setShowDeleteConfirmation(true);
                                                }}
                                            >
                                                <DeleteTwoToneIcon fontSize="small"/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box p={2}>
                <TablePagination
                    component="div"
                    count={filteredDocuments.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                />
            </Box>

            <Box display="flex" justifyContent="center" p={2}>
                <AlertDialog
                    title="Confirm Deletion"
                    content="Are you sure you want to delete the selected documents?"
                    agreeButtonText="Yes, Delete"
                    disagreeButtonText="Cancel"
                    onAgree={async () => {

                        if (currentUser?.uid) {
                            await DocumentService.getInstance().deleteDocument(currentUser?.uid, selectedOperationId!);
                            setShowDeleteConfirmation(false);
                            setSelectedOperationId(null);
                        }
                    }}
                    onDisagree={() => {
                        setShowDeleteConfirmation(false);
                        setSelectedOperationId(null);
                    }}
                    open={showDeleteConfirmation}
                    onClose={() => setShowDeleteConfirmation(false)}
                />
            </Box>
            {viewerOpen && (
                <ImageViewer imageUrl={viewerImageUrl} onClose={() => setViewerOpen(false)}/>
            )}

        </Card>
    );
};

RecentDocumentsTable.propTypes = {
    documents: PropTypes.array.isRequired
};

RecentDocumentsTable.defaultProps = {
    documents: []
};

export default RecentDocumentsTable;
