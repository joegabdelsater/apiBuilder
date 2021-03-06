const http = require('http');
const fs = require('fs');
const { camelize, createFile, createFolder, getJson } = require('./helpers')
const { mainDir, pageImports, urlPageContent } = require('./constants');

//import and read json file
const item = getJson('postman.json')


const paramSupport = ["POST", "UPDATE"];
const build = (dir, outerLayer) => {
    createFolder(dir);
    let pageContent = ``;

    outerLayer.item.map(innerLayer => {
        if (typeof innerLayer.item === "undefined") {
            const { name, request } = innerLayer;
            const functionName = camelize(name);

            const endpoint = request.url?.path?.join('/');
            let params = [];
            let paramString = '';
            let shouldHaveParams = ``;

            //get the parameters
            if (typeof request.body !== undefined) {

                if (request?.body?.formdata) {
                    request?.body?.formdata?.map(param => {
                        params.push(param.key);
                    })
                } else {
                    if (request?.body?.raw) {
                        const raw = JSON.parse(request?.body?.raw);
                        const rawKeys = Object.keys(raw);

                        rawKeys.forEach((key) => {
                            params.push(key)
                        })
                    }
                }
                paramString = params.join(', ');
                if (paramSupport.includes(request.method)) {
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
        } else {
            build(dir + `/${innerLayer.name.toLowerCase()}`, innerLayer)
        }
    })
    if (pageContent !== ``) {
        createFile(dir, outerLayer.name, pageImports + pageContent)
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

//create the main directory on the root level
createFolder(mainDir);
//create the url.js folder
createFile(mainDir, 'url', urlPageContent)
//build everything
buildItem(item);

