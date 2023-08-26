interface IDocumentNoteType {
    id: string;
    noteTitle: string;
    documentId: string;
    documentTitle: string;
    currentPageNumber: number;
    selectedText: string;
    noteText: string;
    xPdf: number;
    yPdf: number;
    xCanvas: number;
    yCanvas: number;
    createdAt: string; //todo timestamp
}

export default IDocumentNoteType;