var express = require('express')
var cors = require('cors')
var path = require('path');
var Yelp = require('yelp');

var app = express()
app.use(cors())

app.set('port', (process.env.PORT || 5000));

// Setup static files
app.use('/static', express.static(path.join(__dirname, '/build/static')))

// Setup Yelp API credentials
var yelp = new Yelp({
  consumer_key: 'KBi3c2r8SkkWCVmQ2KOdSg',
  consumer_secret: 'cHqYNM7jUAuzVdD9TSckjUgnbRA',
  token: 'DiNzfQ0ydz-5oydrhf6BIlrx4bTIEq9Y',
  token_secret: 'mSX4GfZjslXR_VJAOME0G3BC5k4',
});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.get('/search', (req, res) => {
  let barsLimit = 30;
  yelp.search({
      location: req.query.location,
      category_filter:'bars',
    })
    .then(function(data) {
      let jsonData = data.businesses
      res.json(jsonData.slice(0, barsLimit))
    })
    .catch(function(err) {
      console.error(err);
    });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
