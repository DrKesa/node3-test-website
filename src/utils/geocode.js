const request = require('request') //npm library

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2VzamEiLCJhIjoiY2s0OWw2MWNwMDZmbjNrcGU4NDl5MzV5diJ9.7EdlhCIN_v8UYmXi7038cw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location service', undefined)
        }else if(body.features.length === 0){
            callbac('Unable to find the location. Try another search', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = {
    geocode: geocode
}