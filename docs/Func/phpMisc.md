The behavior of the misc. functions is affected by settings in the php.ini file.

Misc. configuration options:

|Name|	Description|	Default|	Changeable|
|--------|	-----------|	--------|	-----------|
|ignore_user_abort|	FALSE indicates that scripts will be terminated as soon as they try to output something after a client has aborted their connection|	"0"	|PHP_INI_ALL|
|highlight.string|	Color for highlighting a string in PHP syntax|	"#DD0000"	|PHP_INI_ALL|
|highlight.comment|	Color for highlighting PHP comments	|"#FF8000"|	PHP_INI_ALL|
|highlight.keyword|	Color for syntax highlighting PHP keywords (e.g. parenthesis and semicolon)	|"#007700"|	|PHP_INI_ALL|
|highlight.default|	Default color for PHP syntax	|"#0000BB"|	PHP_INI_ALL|
|highlight.html|	Color for HTML code|	"#000000"	|PHP_INI_ALL|
|browscap|	Name and location of browser-capabilities file (e.g. browscap.ini)	|NULL|	PHP_INI_SYSTEM|

## Miscellaneous Functions

|Function|	Description|
|--------|-----------|
|connection_aborted()|	Checks whether the client has disconnected|
|connection_status()|	Returns the current connection status|
|connection_timeout()|	Deprecated from PHP 4.0.5. Checks whether the script has timed out|
|constant()|	Returns the value of a constant|
|define()|	Defines a constant|
|defined()|	Checks whether a constant exists|
|die()|	Alias of exit()|
|eval()|	Evaluates a string as PHP code|
|exit()|	Prints a message and exits the current script|
|get_browser()|	Returns the capabilities of the user's browser|
|__halt_compiler()|	Halts the compiler execution|
|highlight_file()|	Outputs a file with the PHP syntax highlighted|
|highlight_string()|	Outputs a string with the PHP syntax highlighted|
|hrtime()|	Returns the system's high resolution time|
|ignore_user_abort()|	Sets whether a remote client can abort the running of a script|
|pack()|	Packs data into a binary string|
|php_strip_whitespace()|	Returns the source code of a file with PHP comments and whitespace removed
|show_source()|	Alias of highlight_file()|
|sleep()|	Delays code execution for a number of seconds|
|sys_getloadavg()|	Returns the system load average|
|time_nanosleep()|	Delays code execution for a number of seconds and nanoseconds|
|time_sleep_until()|	Makes a script sleep until the specified time|
|uniqid()|	Generates a unique ID|
|unpack()|	Unpacks data from a binary string|
|usleep()|	Delays code execution for a number of microseconds|

## Predefined Misc. Constants

|Constant	|Description|
|--------|-----------|
|CONNECTION_ABORTED	|Connection is aborted by user or network error|
|CONNECTION_NORMAL	|Connection is running normally|
|CONNECTION_TIMEOUT	|Connection timed out|
|\__COMPILER_HALT_OFFSET__|	 |