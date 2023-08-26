import React, {useEffect, MouseEvent, ReactNode} from "react";
import PropTypes from "prop-types";
import IDocumentNoteType from "../../types/IDocumentNote.tsx";

interface NoteLocationMap {
    [key: number]: {
        noteId?: string,
        noteTitle?: string
        xCanvas: number;
        yCanvas: number;
        xPDF: number;
        yPDF: number;
    };
}

interface PdfWrapperCanvasProps {
    enableSelect?: boolean;
    enableDraw?: boolean;
    canvasWidth: number;
    canvasHeight: number;
    currentPage: number;
    buttonLocationMap: NoteLocationMap;
    updateButtonLocationMap: (newLocationMap: NoteLocationMap) => void;
    children?: ReactNode;
    addNoteFunction: (
        xPDF: number,
        yPDF: number,
        xCanvas: number,
        yCanvas: number
    ) => boolean;
    noteCursorMapList: NoteLocationMap[];
    hideMarkers: boolean,
    onlySelectedMarker: boolean,
    selectedNote: IDocumentNoteType | null
}

const A4SIZE = {
    DPI_72: {
        WIDTH: 595,
        HEIGHT: 842,
    },
};

const PdfWrapperCanvas: React.FC<PdfWrapperCanvasProps> = ({
                                                               enableSelect = true,
                                                               enableDraw = true,
                                                               canvasWidth,
                                                               canvasHeight,
                                                               currentPage,
                                                               buttonLocationMap,
                                                               updateButtonLocationMap,
                                                               children,
                                                               addNoteFunction,
                                                               noteCursorMapList,
                                                               hideMarkers,
                                                               onlySelectedMarker,
                                                               selectedNote

                                                           }) => {
    useEffect(() => {
        if (enableDraw) {
            clearOverlayCanvas();
        }
    }, [currentPage]);


    function checkRenderableNotes() {
        const pageIndex = currentPage - 1;
        const selectedNoteId = selectedNote?.id;

        if (!noteCursorMapList[pageIndex]) {
            return;
        }

        for (const noteCursorMapListElementKey in noteCursorMapList[pageIndex]) {
            const item = noteCursorMapList[pageIndex][noteCursorMapListElementKey];

            if (!onlySelectedMarker) {
                drawPinsOverlayCanvas(item.xPDF, item.yPDF, item.noteTitle!);
            } else if (selectedNoteId && item.noteId == selectedNoteId) {
                drawPinsOverlayCanvas(item.xPDF, item.yPDF, item.noteTitle!);
            }
        }
    }


    function checkToggleStates() {
        if (!hideMarkers) {
            checkRenderableNotes();
        }
    }

    useEffect(() => {
        if (enableDraw) {
            clearPinsOnCancas()
            checkToggleStates();

        }
    }, [noteCursorMapList, currentPage, hideMarkers, onlySelectedMarker, selectedNote]);


    const removeAddButton = () => {
        const addButton = document.getElementById("addNoteItem");
        if (addButton) {
            addButton.parentNode?.removeChild(addButton);
        }
    }

    const clearOverlayCanvas = () => {
        const canvasOverlay = document.getElementById(
            "sc-canvas-overlay"
        ) as HTMLCanvasElement;
        const ctx = canvasOverlay.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
            removeAddButton();
        }
    };

    function removeNotePin() {
        const notePins = document.querySelectorAll("#notePinIcon");
        notePins.forEach((notePin) => {
            notePin.remove();
        });
    }

    const clearPinsOnCancas = () => {
        const canvasOverlay = document.getElementById(
            "sc-canvas-overlay"
        ) as HTMLCanvasElement;
        const ctx = canvasOverlay.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
            removeNotePin();
        }
    };


    const drawOnOverlayCanvas = (
        signX: number,
        signY: number,
        canvasX: number,
        canvasY: number
    ) => {
        if (!document.getElementById("addNoteItem")) {
            const button = document.createElement("button");
            button.id = "addNoteItem";
            button.textContent = "Add Note!";
            button.style.position = "absolute";
            button.style.left = signX + "px";
            button.style.top = signY + "px";
            button.style.backgroundColor = "blue";
            button.style.color = "white";
            button.style.zIndex = "1000";
            button.style.fontSize = "12px";

            button.addEventListener("click", () => {
                addNoteFunction(signX, signY, canvasX, canvasY);
                removeAddButton();
            });

            const signatureSelectorDiv = document.getElementById(
                "kpmg-sign-selector"
            ) as HTMLDivElement;
            signatureSelectorDiv.appendChild(button);
        }
    };


    const drawPinsOverlayCanvas = (
        signX: number,
        signY: number,
        noteTitle: string,
    ) => {
        const notePinIcon = document.createElement("div");
        notePinIcon.id = "notePinIcon";
        notePinIcon.style.position = "absolute";
        notePinIcon.style.left = signX + "px";
        notePinIcon.style.top = signY - 40 + "px";
        notePinIcon.style.zIndex = "1200";

        const iconHtml = `
        <div style="width: 32px; height: 32px;">
            <img src="/src/assets/static/marker.png" alt="Note Pin Icon" width="32" height="32">
        </div>
    `;

        notePinIcon.innerHTML = iconHtml;

        // Add hover effect to show note text
        notePinIcon.addEventListener("mouseenter", () => {
            const noteTextContainer = document.createElement("div");
            noteTextContainer.className = "note-text-container";
            noteTextContainer.textContent = noteTitle;
            noteTextContainer.style.color = "#11192A";
            noteTextContainer.style.fontSize = "20px";
            noteTextContainer.style.zIndex = "1200";
            noteTextContainer.style.backgroundColor = "white";
            notePinIcon.appendChild(noteTextContainer);
        });

        notePinIcon.addEventListener("mouseleave", () => {
            const noteTextContainer = notePinIcon.querySelector(".note-text-container");
            if (noteTextContainer) {
                notePinIcon.removeChild(noteTextContainer);
            }
        });

        const signatureSelectorDiv = document.getElementById("kpmg-sign-selector") as HTMLDivElement;
        signatureSelectorDiv.appendChild(notePinIcon);
    };


    const getPosition = (evt: MouseEvent<HTMLDivElement>) => {
        const signatureSelectorDiv = document.querySelector(
            "#kpmg-sign-selector"
        ) as HTMLDivElement;
        const canvas = signatureSelectorDiv.querySelectorAll(
            "canvas"
        )[0] as HTMLCanvasElement;
        const mousePosition = getMousePos(canvas, evt);

        if (mousePosition) {

            const x = mousePosition.x;
            const y = mousePosition.y;

            const xPDF = Math.round(
                (A4SIZE.DPI_72.WIDTH * mousePosition.x) / canvas.width
            );
            const yPDF = Math.round(
                (A4SIZE.DPI_72.HEIGHT * mousePosition.y) / canvas.height
            );

            if (canvas.width >= canvasWidth || canvas.height >= canvasHeight) {
                clearOverlayCanvas();

                drawOnOverlayCanvas(xPDF, yPDF, x, y);


                console.log("Canvas:" + x + ", " + y);
                console.log("Pdf:" + xPDF + ", " + yPDF);

                const newSignatureMap = {...buttonLocationMap};
                newSignatureMap[currentPage] = {
                    xCanvas: x,
                    yCanvas: y,
                    xPDF: xPDF,
                    yPDF: yPDF,
                };
                updateButtonLocationMap(newSignatureMap);
            } else if (enableDraw) {
                clearOverlayCanvas();
                removeAddButton();

                //  drawOnOverlayCanvas(x, y, "red", textPlaceholder);
            }
        }
    };

    const getMousePos = (
        canvas: HTMLCanvasElement,
        evt: MouseEvent<HTMLDivElement>
    ) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const mouseX = (evt.clientX - rect.left) * scaleX;
        const mouseY = (evt.clientY - rect.top) * scaleY;

        if (mouseX > canvas.width || mouseY > canvas.height) {
            return undefined;
        } else {
            return {
                x: Math.round(mouseX),
                y: Math.round(mouseY),
            };
        }
    };

    return (
        <div
            id="kpmg-sign-selector"
            onClick={enableSelect ? getPosition : undefined}
        >
            {children}
            <canvas
                width={canvasWidth}
                height={canvasHeight}
                id="sc-canvas-overlay"
                style={{position: "absolute", top: 0, left: 0}}
            />
        </div>
    );
};

// @ts-ignore
PdfWrapperCanvas.propTypes = {
    enableSelect: PropTypes.bool,
    enableDraw: PropTypes.bool,
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    // @ts-ignore
    buttonLocationMap: PropTypes.object.isRequired,
    updateButtonLocationMap: PropTypes.func.isRequired,
    textPlaceholder: PropTypes.string,
    children: PropTypes.node,
    hideMarkers: PropTypes.bool.isRequired,
    onlySelectedMarker: PropTypes.bool.isRequired,
};

export default PdfWrapperCanvas;
