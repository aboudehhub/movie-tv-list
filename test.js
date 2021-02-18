const { compile } = require('ejs');
const fs = require('fs');
function readJSON(path){
    return JSON.parse(fs.readFileSync(path));
}
const a = readJSON('./data.json')

console.log(a);