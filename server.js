const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=%20jiyanpur%20Azamgarh%20276001',
    json: true,
  }, function (error, response, body) {
       
     var lat=JSON.stringify(body.results[0].geometry.location.lat);
     var lng=JSON.stringify(body.results[0].geometry.location.lng);
     console.log(lat);
     console.log(lng);
});

request({
    url: 'https://api.darksky.net/forecast/4cdc580f51c4e7734a45d4d64ef52282/37.8267,-122.4233',
    json: true,
  }, function (error, response, body) {
      if(error){d
          console.log('error have been occured');
      }else if(response.statusCode === 400){
          console.log('unable to fetch weather');
      }else if(response.statusCode === 200){
        var data1= JSON.stringify(body.currently.temperature);
        console.log(data1);
   
      }
     
});
