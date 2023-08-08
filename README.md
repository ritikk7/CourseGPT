# CourseGPT

[CourseGPT](https://course-gpt.herokuapp.com/) is more than an AI app - it’s a vision for a more responsive, personalized education system. By allowing professors to train AI models on-demand, students gain immediate access to course-specific materials and logistical details. Professors and TA’s can sit back and relax with a personal AI assistant managing repetitive Q&A, while students can enjoy instant answers to questions for all of their courses in one place.
---

## Project Goals

### Minimal Requirements (3/3 ✅)

1. **Simple user login** ✅
    - As a user, I want to be able to create an account and log in
      so that I can access CourseGPT.
2. **Being able to ask questions (1 course supported)** ✅
    - As a student user, I want to be able to ask questions and
      receive answers for at least one supported course so that I can understand
      the course content better.
3. **Chat history (view)** ✅
    - As a student user, I want to be able to view my past chatIds so
      that I can review the information that I've learned.

### Standard Requirements (5/5 ✅)

1. **Deleting chat history** ✅
    - As a student user, I want to be able to clear my chat history
      so that I can keep my chat interface focused on my current
      learning goals.
2. **Feedback on individual messages** ✅
    - As a user, I want to be able to provide feedback on each
      response from CourseGPT so that I can help the developers improve
      CourseGPT
      and further my learning.
3. **Favourite courses** ✅
    - As a student user, I want to be able to favorite courses and
      have them easily selectable when creating a new chat so that I can quickly
      access the courses I'm currently studying. Although I recognize that only
      one course will be significantly trained and useful.
4. **Suggested prompts** ✅
    - As a student user, I want to have suggested prompts based on
      my selected course so that I can get ideas for what questions to ask or
      topics to explore.
5. **ProfileSettings changes** ✅
    - As a user, I want to be able to edit my email and password in my profile
      settings so that I can keep my account information up to date.

### Stretch Requirements (3.5/6 ✅)

1. **Professor improved CourseGPT model**  ✅
    - As a professor user, I want to be able to upload text
      that provides more information for training my course
      so that CourseGPT can provide more helpful answers to students.

2. **Multiple Course Support** ⚠️
    - As a student user, I want to be able to select multiple different courses
      and receive helpful assistance in all of them so that I can learn more
      about all the courses I am taking, rather than just one.
    - ⚠️NOTE ⚠️ Trained on ALL CPSC 455 data, and some CPSC 213 data. Can easily be trained on more. 

3. Developer/Admin Analytics Page ✅
    - As an admin/developer user, I want an enhanced analytics page
      providing data related to popularity, feedback, and gapair, so that
      I can have a comprehensive understanding of user interactions and
      optimize the platform accordingly.

4. **Chat Search Functionality** ✅
    - As a student user, I want to be able to access a search bar to search
      through all of my chatIds to easily locate information so that I can
      efficiently find the information I need without having to scroll through
      all my chatIds.

5. **Professor new CourseGPT model** ❌

    - As a professor user, I want to be able to upload PDF documents
      that will be used to create and **train a new course** so that
      students in my course can utilize ChatGPT.

6. **Community feature** ❌
    - As a student user, I want to be able to see popular questions
      asked by other students for a certain course and answers endorsed by
      instructors so that I can learn more from other student usage and what my
      instructors believe to be important.

### Requirements/Ideas Added Mid-Project (2/6 ✅)

1. **Copy to Clipboard Functionality** ✅
    - As a user, I want to be able to easily copy Course GPT messages to my clipboard,
      enabling me to easily share or save important information.

2. **Google login** ✅
   - As a user, I want to be able to create an account and log in
     with Google so that I can access CourseGPT with ease.

3. **Email Confirmation** ❌
    - As a new user, I need to confirm my email to ensure the authenticity
      of my account so that unauthorized access can be minimized.

4. **Share Conversation Feature** ❌
    - As a user, I want to have a share button for each conversation
      so that I can easily share valuable insights with others.

5. **Auto-training** ❌
    - As a professor user, I want to be able to link my mail or Piazza so that the model can be trained automatically,
      further reducing my involvement managing Q&A from students

6. **Piazza / Slack Integration** ❌
    - As a student user, I want my questions to be answered in a thread instantly by CourseGPT within existing platforms
      that I already use so that it does not disrupt my current workflow and so other students can see my questions
    - As a professor user, I want to have CourseGPT answer student questions within existing communication platforms
      so that I can monitor and guarantee CourseGPT is providing correct answers, or so I can expand on CourseGPT's answers
      and improve student learning further
