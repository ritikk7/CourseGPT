class CourseObject {
  constructor(courseName) {
    this.courseName = courseName;
    this.setPrompts(courseName);
  }

  setPrompts(courseName) {
    if (courseName === 'cpsc455') {
      this.prompts = [
        'What is the course CPSC455 about?',
        'What is the goal of the CPSC455 course?',
        'What technologies will be applied in the CPSC455 course?',
      ];
    } else if (courseName === 'cpsc310') {
      this.prompts = [
        'What are the learning outcomes of CPSC 310 and their significance in software engineering?',
        'How is the project graded?',
        'What is the definition of software and what role does it play in various domains?',
      ];
    } else {
      this.prompts = [
        'What are the algorithms covered in CPSC320?',
        'What are the steps to solve recurrences?',
        'What are the occasions to use dynamic programming?',
      ];
    }
  }

  getCourseName() {
    return this.courseName;
  }

  getPrompts() {
    return this.prompts;
  }
}

export default CourseObject;
