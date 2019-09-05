const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3d7c55c8ae541521cf946dbd09bd2fb2/' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!")
        } else if (body.error) {
            callback("Unable to find location")
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. It feels like it is " + body.currently.apparentTemperature + ". There is a " + body.currently.precipProbability + "% chance of rain. The current wind speed is " + body.currently.windSpeed + "mph. The high for the day is " + body.daily.data[0].temperatureHigh + " degrees. The low for the day is " + body.daily.data[0].temperatureLow + " degrees.");
        }
    })
}
module.exports = forecast;