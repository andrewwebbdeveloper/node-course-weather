const request = require('request');

const getLocation = (address, callback) => {
  // const searchLocation = `what12`;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZHJld2JpcmQ4NyIsImEiOiJjanZzajE4MnUwMnIyNDVwMW1mYW5kMG45In0.XrcymZG2Fy-gp0bNRkHL7w&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to geolocation service`);
    } else if (body.features.length === 0) {
      callback(`Sorry, No results for given location`);
    } else {
      const placeName = body.features[0].place_name;
      const longitude = body.features[0].center[0];
      const latitude = body.features[0].center[1];

      callback(undefined, { latitude, longitude, placeName });
    }
  });
};

module.exports = getLocation;
