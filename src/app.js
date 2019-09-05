const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'seeq-n-dstroi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'seeq-n-dstroi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'seeq-n-dstroi',
        message: 'Enter a location in the search bar to get the weather report.'
    })
})

app.get('/weather', (req, res) => {
    //If there's not a query with the key "address" it shows an error message
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid location.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

///help/*: match anything else after /help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'seeq-n-dstroi',
        message: 'Help article not found.'
    })
})

//*: match anything else that hasn't been matched so far
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'seeq-n-dstroi',
        message: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})