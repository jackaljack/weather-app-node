const yargs = require('yargs');
const axios = require('axios');

const API_KEY = process.env.API_KEY;

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
  .then((response) => {
    // the promise is successful but there is no such address
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address');  // go to catch
    }
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  })
  .then((response) => {
    const sky = response.data.currently.summary;
    const temperature = response.data.currently.temperature;
    console.log(`The sky is ${sky} and the temperature is ${temperature} °F`);
  })
  .catch((error) => {
    // the promise is rejected
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers');
    } else {
      console.log(error.message);
    }
  });

console.log('--------------------');
console.log('Geocoding: Powered by Google Maps (https://developers.google.com/maps/documentation/geocoding/start)');
console.log('Weather forecast: Powered by Dark Sky (https://darksky.net/poweredby/)');
console.log('--------------------');
