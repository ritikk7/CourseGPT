require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const messageRoutes = require('./routes/message');
app.use('/api/chats/:chatId/messages', messageRoutes);

const courseRoutes = require('./routes/course');
app.use('/api/schools/:schoolId/courses', courseRoutes);

const schoolRoutes = require('./routes/school');
app.use('/api/schools', schoolRoutes);

const feedbackRoutes = require('./routes/feedback');
app.use('/api/users/:userId/messages/:messageId/feedback', feedbackRoutes);

const chatRoutes = require('./routes/chat');
app.use('api/users/:userId/chats', chatRoutes);

const qaPairRoutes = require('./routes/qaPair');
app.use('api/courses/:courseId/chats/:chatId/:questionId/:answerId/', qaPairRoutes);

const path = require('path');

const build = path.join(__dirname, '../client/build');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(build));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(build, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(
    `CourseGPT listening on port ${port}! URL: http://localhost:${port}/`
  );
  console.log(process.env.JWT_SECRET);
});
