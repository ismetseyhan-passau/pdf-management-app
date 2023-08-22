export type DocumentTypeStatus = 'pdf' | 'png' | 'jpg';

interface IDocument {
    id: string;
    title: string;
    path: string;
    createdAt: string;
    type: DocumentTypeStatus;
}

export default IDocument;