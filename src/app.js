const path = require('path')
const express = require('express')
const https = require('https')
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const pathPub = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // link folder templates to views
hbs.registerPartials(partialsPath)

// Setup static directory to serve

app.use(express.static(pathPub))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'TMD'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'TMD'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is help.',
        title: 'ช่วยเหลือ',
        name: 'TMD'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        
        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    // const url = 'https://api.darksky.net/forecast/d0780d435391c1631590f570fc46ef3c/40,-70'

    // const request = https.request(url, (response) => {
    //     let data = ''

    //     response.on('data', (chunk) => {
    //         data = data + chunk.toString()
    //     })

    //     response.on('end', () => {
    //         const body = JSON.parse(data)
    //         res.send(body)
    //     })
    // })

    // request.on('error', (error) => {
    //     res.send('An error', error)
    // })

    // request.end()
})

app.get('/forecast', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    res.send({
        forecast: 'Rain',
        address: req.query.address
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'TMD',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'TMD',
        error: 'My 404 page.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})