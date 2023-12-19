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