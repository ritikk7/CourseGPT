require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const messageRoutes = require('./routes/message');
const path = require('path');
app.use('/api/chats/:chatId/messages', messageRoutes);

const build = path.join(__dirname, '../client/build');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(build));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(build, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(
    `CourseGPT listening on port ${port}! URL http://localhost:${port}/`
  );
  console.log(process.env.JWT_SECRET);
});
