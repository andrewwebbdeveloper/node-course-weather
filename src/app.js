const path = require(`path`);
const express = require('express');
const hbs = require(`hbs`);

const getLocation = require('../utils/getLocation');
const getWeather = require('../utils/getWeather');
const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, `../public`);
const viewsPath = path.join(__dirname, `../templates/views`);
const partialsPath = path.join(__dirname, `../templates/partials`);

//Setup handlebars engine and views location
app.set(`view engine`, `hbs`);
app.set(`views`, viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get(``, (req, res) => {
  res.render(`index`, {
    title: `Weather App`,
    name: `Andrew Webb`
  });
});

app.get(`/about`, (req, res) => {
  res.render(`about`, {
    title: `About`,
    name: `Andrew Webb`
  });
});
app.get(`/help`, (req, res) => {
  res.render(`help`, {
    title: `Help is here`,
    helpMessage: `For help, please contact the site administrator.`,
    name: `Andrew Webb`
  });
});

app.get(`/weather`, (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: `You must provide an address`
    });
  }

  getLocation(
    `${req.query.address}`,
    (error, { latitude, longitude, placeName } = {}) => {
      if (error) {
        return res.send({ error });
      }
      getWeather(latitude, longitude, (error, weatherData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          address: req.query.address,
          forecast: `${weatherData}`,
          location: `${placeName}`
        });
      });
    }
  );
});

app.get(`/products`, (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: `You must provide a search term`
    });
  }
  console.log(req.query.search),
    res.send({
      products: []
    });
});

app.get(`/help/*`, (req, res) => {
  res.render(`404`, {
    title: `No Help`,
    errorType: `Help article not found`,
    name: `Andrew Webb`
  });
});

app.get(`*`, (req, res) => {
  res.render(`404`, {
    title: `404`,
    errorType: `Page not found`,
    name: `Andrew Webb`
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
