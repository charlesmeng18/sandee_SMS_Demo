const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post('/api/reminders', (req, res) => {
  res.header('Content-Type', 'application/json');

  // Filter and format the text message based on the notifcations, send text confirmation text
  var message = Object.keys(req.body.checkboxes).filter(checkbox => req.body.checkboxes[checkbox])
  if (message.length > 0) {
    var string = message.join(", ")
  } else {
    var string = 'no'
  }
  var notification = "Successfully signed up for " + `${string}` + " notifications"
  client.messages
    .create({
      from:process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: notification
    })
    .then(() => {
      res.send(JSON.stringify({success: true}))
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({success:false}))
    })
})

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to:req.body.to,
      body:req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({success: true}))
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({success:false}))
    })
});

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
