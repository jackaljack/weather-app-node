# Weather App Node.js

Simple weather app with [Node.js](https://nodejs.org/),
[request](https://www.npmjs.com/package/request) and [axios](https://www.npmjs.com/package/axios).

Geolocation powered by [Google Maps Geocoding](https://developers.google.com/maps/documentation/geocoding/start).
Weather forecasts powered by [Dark Sky](https://darksky.net/poweredby/).

In order to get the data from Dark Sky you need an API key.
You can get one [here](https://darksky.net/dev/).
Then, store your API key in a `.env` file in your project root folder.

You don't need an API key to get the data from the Google Maps Geocoding API.


Example of use:

- `yarn run start 'New York'`
- `yarn run start London`
- `yarn run start 90210`

*Note*: if you don't use `yarn`, you can replace it with `npm`.