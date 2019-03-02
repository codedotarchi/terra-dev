/* Functions for the notification module */
/* Noah Pitts -- 2/20/2019 */

import * as utils from './utils.js';

export class NotificationBar {
    constructor(container, params) {

        // Container Arg
        if (!container) container = document.getElementsByTagName('body')[0];
        this.container = container;
        this.container.notificationBar = this;

        // Params Arg
        this.params = {
            // Enter Default Params Here
            prefix: 'main'
        };

        // Update Params
        if (params) {
            for (const key of Object.keys(params)) {
                this.params.key = params[key];
            }
        }

        // Create List Containers
        this.errorList = utils.addChildToParent('ul', this.container, {
            id: params.prefix + '-notification-error-list',
            className: 'notification-error-list active'
        });

        this.alertList = utils.addChildToParent('ul', this.container, {
            id: params.prefix + '-notification-alert-list',
            className: 'notification-alert-list active'
        });

        this.logList = utils.addChildToParent('ul', this.container, {
            id: params.prefix + '-notification-log-list',
            className: 'notification-log-list  active'
        });

        this.errors = new Array();
        this.alerts = new Array();
        this.logs = new Array();
    }

    // Show
    showAll() {
        // showErrorList();
        // showAlertList();
        // showLogList();
    }

    showErrorList() {
        this.errorList.className = this.params.prefix + 'notification-error-list active';
    }

    showAlertList() {
        this.alertList.className = this.params.prefix + 'notification-alert-list active';
    }

    showLogList() {
        this.logList.className = this.params.prefix + 'notification-log-list active';
    }

    // Hide
    hideAll() {
        hideErrorList();
        hideAlertList();
        hideLogList();
    }

    hideErrorList() {
        this.errorList.className = this.params.prefix + 'notification-error-list';
    }

    hideAlertList() {
        this.alertList.className = this.params.prefix + 'notification-alert-list';
    }

    hideLogList() {
        this.logList.className = this.params.prefix + 'notification-log-list';
    }

    // Clear
    clearAll() {
        clearErrorList();
        clearAlertList();
        clearLogList();
    }

    clearErrorList() {
        for (let error of this.errors) {
            error.remove();
        }
        this.errors = new Array();
    }

    clearAlertList() {
        for (let alert of this.alerts) {
            alert.remove();
        }
        this.alerts = new Array();
    }

    clearLogList() {
        for (let log of this.logs) {
            log.remove();
        }
        this.logs = new Array();
    }
}

export class Notification {
    constructor(message, notificationBar) {
        if (!message) message = 'Default Message';
        if (!notificationBar) notificationBar = new NotificationBar();
        this.notificationBar = notificationBar;
        this.message = message;
    }

    setMessage(message) {
        this.message = message;
        this.paragraph.textContent = message;
    }

    printMessage() {
        console.log(this.message);
    }
}

export class Error extends Notification {
    constructor(message, notificationBar, notify) {
        super(message, notificationBar);

        if (notify) {
            // List Item
            this.item = utils.addChildToParent('li', notificationBar.errorList, {
                className: 'notification error'
            });

            // Paragram
            this.paragraph = utils.addChildToParent('p', this.item, {
                className: 'notification error',
                textContent: this.message,
            });

            // Close
            this.close = utils.addChildToParent('a', this.item, {
                item: this.item,
                className: 'notification error',
                textContent: 'remove',
                onclick: () => { notificationBar.errorList.removeChild(this.item); }
            });
        }

        this.setMessage('ERROR: ' + this.message);
        // this.print();
    }
}

export class Alert extends Notification {
    constructor(message, notificationBar, notify) {
        super(message, notificationBar);

        if (notify) {
            // List Item
            this.item = utils.addChildToParent('li', notificationBar.alertList, {
                className: 'notification alert'
            });

            // Paragram
            this.paragraph = utils.addChildToParent('p', this.item, {
                className: 'notification alert',
                textContent: this.message,
            });

            // Close
            this.close = utils.addChildToParent('a', this.item, {
                item: this.item,
                className: 'notification alert',
                textContent: 'remove',
                onclick: () => { notificationBar.alertList.removeChild(this.item); }
            });
        }

        this.setMessage('ERROR: ' + this.message);
        // this.print();
    }

}

export class Log extends Notification {
    constructor(message, notificationBar, notify) {
        super(message, notificationBar);

        if (notify) {
            // List Item
            this.item = utils.addChildToParent('li', notificationBar.logList, {
                className: 'notification log'
            });

            // Paragram
            this.paragraph = utils.addChildToParent('p', this.item, {
                className: 'notification log',
                textContent: this.message,
            });

            // Close
            this.close = utils.addChildToParent('a', this.item, {
                item: this.item,
                className: 'notification log',
                textContent: 'remove',
                onclick: () => { notificationBar.logList.removeChild(this.item); }
            });
        }

        this.setMessage('Log: ' + this.message);
        // this.print();
    }
}