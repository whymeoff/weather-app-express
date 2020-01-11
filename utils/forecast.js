const request = require('request');

const forecast = (lat, long) => {
    const url =`https://api.darksky.net/forecast/dfb1959ef03093d51e4ceb772c6bb154/${lat},${long}?units=si&lang=en&limit=1`;

    return new Promise((resolve, reject) => {
        request.get({ url, json: true }, (err, { body }) => {
            if (err) {
                return reject('Unable to connect to weather service!')
            } else if (body.error) {
                return reject('Unable to find this location!')
            } else {
                resolve({
                    timezone: body.timezone,
                    maxTemp: body.daily.data[0].temperatureHigh,
                    lowTemp: body.daily.data[0].temperatureLow, 
                    temp: body.currently.temperature, 
                    precipProbability: body.daily.data[0].precipProbability                    
                })
            }
        })
    })
}

module.exports = forecast;