const http = require('http');
const fs = require('fs');
const {camelize, createFile, createFolder, getJson } = require('./helpers')
const { mainDir, pageImports} = require('./constants');

//import and read json file
const item = getJson('postman.json')
//create the main directory on the root level
createFolder('./services')

const paramSupport = ["POST", "UPDATE"];
const build = (dir, outerLayer) => {
    createFolder(dir);
        let pageContent = ``;

        outerLayer.item.map(innerLayer => {
            if(typeof innerLayer.item === "undefined"){
                const {name, request} = innerLayer;
                const functionName = camelize(name);
                const endpoint = request.url.path.join('/');
                let params = [];
                let paramString = '';
                let shouldHaveParams = ``;

                //get the parameters
                if(typeof request.body !== undefined) {
                    request?.body?.formdata.map(param => {
                         params.push(param.key);
                    })
                    paramString = params.join(', ');
                    if(paramSupport.includes(request.method)) {
                        shouldHaveParams = ` ,{ ${paramString} }`
                    }
                }

                const content = 
`
export const ${functionName} = (${paramString}) => {
    return axios.${request.method.toLowerCase()}(URL + '/${endpoint}'${shouldHaveParams});
}             
`
                pageContent += content
            }else {
                build(dir + `/${innerLayer.name.toLowerCase()}`,innerLayer)
            }
        })
        if(pageContent !== ``){
            createFile(dir ,outerLayer.name, pageImports + pageContent)
        }
}
//loops over the outer layer of the collectinon

const buildItem = (item) => {
    item.forEach((outerLayer) => {
        const dir = `${mainDir}/${outerLayer.name.toLowerCase()}`;
        //check if the inner layer is a folder or if the layer
        if (typeof outerLayer.item !== 'undefined') {
            build(dir, outerLayer);
        } 
    })
}

const addCommand = () => {
    var data = fs.readFileSync('../package.json', 'utf-8');

    const commad = `
    "scripts": {
        "yllw-build" : "node ./node_modules/index.js",
    `;
    var newValue = data.replace(`"scripts": {`, command);
  
    fs.writeFileSync('../package.json', newValue, 'utf-8');
  
    console.log('readFileSync complete');
}

buildItem(item)
