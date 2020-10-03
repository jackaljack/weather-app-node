const Table = require('cli-table');
const got = require('got');
const moment = require('moment');
const yargs = require('yargs');

['DARK_SKY_SECRET_KEY', 'GOOGLE_GEOCODING_API_KEY'].forEach((k) => {
  if (process.env[k] === undefined) {
    throw new Error(`Environment variable ${k} not set.`);
  }
});

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

const gotOptions = { responseType: 'json', resolveBodyOnly: true };

const encodedAddress = encodeURIComponent(argv.address);
// console.log("=== encodedAddress ===", encodedAddress)

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`;
// console.log("=== geocodeUrl ===", geocodeUrl)

const printDisclaimer = () => {
  const table = new Table({
    head: ['Service', 'Powered by', 'URL']
  });
  table.push([
    'Geocoding',
    'Google Maps (Geocoding API)',
    'https://developers.google.com/maps/documentation/geocoding/start'
  ]);
  table.push([
    'Weather forecast',
    'Dark Sky',
    'https://darksky.net/poweredby/'
  ]);
  console.log(table.toString());
};

const f = async () => {
  try {
    const responseGoogle = await got(geocodeUrl, gotOptions);
    // console.log("=== responseGoogle ===", responseGoogle)
    // console.log('responseGoogle.status', responseGoogle.status);
    // the promise is successful but there is no such address
    if (responseGoogle.status === 'ZERO_RESULTS') {
      console.log(`Unable to find the address: ${encodedAddress}`);
      return;
    }
    const r = responseGoogle.results[0];
    const lat = r.geometry.location.lat;
    const lng = r.geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_SECRET_KEY}/${lat},${lng}?units=si`;
    console.log(r.formatted_address);

    const responseDarkSky = await got(weatherUrl, gotOptions);
    // console.log('== responseDarkSky ===', responseDarkSky);
    const {
      apparentTemperature,
      summary,
      temperature,
      time
    } = responseDarkSky.currently;

    const table = new Table({
      head: [
        'Address',
        'Day',
        'Summary',
        'Temperature (°C)',
        'Apparent Temperature (°C)'
      ]
    });
    table.push([
      r.formatted_address,
      moment.unix(time).format('dddd MMMM Do'),
      summary,
      temperature,
      apparentTemperature
    ]);
    console.log(table.toString());

    printDisclaimer();
  } catch (error) {
    console.error(error);
  }
};
f();
