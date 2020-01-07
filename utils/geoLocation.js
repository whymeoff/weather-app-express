const request = require('request');

const geoLocation = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZW1hcmN1cyIsImEiOiJjazUxY2NobGcwYTh1M29wbHUwdWFyNjEzIn0.S_hGqq8gbljHN4duIx1-eA`
    request.get({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to geolocation services!', undefined);
        } else if (body.features.length === 0) {
            callback('Can`t find this place!', undefined);
        } else {
            callback('', { 
                lat: body.features[0].center[1], 
                long: body.features[0].center[0] 
            })
        }
    });
}

module.exports = geoLocation;