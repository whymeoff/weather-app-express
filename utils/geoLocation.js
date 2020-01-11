const request = require('request');

const geoLocation = (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZW1hcmN1cyIsImEiOiJjazUxY2NobGcwYTh1M29wbHUwdWFyNjEzIn0.S_hGqq8gbljHN4duIx1-eA`

    return new Promise((resolve, reject) => {
        request.get({ url, json: true }, (err, { body }) => {
            if (err) {
                return reject('Unable to connect to geolocation servicec!')
            } else if (body.features.length === 0) {
                return reject('Can`t find this place')
            } else {
                resolve({
                    lat: body.features[0].center[1], 
                    long: body.features[0].center[0] 
                })
            }
        })
    })
}

module.exports = geoLocation;