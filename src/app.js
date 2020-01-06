const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello express!');
})

app.get('/help', (req, res) => {
    res.send('Some help page!');
})

app.get('/about', (req, res) => {
    res.send('Some about page!');
})

app.get('/weather', (req, res) => {
    res.send('Some weather page!');
})

app.listen(3000, () => {
    console.log('Server is up!');
})