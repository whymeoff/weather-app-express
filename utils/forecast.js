const request = require('request');

const forecast = (lat, long, callback) => {
    const url =`https://api.darksky.net/forecast/dfb1959ef03093d51e4ceb772c6bb154/${lat},${long}?units=si&lang=en&limit=1`;

    request.get({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error){
            callback('Unable to find this location.', undefined);
        } else {
            callback('', {
                timezone: body.timezone,
                maxTemp: body.daily.data[0].temperatureHigh, 
                temp: body.currently.temperature, 
                precipProbability: body.daily.data[0].precipProbability
            });
        }
    })
}

module.exports = forecast;