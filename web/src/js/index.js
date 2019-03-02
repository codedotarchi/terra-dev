// Testing file
// import * as test from './test.js';

// Import UI
import * as nav from './ui.navbar.js';
import * as notify from './ui.notify.js';
import * as splash from './ui.splash.js';
import * as tabs from './ui.tabs.js';

// Import Tools
import * as dc from './tools.dataCollection.js';
import * as nt from './tools.nodeTraining.js';
import * as te from './tools.tensorEditor.js';
import * as ig from './tools.inferenceGraph.js';
import * as mv from './tools.modelViewer.js';

// Terra Namespace
window.terra = {};

// window.terra.run = test.run;

// Run Setup on Document Load
// if (window.isTesting) {
//     window.mainFunc(window.terra);
// } else {
// document.onload = () =>
setup(window.terra);
// }


function setup(terra) {
    // Setup Page Structure
    terra.body = document.getElementById('terra-body');
    terra.container = {
        nav: document.getElementById('terra-nav-container'),
        notify: document.getElementById('terra-notify-container'),
        splash: document.getElementById('terra-splash-container'),
        app: {
            tabs: document.getElementById('terra-app-tabs-container'),
            tools: document.getElementById('terra-app-tools-container')
        },
        modal: document.getElementById('terra-modal-container')
    };

    // TODO Setup Terra Navbar (curently in proto in index.html)
    // terra.nav = new nav.NavBar(terra.container.nav, {
    //     // params: 'enter params here'
    // });

    // TODO Setup Notifications
    terra.notify = new notify.NotificationBar(terra.container.notify, {
        // params: 'enter params here'
    });

    //Test Notification Bar
    let testError = new notify.Error('Ok we have a serious problem here...', terra.notify, true);
    let testAlert = new notify.Alert('This one is not so bad, but still good to know', terra.notify, true);
    let testLog = new notify.Log('This is just general nonsense....', terra.notify, true);


    // TODO Setup Splash Page
    terra.splash = new splash.SplashPage(terra.container.splash, {
        // params: 'enter params here'
    });

    // Setup Application
    terra.app = {
        // TODO Setup Main  Application Tabs
        tabs: tabs.setup(tabs.tabLinkContainerID, tabs.tabContentContainerID, tabs.tabs, tabs.defaultActiveTab),//new tabs.TabBar(terra.container.app.tabs, {
        // params: 'enter params here'
        // }),

        //Temp setup


        tools: {

            // TODO Setup Data Collection
            dc: new dc.DataCollectionTool(terra.container.app.tools, {
                // params: 'enter params here'
            }),

            // TODO Setup Node Training
            nt: new nt.NodeTrainingTool(terra.container.app.tools, {
                // params: 'enter params here'
            }),

            // TODO Setup Tensor Editor
            te: new te.TensorEditorTool(/*terra.container.app.tools*/ document.getElementById('p2d-canvas-container'), {
                // params: 'enter params here'
            }),

            // TODO Setup Inference Graph
            ig: new ig.InferenceGraphTool(terra.container.app.tools, {
                // params: 'enter params here'
            }),

            // TODO Setup Model Viewer
            mv: new mv.ModelViewerTool(terra.container.app.tools, {
                // params: 'enter params here'
            })
        }

    };
    // document.getElementsByClassName();
    // Setup More Stuff Here
}
