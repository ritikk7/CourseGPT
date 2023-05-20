require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');

// Could not get the .env file to work normally with dotenv :(
// This is my manual fix
const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const key in envConfig) {
  process.env[key] = envConfig[key];
}

const app = express();
const port = process.env.PORT;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const messageRoutes = require('./routes/message');
app.use('/api/chats/:chatId/messages', messageRoutes);
app.get('/api/details', (req, res) => {
  res.send({ data: 'Hello World, from express' });
});
app.listen(port, () => {
  console.log(`CourseGPT listening on port ${port}!`);
  console.log(process.env.JWT_SECRET);
});

module.exports = { app };
