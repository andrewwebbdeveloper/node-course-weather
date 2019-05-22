const request = require('request');

const getWeather = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/ce25fd6583a06d026b07f10b6cdf0f92/${latitude},${longitude}`;
  request({ url, json: true }, (err, { body }) => {
    const { code, error, currently } = body;
    if (err) {
      callback(`Unable to connect to weather service!`);
    } else if (code === 400) {
      callback(error);
    } else {
      const { summary, temperature, precipProbability } = currently;
      callback(
        undefined,
        `It is currently ${summary}. The current temperature is ${temperature} degrees with a ${precipProbability} chance of rain.`
      );
    }
  });
};

module.exports = getWeather;
