const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

///////////// Server-side messages from Sandee to user ///////////////////////
// Notification that they have successfully signed up for whatever notifications
app.post('/api/signup', (req, res) => {
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

// Server response specifically for Parking
app.post('/api/parkingNotifications', (req, res) => {
  res.header('Content-Type', 'application/json');

  // var message = Object.keys(req.body.checkboxes).filter(checkbox => req.body.checkboxes[checkbox])
  var notification = "Parking notification: 15 minutes till meter expires"
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

// Server response specifically for Sunscreen
app.post('/api/sunscreenNotifications', (req, res) => {
  res.header('Content-Type', 'application/json');

  var notification = "Don't Forget to Reapply Sunscreen!"
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

app.post('/api/waterNotifications', (req, res) => {
  res.header('Content-Type', 'application/json');

  // var message = Object.keys(req.body.checkboxes).filter(checkbox => req.body.checkboxes[checkbox])
  var notification = "Don't Forget to Hydrate!"
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

//////////////////////// Handling Responses 
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Th Robots aare coming to eat your ass');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});


// API POST TEMPLATE
// app.post('/api/messages', (req, res) => {
//   res.header('Content-Type', 'application/json');
//   client.messages
//     .create({
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to:req.body.to,
//       body:req.body.body
//     })
//     .then(() => {
//       res.send(JSON.stringify({success: true}))
//     })
//     .catch(err => {
//       console.log(err);
//       res.send(JSON.stringify({success:false}))
//     })
// });

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
