const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));



app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/2015', (req, res) => {
  res.render('archives/archive-15');
});

app.get('/2016', (req, res) => {
  res.render('archives/archive-16');
});

app.get('/2017', (req, res) => {
  res.render('archives/archive-17');
});

app.get('/2018', (req, res) => {
  res.render('archives/archive-18');
});

const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('serving on port 3000');
})
