Understanding the different types of Moodle plugins is crucial for developing the right kind of functionality to extend Moodle. Each plugin type serves a specific purpose and integrates with Moodle in a unique way. By exploring existing plugins and their source code, you can gain insights into best practices and common patterns used in Moodle plugin development. For the official documentation of each plugin type, see the [Moodle documentation](https://moodledev.io/docs/4.4/apis/plugintypes).

### General Naming Conventions

1. **Component Name**: The component name of a plugin follows the format `plugin_type_pluginname`. For example, an assignment activity module might be named `mod_assignment`.
2. **Directory and File Names**: The directory name of the plugin should match the plugin name part of the component name. For example, the directory for an assignment plugin should be `mod/assignment`.

The plugin name must meet the following rules:

- It must start with a lowercase latin letter
- It may contain only lowercase latin letters, numbers, and underscores
- It must end with a lowercase latin letter, or a number
- The hyphen, and minus character - are not allowed

|Plugin type|Component name (Frankenstyle)|Moodle path|Description|
| :--- | :--- | :--- | :---|
|[Activity modules](./Plugin/phpMoodlePlugin_mod.md)	|mod	|/mod	|Activity modules are essential types of plugins in Moodle as they provide activities in courses. For example: Forum, Quiz and Assignment.|
|Antivirus plugins|	antivirus|	/lib/antivirus|	Antivirus scanner plugins provide functionality for virus scanning user uploaded files using third-party virus scanning tools in Moodle. For example: ClamAV.|
|Assignment submission plugins	|assignsubmission	|/mod/assign/submission	|Different forms of assignment submissions|
|Assignment |feedback plugins	|assignfeedback	|/mod/assign/feedback	|Different forms of assignment feedbacks|
|Book tools	|booktool	|/mod/book/tool	|Small information-displays or tools that can be moved around pages|
|Custom fields	|customfield	|/customfield/field	|Custom field types, used in Custom course fields|
|Database fields	|datafield	|/mod/data/field	|Different types of data that may be added to the Database activity module|
|Database presets	|datapreset	|/mod/data/preset	|Pre-defined templates for the Database activity module|
|LTI sources	|ltisource	|/mod/lti/source	|LTI providers can be added to external tools easily through the external tools interface see Documentation on External Tools. This type of plugin is specific to LTI providers that need a plugin that can register custom handlers to process LTI messages|
|File Converters	|fileconverter	|/files/converter	|Allow conversion between different types of user-submitted file. For example from .doc to PDF.|
|LTI services	|ltiservice	|/mod/lti/service	|Allows the implementation of LTI services as described by the IMS LTI specification|
|Machine learning backends	|mlbackend	|/lib/mlbackend	|Prediction processors for analytics API|
|Forum reports	|forumreport	|/mod/forum/report	|Display various reports in the forum activity|
|Quiz reports	|quiz	|/mod/quiz/report	|Display and analyse the results of quizzes, or just plug miscellaneous behaviour into the quiz module|
|Quiz access rules	|quizaccess	|/mod/quiz/accessrule	|Add conditions to when or where quizzes can be attempted, for example only from some IP addresses, or student must enter a password first|
|SCORM reports	|scormreport	|/mod/scorm/report	|Analysis of SCORM attempts|
|Workshop grading strategies	|workshopform	|/mod/workshop/form	|Define the type of the grading form and implement the calculation of the grade for submission in the Workshop module|
|Workshop allocation methods	|workshopallocation	|/mod/workshop/allocation	|Define ways how submissions are assigned for assessment in the Workshop module|
|Workshop evaluation methods	|workshopeval	|/mod/workshop/eval	|Implement the calculation of the grade for assessment (grading grade) in the Workshop module|
|[Blocks](#2-blocks)	|block	|/blocks	|Small information-displays or tools that can be moved around pages|
|[Question types](./Plugin/phpMoodlePlugin_qtypes.md)	|qtype	|/question/type	|Different types of question (for example multiple-choice, drag-and-drop) that can be used in quizzes and other activities|
|[Question behaviours](./Plugin/phpMoodlePlugin_qbehavior.md)	|qbehaviour	|/question/behaviour	|Control how student interact with questions during an attempt|
|[Question import/export formats](./Plugin/phpMoodlePlugin_qformat.md)|qformat	|/question/format	|Import and export question definitions to/from the question bank|
|Text filters	|filter	|/filter	|Automatically convert, highlight, and transmogrify text posted into Moodle.|
|Editors	|editor	|/lib/editor	|Alternative text editors for editing content|
|Atto editor plugins	|atto	|/lib/editor/atto/plugins	|Extra functionality for the Atto text editor|
|[Enrolment plugins](#6-enrol-plugins)	|enrol	|/enrol	|Ways to control who is enrolled in courses|
|[Authentication plugins](#5-auth-plugins)	|auth	|/auth	|Allows connection to external sources of authentication|
|[Admin tools](#8-admin-tools)	|tool	|/admin/tool	|Provides utility scripts useful for various site administration and maintenance tasks|
|Log stores	|logstore	|/admin/tool/log/store	|Event logs storage back-ends|
|Availability conditions	|availability	|/availability/condition	|Conditions to restrict user access to activities and sections.|
|Calendar types	|calendartype	|/calendar/type	|Defines how dates are displayed throughout Moodle|
|Messaging consumers	|message	|/message/output	|Represent various targets where messages and notifications can be sent to (email, sms, jabber, ...)|
|[Course formats](#9-course-formats)	|format	|/course/format	|Different ways of laying out the activities and blocks in a course|
|Data formats	|dataformat	|/dataformat	|Formats for data exporting and downloading|
|User profile fields	|profilefield	|/user/profile/field	|Add new types of data to user profiles|
|[Reports](#4-reports)	|report	|/report	|Provides useful views of data in a Moodle site for admins and teachers|
|Course reports	|coursereport	|/course/report	|Reports of activity within the course|
|Gradebook export	|gradeexport	|/grade/export	|Export grades in various formats|
|Gradebook import	|gradeimport	|/grade/import	|Import grades in various formats|
|Gradebook reports	|gradereport	|/grade/report	|Display/edit grades in various layouts and reports|
|Advanced grading methods	|gradingform	|/grade/grading/form	|Interfaces for actually performing grading in activity modules (for example Rubrics)|
|MNet services	|mnetservice	|/mnet/service	|Allows to implement remote services for the MNet environment (deprecated, use web services instead)|
|Webservice protocols	|webservice	|/webservice	|Define new protocols for web service communication (such as SOAP, XML-RPC, JSON, REST ...)|
|Repository plugins|	|repository	|/repository	|Connect to external sources of files to use in Moodle|
|Portfolio plugins	|portfolio	|/portfolio	|Connect external portfolio services as destinations for users to store Moodle content|
|Search engines	|search	|/search/engine	|Search engine backends to index Moodle's contents.	|
|Media players	|media	|/media/player	|Pluggable media players|
|Plagiarism plugins	|plagiarism	|/plagiarism	|Define external services to process submitted files and content|
|Cache store	|cachestore	|/cache/stores	|Cache storage back-ends.|
|Cache locks	|cachelock	|/cache/locks	|Cache lock implementations.|
|[Themes](#3-themes)	|theme	|/theme	|Change the look of Moodle by changing the the HTML and the CSS.|
|[Local plugins](#7-local-plugins)	|local	|/local	|Generic plugins for local customisations|
|Content bank content types	|contenttype	|/contentbank/contenttype	|Content types to upload, create or edit in the content bank and use all over the Moodle site|
|H5P libraries	|h5plib	|/h5p/h5plib	|Plugin type for the particular versions of the H5P integration library.|
|[Question bank plugins](./Plugin/phpMoodlePlugin_qbank.md)	|qbank	|/question/bank	|Plugin type for extending question bank functionality.|



### [1. Activity modules](./Plugin/phpMoodlePlugin_mod.md)

**Purpose**: Add new types of activities or resources to courses.

**Component Name**: `mod_pluginname`

**Examples**:

- **Assignment (`mod_assign`)**: Allows teachers to collect work from students, review it, and provide feedback including grades.
- **Quiz (`mod_quiz`)**: Enables the creation of quizzes with a variety of question types like multiple choice, true/false, and short answer.
- **Forum (`mod_forum`)**: Facilitates discussions among students and teachers within a course.
- **H5P Interactive Content (`mod_h5pactivity`)**: Integrates H5P activities, which are interactive HTML5 content types like quizzes, interactive videos, and presentations.
- **Scheduler (`mod_scheduler`)**: Allows teachers to schedule appointments with students.


### 2. Blocks

**Purpose**: Add new blocks to the side regions of Moodle pages, providing additional information or functionality.

**Component Name**: `block_pluginname`

**Examples**:

- **HTML Block (`block_html`)**: Allows custom HTML content to be displayed in a block.
- **Calendar Block (`block_calendar_month`)**: Shows the calendar for the current month with links to detailed day views.
- **Progress Bar (`block_progress`)**: Displays a progress bar showing the completion status of activities within a course.
- **Quickmail (`block_quickmail`)**: Provides an easy way for teachers to send emails to students within a course.

### 3. Themes

**Purpose**: Customize the look and feel of the Moodle site by changing the design, layout, and styles.

**Component Name**: `theme_pluginname`

**Examples**:

- **Boost (`theme_boost`)**: A modern, responsive theme based on Bootstrap 4, providing a clean and intuitive interface.
- **Classic (`theme_classic`)**: A traditional theme with a simple, familiar layout.
- **Fordson (`theme_fordson`)**: A highly customizable theme with additional layout options and enhanced usability features.
- **Moove (`theme_moove`)**: A modern, responsive theme with a focus on simplicity and user experience.

### 4. Reports

**Purpose**: Create new reports for data analysis and tracking within Moodle.

**Examples**:

- **Logs (`report_log`)**: Provides access to the logs of all activities on the site, courses, and users.
- **Activity Report (`report_activity`)**: Shows detailed activity reports for a course.
- **Configurable Reports (`report_customsql`)**: Allows admins to create custom reports using SQL queries.
- **Completion Progress (`report_completion`)**: Provides a visual overview of students' progress in completing course activities.

### 5. Auth Plugins

**Purpose**: Implement custom authentication methods for logging into Moodle.

**Examples**:

- **Email-based Self-registration (`auth_email`)**: Allows users to create their own accounts using their email addresses.
- **LDAP Server (`auth_ldap`)**: Authenticates users against an LDAP server, commonly used in organizations.
- **OAuth2 (`auth_oauth2`)**: Allows users to log in using their accounts from external services like Google, Microsoft, and Facebook.
- **CAS Server (`auth_cas`)**: Integrates Moodle with a CAS (Central Authentication Service) server for single sign-on.

### 6. Enrol Plugins

**Purpose**: Implement custom enrollment methods for courses.

**Examples**:

- **Manual Enrolment (`enrol_manual`)**: Allows teachers to manually enroll students in their courses.
- **Self Enrolment (`enrol_self`)**: Allows users to enroll themselves in courses, optionally using an enrollment key.
- **Stripe Payment (`enrol_stripepayment`)**: Allows users to pay for course enrollment using the Stripe payment gateway.
- **PayPal (`enrol_paypal`)**: Integrates PayPal for paid course enrollments.

### 7. Local Plugins

**Purpose**: Provide additional functionalities that don't fit into other plugin categories.

**Examples**:

- **Moodle Mobile Additional Features (`local_mobile`)**: Adds additional features to the Moodle Mobile app.
- **Moodle Integrity Essentials (`local_integrity`)**: Provides tools to help maintain the integrity of the Moodle environment.
- **Cron Locking Improvements (`local_cronlock`)**: Enhances the performance and reliability of Moodle's cron system.
- **User Cleanup (`local_usercleanup`)**: Automates the cleanup and deletion of inactive or unwanted user accounts.

### 8. Admin Tools

**Purpose**: Provide tools and utilities for site administrators to manage and maintain the Moodle site.

**Examples**:

- **Database Search (`tool_datasearch`)**: Allows administrators to search and manage the database directly from the Moodle interface.
- **Security Overview (`tool_securityoverview`)**: Provides a report highlighting potential security issues and recommendations.
- **Task Scheduler (`tool_taskscheduler`)**: Allows administrators to schedule and manage various tasks within Moodle.
- **Multi-factor Authentication (`tool_mfa`)**: Implements multi-factor authentication for increased security.

### 9. Course Formats

**Purpose**: Define the layout and structure of courses within Moodle.

**Examples**:

- **Weekly Format (`format_weeks`)**: Organizes course content by weeks.
- **Topics Format (`format_topics`)**: Organizes course content by topics.
- **Grid Format (`format_grid`)**: Displays course sections as a grid of icons, enhancing the visual appeal.
- **Collapsed Topics (`format_collapsedtopics`)**: Allows course sections to be collapsed and expanded for better navigation.


### Summary

Understanding the types of plugins available in Moodle allows you to choose the right type for your needs and extend Moodle's functionality effectively. Whether you're adding new activities, customizing the look and feel, or creating new reports, there's a specific plugin type designed to help you achieve your goals. By exploring existing plugins and their source code, you can gain insights into best practices and common patterns used in Moodle plugin development.

Naming conventions in Moodle plugins are crucial for maintaining consistency, avoiding conflicts, and ensuring that plugins are easily identifiable and properly integrated within the Moodle ecosystem. Each plugin type in Moodle has specific naming conventions that developers need to follow. Here is a detailed explanation of the naming conventions for various Moodle plugin types:

