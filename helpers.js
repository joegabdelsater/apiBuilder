const fs = require('fs');

module.exports.createFolder = createFolder = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

module.exports.camelize = camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

module.exports.createFile = createFile = (dir, file, content) => {
    fs.writeFile(dir + `/${camelize(file)}.js`, content, function(err) {
        if (err) throw err;
        console.log('Saved!');
    })
}

module.exports.getJson = getJson = (file) => {
    const rawPostman = fs.readFileSync('postman.json');
    const postman = JSON.parse(rawPostman);
    const { item } = postman;

    return item;
}