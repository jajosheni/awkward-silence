const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/', function (request, response) {
  const body = request.body;

  let [responseText, responseCode] = ['Message sent!', 200];
  if (body.message && body.token && body.channel) {
    const data = JSON.stringify({
      'channel': '#virtual-coffee',
      'text': body.message
    });

    const config = {
      method: 'post',
      url: 'https://slack.com/api/chat.postMessage',
      headers: {
        'Authorization': 'Bearer ' + body.token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.ok));
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    [responseText, responseCode] = ['Invalid data: message, token and channel required.', 400];
  }

  response.status(responseCode).send(responseText);
});

app.listen(port, () => console.log(`server running on port ${port}!`));
