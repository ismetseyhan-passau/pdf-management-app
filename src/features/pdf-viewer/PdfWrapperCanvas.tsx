import React, {useEffect, MouseEvent, ReactNode} from "react";
import PropTypes from "prop-types";


interface SignatureMap {
    [key: number]: {
        xCanvas: number;
        yCanvas: number;
        xPDF: number;
        yPDF: number;
    };
}

interface Props {
    enableSelect?: boolean;
    enableDraw?: boolean;
    signatureWidth: number;
    signatureHeight: number;
    canvasWidth: number;
    canvasHeight: number;
    currentPage: number;
    signatureMap: SignatureMap;
    updateSignatureMap: (newSignatureMap: SignatureMap) => void;
    textPlaceholder?: string;
    children?: ReactNode;
    addNoteFunction: (
        xPDF: number,
        yPDF: number,
        xCanvas: number,
        yCanvas: number
    ) => boolean;
}

const A4SIZE = {
    DPI_72: {
        WIDTH: 595,
        HEIGHT: 842,
    },
};

const PdfWrapperCanvas: React.FC<Props> = ({
                                                       enableSelect = true,
                                                       enableDraw = true,
                                                       canvasWidth,
                                                       canvasHeight,
                                                       currentPage,
                                                       signatureMap,
                                                       updateSignatureMap,
                                                       children,
                                                       addNoteFunction,
                                                   }) => {
    useEffect(() => {
        if (enableDraw) {
            clearOverlayCanvas();
            if (signatureMap[currentPage]) {
                console.log(signatureMap[currentPage]);

            }
        }
    }, [currentPage]);

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
                const result = addNoteFunction(signX, signY, canvasX, canvasY);
                removeAddButton();
            });

            const signatureSelectorDiv = document.getElementById(
                "kpmg-sign-selector"
            ) as HTMLDivElement;
            signatureSelectorDiv.appendChild(button);
        }
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

            if (canvas.width > canvasWidth || canvas.height > canvasHeight) {
                clearOverlayCanvas();
                drawOnOverlayCanvas(xPDF, yPDF, x, y);


                console.log("Canvas:" + x + ", " + y);
                console.log("Pdf:" + xPDF + ", " + yPDF);

                const newSignatureMap = {...signatureMap};
                newSignatureMap[currentPage] = {
                    xCanvas: x,
                    yCanvas: y,
                    xPDF: xPDF,
                    yPDF: yPDF,
                };
                updateSignatureMap(newSignatureMap);
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

PdfWrapperCanvas.propTypes = {
    enableSelect: PropTypes.bool,
    enableDraw: PropTypes.bool,
    signatureWidth: PropTypes.number.isRequired,
    signatureHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    signatureMap: PropTypes.object.isRequired,
    updateSignatureMap: PropTypes.func.isRequired,
    textPlaceholder: PropTypes.string,
    children: PropTypes.node,
};

export default PdfWrapperCanvas;
