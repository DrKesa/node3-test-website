const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/d0780d435391c1631590f570fc46ef3c/' + lat + ',' +long

    // request({ url, json: true }, (error, response) => {
        request({ url, json: true }, (error, { body }) => {    
        if(error) {
            callback('Unable to connect to location service', undefined)
        }else if(body.error){
            callbac('Coordinate error. Try another search', undefined)
        }
        else{
            callback(undefined, 
                'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            )
        }
    })
}

module.exports = {
    forecast: forecast
}