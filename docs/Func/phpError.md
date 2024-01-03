The error functions are used to deal with error handling and logging.

The error functions allow us to define own error handling rules, and modify the way the errors can be logged.

The logging functions allow us to send messages directly to other machines, emails, or system logs.

The error reporting functions allow us to customize what level and kind of error feedback is given.

## Runtime Configuration
The behavior of the error functions is affected by settings in php.ini.

Errors and logging configuration options:

|Name|	Default|	Description|	Changeable|
|---|---|---|---|
|error_reporting	|NULL|	Sets the error reporting level (either an integer or  named constants)	|PHP_INI_ALL|
|display_errors|	"1"|	Specifies whether errors should be printed to the screen, or if they should be hidden from the user. Note: This feature should never be used on production systems (only to support your development)	|PHP_INI_ALL|
|display_startup_errors	|"0"	|Even when display_errors is on, errors that occur during PHP's startup sequence are not displayed Note: It is strongly recommended to keep display_startup_errors off, except for debugging|	PHP_INI_ALL|
|log_errors|	"0"|	Defines whether script error messages should be logged to the server's error log or error_log. Note: It is strongly advised to use error logging instead of error displaying on production web sites	|PHP_INI_ALL|
|log_errors_max_len|	"1024"	|Sets the maximum length of log_errors in bytes. The value "0" can be used to not apply any maximum length at all. This length is applied to logged errors, displayed errors, and also to $php_errormsg (available since PHP 4.3)	|PHP_INI_ALL|
|ignore_repeated_errors	|"0"	|Specifies whether to log repeated error messages. When set to "1" it will not log errors with repeated errors from the same file on the same line (available since PHP 4.3)	|PHP_INI_ALL|
|ignore_repeated_source	|"0"	|Specifies whether to log repeated error messages. When set to "1" it will not log errors with repeated errors from different files or source lines (available since PHP 4.3)	|PHP_INI_ALL|
|report_memleaks|	"1"	|If set to "1" (the default), this parameter will show a report of memory leaks detected by the Zend memory manager (available since PHP 4.3)	|PHP_INI_ALL|
|track_errors|	"0"	|If set to "1", the last error message will always be present in the variable $php_errormsg	|PHP_INI_ALL|
|html_errors|	"1"	|Turns off HTML tags in error messages|	PHP_INI_ALL PHP_INI_SYSTEM in PHP <= 4.2.3.|
|xmlrpc_errors|	"0"	|Turns off normal error reporting and formats errors as XML-RPC error message (available since PHP 4.1)	|PHP_INI_SYSTEM|
|xmlrpc_error_number	|"0"|	Used as the value of the XML-RPC faultCode element (available since PHP 4.1)	|PHP_INI_ALL|
|docref_root	|""	|(available since PHP 4.3)	  |  PHP_INI_ALL|
|docref_ext	|""	|(available since PHP 4.3.2)	|PHP_INI_ALL|
|error_prepend_string|	NULL|	Specifies a string to output before an error message	|PHP_INI_ALL|
|error_append_string|	NULL|	Specifies a string to output after an error message	|PHP_INI_ALL|
|error_log	|NULL	|Specifies the name of the file where script errors should be logged. The file should be writable by the web server's user. If the special value syslog is used, the errors are sent to the system logger instead	|PHP_INI_ALL|

## PHP Error and Logging Functions
|Function|	Description|
|---|---|
|debug_backtrace()	|Generates a backtrace|
|debug_print_backtrace()	|Prints a backtrace|
|error_clear_last()|	Clears the last error|
|error_get_last()|	Returns the last error that occurred|
|error_log()	|Sends an error message to a log, to a file, or to a mail account|
|error_reporting()|	Specifies which errors are reported|
|restore_error_handler()|	Restores the previous error handler|
|restore_exception_handler()|	Restores the previous exception handler|
|set_error_handler()	|Sets a user-defined error handler function|
|set_exception_handler()	|Sets a user-defined exception handler function|
|trigger_error()	|Creates a user-level error message|
|user_error()|	Alias of trigger_error()|

### debug_print_backtrace()

The handy debug_print_backtrace() function allows you to quickly get a sense of what has been been going on in your application immediately before you called a particular function.


The output from debug_print_backtrace() includes, by default, the arguments passed to each function. If those arguments are big arrays or complicated objects, it can make the output unwieldy. You can pass the constant DEBUG_BACKTRACE_IGNORE_ARGS as a first argument to debug_print_backtrace() to have arguments eliminated from the output. If you only need to keep track of the sequence of functions called, this is perfect.

### debug_backtrace()

A companion to debug_print_backtrace() is debug_backtrace(). Instead of outputting the backtrace, debug_backtrace() returns it as an array, one element per stackframe. This is useful if you only need to print certain elements of the backtrace, or you want to manipulate it programmatically.

```php
function print_parsed_backtrace() {
 $backtrace = debug_backtrace();
 for ($i = 1, $j = count($backtrace); $i < $j; $i++) {
 $frame = $backtrace[$i];
 if (isset($frame['class'])) {
 $function = $frame['class'] . $frame['type'] . $frame['function'];
 } else {
 $function = $frame['function'];
 }
 print $function . '()';
 if ($i != ($j - 1)) {
 print ', ';
 }
 }
}
function stooges() {
 print "woo woo woo!\n";
 Fine::larry();
}
class Fine {
 static function larry() {
 $brothers = new Howard;
 $brothers->curly();
 }
}
class Howard {
 function curly() {
 $this->moe();
 }
 function moe() {
 print_parsed_backtrace();
 }
}
stooges();
```

```	
woo woo woo!
Howard->moe(), Howard->curly(), Fine::larry(), stooges()
```


##  Hiding Error Messages from Users

When you don’t want PHP error messages to be visible to users.

Set the following values in your php.ini or web server configuration file:

display_errors =off

log_errors =on

You can also set these values using ini_set() if you don’t have access to edit your server’s php.ini file:


```php

ini_set('display_errors', 'off');
ini_set('log_errors', 'on');

```

These settings tell PHP not to display errors as HTML to the browser but to put them in the server’s error log.

When log_errors is set to on, error messages are written to the server’s error log. If you want PHP errors to be written to a separate file, set the error_log configuration directive with the name of that file:

error_log = /var/log/php.error.log

or:

ini_set('error_log', '/var/log/php.error.log');

If error_log is set to syslog, PHP error messages are sent to the system logger using syslog(3) on Unix and to the Event Log on Windows. If error_log is not set, error messages are sent to a default location, usually your web server’s error log file. (For the command-line PHP program, the default error location is the standard error output stream.)

There are lots of error messages you want to show your users, such as telling them they’ve filled in a form incorrectly, but you should shield your users from internal errors that may reflect a problem with your code. There are two reasons for this. First, these errors appear unprofessional (to expert users) and confusing (to novice users). If something goes wrong when saving form input to a database, check the return code from the database query and display a message to your users apologizing and asking them to
come back later. Showing them a cryptic error message straight from PHP doesn’t inspire confidence in your website.

Second, displaying these errors to users is a security risk. Depending on your database and the type of error, the error message may contain information about how to log in to your database or server and how it is structured. Malicious users can use this information to mount an attack on your website.

For example, if your database server is down, and you attempt to connect to it with mysql_connect(), PHP generates the following warning:


```html
<br>
<b>Warning</b>: Can't connect to MySQL server on 'db.example.com' (111) in
<b>/www/docroot/example.php</b> on line <b>3</b><br>
```

If this warning message is sent to a user’s browser, he learns that your database server is called db.example.com and can focus his cracking efforts on it.

## Tuning Error Handling

When you want to alter the error-logging sensitivity on a particular page. This lets you control what types of errors are reported.

To adjust the types of errors PHP complains about, use error_reporting():


```php

error_reporting(E_ALL); // everything
error_reporting(E_ERROR | E_PARSE); // only major problems
error_reporting(E_ALL & ~E_NOTICE); // everything but notices

```

Every error generated has an error type associated with it. For example, if you try to array_pop() a string, PHP complains that “This argument needs to be an array” because you can only pop arrays. The error type associated with this message is E_NOTICE, a nonfatal runtime problem.

By default, the error reporting level is E_ALL & ~E_NOTICE, which means all error types except notices. The & is a logical AND, and the ~ is a logical NOT. However, the php.inirecommended configuration file sets the error reporting level to E_ALL, which is all error types.

PHP 5.0 introduced a new error level, E_STRICT. Enabling E_STRICT during development has the benefit of PHP alerting you of ways your code could be improved. You will receive warnings about the use of deprecated functions, along with tips to nudge you in the direction of the latest and greatest suggested methods of coding. For PHP 5.0–5.3, E_STRICT is the only error level not included in E_ALL; for maximum coverage during development, set the error reporting level to E_ALL | E_STRICT. Starting with PHP 5.4, E_STRICT is included in E_ALL.

Error messages flagged as notices are runtime problems that are less serious than warnings. They’re not necessarily wrong, but they indicate a potential problem. One example of an E_NOTICE is “Undefined variable,” which occurs if you try to use a variable without previously assigning it a value:


```php
// Generates an E_NOTICE
foreach ($array as $value) {
 $html .= $value;
}
// Doesn't generate any error message
$html = '';
foreach ($array as $value) {
 $html .= $value;
}
```

In the first case, the first time through the foreach, $html is undefined. So when you append to it, PHP lets you know you’re appending to an undefined variable. In the second case, the empty string is assigned to $html above the loop to avoid the E_NOTICE. The previous two code snippets generate identical code because the default value of a variable is the empty string. The E_NOTICE can be helpful because, for example, you may have misspelled a variable name:


```php
foreach ($array as $value) {
 $hmtl .= $value; // oops! that should be $html
}
$html = '';
foreach ($array as $value) {
 $hmtl .= $value; // oops! that should be $html
}
```
A custom error-handling function can parse errors based on their type and take an appropriate action.

## PHP Predefined Error and Logging Constants
|Value	|Constant|	Description|
|---|---|---|
|1	|E_ERROR|	Fatal run-time errors. Errors that cannot be recovered from. Execution of the script is halted|
|2	|E_WARNING|	Run-time warnings (non-fatal errors). Execution of the script is not halted|
|4	|E_PARSE|	Compile-time parse errors. Parse errors should only be generated by the parser|
|8	|E_NOTICE|	Run-time notices. The script found something that might be an error, but could also happen when running a script normally|
|16	|E_CORE_ERROR|	Fatal errors at PHP startup. This is like E_ERROR, except it is generated by the core of PHP|
|32	|E_CORE_WARNING|	Non-fatal errors at PHP startup. This is like E_WARNING, except it is generated by the core of PHP|
|64	|E_COMPILE_ERROR|	Fatal compile-time errors. This is like E_ERROR, except it is generated by the Zend Scripting Engine|
|128	|E_COMPILE_WARNING|	Non-fatal compile-time errors. This is like E_WARNING, except it is generated by the Zend Scripting Engine|
|256	|E_USER_ERROR|	Fatal user-generated error. This is like E_ERROR, except it is generated in PHP code by using the PHP function trigger_error()|
|512	|E_USER_WARNING|	Non-fatal user-generated warning. This is like E_WARNING, except it is generated in PHP code by using the PHP function trigger_error()|
|1024	|E_USER_NOTICE|	User-generated notice. This is like E_NOTICE, except it is generated in PHP code by using the PHP function trigger_error()|
|2048	|E_STRICT|	Enable to have PHP suggest changes to your code which will ensure the best interoperability and forward compatibility of your code (Since PHP 5 but not included in E_ALL until PHP 5.4)|
|4096	|E_RECOVERABLE_ERROR|	Catchable fatal error. Indicates that a probably dangerous error occurred, but did not leave the Engine in an unstable state. If the error is not caught by a user defined handle, the application aborts as it was an E_ERROR (Since PHP 5.2)|
|8192	|E_DEPRECATED|	Run-time notices. Enable this to receive warnings about code that will not work in future versions (Since PHP 5.3)|
|16384	|E_USER_DEPRECATED|	User-generated warning message. This is like E_DEPRECATED, except it is generated in PHP code by using the PHP function trigger_error() (Since PHP 5.3)|
|32767	|E_ALL|	Enable all PHP errors and warnings (except E_STRICT in versions < 5.4)|

##  Using a Custom Error Handler

When you want to create a custom error handler that lets you control how PHP reports errors.

A custom error handling function can parse errors based on their type and take the appropriate action.
Pass set_error_handler() the name of a function, and PHP forwards all errors to that function. The error handling function can take up to five parameters. The first parameter is the error type, such as 8 for E_NOTICE. The second is the message thrown by the error, such as “Undefined variable: html.” The third and fourth arguments are the name of the file and the line number in which PHP detected the error. The final parameter is an array holding all the variables defined in the current scope and their values.
For example, in this code, $html is appended to without first being assigned an initial value:

```php
error_reporting(E_ALL);
set_error_handler('pc_error_handler');
function pc_error_handler($errno, $error, $file, $line, $context) {
 $message = "[ERROR][$errno][$error][$file:$line]";
 print "$message";
 print_r($context);
}
$form = array('one','two');
foreach ($form as $line) {
 $html .= "<b>$line</b>";
}
```

When the “Undefined variable” error is generated, pc_error_handler() prints:

```
[ERROR][8][Undefined variable: html][err-all.php:16]

```

After the initial error message, pc_error_handler() also prints a large array containing all the global, environment, request, and session variables.
Errors labeled catchable can be processed by the function registered using set_error_handler(). The others indicate such a serious problem that they’re not safe to be handled by users and PHP must take care of them.

## Logging Errors

Logging errors facilitates debugging. Smart error logging makes it easier to fix bugs.
Always log information about what caused the error:

```php
$r = mysql_query($sql);
if (! $r) {
 $error = mysql_error();
 error_log('[DB: query @'.$_SERVER['REQUEST_URI']."][$sql]: $error");
} else {
 // process results
}

```

You’re not getting all the debugging help you could be if you simply log that an error
occurred without any supporting information:

```php
$r = mysql_query($sql);
if (! $r) {
 error_log("bad query");
} else {
 // process result
}
```

Another useful technique is to include the \__FILE__, \__LINE__, \__FUNCTION__,
\__CLASS__, and \__METHOD__ “magic” constants in your error messages:

```php
error_log('['.__FILE__.']['.__LINE__."]: $error");

```

The \__FILE__ constant is the current filename, \__LINE__ is the current line number,
\__FUNCTION__ is the current function name, \__METHOD__ is the current method name
(if any), and \__CLASS__ is the current class name (if any). Starting with PHP 5.3.0,
\__DIR__ is the directory that \__FILE__ is in and \__NAMESPACE__ is the current name‐
space. Starting in PHP 5.4.0, \__TRAIT__ is the current trait name (if any).
