
// TODO
export class TabBar {
    constructor(container, params) {

    }
}

// Container for the Tab Links
export let tabLinkContainerID = 'terra-app-tabs-container';
// Container for Tab Content
export let tabContentContainerID = 'terra-app-tools-container';
// Names of the Tabs
export let tabs = ['data collection', 'node training', 'image editor', 'inference graph', 'model viewer'];

export let defaultActiveTab = 'image editor';

// Setup the Main Tab Headers
export function setup(linkContainerID, contentContainerID, tabNames, defaultActiveTab) {
    let tabLinkContainer = document.getElementById(linkContainerID);
    let tabContentContainer = document.getElementById(contentContainerID);

    let linkWidth = 100.0 / tabNames.length;

    let tabs = [];
    for (let i = 0; i < tabNames.length; i++) {
        // Tab Links
        let tabLink = document.createElement('button');
        tabLink.className = 'main-tab-link';
        tabLink.id = 'main-tab-' + tabNames[i] + '-link';
        tabLink.style = 'width: ' + linkWidth + '%';
        tabLink.textContent = tabNames[i];
        tabLinkContainer.appendChild(tabLink);

        // Tab Contents

        // TODO: use this for auto generate on setup();
        // let tabContent = document.createElement('div');
        // tabContent.className = 'main-tab-content'
        // tabContent.id = 'main-tab-' + tabNames[i] + '-content';
        // tabContentContainer.appendChild(tabContent);

        // Use this for html prototype
        let tabContent = document.getElementById('main-tab-' + tabNames[i] + '-content');

        // Set Default Active Tabs
        if (tabNames[i] === defaultActiveTab) {
            tabLink.className = 'main-tab-link active';
            tabContent.className = 'main-tab-content active';
        }

        // Set onclick event handlers
        tabLink.onclick = setupOpenTab(tabLink.id, tabContent.id);

        // Add a tab return object
        tabs.push({ name: tabNames[i], link: tabLink, content: tabContent });
    }

    return tabs;
}


// Main function to attach as an event handler for tab headers
function setupOpenTab(tabLinkID, tabContentID) {

    return function (e) {
        // Get all the active tab containers and links
        let mainTabContainers = document.getElementsByClassName('main-tab-content active');
        let mainTabLinks = document.getElementsByClassName('main-tab-link active');

        // Set all active tab containers to inactive
        for (let i = 0; i < mainTabContainers.length; i++) {
            mainTabContainers[i].className = 'main-tab-content';
        }
        // Set all active tab links to inactive
        for (let i = 0; i < mainTabLinks.length; i++) {
            mainTabLinks[i].className = 'main-tab-link';
        }

        // Set the current tab container and link to display as active;
        document.getElementById(tabLinkID).className = 'main-tab-link active';
        document.getElementById(tabContentID).className = 'main-tab-content active';
    };
}

/* Example HTML setup

<!-- TABBAR -->
    <div class='main-tabbar'>
        <button onclick="openTab('main-tab-container', 'tab1')" class='main-tablink'>Tab 1</button>
        <button onclick="openTab('main-tab-container', 'tab2')" class='main-tablink'>Tab 2</button>
        <button onclick="openTab('main-tab-container', 'tab3')" class='main-tablink active'>Tab 3</button>
        <button onclick="openTab('main-tab-container', 'tab4')" class='main-tablink'>Tab 4</button>
        <button onclick="openTab('main-tab-container', 'tab5')" class='main-tablink'>Tab 5</button>
    </div>

<!-- TAB CONTAINERS -->
    <div id='tab1' class='main-tab-container'>
        <p>Tab 1 Content Here</p>
    </div>

    <div id='tab2' class='main-tab-container'>
        <p>Tab 2 Content Here</p>
    </div>

    <div id='tab3' class='main-tab-container'>
        <p>Tab 3 Content Here</p>
    </div>

    <div id='tab4' class='main-tab-container'>
        <p>Tab 4 Content Here</p>
    </div>

    <div id='tab5' class='main-tab-container'>
        <p>Tab 5 Content Here</p>
    </div>

*/