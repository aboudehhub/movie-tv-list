const express = require('express');
const path = require('path');
const os = require('os');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
require('dotenv').config();

// express consts
const app = express();
const networkInterface = os.networkInterfaces();
const ip = networkInterface['Wi-Fi'][1].address;
const PORT = process.env.PORT || 3000;

const apiKey = process.env.API_KEY;

// mongo consts
const Schema  = mongoose.Schema;
const mediaSchema = new Schema({
    title:  String, 
    type: String,
    show_status: { type: String, required: false },
    rating: String,
    img: String,
    status: String,
    ep_watched: Number,
    ep_total: Number,
    release_date: String,
    last_air_date: { type: String, required: false },
    start_date: { type: String, required: false },
    finish_date: { type: String, required: false},
    times_rewatched: { type: Number, default: 0 },
    ep_runtime: Number,
    genres: { type: String, required: false},
    tagline: {type: String, default: "none"}
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
    const sortParam = req.query.sort ? req.query.sort : 'name';
    const condition = req.query.cond ? {status: req.query.cond} : {};
    Media.find(condition).sort(sortParam).then((result) => res.render('index', {data: result}));
});

app.get('/addMedia', (req, res) => {
    res.render('add');
});

app.get('/tv/:id', (req, res) => {
    fetch(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${apiKey}`).then(result => result.json()).then(json => res.render('adding', {media: json}));
});

app.post('/addm', (req, res) => {
    let m = req.body;
    let utc = new Date().toJSON().slice(0,10);
    const media = new Media({
        title:  m.title, 
        type: "movie",
        show_status: m.status,
        rating: "-",
        img: m.poster_path,
        status: "watching",
        ep_watched: 0,
        ep_total: 1,
        release_date: m.release_date,
        start_date: utc,
        finish_date: "-",
        times_rewatched: 0,
        ep_runtime: m.runtime,
        tagline: m.tagline
    });
    media.save();
});
app.post('/addt', (req, res) => {
    let m = req.body;
    let utc = new Date().toJSON().slice(0,10);    
    const media = new Media({
        title:  m.name, 
        type: "tv",
        show_status: m.status,
        rating: "-",
        img: m.poster_path,
        status: "watching",
        ep_watched: 0,
        ep_total: m.episode_count,
        release_date: m.air_date,
        last_air_date: m.last_air_date,
        start_date: utc,
        times_rewatched: 0,
        ep_runtime: m.episode_run_time,
        tagline: m.tagline
    });
    media.save();
});

app.post('/addep', (req, res) => {
    let m = req.body;
    Media.find().then(result => {
        let media = result[m.indx];
        media.ep_watched += 1;
        if(media.ep_watched + 1 === media.ep_total){
            media.status = "completed";
            media.finish_date = new Date().toJSON().slice(0,10);
        }
        media.save();
    });
});

app.post('/chrate', (req, res) => {
    let m = req.body;
    Media.find().then(result => {
        let media = result[m.indx];
        media.rating = m.rating;
        media.save();
    });
});
