const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8310101f376c48d966426c10ba6a75ab/' + latitude + ',' + longitude

    request({ url: url, json: true}, (error, { body }) => {
      if (error) {
          callback('Unable to connect to Weather Serivces!', undefined)
      } else if (body.error) {
          callback('Unable to find location', undefined)
      } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a '
        + body.currently.precipProbability + '% chance of rain')
      } 
    })
}

module.exports = forecast