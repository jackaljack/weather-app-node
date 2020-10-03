# Weather App Node.js

[![Build Status](https://travis-ci.org/jackdbd/weather-app-node.svg?branch=master)](https://travis-ci.com/jackdbd/weather-app-node)

A simple CLI that converts an address into geographic coordinates (see [What is geocoding?](https://developers.google.com/maps/documentation/geocoding/overview#Geocoding)) and spits out a weather forecast for that location.

![Demo of the CLI app](https://github.com/jackdbd/weather-app-node/blob/master/demo.png "Demo of the CLI app.")

Built with:

- [Node.js](https://nodejs.org/)
- [yargs](https://www.npmjs.com/package/request)
- [got](https://github.com/sindresorhus/got)

Geocoding powered by the [Geocoding API](https://developers.google.com/maps/documentation/geocoding/start).
Weather forecasts powered by [Dark Sky](https://darksky.net/poweredby/).

## API keys

In order to use the Google Geocoding API you need an API key. See [here](https://developers.google.com/maps/documentation/geocoding/get-api-key) for details. For a free alternative see [Geocodeapi](https://geocodeapi.io/).

You will need another key to use the Dark Sky API. You can get one [here](https://darksky.net/dev/).

I store my API keys in a `.envrc` file that I load with [direnv](https://github.com/direnv/direnv).

## How to use it

here are a few examples:

```shell
node src/app.js --address London
node src/app.js -a 'New York'
node src/app.js -a 90210
node src/app.js -a 'Via dei Fori Imperiali'
node src/app.js -a 'Sensoji Temple'
```
