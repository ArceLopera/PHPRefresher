### Key security vulnerabilities

Given below are some of the typical vulnerability types developers need to be aware of when developing web applications, including Moodle.

+ [Unauthenticated access](https://moodledev.io/general/development/policies/security/unauthenticated-access)
+ [Unauthorised access](https://moodledev.io/general/development/policies/security/unauthorised-access)
+ [Cross-site request forgery (CSRF)](https://moodledev.io/general/development/policies/security/crosssite-request-forgery)
+ [Cross-site scripting (XSS)](https://moodledev.io/general/development/policies/security/crosssite-scripting)
+ [SQL injection](https://moodledev.io/general/development/policies/security/sql-injection)
+ [Command-line injection](https://moodledev.io/general/development/policies/security/commandline-injection)
+ [Data-loss](https://moodledev.io/general/development/policies/security/dataloss)
+ [Confidential information leakage](https://moodledev.io/general/development/policies/security/info-leakage)
+ [Configuration information leakage](https://moodledev.io/general/development/policies/security/configinfo-leakage)
+ [Session fixation](https://moodledev.io/general/development/policies/security/session-fixation)
+ [Denial of service (DOS)](https://moodledev.io/general/development/policies/security/dos)
+ [Brute-forcing login](https://moodledev.io/general/development/policies/security/bruteforcing-login)
+ [Insecure configuration management](https://moodledev.io/general/development/policies/security/insecure-config)
+ [Buffer overruns and other platform weaknesses](https://moodledev.io/general/development/policies/security/bufferoverruns)
+ [Social engineering](https://moodledev.io/general/development/policies/security/socialengineering)


Data-loss and Confidential information leakage are symptoms of other vulnerabilities.
Some vulnerabilities, such as Configuration information leakage, Command-line injection and Denial of service (DOS) would generally only concern developers of certain types of plugins.

Be sure to read the [Security page](https://moodledev.io/general/development/policies/security) in the Moodle Developer Resources for more details on each of these and other vulnerabilities.

## Summary of the guidelines

### Authenticate the user
With very few exceptions, every script should call require_login or require_course_login as near 
the start as possible.


#### Verify course and module access

+ All course areas have to be protected by require_login or require_course_login with correct 
$course parameter.
+ All module areas have to be protected by require_login or require_course_login with correct 
$course and $cm parameter

Example: Consider the index.php file of the Book module.

```php
require(__DIR__.'/../../config.php');
require_once(__DIR__.'/locallib.php');

$id = required_param('id', PARAM_INT); // Course ID.

$course = $DB->get_record('course', ['id' => $id], '*', MUST_EXIST);

unset($id);

require_course_login($course, true);
```

+ require_course_login() is called as soon as $course is found.
+ require_course_login() checks if user can view the course.
+ This page is listing all book modules in a course, so checking for a specific $cm value is not needed here.


Example: Consider the edit.php file of the Book module.

```php
require(__DIR__.'/../../config.php');
require_once(__DIR__.'/locallib.php');
require_once(__DIR__.'/edit_form.php');

$cmid       = required_param('cmid', PARAM_INT);  // Book Course Module ID.
$chapterid  = optional_param('id', 0, PARAM_INT); // Chapter ID.
$pagenum    = optional_param('pagenum', 0, PARAM_INT);
$subchapter = optional_param('subchapter', 0, PARAM_BOOL);

$cm = get_coursemodule_from_id('book', $cmid, 0, false, MUST_EXIST);
$course = $DB->get_record('course', ['id' => $cm->course], '*', MUST_EXIST);
$book = $DB->get_record('book', ['id' => $cm->instance], '*', MUST_EXIST);

require_login($course, false, $cm);
```

+ require_login() is called as soon as the $course and $cm values are found.
+ This page is editing a book so both $course and $cm parameters should be passed to require_login() to check proper access.
+ $autologinguest parameter is false because guest users should not be making changes on the site.


### Check permissions to avoid unauthorized access

+ Before allowing the user to see anything or do anything, make a call to has_capability or require_capability, testing the appropriate capability in the appropriate context.
    + Get the appropriate context using a call to get_context_instance.
+ For this to work in custom code, you may need to define additional capabilities. For example, block/myblock:viewsecretthing. You can define extra capabilities by creating a db/access.php file in your plugin.
 Capabilities should be annotated with the appropriate risks.
+ If appropriate, use the groups API to check group membership, and only show users information from groups they should be able to see.
    + Note that require_login checks basic groups access permissions for you.
+ It is very important to check capabilities when printing UI, but also after data submission before it is processed.

### Don't trust any input from users

+ Use the Form API whenever possible for handling HTML forms. Use moodleforms whenever possible, with an appropriate setType method call for each field.
+ Use HTTP requests correctly:
    + Use GET requests for getting information;
    + Use POST requests for changing things in the application;
+ Before performing actions, use data_submitted() && confirm_sesskey() to check sesskey and that you are handling a POST request. The "sesskey" (session key) is Moodle's inbuilt cross-site 
request forgery protection. 
    + Despite its name, sesskey is not the same as the user's session token stored in a cookie.
    + It is simply a CSRF key which is reset per-session.
+ Sesskey should not be sent via GET, as it exposes the token in the URL (which may appear in places such as site/server logs or browser history).
User input should be sanitised/escaped using the correct parameter types.
+ Before destroying large amounts of data, add a confirmation step.
+ If not using a moodleform, clean input using optional_param or required_param with an appropriate 
PARAM_... type. Group optional_param and required_param calls together at the top of the script, 
to make them easy to find.
+ **Do not access $_GET, $_POST or $_REQUEST directly.** 
+ As with any setting/modification/deletion of data, these should always be protected by checking 
a valid sesskey was submitted, to ensure it is an action the user has intended.
 


Similarly, clean data from other external resources like RSS feeds before use.

Additional reading

If you have not done so already, please go over the [Cross-site request forgery 
(CSRF)](https://moodledev.io/general/development/policies/security/crosssite-request-forgery) 
section in the Moodle developer documentation.

#### General Forms workflow

The general workflow of using Moodle forms is shown in the code snippet below.

```php
// Get page parameters.
// Use required_param() or optional_param().

// Check user has the required capability.
// Use require_capability() or has_capability().

// Instantiate the myform form from within the plugin.
$mform = new \plugintype_pluginname\form\myform();

// Form processing.
if ($mform->is_cancelled()) {
    // If there is a cancel element on the form, and it was pressed,
    // you can handle the cancel operation here.
    // NOTE: is_cancelled() should be called before get_data().

    redirect($returnurl);
} else if ($fromform = $mform->get_data()) {
    // This branch is where you process validated data.
    // Typically you finish up by redirecting to somewhere where the user
    // can see what they did.

    redirect($nexturl);
}

// Set default data for form (if any).
$mform->set_data($toform);

// Display the form.
// If the form was not cancelled, and data was not submitted,
// then display the form.
echo $OUTPUT->header();
$mform->display();
echo $OUTPUT->footer();
```

Note: The code snippet above is not the complete code. Only the important concepts are shown here. 


The actual processing of the submitted form data happens in the following code block.

```php
else if ($fromform = $mform->get_data()) {
    // This branch is where you process validated data.
    // Typically you finish up by redirecting to somewhere where the user
    // can see what they did.

    redirect($nexturl);
}
```
*$fromform = $mform->get_data():*

+ gets the data from the form.
+ cleans and passes validated form data.
+ validates the sesskey token.

#### CSRF protection

+ Form API automatically checks the sesskey and request method.
+ Where possible use the Form API or use POST requests when you need to perform an action.

Note:
When used correctly, sesskey can prevent unintended actions being executed by a user if they click a link within an email or external website, such as changing a grade or deleting their account.


#### Manually checking and validating sesskey
Use the `confirm_sesskey()` or `require_sesskey()` functions to validate the sesskey token.

```php
$delete = optional_param('delete', null, PARAM_INT);

if ($delete) {
    require_sesskey();
   
    // Do whatever you need to, like $DB->delete_records(...) etc.

}
```


+ Usually you will use require_sesskey().
+ require_sesskey() will throw an exception if the session is invalid.
+ require_sesskey() makes a call to confirm_sesskey().


You can use confirm_sesskey() as shown below:

```php
$delete = optional_param('delete', null, PARAM_INT);

if ($delete && confirm_sesskey()) {
    // Do whatever you need to, like $DB->delete_records(...) etc.
}
```

Note: Requiring a sesskey does not prevent or allow script content from being loaded on a page, 
so it is important to check whether it is trusted or not.

### Clean and escape data before output

+ Use s or p to output plain text content.
+ Use format_string to output content with minimal HTML like multi-lang spans (for example, course and activity names).
+ Use format_text to output all other content.
    + Only use $options->noclean if it requires a capability with RISK_XSS to input that content (for example web page resources).
+ Data destined for JavaScript should be escaped using $PAGE->requires->data_for_js (Moodle 2.0 onwards) or addslashes_js (Moodle 1.9).

Follow the Output functions to get a better understanding of how dynamic data should be sent from Moodle to the browser.

#### User input sanitisation

+ Ensures properly formed data is used for processing.
+ Removes potentially unwanted and malicious content from the data.


Example: Consider the given code snippet from the Book module.

```php
$id        = required_param('id', PARAM_INT); // Course module ID.
$chapterid = required_param('chapterid', PARAM_INT); // Chapter ID.
$up        = optional_param('up', 0, PARAM_BOOL);
```

`required_param()` and `optional_param()` are used to sanitise the values passed to this page.
A PARAM_* is used to specify the type of input expected and what values should be allowed.

##### Commonly Used PARAM_* Types
The type is specified with one of the PARAM_* constants. Among the most commonly used types are:

+ PARAM_INT declares the parameter should be treated as an integer number.
+ PARAM_ALPHA is for short strings that can contain English ASCII letters [a-z, A-Z] only.
+ PARAM_BOOL converts the input values like 0, 1, "yes", "no", "true" or "off" to a boolean variable.
+ PARAM_NOTAGS strips all HTML tags from the submitted text.
+ PARAM_TEXT for longer plain texts. All HTML tags are stripped, it only keeps support for the standard Multi-language content filter.

Please see the source code of the `lib/moodlelib.php` for more PARAM type constants and their inline documentation.


NOTE: Avoid using PARAM_RAW in most cases of user input, particularly where that data will 
be later output.

#### Outputting data
Avoid outputting raw content.
In most cases, you should use s(), p(), format_string() or format_text() functions to correctly 
clean and escape the content.
See details about these output functions are available in the [Output API docs](https://moodledev.io/docs/4.4/apis/subsystems/output#string-formatting-functions).
Content retrieved from the database should also cleaned before output.
Complex input, such as HTML, are stored in the database in raw input format.


Example: Consider the given use case.
A record is retrieved from the database and the value of the message field is displayed.

##### DO NOT do this

Do not output the value from the database without cleaning/escaping it first.

```php
$record = $DB->get_record('local_myplugin', ['id' => $id]);

echo html_writer::tag('p', $record->message);
```


##### DO this

Use an appropriate output method to clean/escape the value before outputting.

```php
$record = $DB->get_record('local_myplugin', ['id' => $id]);

echo html_writer::tag('p', format_text($record->message, FORMAT_PLAIN));
```
#### Mustache templates

+ {{variable}} will escape the value before using it in the template.
+ {{{variable}}} will render the raw unescaped HTML.
+ Use {{{variable}}} where it is absolutely necessary, for example:
    + Backend provides a "safe" HTML snippet;
    + Value of the variable has been processed by format_text() or another adequate way.

Example: Assume that the following data is passed to a mustache variable named message.

``` html
{
    "message": "<p>Greetings user. <script>alert('XSS alert')</script></p>"
}
```	


`{{message}}` will be replaced with:

``` html
&lt;p&gt;Greetings user. &lt;script&gt;alert('XSS alert')&lt;/script&gt;&lt;/p&gt;
```

HTML entities are encoded, so that they are not treated as HTML tags by the browser.


`{{{message}}}` will be replaced with:

``` html
<p>Greetings user. <script>alert('XSS alert')</script></p>
```

+ The raw value of the variable is used. 
+ If the value contains HTML or script, this will be injected into the HTML that is rendered.
+ This potentially makes it possible to include malicious content, such as a cross-site scripting payload (as can be seen in the simplified example above).

### Escape data before storing it in the database

+ Use the XMLDB library. This takes care of most escaping issues for you.
+ The addslashes method should no longer be use anywhere in Moodle 2.0 onwards.
+ Variables must be passed to database queries through bound parameters.

#### Handling database queries
+ Do not attempt to write your own code to directly access the database.
    + It can be prone to SQL injection.
+ Use higher level methods from the [data manipulation API](../Moodle/API/phpMoodleDM.md), like get_record(), whenever possible.
+ Clean all user input by passing appropriate PARAM_XXX to required_param() or optional_param().
+ Escape all input parameters.
+ When you have to insert values into SQL statements, use place-holders to insert the values safely.
    + Before Moodle 2.0, you had to build SQL by concatenating strings. Take particular care, especially with quoting values, 
    to avoid SQL injection vulnerabilities.
+ Although many DML methods have parameters passed in which are bound/sanitised automatically, some parts will not be:
    + Eg: passed in WHERE or sorting parameters;
    + Raw SQL such as the execute() method.
+ Any code that uses user input to determine the ORDER BY statement should use one of the "safe order by" helper methods:
    + get_safe_orderby() or; 
    + get_safe_orderby_multiple().

#### Database query examples
##### Example 1: String concatenation
###### DO NOT do this

Avoid using string concatenation to build SQL queries, where possible.
When you have to insert values into SQL statements, use place-holders to insert the values safely.

```php
$sql = "SELECT * FROM {user} "
  . "WHERE firstname = '" . $fname . "' "
  . "AND lastname = '" . $lname ."'";

$result = $DB->get_record_sql($sql);
```

###### DO this

Use bound parameters to insert values into SQL statements.

```php
$sql = "SELECT * FROM {user} "
  . "WHERE firstname = ? "
  . "AND lastname = ?";

$result = $DB->get_record_sql($sql, [$fname, $lname]);
```

##### Example 2: WHERE conditions
###### DO NOT do this

Do not use variables directly in the WHERE clause.

```php
$DB->delete_records_select('message', "id = $id");
```


###### DO this

+ Use placeholders (named or question mark) to insert values into WHERE conditions.

```php
$DB->delete_records_select('message', "id = :id", ['id' => $id]);
```

##### Example 3: ORDER BY statement
###### DO NOT do this

Avoid using user supplied values directly to build the ORDER BY statement.

```php
$sort = optional_param('sort', 'username', PARAM_ALPHAEXT);
$dir = optional_param('dir', 'ASC', PARAM_ALPHA);

$result = $DB->get_records('user', null, "$sort $dir");
```

###### DO this

+ Use get_safe_orderby() or get_safe_orderby_multiple() helper functions to construct the ORDER BY statement.

```php
$sort = optional_param('sort', 'username', PARAM_ALPHAEXT);
$dir = optional_param('dir', 'ASC', PARAM_ALPHA);

$sortorder = get_safe_orderby([
        'username' => 'username',
        'firstname' => 'firstname',
        'lastname' => 'lastname',
        'default' => 'username',
    ], $sort, $dir);

$result = $DB->get_records('user', null, $sortorder);
```

### Escape data before using it in shell commands

+ Avoid shell commands if at all possible.
    + Look to see if there is a PHP library instead.
+ If you can't avoid shell commands, use escapeshellcmd and escapeshellarg.

### Log every request
Every script should log an event. In case of an issue, logs help to trace the sequence of events that happened.

### Other good practice
... that helps with security:

+ Structure your code nicely, minimising the use of global variables. This makes the flow of data, and hence security, easier to verify.
+ Initialise objects (for instance, `$x = new stdClass;`) and arrays `($x = array())` before you first use them.
+ Test every input field with tricky input and exception cases to ensure that it is escaped and un-escaped the right number of times everywhere, and that Unicode characters are not corrupted. One standard test you can use is:

```php
< > & &lt; &gt; &amp; ' \' 碁 \ \\
```

### Web services

Remember that all data received by a web service originates from client-side origins 
(eg from JavaScript in-browser when a user performs some action, developer tools, cURL etc). 
This means it can be manipulated. 

Here are some tips for writing safe web services:

+ Ensure the correct parameter types are used when defining inputs in particular, as well as outputs/returns, so appropriate escaping occurs.
+ Always remember to check relevant capabilities for the appropriate context before performing actions.
    + This avoids accidentally allowing users to perform actions they should not be able to perform (and which might not be otherwise possible in the user interface).
+ Never trust incoming request data for identification,
    + For example, if a web service needs to perform an action for the requesting user, always identify them from server side data (eg $USER->id) and never from a user data that has been passed in with the request, because this can be modified.
+ When using data that is passed in with the request, ensure it is used in the correct place, for the correct purpose and be wary of mis-matched checks versus actions. 
    + For example, if a web service accepts a course ID parameter, but during execution calls a method always makes a change in the site context, it would probably not make sense to perform the capability check on the course’s context.
+ Web service calls made from JavaScript are automatically covered with a sesskey check.
+ Web service calls made externally follow the authentication process so are also protected.

###  PHP unserialize()
+ PHP unserialize() function has certain security risks, such as remote code execution.
+ You should never pass user-supplied serialized data to unserialize().
+ You should avoid using PHP unserialize() where possible. Refactor your code and replace unserialize() usage. Use alternate JSON functions, if needed.
+ If it is unavoidable to use unserialize(), your code should properly sanitise the data passed to it.


The PHP manual provides the following function signature and warning about unserialize().

```php
unserialize(string $data, array $options = []): mixed
```


WARNING

*Do not pass untrusted user input to unserialize() regardless of the options value of allowed_classes. 
Unserialization can result in code being loaded and executed due to object instantiation and 
autoloading, and a malicious user may be able to exploit this. Use a safe, standard data 
interchange format such as JSON (via json_decode() and json_encode()) if you need to pass 
serialized data to the user.*

Additional reading:

Read more about [PHP object injection](https://owasp.org/www-community/vulnerabilities/PHP_Object_Injection) 
in unserialize() on [OWASP.org](https://owasp.org/).