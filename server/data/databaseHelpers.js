const Feedback = require('../models/feedback');
const QAPair = require('../models/qaPair');
const Message = require('../models/message');
const Course = require('../models/course');

// Generates arrays of feedback information in the form [ comment, rating, question, answer, course ]
// example return: [ FeedbackInfo1, FeedbackInfo2 ]
async function getDatabaseFeedbackInfo(courseId = null) {
  try {
    const returnFeedback = [];

    const allFeedback = await Feedback.find({});

    const promises = allFeedback.map(async feedback => {
      const qaPair = await QAPair.findById(feedback.qaPair);
      if (courseId && qaPair.course !== courseId) return null;
      const [course, question, answer] = await Promise.all([
        Course.findById(qaPair.course),
        Message.findById(qaPair.question),
        Message.findById(qaPair.answer),
      ]);

      return [feedback.comment, feedback.rating, question, answer, course];
    });

    const resolvedFeedback = await Promise.all(promises);
    returnFeedback.push(...resolvedFeedback);

    return returnFeedback;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getDatabaseFeedbackInfo,
};
