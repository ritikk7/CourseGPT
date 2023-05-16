require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const envConfig = dotenv.parse(fs.readFileSync('.env'));

for (const key in envConfig) {
  process.env[key] = envConfig[key];
}

const app = express();
const port = process.env.PORT;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/details', (req, res) => {
  res.send({ data: 'Hello World, from express' });
});

app.listen(port, () => {
  console.log(`Hello world app listening on port ${port}!`);
  console.log(process.env.JWT_SECRET);
});
