const _ = require('lodash');
const cors = require('cors');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/proxy', async function(req, res) {
  try {
    const payload = await axios(req.body);

    res.json({
      data: payload.data,
      cookie: payload.cookie,
      config: payload.config,
      status: payload.status,
      headers: payload.headers,
      statusText: payload.statusText,
    });

  } catch(error) {
    const errorResponse = error.response;

    if(error.response) {
      return res.json({
        data: errorResponse.data,
        status: errorResponse.status,
        statusText: errorResponse.statusText,
        headers: errorResponse.headers,
      });
    } else {
      return res.status(500).send(error);
    }
  }
});

app.listen(process.env.PORT || 5000, () => console.log('Proxy started...'));
