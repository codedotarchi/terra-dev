/* 2d Painter Tool for Terra App */
/* Noah Pitts -- 2/23/2019 */

import * as notify from './ui.notify.js';
import * as ui from './ui.painter.js';

export class TensorEditorTool {
    // constructor(container, params) { // TODO: change to Container scheme vs Parent Div

    // construct on new Painter2d Object
    constructor(parentDiv, size) {
        // Assert Parent Div
        this.canvasDiv = null;
        if (!parentDiv) {
            notify.alertMsg('No Parent Div provided for new Painter2d - this must be linked through \'linkToDiv(parentDiv)\' method');
        } else {
            this.canvasDiv = parentDiv;
        }


        // Canvas size (1024 default)
        this.canvasSize = 1024;
        if (size) this.canvasSize = size;

        // Create canvas 

        this._hash = Math.floor((Math.random() * 1000) + 1);
        this.canvas = document.createElement('canvas');
        this.canvas.painter2d = this;
        // TODO: Fix Sizing Issue
        this.canvas.width = 918;
        this.canvas.height = 777;
        this.canvas.id = 'p2d-canvas-' + this._hash;
        this.canvas.className = 'p2d-canvas active';
        if (this.canvasDiv) this.canvasDiv.appendChild(this.canvas);

        // Canvas 2d context
        this.context = this.canvas.getContext('2d');

        // Click and Drag 
        this._clickX = new Array();
        this._clickY = new Array();
        this._clickDrag = new Array();
        this._clickColor = new Array();
        this._clickSize = new Array();

        // Toggle for painting
        this._isPainting = false;
        this.curColor = 'cyan';
        this.curSize = 8;

        // Register the event handlers
        // ---------------------------

        // On Mouse Down
        this.canvas.onmousedown = function (e) {
            let painter = this.painter2d;
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;

            painter._isPainting = true;

            painter.addClick(mouseX, mouseY);
            painter.redrawCanvas();
        };

        // On Touch Start
        // this.canvas.ontouchstart = this.canvas.onmousedown;

        // On Mouse Move
        this.canvas.onmousemove = function (e) {
            let painter = this.painter2d;
            if (painter._isPainting) {
                let mouseX = e.pageX - this.offsetLeft;
                let mouseY = e.pageY - this.offsetTop;

                painter.addClick(mouseX, mouseY, true);
                painter.redrawCanvas();
            }
        };

        // On Touch move
        // this.canvas.ontouchmove = function (e) {
        //     e.preventDefault();
        //     e.stopImmediatePropagation();

        //     let painter = this.painter2d;
        //     if (painter._isPainting) {
        //         let mouseX = e.pageX - this.offsetLeft;
        //         let mouseY = e.pageY - this.offsetTop;

        //         painter.addClick(mouseX, mouseY, true);
        //         painter.redrawCanvas();
        //     }
        // };

        // On Mouse Up
        this.canvas.onmouseup = function (e) {
            let painter = this.painter2d;

            // If you lift the mouse, you are no longer painting
            painter._isPainting = false;
        };

        // On Touch End
        // this.canvas.ontouchend = this.canvas.onmouseup;

        // On Mouse Leave
        this.canvas.onmouseleave = function (e) {
            let painter = this.painter2d;

            // If you leave the canvas, you are no longer painting
            painter._isPainting = false;
        };

        // SET UP CONTZROLS

        // Trash Button
        let clearButton = document.getElementById('p2d-button-trash');
        clearButton.onclick = () => {
            let curCanvas = document.getElementsByClassName('p2d-canvas')[0];
            curCanvas.painter2d.resetCanvas();
        };

        // Save Button
        this.images = [];
        let saveButton = document.getElementById('p2d-button-save');
        saveButton.onclick = () => {
            let curPainter = document.getElementsByClassName('p2d-canvas')[0].painter2d;
            let imageData = curPainter.getPixelData();

            // store a copy of all snapshots
            curPainter.images.push(imageData);

            // create a new image
            let image = document.createElement('img');
            image.setAttribute('src', imageData);
            image.setAttribute('width', 256);
            image.setAttribute('height', 256);
            image.setAttribute('class', 'imageViewer');

            let dataCollectionDiv = document.getElementById('main-tab-data collection-content');
            dataCollectionDiv.appendChild(image);
        };

        // Set Up default color Bar
        ui.setupDefaultColorBar(document.getElementById('temp-colorbar-container'));
    }

    setInactive() {
        this.canvas.className = 'p2d-canvas';
    }

    setActive() {
        this.canvas.className = 'p2d-canvas active';
    }

    setFocus() {
        let canvases = document.getElementsByClassName('p2d-canvas');
        for (let canvas of canvases) {
            canvas.painter2d.setInactive();
        }

        this.setActive();
    }

    setColor(color) {
        this.curColor = color;
    }

    // Return the Canvas Pixel Data
    getPixelData() {

        // TODO: this is where the resizing will occur
        return this.canvas.toDataURL();
    }

    // Link the Painter to a (new) wrapping Div
    linkToDiv(parentDiv) {
        if (!parentDiv) {
            notify.alertMsg('No Parent Div provided for new Painter2d - this must be linked through \'linkToDiv(parentDiv)\' method');
        } else {
            this.canvasDiv = parentDiv;
            this.canvasDiv.appendChild(this.canvas);
        }
    }

    // Redraw the Cnavas
    redrawCanvas() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.lineJoin = 'round';

        for (var i = 0; i < this._clickX.length; i++) {
            this.context.beginPath();
            if (this._clickDrag[i] && i) {
                this.context.moveTo(this._clickX[i - 1], this._clickY[i - 1]);
            } else {
                this.context.moveTo(this._clickX[i] - 1, this._clickY[i]);
            }
            this.context.lineTo(this._clickX[i], this._clickY[i]);
            this.context.closePath();
            this.context.strokeStyle = this._clickColor[i];
            this.context.lineWidth = this._clickSize[i];
            this.context.stroke();
        }
    }

    // Clears the Canvas
    resetCanvas() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this._clickX = new Array();
        this._clickY = new Array();
        this._clickDrag = new Array();
        this._clickColor = new Array();
    }

    // Add a click
    addClick(x, y, dragging) {
        this._clickX.push(x);
        this._clickY.push(y);
        this._clickDrag.push(dragging);
        this._clickColor.push(this.curColor);
        this._clickSize.push(this.curSize);
    }

    // static setupUI(parent) {
    //     // if (!parentDiv) {
    //     //     notify.alertMsg("No Parent Div provided for new Painter2d - this must be linked through 'linkToDiv(parentDiv)' method");

    //     // } else {
    //     //     this.canvasDiv = parentDiv;
    //     //     this.canvasDiv.appendChild(this.canvas);
    //     // }


    // }
}