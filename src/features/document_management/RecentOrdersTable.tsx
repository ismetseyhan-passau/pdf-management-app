import {FC, ChangeEvent, useState} from 'react';
import {format} from 'date-fns';
import PropTypes from 'prop-types';
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

import Label from '../../components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import IDocument, {DocumentTypeStatus} from "../../types/document.type.tsx";

interface RecentDocumentsTableProps {
    className?: string;
    documents: IDocument[];
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

const RecentDocumentsTable: FC<RecentDocumentsTableProps> = ({documents}) => {
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>(
        []
    );
    const selectedBulkActions = selectedDocuments.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [filters, setFilters] = useState<Filters>({
        types: null
    });

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
        let value = null;

        if (e.target.value !== 'all') {
            value = e.target.value;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            types: value
        }));
    };

    const handleSelectAllCryptoOrders = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedDocuments(
            event.target.checked
                ? documents.map((document) => document.id)
                : []
        );
    };

    const handleSelectOneDocument = (
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

    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const filteredCryptoOrders = applyFilters(documents, filters);
    const paginatedDocuments = applyPagination(
        filteredCryptoOrders,
        page,
        limit
    );
    const selectedSomeDocuments =
        selectedDocuments.length > 0 &&
        selectedDocuments.length < documents.length;
    const selectedAllDocuments =
        selectedDocuments.length === documents.length;
    const theme = useTheme();

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
                    title="Documents"
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
                                    onChange={handleSelectAllCryptoOrders}
                                />
                            </TableCell>
                            <TableCell>Document title</TableCell>
                            <TableCell>Document Id</TableCell>
                            <TableCell align="right">Document Type</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedDocuments.map((document, index) => {
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
                                            {document.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {document.createdAt}
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
                                            {document.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        {getStatusLabel(document.type)}
                                    </TableCell>
                                    <TableCell align="right">
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
                    count={filteredCryptoOrders.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                />
            </Box>
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
