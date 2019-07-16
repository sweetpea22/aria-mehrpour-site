const express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  path = require('path');

app.set('view engine', 'ejs');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => {
  res.render('landing');
});

app.post('/contact', urlencodedParser, (req, res) => {
  if (req.body.contact__body === ' ' || req.body.contact__email === '' || req.body === null) {
    res.send('Invalid form input.');
  } else {
    res.render('contact-success', { data: req.body });
  }
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/under-many-moons', (req, res) => {
  res.render('more/event');
});

app.get('/days-gone-by-toronto', (req, res) => {
  res.render('more/days-gone-by');
});

app.get('/sleepless', (req, res) => {
  res.render('more/sleepless');
});

app.get('/portraits', (req, res) => {
  res.render('more/portrait');
});

app.get('/branding-shoots', (req, res) => {
  res.render('more/branding');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('serving on port 3000');
})
