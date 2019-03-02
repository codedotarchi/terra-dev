
// var colorBar = document.getElementById('p2d-ui-toolbar-color');
// var activeCanvas = documnet.getElementsByClassName('p2d-canvas active')
// import iro from '@jaames/iro';

// Generic Div Container
export class DivContainer {
    // TODO: used for inheriting 
    constructor(parent, id, className, contents) {

    }
}

// Class for Color Button Bar
export class ColorBar {
    constructor(parent, id, colorButtons) {
        if (!id) id = 'p2d-ui-toolbar-color';
        if (!colorButtons) colorButtons = new Array();

        this.parent = parent;
        this.id = id;
        this.colorButtons = colorButtons;

        this.container = document.createElement('div');
        this.container.className = 'p2d-ui-toolbar-side';
        this.parent.container.appendChild(this.container);
    }

    // Remove all ColorButtons from the ColorBar
    removeAll() {

    }

    addBreak() {
        // <!-- Blank -->
        // <a class='p2d-ui-tool-blank-vert'></a>

        let breakAnchor = document.createElement('a');
        breakAnchor.className = 'p2d-ui-tool-blank-vert';
        this.container.appendChild(breakAnchor);
    }

    getContent() {
        return this.colorButtons;
    }
}

// TODO redo this setup function
export function setupDefaultColorBar(parentDiv) {
    // TODO: temporary until higher level UI Div Container are worked out
    let dummyDivContainer = {};
    dummyDivContainer.container = parentDiv;

    let defaultColorBar = new ColorBar(dummyDivContainer);
    defaultColorBar.addBreak();

    let defaultColors = ['white', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow', 'black'];
    for (let color of defaultColors) {
        let newColorButton = new ColorButton(color);
        if (color === 'cyan') newColorButton.setActive();
        newColorButton.appendTo(defaultColorBar);
    }
}

// Class for the Color Button
export class ColorButton {
    constructor(color, iconType) {
        if (!color) color = '#1EB4F0';
        if (!iconType) iconType = 'fas fa-stop';

        this.parent = false;
        this.color = color;
        this.iconType = iconType;

        // HTML Element
        // ------------
        // <a class='p2d-color-btn' style='color: red'>
        //     <i class="fas fa-stop"></i>
        // </a>

        // Build Anchor
        this.anchor = document.createElement('a');
        this.anchor.className = 'p2d-color-btn';
        this.anchor.style.color = color;
        this.anchor.colorButton = this;

        // On Click Event Listner for Anchor
        this.anchor.onclick = function () {
            // Set Canvas Color
            let curCanvas = document.getElementsByClassName('p2d-canvas active')[0];
            curCanvas.painter2d.setColor(this.colorButton.color);

            // Deactivate active color buttons in Parent Bar
            // let activeColorButtons = this.colorButton.parent.getContent();

            let activeColorButtons = document.getElementsByClassName('p2d-color-btn active');
            for (let activeColorButton of activeColorButtons) {
                activeColorButton.className = 'p2d-color-btn';
            }

            this.className = 'p2d-color-btn active';
        };

        // Build Icon
        this.icon = document.createElement('i');
        this.icon.className = this.iconType;

        // Add to Parent
        this.anchor.appendChild(this.icon);
    }

    // Appends the Color Button to a parent Div Container Class
    appendTo(divContainer) {
        this.parent = divContainer;
        this.parent.container.appendChild(this.anchor);
    }

    // Returns a duplicate of the Color Button to a Div Container Class
    copy() {
        return new ColorButton(this.color, this.iconType);
    }

    // Duplicates the Color Button to a Div Container Class
    copyTo(divContainer) {
        this.copy().appendTo(divContainer);
    }

    // Removes the Button from the current Div Container Class
    remove() {
        if (this.parent) {
            this.parent.container.removeChild(this);
            if (this.parent.contents) {
                let index = this.parent.contents.indexOf(this);
                this.parent.contents.splice(index, 1);
            }
        }
    }

    // Sets the color of the Color Button
    setColor(color) {
        this.color = color;
        this.anchor.style.color = color;
    }

    // Sets the icon type of the Button;
    setIcon(iconType) {
        this.iconType = iconType;
        this.icon.className = this.iconType;
    }

    // Sets the Button Active
    setActive() {
        this.anchor.className = 'p2d-color-btn active';
    }

    // Sets the Button Inactive
    setInactive() {
        this.anchor.className = 'p2d-color-btn';
    }

}


// Color Picker
import iro from '@jaames/iro'; // https://iro.js.org/
import * as modal from './ui.modal.js';

export class ColorPicker {
    constructor(button) {

        // Construct a new Modal for the ColorPicker
        this.modal = new modal.Modal();

        let options = {
            width: 320,                     // Total width of the control UI.
            color: '#ffffff',               // The initial color value.
            borderWidth: 0,                 // Width of the border around the controls.
            borderColor: '#ffffff',         // Color of the border.
            padding: 6,                     // Padding around the control handles.
            handleRadius: 8,                // Radius of the control handles.
            handleSvg: null,                // Custom handle SVG.
            handleOrigin: { x: 0, y: 0 },   // Custom handle origin point
            wheelLightness: true,           // If set to false, the color wheel will not fade to black when the lightness decreases.
            sliderHeight: undefined,        // Slider control height. By default this will be calculated automatically
            sliderMargin: 12,               // Distance between the wheel and the slider controls.
            display: 'block',               // CSS display value for the color picker root element.
            layout: null                    // Used for Custom Layouts - https://iro.js.org/guide.html#custom-layouts
        };
        this.colorPicker = new iro.ColorPicker(this.modal.body, options);

    }
}