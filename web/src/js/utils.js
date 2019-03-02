
// Quick add of a child html element (with params) to a parent html element
export function addChildToParent(childTag, parent, params) {
    // Create a new element
    let element = document.createElement(childTag);

    // Set Params 
    if (params) {
        for (let key of Object.keys(params)) {
            element[key] = params[key];
        }
    }

    // Add the CHile to the Parent and return new Child;
    parent.appendChild(element);
    return element;
}