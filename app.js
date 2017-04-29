require('dotenv').config();
const yargs = require('yargs');
const chalk = require('chalk');
const Table = require('cli-table');
const moment = require('moment');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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

geocode.geocodeAddress(argv.address, (errorGeo, resultsGeo) => {
  if (errorGeo) {
    console.log(errorGeo);
  } else {
    console.log(chalk.bgRed(resultsGeo.address));
    weather.getWeather(resultsGeo.latitude, resultsGeo.longitude, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results.summary);

        const table = new Table({ head: ['Day', 'Summary', 'Min (°C)', 'Max (°C)'] });
        results.data.forEach((d) => {
          const unixTime = d.time;
          const date = moment.unix(unixTime).format('dddd MMMM Do');
          table.push([date, d.summary, d.temperatureMin, d.temperatureMax]);
        });

        console.log(table.toString());
        // console.log(JSON.stringify(results, undefined, 2));
      }
    });
  }
});
