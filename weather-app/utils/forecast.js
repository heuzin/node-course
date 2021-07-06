const request = require('postman-request')

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=88b0d8ddd8621c7c2e94328be2e40142&query=${lat},${long}`

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!')
    } else if (response.body.error) {
      callback('Unable to find location')
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`
      )
    }
  })
}

module.exports = forecast
