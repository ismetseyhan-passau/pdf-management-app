import {Card} from '@mui/material';
import RecentDocumentsTable from './RecentOrdersTable';
import IDocument from '../../types/document.type';

function RecentOrders() {
    const documents: IDocument[] = [
        {
            "id": "1",
            "title": "Document 1",
            "path": "/path/to/document1.pdf",
            "createdAt": "2023-08-20T10:30:00Z",
            "type": "pdf"
        },
        {
            "id": "2",
            "title": "Document 2",
            "path": "/path/to/document2.jpeg",
            "createdAt": "2023-08-21T14:15:00Z",
            "type": "jpg"
        },
        {
            "id": "3",
            "title": "Document 3",
            "path": "/path/to/document3.png",
            "createdAt": "2023-08-22T08:00:00Z",
            "type": "png"
        },
        {
            "id": "4",
            "title": "Document 4",
            "path": "/path/to/document4.pdf",
            "createdAt": "2023-08-23T11:45:00Z",
            "type": "pdf"
        },
        {
            "id": "5",
            "title": "Document 5",
            "path": "/path/to/document5.jpeg",
            "createdAt": "2023-08-24T15:30:00Z",
            "type": "jpg"
        },
        {
            "id": "6",
            "title": "Document 6",
            "path": "/path/to/document6.png",
            "createdAt": "2023-08-25T09:30:00Z",
            "type": "png"
        },
        {
            "id": "7",
            "title": "Document 7",
            "path": "/path/to/document7.pdf",
            "createdAt": "2023-08-26T10:00:00Z",
            "type": "pdf"
        },
        {
            "id": "8",
            "title": "Document 8",
            "path": "/path/to/document8.jpeg",
            "createdAt": "2023-08-27T12:15:00Z",
            "type": "jpg"
        },
        {
            "id": "9",
            "title": "Document 9",
            "path": "/path/to/document9.png",
            "createdAt": "2023-08-28T14:45:00Z",
            "type": "png"
        },
        {
            "id": "10",
            "title": "Document 10",
            "path": "/path/to/document10.pdf",
            "createdAt": "2023-08-29T08:30:00Z",
            "type": "pdf"
        },
        {
            "id": "11",
            "title": "Document 11",
            "path": "/path/to/document11.jpeg",
            "createdAt": "2023-08-30T11:00:00Z",
            "type": "jpg"
        },
        {
            "id": "12",
            "title": "Document 12",
            "path": "/path/to/document12.png",
            "createdAt": "2023-08-31T16:00:00Z",
            "type": "png"
        },
        {
            "id": "13",
            "title": "Document 13",
            "path": "/path/to/document13.pdf",
            "createdAt": "2023-09-01T09:15:00Z",
            "type": "pdf"
        },
        {
            "id": "14",
            "title": "Document 14",
            "path": "/path/to/document14.jpeg",
            "createdAt": "2023-09-02T13:30:00Z",
            "type": "jpg"
        },
        {
            "id": "15",
            "title": "Document 15",
            "path": "/path/to/document15.png",
            "createdAt": "2023-09-03T10:45:00Z",
            "type": "png"
        }
    ]



    return (
        <Card>
            <RecentDocumentsTable documents={documents}/>
        </Card>
    );
}

export default RecentOrders;
