const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const axios = require('axios')
const foodController = require('../getFoodMiddleware');
// Api Call/openfoodfacts-react-native/API/Api.js

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/style.css', (req, res) => {
  res
    .status(200)
    .set('Content-Type', 'text/css')
    .sendFile(path.resolve(__dirname, '../client/style.css'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use('/search', foodController.getProduct, (req, res) => {
  return res.status(200).json(res.locals.searchResults)
})
// module.exports = app;
//OAUTH CODE
app.set('view engine', 'ejs');
var access_token = "";

app.get('/', function(req, res) {
  res.render('index',{client_id: clientID});
});
const clientID = '2b74ad81452c3a6709f8';
const clientSecret = '9de206a75a8c91e351bd093762b4b6e72647a90d';

app.get('/oauth-callback', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    console.log(response);
    access_token = response.data.access_token
    res.redirect('success');
  })
})

app.get('/success', function(req, res) {

  axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token
    }
  }).then((response) => {
    res.render('success',{ userData: response.data });
  })
});