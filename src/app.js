const path = require('path')
const express = require('express')
const geocode =require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')



//Setup Express
const app = express()

// const declares
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = '3000'
const name = 'Nathon Reed'

// app.set settings
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// app.use setting 
app.use(express.static(publicDirectoryPath))


// route home index
app.get('', (req, res) => {
    res.render('index', {
    title: 'Home: Weather App',
    name: name
    })
   })

// route about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: name
    })
})

//route help
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: name
    })
})

// route weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.render('error1', {
            errorText: 'No Address Given',
            name: name
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {
        
    }) => {
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

// 404 error article not found
app.get('/help/*', (req, res) =>{
    res.render('404', {
        errorText: 'The Article you are looking for is not found',
        title: '404:Article Not Found',
        name: name
    })
})
// 404 error page setup    
app.get('*', (req, res) =>{
    res.render('404', {
        errorText: 'The Page you are looking for is not found',
        title: '404: Page not Found',
        name: name
    })
})
app.listen(port, () => {
    console.log('Server is up and running on port ' + port + '.' )
})