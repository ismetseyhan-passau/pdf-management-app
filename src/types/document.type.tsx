export type DocumentTypeStatus = 'pdf' | 'png' | 'jpg';
export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';
interface IDocument {
    id: string;
    title: string;
    path: string;
    createdAt: string;
    type: DocumentTypeStatus;
}

export default IDocument;