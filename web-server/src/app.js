const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Matheus Silva',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Matheus Silva',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpfull text',
    title: 'Help',
    name: 'Matheus Silva',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided',
    })
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      })
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        })
      }

      res.send({
        location: location,
        forecast: forecastData,
        address: req.query.address,
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Matheus Silva',
    errorMessage: 'Help article not found.',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Matheus Silva',
    errorMessage: 'Page not found.',
  })
})

app.listen(port, () => {
  console.log('Server is up on port 3000.')
})
