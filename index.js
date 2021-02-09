const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const img = "https://image.tmdb.org/t/p/w500/";
const api_key = process.env.API_KEY;
const api = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`we on bois at ${PORT}`));
