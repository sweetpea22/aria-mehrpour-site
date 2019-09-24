const express = require('express'),
  bodyParser = require('body-parser'),
  nodemailer = require('nodemailer'),
  dotenv = require('dotenv').config(),
  app = express();

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
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENTID,
        clientSecret: process.env.GMAIL_CLIENTSECRET,
        refreshToken: process.env.GMAIL_REFRESHTOKEN,
        accessToken: process.env.GMAIL_ACCESSTOKEN
      }
    })

    let mailOpts = {
      from: "Dolo.world Form nocturne8998@gmail.com",
      to: "Aria Mehrpour Site nocturne8998@gmail.com",
      subject: "Contact Request via Website Form",
      html: `
      <p> You have a new contact request</p> 
      <h3>Contact Details</h3>
      <ul>
      <li> Name: ${req.body.contact__name}</li>
      <li> Email: ${req.body.contact__email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.contact__body}</p>
      `
    }
    transporter.sendMail(mailOpts, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("info.messageId: " + info.messageId);
        console.log("info.accepted: " + info.accepted);
        console.log("info.rejected: " + info.rejected);
        console.log("info.pending: " + info.pending);
        console.log("info.response: " + info.response);
      }
      transporter.close();
    });
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
app.listen(port, () => console.log('serving on port 3000'));