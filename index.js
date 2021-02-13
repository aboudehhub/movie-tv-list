const express = require('express');
const path = require('path');
const os = require('os');
const { response } = require('express');
require('dotenv').config();

const app = express();
const networkInterface = os.networkInterfaces();
const ip = networkInterface['Wi-Fi'][1].address;

const img = "https://image.tmdb.org/t/p/w500/";
const apiKey = process.env.API_KEY;
const api = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/api', (request, response) => {
    console.log(request.body);
    response.end();
});

app.listen(PORT, () => console.log(`we on bois at http://${ip}:${PORT}/`));
