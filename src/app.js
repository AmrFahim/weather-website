const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

// Define path for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amr Fahim'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amr Fahim'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the Help page',
        name: 'Amr Fahim'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'

        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longtitude, location } = {}) => {
        if (error)
            return res.send({ error })


        forcast(latitude, longtitude, (error, forcast) => {
            if (error)
                return res.send({ error })

            res.send({
                forcast,
                location,
                address
            })
        })

    })

})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amr Fahim',
        errorMessage: 'This Help artical not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amr Fahim',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000 ')
})