const express = require('express');
var bodyParser = require('body-parser');
var app = express();

const port = process.env.PORT || 3000;


var urlencodedParser = bodyParser.urlencoded({ extended: false });

const request = require('request');

var hbs = require('hbs');
hbs.registerPartials(__dirname+'/views/particle'); 
app.set('view engine', 'hbs');

// respond with "hello world" when a GET request is made to the homepage

app.get('/', (req, res) => {
  res.render('home.hbs')
});


app.post('/', urlencodedParser, function (req, res) {
  const apiKey='fb873262914c18a62e556c99d83c063b';
  var city = req.body.city;


 let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      var weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('result.hbs', {weather: null, error: 'Error, please try again'});
      } else {
       
       var Temp_C =  (((weather.main.temp)-32)/1.80).toFixed(0) ;
      
        res.render('result.hbs', {weather: weather, temp_c:Temp_C, error: null});

      }
    }
  });
})


app.get('/about',  (req, res) => {
    res.render('about.hbs');
  });

app.get('/help',  (req, res) => {
    res.render('help.hbs');
  });

app.get('/refrence', (req, res) => {
    res.render('ref.hbs');
  });
   
app.listen(port, () => { 
   console.log(`app listening to app js to port ${port}`);
 });
