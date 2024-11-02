### Key security vulnerabilities

Given below are some of the typical vulnerability types developers need to be aware of when developing web applications, including Moodle.

+ Unauthenticated access
+ Unauthorised access
+ Cross-site request forgery (CSRF)
+ Cross-site scripting (XSS)
+ SQL injection
+ Command-line injection
+ Data-loss
+ Confidential information leakage
+ Configuration information leakage
+ Session fixation
+ Denial of service (DOS)
+ Brute-forcing login
+ Insecure configuration management
+ Buffer overruns and other platform weaknesses
+ Social engineering


Data-loss and Confidential information leakage are symptoms of other vulnerabilities.
Some vulnerabilities, such as Configuration information leakage, Command-line injection and Denial of service (DOS) would generally only concern developers of certain types of plugins.

Be sure to read the [Security page](https://moodledev.io/general/development/policies/security) in the Moodle Developer Resources for more details on each of these and other vulnerabilities.

### Summary of the guidelines

#### Authenticate the user
With very few exceptions, every script should call require_login or require_course_login as near the start as possible.

#### Verify course and module access

+ All course areas have to be protected by require_login or require_course_login with correct $course parameter.
+ All module areas have to be protected by require_login or require_course_login with correct $course and $cm parameter

#### Check permissions

+ Before allowing the user to see anything or do anything, call to has_capability or require_capability.
+ Capabilities should be annotated with the appropriate risks.
+ If appropriate, restrict what people can see according to groups.

#### Don't trust any input from users

+ Use moodleforms whenever possible, with an appropriate setType method call for each field.
+ Before performing actions, use data_submitted() && confirm_sesskey() to check sesskey and that you are handling a POST request.
+ Before destroying large amounts of data, add a confirmation step.
+ If not using a moodleform, clean input using optional_param or required_param with an appropriate PARAM_... type. 
**Do not access $_GET, $_POST or $_REQUEST directly.** Group optional_param and required_param calls together at the top of the script, to make them easy to find.

Similarly, clean data from other external resources like RSS feeds before use.

#### Clean and escape data before output

+ Use s or p to output plain text content.
+ Use format_string to output content with minimal HTML like multi-lang spans (for example, course and activity names).
+ Use format_text to output all other content.
    + Only use $options->noclean if it requires a capability with RISK_XSS to input that content (for example web page resources).
+ Data destined for JavaScript should be escaped using $PAGE->requires->data_for_js (Moodle 2.0 onwards) or addslashes_js (Moodle 1.9).

Follow the Output functions to get a better understanding of how dynamic data should be sent from Moodle to the browser.

#### Escape data before storing it in the database

+ Use the XMLDB library. This takes care of most escaping issues for you.
+ When you must use custom SQL code, use place-holders to insert values into the queries.
    + Before Moodle 2.0, you had to build SQL by concatenating strings. Take particular care, especially with quoting values, 
    to avoid SQL injection vulnerabilities.
+ The addslashes method should no longer be use anywhere in Moodle 2.0 onwards.
+ Variables must be passed to database queries through bound parameters.

#### Escape data before using it in shell commands

+ Avoid shell commands if at all possible.
    + Look to see if there is a PHP library instead.
+ If you can't avoid shell commands, use escapeshellcmd and escapeshellarg.

#### Log every request
Every script should log an event. In case of an issue, logs help to trace the sequence of events that happened.

#### Other good practice
... that helps with security:

+ Structure your code nicely, minimising the use of global variables. This makes the flow of data, and hence security, easier to verify.
+ Initialise objects (for instance, $x = new stdClass;) and arrays ($x = array()) before you first use them.
+ Test every input field with tricky input and exception cases to ensure that it is escaped and un-escaped the right number of times everywhere, and that Unicode characters are not corrupted. One standard test you can use is:

```php
< > & &lt; &gt; &amp; ' \' 碁 \ \\
```