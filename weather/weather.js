const request = require('request');

const API_KEY = process.env.API_KEY;

const getWeather = (latitude, longitude, callback) => {
  const options = {
    url: `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}?units=si`,
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) {
      callback('Unable to connect to darksky API');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        summary: body.daily.summary,
        data: body.daily.data,
      });
    } else {
      callback('Unable to fetch weather');
    }
    console.log('Geocoding: Powered by Google Maps Geocoding (https://developers.google.com/maps/documentation/geocoding/start)');
    console.log('Weather forecast: Powered by Dark Sky (https://darksky.net/poweredby/)');
  });
};

module.exports = {
  getWeather,
};
