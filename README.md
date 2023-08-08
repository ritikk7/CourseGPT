# CourseGPT

[CourseGPT](https://course-gpt.herokuapp.com/) is more than an AI app - it’s a vision for a more responsive,
personalized education system. By allowing professors to train AI models on-demand, students gain immediate access to
course-specific materials and logistical details. Professors and TA’s can sit back and relax with a personal AI
assistant managing repetitive Q&A, while students can enjoy instant answers to questions for all of their courses in one
place.

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
    - ⚠️NOTE ⚠️ Trained on ALL CPSC 455 website data, not slides or MERN documentation. We felt that, although possible,
      it would not be a valuable use of our time to train CourseGPT on all MERN related documentation, as ChatGPT can
      easily
      provide this.
        - CourseGPT is relatively more useful for course logistics, as well as course-specific content, rather than
          generally available information. For example, courses that have adapted slides, textbooks, or other highly
          tailored course material.
        - CPSC 455 is unique, as there are no bounds on our application of MERN or other technologies - all of which we
          can find help for online or from ChatGPT. This is why we only trained it on website data.
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
    - ⚠️NOTE ⚠️ Trained on ALL CPSC 455 website data, and some CPSC 213 course-specific data. Can easily be trained on
      more.

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

### Stretch Requirements/Ideas Added Mid-Project (2/6 ✅)

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
      so that I can monitor and guarantee CourseGPT is providing correct answers, or so I can expand on CourseGPT's
      answers
      and improve student learning further

## CPSC 455 Technology Usage

### HTML/CSS/Javascript

HTML, CSS, and JavaScript was used for more than just building the app’s layout and basic styling. We used them to make
custom animations, scrollbars, canvas graphs integrations, accessibility enhancements, and responsiveness. Styles were
also organized into CSS modules for cleaner scoping.

### React and the “Front End”

React, along with redux and selectors, is used to manage the state and UI. We use redux to create asynchronous actions
and communicate with an API, with state elements being maintained and selected through redux slices and selectors.
Individual React components make up our application, with components separated into atoms, molecules, and organisms for
better organization.

### NodeJS and other “Back Ends”

TBD @KYLE

### NoSQL with MongoDB

MongoDB enhanced our app’s ability to persist user data, including their account details, profile picture, affiliated
school/courses, chats and messages. This not only allowed a smoother user experience where all of their chats are
persisted between log-ins and a way to search old messages, but also a way for us to gather feedback and perform
analytics on user data to better improve our product in the future. In addition, storing embedding vectors in MongoDB
effectively saves cost in minimizing repetitive calls to the OpenAI API, as pre-generated embeddings from the API can be
directly retrieved from MongoDB when a user asks a question.

### Release Engineering

TBD @KYLE

## Above & Beyond Functionality

### Auto-Training

TBD @KYLE

### Global Chat Search

Introducing an unparalleled search functionality within CourseGPT, which allows seamless exploration of messages across
all chats within an user’s account. Leveraging MongoDB Atlas Search, we not only used advanced querying techniques, but
also incorporated a "fuzzy" search, enabling the system to find matches even with search string typos. The user
experience is elevated through an intuitively designed search UI, triggered by Ctrl+F or Cmd+F keyboard shortcuts. The
interface also enables users to commence typing keywords with dynamically fetched search results populating the screen
the moment they pause for 500 milliseconds. In addition, the search results pop up with highlighted keywords and are
organized by courses, showing how many results are in each course – giving you a quick and easy way to find what you're
looking for. And clicking on a search result reveals the corresponding chat and seamlessly navigates the screen to the
specific message featuring the keyword matches.

### Data Analysis

CourseGPT provides a sentiment analysis dashboard accessible by developers and admins. Feedback submitted by users is
computed to data points, which are then displayed into various scatter, bar, bubble, and word charts. By visualizing the
sentiments and its clusters, we are able to know where the critical areas of improvement are for our model. This
required in depth usage of course units including MongoDB and React, but also involved several things that were not
covered. We used several subsets of AI in our backend, including ML and NLP (in grouping textual similarity and
sentiment analysis)

## Next Steps

TBD @KYLE

## Contributions

### Carolyn

I worked heavily on the data analysis flow. For preparation, this included everything from the backend/frontend of
feedback collection and the creation of question-answer pairs on our backend. In terms of the data analysis, I completed
all of the backend, which involved tokenizing and grouping similar questions and analyzing frequency and sentiment.

### Amy

I built all related frontend and backend chat and message functionalities, including API design and chat filtering.
Additionally, I designed and implemented the overall UI, created visualizations for the data analysis dashboard, and
allowed users to select profile avatars.

### Kyle

TBD @KYLE

### Duffy

I was responsible for spearheading the preliminary research and development phase of the Embeddings-based Search Model,
enabling users to query GPT based on the provided training text. I also contributed to building a new user registration
flow, allowing new users to select their school and courses. I later also implemented the frontend and backend
chats/messages search feature.

### Ritik

Profile modal
change password
Copy to clipboard
