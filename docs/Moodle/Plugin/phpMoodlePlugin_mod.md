Creating an activity module plugin in Moodle is a comprehensive process that involves several steps to ensure the plugin is well-integrated, functional, and follows Moodle's coding standards. Activity modules are a fundamental course feature and are usually the primary delivery method for learning content in Moodle.

The plugintype of an Activity module is mod, and the frankenstyle name of a plugin is therefore mod_[modname].

All activity module plugins are located in the /mod/ folder of Moodle. Activity modules in Moodle allow you to add new types of activities to a course, such as assignments, quizzes, forums, and more. Each activity module has its own directory and a set of required files and directories.

### Setting Up the Plugin Directory Structure

First, create a directory for your plugin inside the `mod` directory of your Moodle installation. For example, if your plugin is called "survey":

```
moodle/
├── mod/
│   ├── survey/
│   │   ├── db/
│   │   ├── lang/
│   │   ├── backup/
│   │   ├── classes/
│   │   ├── pix/
│   │   ├── version.php
│   │   ├── index.php
│   │   ├── view.php
│   │   ├── lib.php
│   │   ├── mod_form.php
│   │   ├── settings.php
│   │   ├── ...
```

### Activity Examples

1. **[Quiz (`mod_quiz`)](https://docs.moodle.org/404/en/Quiz_activity)**

    Allows instructors to create quizzes with various question types, such as multiple choice, true/false, short answer, and more. It supports randomization, time limits, and feedback.
    
    - **Common Use**: Assessing student knowledge, conducting exams, and providing practice quizzes.

2. **[Assignment (`mod_assign`)](https://docs.moodle.org/404/en/Assignment_activity)**

    Enables instructors to collect, review, and provide feedback on student submissions. It supports file uploads, online text, and various grading methods.

    - **Common Use**: Collecting essays, projects, and other student assignments.

3. **[Forum (`mod_forum`)](https://docs.moodle.org/404/en/Forum_activity)**

    Facilitates asynchronous discussions among students and instructors. It supports various types of forums, including single simple discussions, question-and-answer forums, and standard forums.

    - **Common Use**: Promoting discussions, Q&A sessions, and collaborative learning.

4. **[Workshop (`mod_workshop`)](https://docs.moodle.org/404/en/Workshop_activity)**

    A peer assessment activity that allows students to submit their work and then evaluate each other's submissions according to a rubric provided by the instructor.

    - **Common Use**: Peer reviews, collaborative projects, and enhancing critical thinking skills.

5. **[Choice (`mod_choice`)](https://docs.moodle.org/404/en/Choice_activity)**

    Allows instructors to ask a single question and offer multiple responses, which students can select. Results can be published for students to see.

    - **Common Use**: Quick polls, attendance tracking, and decision-making processes.

6. **[Feedback (`mod_feedback`)](https://docs.moodle.org/404/en/Feedback_activity)**

    Enables instructors to create custom surveys for collecting feedback from students. It supports multiple question types and anonymous submissions.

    - **Common Use**: Course evaluations, gathering student opinions, and conducting research surveys.

7. **[SCORM (`mod_scorm`)](https://docs.moodle.org/404/en/SCORM_activity)**

    Supports the integration of SCORM packages, which are standardized e-learning content created in various authoring tools. It tracks user progress and scores.

    - **Common Use**: Delivering interactive e-learning modules and training materials.

8. **[Wiki (`mod_wiki`)](https://docs.moodle.org/404/en/Wiki_activity)**

    Provides a collaborative space where students can create and edit a collection of web pages. It supports group work and version tracking.

    - **Common Use**: Collaborative projects, group documentation, and knowledge sharing.

9. **[Glossary (`mod_glossary`)](https://docs.moodle.org/404/en/Glossary_activity)**

    Allows instructors and students to create and maintain a list of definitions, like a dictionary. Entries can be searched and categorized.

    - **Common Use**: Building a shared repository of key terms and concepts for a course.

10. **[H5P Interactive Content (`mod_h5pactivity`)](https://docs.moodle.org/404/en/H5P_activity)**

    Integrates H5P content types into Moodle, enabling the creation and sharing of interactive HTML5 content such as quizzes, presentations, interactive videos, and more.

    - **Common Use**: Enhancing course content with interactive and multimedia elements to engage students.
