require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const messageRoutes = require('./routes/message');
app.use('/api/chats/:chatId/messages', messageRoutes);

app.listen(port, () => {
  console.log(
    `CourseGPT listening on port ${port}! URL http://localhost:${port}/`
  );
  console.log(process.env.JWT_SECRET);
});
