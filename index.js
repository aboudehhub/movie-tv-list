const express = require('express');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { response } = require('express');
require('dotenv').config();

function readJSON(path){
    return JSON.parse(fs.readFileSync(path));
}

const app = express();
const networkInterface = os.networkInterfaces();
const ip = networkInterface['Wi-Fi'][1].address;

const img = "https://image.tmdb.org/t/p/w500/";
const apiKey = process.env.API_KEY;
const api = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

let jdata = readJSON('./data.json')

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index', {data: jdata});
});
app.listen(PORT, () => console.log(`we on bois at http://${ip}:${PORT}/`));


