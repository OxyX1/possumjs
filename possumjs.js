/* 

possumjs is a javascript plugin that helps import objects like example:

function imports() {
    import("objects/object1.js");
}

what this does is the plugin will detect the function imports() and then run the import
function. This is a lightweight program so refrences wont work for importing.

thats basically the whole point of this plugin there might not be anything else added
to this plugin.

*/

const possumjs = () => {
    window.imports = function(file) {
        const filePath = file.replace(/\./g, '/'); // Convert "js.testing" to "js/testing"
        
        return import(`./${filePath}.js`) // Ensure relative import path
            .then(module => {
                console.log(`Successfully imported: ${filePath}`);
                return module; // Return the module so the caller can use it
            })
            .catch(error => {
                console.error(`Failed to import ${filePath}:`, error);
            });
    };
};



/*

example of file explore:

objects/
    object1.js
    object2.js
    object3.js
script.js
index.html

*/



/*

example usage:

    possumjs();

    imports('objects.object1');


*/