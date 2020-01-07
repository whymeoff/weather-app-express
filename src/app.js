const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../utils/forecast');
const geoLocation = require('../utils/geoLocation');

const app = express();

// Define path for express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mark'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mark'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: 'Some message here. Hello!',
        name: 'Mark'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoLocation(req.query.address, (err, {lat, long} = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }
        
        forecast(lat, long, (err, data) => {
            if (err) {
                return res.send({
                    error: err
                })
            }

            res.send(data);
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found!',
        title: '404',
        name: 'Mark'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found!',
        title: '404',
        name: 'Mark'
    })
})

app.listen(3000, () => {
    console.log('Server is up!');
})