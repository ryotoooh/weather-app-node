require('dotenv').config()
const express 	 = require('express'),
      app 	  	 = express(),
      request    = require('request'),
      port    	 = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('index');
});

app.get('/weather', function(req, res){
    let location = req.query.location;
    const url = 'https://api.openweathermap.org/data/2.5/weather?' +
                'q=' + location +
                '&units=metric' +
                '&appid=' + process.env.WEATHERAPIKEY;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200 || response.statusCode == 404){
            let response = JSON.parse(body);
            res.render('weather', {response: response, location: location});
        } else {
            res.send('You\'ve reached unknown error...');
        }
    });
});

app.get('*', function(req, res){
	res.send('You\'ve reached unknown address...');
});

app.listen(port, process.env.IP, function() {
    console.log('Server has started!');
});
