import express from 'express';
const app = express();


/************************************************************
 *
 * API routes
 *
 ************************************************************/

app.get('/photos', (req, res) => {
  function getRandomImage(col, row) {
    const randomer = Math.floor(Math.random() * 10) + 1; // Get random integer between 1 to 10

    return `http://lorempixel.com/${col * 200}/${row * 200}/cats/${randomer}`;
  }

  function getRandomName() {
    const names = ['Ted', 'Barney', 'Lily', 'Marshall', 'Robin'];
    return names[Math.floor(Math.random() * names.length)];
  }

  function getRandomCountry() {
    const countries = ['USA', 'Canada', 'Italy', 'Singapore', 'Indonesia', 'India', 'England', 'Egypt', 'Australia'];
    return countries[Math.floor(Math.random() * countries.length)];
  }

  function getRandomSize() {
    return Math.floor(Math.random() * 2) + 1; // Get random integer between 1 to 2;
  }

  const PHOTO_COUNT = 100
  const photos = [];

  for (var i = 0; i < PHOTO_COUNT; i++) {
    const col = getRandomSize();
    const row = getRandomSize();

    const photo = {
      id: i,
      url: getRandomImage(col, row),
      name: getRandomName(),
      country: getRandomCountry(),
      col,
      row,
    };
    photos.push(photo);
  }

  res.send(JSON.stringify(photos));
});

/************************************************************
 *
 * Express routes for:
 *   - app.js
 *   - style.css
 *   - index.html
 *
 ************************************************************/

// Serve application file depending on environment
app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/app.js');
  } else {
    res.redirect('//localhost:9090/build/app.js');
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/style.css');
  } else {
    res.redirect('//localhost:9090/build/style.css');
  }
});

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.local.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(9090, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}


/******************
 *
 * Express server
 *
 *****************/

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
