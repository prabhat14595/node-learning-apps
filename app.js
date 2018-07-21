const express = require('express')
var bodyParser = require('body-parser')
var app = express()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const request = require('request');

var hbs = require('hbs')
hbs.registerPartials(__dirname+'/views/particle'); 
app.set('view engine', 'hbs');

// respond with "hello world" when a GET request is made to the homepage

app.get('/', (req, res) => {
  res.render('home.hbs')
});


app.post('/',urlencodedParser, function (req, res) {
  const apiKey='fb873262914c18a62e556c99d83c063b';
  var city = req.body.city;
   console.log(city);

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      var weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('result.hbs', {weather: null, error: 'Error, please try again'});
      } else {
        var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('result.hbs', {weather: weatherText, error: null});
      }
    }
  });
})


app.get('/about',  (req, res) => {
    res.render('about.hbs')
  });

app.get('/help',  (req, res) => {
    res.render('help.hbs')
  });

app.get('/refrence', (req, res) => {
    res.render('ref.hbs')
  });
   
app.listen(3000, () => { 
   console.log('app listening to app js to port 3000')
 });
