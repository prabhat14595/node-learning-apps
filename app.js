const express = require('express')
var bodyParser = require('body-parser')
var app = express()

const request = require('request');

var hbs = require('hbs')
hbs.registerPartials(__dirname+'/views/particle'); 
app.set('view engine', 'hbs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// respond with "hello world" when a GET request is made to the homepage

app.get('/', (req, res) => {
  res.render('home.hbs')
});

app.post('/', urlencodedParser, (req, res) => {
  console.log(req.body);
 
  var address= encodeURIComponent(req.body.address);
  var pin = req.body.zipcode;

  
  console.log(address);
  console.log(pin);

  var weh = request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '%20'+ pin,
    json: true,
  }, function (error, response, body) {
       
     var lat=JSON.stringify(body.results[0].geometry.location.lat);
     var lng=JSON.stringify(body.results[0].geometry.location.lng);
       console.log(lat);

    
    });
   console.log(weh.response.lat);
    

});


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
