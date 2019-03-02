// MODAL CLASS

export class Modal {

    constructor(parent) {
        // Use default Modal Container if none are supplied
        if (!parent) {
            parent = document.getElementById('app-modal-container');
            if (!parent) {
                parent = document.createElement('div');
                document.getElementsByTagName('body').appendChild(parent);
            }
        }

        // Attatch Modal Array to Parent
        this.parent = parent;
        if (!this.parent.modals) this.parent.modals = new Array();
        this.parent.modals.push(this);

        // Root Div of Modal
        this.root = document.createElement('div');
        this.root.className = 'app-modal';
        this.root.modal = this;
        this.parent.appendChild(this.root);

        // Content Div of Modal
        this.content = document.createElement('div');
        this.content.className = 'app-modal-content';
        this.root.appendChild(this.content);

        // Close Icon of Modal
        this.close = document.createElement('span');
        this.close.textContent = '&times;';
        this.close.className = 'app-modal-close';
        this.content.appendChild(this.close);

        // Header Div of Modal
        this.header = document.createElement('div');
        this.header.className = 'app-modal-header';
        this.content.appendChild(this.header);

        // Body Div of Modal
        this.body = document.createElement('div');
        this.body.className = 'app-modal-body';
        this.content.appendChild(this.body);

        // Footer Div of Modal
        this.footer = document.createElement('div');
        this.footer.className = 'app-modal-footer';
        this.content.appendChild(this.footer);
    }

    // Sets this modal active
    setActive() {
        this.root.className = 'app-modal';
    }

    // Sets this modal inactive
    setInactive() {
        this.root.className = 'app-modal active';
    }
}
