const path = require('path')
const express = require('express')
const hbs = require('hbs', )
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static derectory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bret Wright'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bret Wright'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'We would love to help you!',
        title: 'Help',
        name: 'Bret Wright'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Help",
        name: "Bret Wright",
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Bret Wright",
        errorMessage: 'Page not found',
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port + '.')
})