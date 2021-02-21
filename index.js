const express = require('express');
const path = require('path');
const os = require('os');
const mongoose = require('mongoose');
require('dotenv').config();

// express vars
const app = express();
const networkInterface = os.networkInterfaces();
const ip = networkInterface['Wi-Fi'][1].address;
const PORT = process.env.PORT || 3000;

// api vars
const img = "https://image.tmdb.org/t/p/w500/";
const apiKey = process.env.API_KEY;
const api = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

// mongo vars
const Schema  = mongoose.Schema;
const mediaSchema = new Schema({
    title:  String, 
    type: String,
    rating: Number,
    img: String,
    status: String,
    ep_watched: Number,
    ep_total: Number,
    release_date: { type: Date },
    start_date: { type: Date, default: Date.now, required: false },
    finish_date: { type: Date, required: false},
    times_rewatched: { type: Number, default: 0 },
    notes: {type: String, default: "none"}
});
const Media = mongoose.model('Media', mediaSchema);

// connect to db and start localhost
mongoose.connect('mongodb://localhost:27017/motvlist', {useNewUrlParser: true, useUnifiedTopology: true}).then(
    (result) => app.listen(PORT, (result) => console.log(`we on bois at http://${ip}:${PORT}/`))
);

// app.
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.use(express.json());

// render
app.get('/', (req, res) => {
    Media.find().then((result) => res.render('index', {data: result}));
});

app.get('/addMedia', (req, res) => {
    res.render('add')
});
