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
    rating: String,
    img: String,
    status: String,
    ep_watched: Number,
    ep_total: Number,
    release_date: String,
    start_date: { type: String, required: false },
    finish_date: { type: String, required: false},
    times_rewatched: { type: Number, default: 0 },
    notes: {type: String, default: "none"}
});
const Media = mongoose.model('Media', mediaSchema);

// connect to db and start localhost
mongoose.connect('mongodb://localhost:27017/motvlist', {useNewUrlParser: true, useUnifiedTopology: true}).then(
    result => app.listen(PORT, (result) => console.log(`we on bois at http://${ip}:${PORT}/`))
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
    res.render('add');
});

app.post('/addm', (req, res) => {
    var m = req.body;
    var utc = new Date().toJSON().slice(0,10);
    const media = new Media({
        title: m.title,
        type: "movie",
        rating: "-",
        img: m.poster_path,
        status: "watching",
        ep_watched: 0,
        ep_total: 1,
        release_date: m.release_date,
        start_date: utc,
        finish_date: utc,
        times_rewatched: 0,
        notes: "none"
    });
    media.save();
});
app.post('/addt', (req, res) => {
    var m = req.body;
    var utc = new Date().toJSON().slice(0,10);    
    const media = new Media({
        title: m.name,
        type: "tv",
        rating: "-",
        img: m.poster_path,
        status: "watching",
        ep_watched: 0,
        ep_total: 1,
        release_date: m.first_air_date,
        start_date: utc,
        finish_date: utc,
        times_rewatched: 0,
        notes: "none"
    });
    media.save();
});