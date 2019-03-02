import * as tf from '@tensorflow/tfjs';

// Set to ture when testing
window.isTesting = true;

// Main Function to run on load
window.mainFunc = (app) => {
    app.divisions = 8;
    app.canvas = document.getElementById('drawingboard');
    app.grid = new Grid(app.divisions, app.canvas);

    // fetch('models/yosemite_8x8_2/model.json')
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (myJson) {
    //         console.log(JSON.stringify(myJson));
    //     });

    app.model = tf.loadLayersModel('facade-gen/model.json');



    console.log('model -loaded');
};

window.loadmodel = (app) => {
    // const jsonUpload = document.getElementById('json-upload');
    // const weightsUpload = document.getElementById('weights-upload');
};

window.runmodel = (app) => {
    app.img = document.createElement('img');
    app.img.src = app.canvas.toDataURL('image/jpeg', 0.95);
    app.result = predict(app.model, app.canvas);
};

function preprocess(imgData) {

    return tf.tidy(() => {

        //convert to a tensor 
        const tensor = tf.browser.fromPixels(imgData).toFloat();

        //resize 
        const resized = tf.image.resizeBilinear(tensor, [256, 256]);

        //normalize 
        const offset = tf.scalar(127.5);
        const normalized = resized.div(offset).sub(tf.scalar(1.0));

        //We add a dimension to get a batch shape 
        const batched = normalized.expandDims(0);
        return batched;

    });

}

function postprocess(tensor, w, h) {

    return tf.tidy(() => {

        //normalization factor  
        const scale = tf.scalar(0.5);

        //unnormalize and sqeeze 
        const squeezed = tensor.squeeze().mul(scale).add(scale);

        //resize to canvas size 
        const resized = tf.image.resizeBilinear(squeezed, [w, h]);

        return resized;
    });

}

function predict(model, imgData) {

    return tf.tidy(() => {

        //get the prediction
        const gImg = model.predict(preprocess(imgData));

        //post process
        const postImg = postprocess(gImg, 512, 512);
        return postImg;

    });

}

// Drawing Grid
class Grid {
    constructor(divisions, canvas) {
        this.divisions = divisions;
        this.cells = new Array(divisions * divisions);
        this.canvas = canvas;
        this.canvas.gridObj = this;
        this.context = canvas.getContext('2d');

        this.canvas.width = 512;
        this.canvas.height = 512;

        this.cellWidth = this.canvas.width / this.divisions;
        this.cellHeight = this.canvas.height / this.divisions;

        this.colWhite = { val: true, r: 255, g: 255, b: 255 };
        this.colBlack = { val: false, r: 0, g: 0, b: 0 };

        this.clearAllCells(this.colWhite);
        this.drawAllCells();

        this.canvas.onclick = function (e) {
            // Get the mouse coords
            let coord = {
                x: e.pageX - this.offsetLeft,
                y: e.pageY - this.offsetTop
            };
            // console.log(coord);

            // Get cell position, flip the color, and set new value
            let pos = this.gridObj.getCellPosition(coord);
            // console.log(pos);

            let col = this.gridObj.flipColor(this.gridObj.getCellCol(pos));
            // console.log(col);

            this.gridObj.setCellValue(pos, col);

            // Draw the new cell on the canvas
            this.gridObj.drawCell(this.gridObj.getCellIndex(pos));

            // callback(this.getPixelData());
        };
    }

    // Flips color between black and white
    flipColor(col) {
        if (col.val) {
            return this.colBlack;
        } else {
            return this.colWhite;
        }
    }

    getCellRect(pos) {
        let xPos = Math.floor(this.cellWidth * pos.x);
        let yPos = Math.floor(this.cellHeight * pos.y);

        return { x: xPos, y: yPos, w: this.cellWidth, h: this.cellHeight };
    }

    getCellPosition(coord, from) {
        let xPos, yPos;
        if (from === 'index') {
            let index = coord;
            xPos = index % this.divisions;
            yPos = Math.floor(index / this.divisions);
        } else {
            xPos = Math.floor(this.divisions * coord.x / this.canvas.width);
            yPos = Math.floor(this.divisions * coord.y / this.canvas.height);
        }

        return { x: xPos, y: yPos };

    }

    getCellIndex(pos) {
        let index = pos.y * this.divisions + pos.x;
        return index;

    }

    getCellCol(pos) {
        return this.cells[this.getCellIndex(pos)];
    }

    // Set a RGB Val = {r, g, b}
    setCellValue(pos, col) {
        this.cells[this.getCellIndex(pos)] = col;
    }

    // Clear out all cell values
    clearAllCells(col) {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = col;
        }
    }

    // Draws the cell to the canvas based on index
    drawCell(index) {
        let col = this.cells[index];
        this.context.fillStyle = 'rgb(' + col.r + ',' + col.g + ',' + col.b + ')';

        let rect = this.getCellRect(this.getCellPosition(index, 'index'));
        this.context.fillRect(rect.x, rect.y, rect.w, rect.h);
    }

    // Draws/Redraws all cells
    drawAllCells() {
        for (let i = 0; i < this.cells.length; i++) {
            this.drawCell(i);
        }
    }

    // TODO
    downloadGrid() {
        let grid = {};
        grid.divisions = this.divisions;
    }

    // TODO
    uploadGrid(divisions, values) {

    }

}