if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const fetch =require('node-fetch');
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Rishabh'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Rishabh'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Rishabh'
  })
})



  app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'must provide an address!' })
    }
    
    geocode(req.query.address, (error, { latitude, longitude,position}={}) => {
      if (error) {
        return res.send({ error: error });
        //return console.log('error', error);
      }
        
        forecast(latitude,longitude, (error, fdata) => {
          if (error) {
           return  res.send({ error: error });
            //return console.log(error);
          }
           
            res.send({
                forecast: fdata,
                address:position,
                location: req.query.address
                
            })
        })


    })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'rishabh',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', 
    {title: '404',
    name: 'rishabh',
    errorMessage: 'Help article not found.'}
   
  )
})

app.listen(port, () => console.log(`Server is up on port ${port}.`))