Creating an activity module plugin in Moodle is a comprehensive process that involves several steps to ensure the plugin is well-integrated, functional, and follows Moodle's coding standards. Activity modules are a fundamental course feature and are usually the primary delivery method for learning content in Moodle.

The plugintype of an Activity module is mod, and the frankenstyle name of a plugin is therefore mod_[modname].

All activity module plugins are located in the /mod/ folder of Moodle. Activity modules in Moodle allow you to add new types of activities to a course, such as assignments, quizzes, forums, and more. Each activity module has its own directory and a set of required files and directories.

### Setting Up the Plugin Directory Structure

Activity modules reside in the `/mod` directory. Each module is in a separate subdirectory and consists of a number of mandatory files and any other files the developer is going to use. First, create a directory for your plugin inside the `mod` directory of your Moodle installation. For example, if your plugin is called "survey":

```
.
├── backup
│   ├── moodle1
│   │   └── lib.php
│   └── moodle2
│       ├── backup_folder_activity_task.class.php
│       ├── backup_folder_stepslib.php
│       ├── restore_folder_activity_task.class.php
│       └── restore_folder_stepslib.php
├── classes
│   ├── analytics
│   │   └── indicator
│   │       ├── activity_base.php
│   │       ├── cognitive_depth.php
│   │       └── social_breadth.php
│   ├── content
│   │   └── exporter.php
│   ├── event
│   │   ├── all_files_downloaded.php
│   │   ├── course_module_instance_list_viewed.php
│   │   ├── course_module_viewed.php
│   │   └── folder_updated.php
│   ├── external.php
│   ├── privacy
│   │   └── provider.php
│   └── search
│       └── activity.php
├── db
│   ├── access.php
│   ├── install.php
│   ├── install.xml
│   ├── log.php
│   ├── services.php
│   └── upgrade.php
├── download_folder.php
├── edit.php
├── edit_form.php
├── index.php
├── lang
│   └── en
│       └── folder.php
├── lib.php
├── locallib.php
├── mod_form.php
├── module.js
├── phpunit.xml
├── pix
│   ├── icon.png
│   └── icon.svg
├── readme.txt
├── renderer.php
├── settings.php
├── styles.css
├── tests
│   ├── backup
│   │   └── restore_date_test.php
│   ├── behat
│   │   └── folder_activity_completion.feature
│   ├── event
│   │   └── events_test.php
│   ├── externallib_test.php
│   ├── generator
│   │   └── lib.php
│   ├── generator_test.php
│   ├── lib_test.php
│   ├── phpunit.xml
│   └── search
│       └── search_test.php
├── version.php
└── view.php
```

### access.php - Capability defaults

For activities the following capabilities are required:

+ mod/[modname]:addinstance: Controls whether a user may create a new instance of the activity
+ mod/[modname]:view: Controls whether a user may view an instance of the activity

The example below shows the recommended configuration for the addinstance and view capabilities.

This configuration will allow:

+ editing teachers and managers to create new instances, but not non-editing teachers.
+ all roles to view the activity.

Granting the view capability to archetypes like guest does not allow any user to view all activities. Users are still subject to standard access controls like course enrolment.

For further information on what each attribute in that capabilities array means visit [NEWMODULE Adding capabilities](https://docs.moodle.org/dev/NEWMODULE_Adding_capabilities).

``` php
// mod/[modname]/db/access.php
<?php
$capabilities = [
    'mod/[modname]:addinstance' => [
        'riskbitmask' => RISK_XSS,
        'captype' => 'write',
        'contextlevel' => CONTEXT_COURSE,
        'archetypes' => [
            'editingteacher' => CAP_ALLOW,
            'manager' => CAP_ALLOW,
        ],
        'clonepermissionsfrom' => 'moodle/course:manageactivities',
    ],
    'mod/[modname]:view' => [
        'captype' => 'read',
        'contextlevel' => CONTEXT_MODULE,
        'archetypes' => [
            'guest' => CAP_ALLOW,
            'student' => CAP_ALLOW,
            'teacher' => CAP_ALLOW,
            'editingteacher' => CAP_ALLOW,
            'manager' => CAP_ALLOW,
        ],
    ],
];
```

### lib.php - Library functions

The lib.php file is a legacy file which acts as a bridge between Moodle core, and the plugin. In recent plugins it is should only used to define callbacks and related functionality which currently is not supported as an auto-loadable class.

For an Activity, you must define the following three functions, which are described below:

```php
// mod/[modname]/lib.php
function [modname]_add_instance($instancedata, $mform = null): int;
function [modname]_update_instance($instancedata, $mform): bool;
function [modname]_delete_instance($id): bool;
```

+ The [modname]_add_instance() function is called when the activity creation form is submitted. This function is only called when adding an activity and should contain any logic required to add the activity.
+ The [modname]_update_instance() function is called when the activity editing form is submitted.
+ The [modname]_delete_instance() function is called when the activity deletion is confirmed. It is responsible for removing all data associated with the instance.

The lib.php file is one of the older parts of Moodle and functionality is gradually being migrated to class-based function calls.

#### Activity module support functions
Activity modules can implement a global function to provide additional information about the module features. These functions are optional and can be used to provide additional features or to modify the behaviour of the activity module.
```php
// mod/[modname]/lib.php
function [modname]_supports(string $feature): bool|string|null;
```
The function [modname]_supports is used to check if the activity module supports a particular feature. The function should return true if the feature is supported, false if it is not supported, null if the feature is unknown, or string for the module purpose for some features.

Each feature is identified by a constant, which is defined in the lib /moodlelib.php file. Some of the available features are:

+ FEATURE_GROUPS and FEATURE_GROUPINGS: The activity module supports groups and groupings.
+ FEATURE_SHOW_DESCRIPTION: The activity module supports showing the description on the course page.
+ FEATURE_QUICKCREATE: The activity [modname]_add_instance() function is able to create an instance without showing a form using the default settings. It is used by the core_courseformat_create_module webservice to know which activities are compatible. If this feature is supported, the activity module should provide a quickcreatename string in the language file that will be used as the name of the instance created.

```php
function [modname]_supports($feature) {
    return match ($feature) {
        FEATURE_GROUPS => true,
        FEATURE_GROUPINGS => true,
        FEATURE_MOD_INTRO => true,
        FEATURE_COMPLETION_TRACKS_VIEWS => true,
        FEATURE_GRADE_HAS_GRADE => true,
        FEATURE_BACKUP_MOODLE2 => true,
        FEATURE_SHOW_DESCRIPTION => true,
        FEATURE_MOD_PURPOSE => MOD_PURPOSE_COLLABORATION,
        default => null,
    };
}
```

To have your Activity plugin classified in the right Activity category, you must define the function [modname]_supports and add the FEATURE_MOD_PURPOSE constant:

```php	
function [modname]_supports(string $feature) {
    switch ($feature) {
        [...]
        case FEATURE_MOD_PURPOSE:
            return MOD_PURPOSE_XXXXXX;

        default:
            return null;
    }
}
```	

The available activity purposes for this feature are:

+ Administration (MOD_PURPOSE_ADMINISTRATION)
    Tools for course administration, such as attendance tracking or appointment scheduling.
+ Assessment (MOD_PURPOSE_ASSESSMENT)
    Activities that allow the evaluation and measurement of student understanding and performance.
    + Core activities in this category: Assignment, Quiz, Workshop.
+ Collaboration (MOD_PURPOSE_COLLABORATION)
    Tools for collaborative learning that encourage knowledge sharing, discussions, and teamwork.
    + Core activities in this category: Database, Forum, Glossary, Wiki.
+ Communication (MOD_PURPOSE_COMMUNICATION)
    Activities that facilitate real-time communication, asynchronous interaction, and feedback collection.
    + Core activities in this category: BigBlueButton, Chat, Choice, Feedback, Survey.
+ Interactive content (MOD_PURPOSE_INTERACTIVECONTENT)
    Engaging interactive activities that encourage active learner participation.
    + Core activities in this category: H5P, IMS package, Lesson, SCORM package.
+ Resources (MOD_PURPOSE_CONTENT)
    Activities and tools to organise and display course materials like documents, web links, and multimedia.
    + Core activities in this category: Book, File, Folder, Page, URL, Text and media area.
+ Other (MOD_PURPOSE_OTHER)
    Other types of activities.


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
