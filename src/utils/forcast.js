request = require('request')
const forcast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7369ce3309fd7f5ae99abe368e7f5331&query=' + latitude + ',' + longtitude +
        '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect weather therweather service')
        } else if (body.error) {
            callback('Unable to find the location, try another one')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. The temperature is ' + body.current.temperature +
                '. It\'s feel like ' + body.current.feelslike + '. The humidity is ' + body.current.humidity + '%.'
            )
        }
    })
}

module.exports = forcast