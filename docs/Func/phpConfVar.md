## Reading Configuration Variables

When you want to get the value of a PHP configuration setting.

Use ini_get():

```php
echo ini_get('magic_quotes_gpc');
// find out the include path:
$include_path = ini_get('include_path');
```

To get all the configuration variable values in one step, call ini_get_all(). It returns the variables in an associative array, and each array element is itself an associative array. The second array has three elements: a global value for the setting, a local value, and an access code:

```php
// Put all config values in an associative array
$vars = ini_get_all();
print_r($vars['date.timezone']);
```

```
Array
(
 [global_value] => UTC
 [local_value] => UTC
 [access] => 7
)
```

The global_value is the value set from the php.ini file; the local_value is adjusted to account for any changes made in the web server’s configuration file, any relevant .htaccess files, and the current script. The value of access is a numeric constant representing the places where this value can be altered.

### Access values
| Value |  PHP constant  |                     Meaning                      |
| ----- | -------------- | ------------------------------------------------ |
| 1     | PHP_INI_USER   | Any script, using ini_set()                      |
| 2     | PHP_INI_PERDIR | Directory level, using .htaccess                 |
| 4     | PHP_INI_SYSTEM | System level, using php.ini or httpd.conf        |
| 7     | PHP_INI_ALL    | Everywhere: scripts, directories, and the system |

A value of 6 means the setting can be changed in both the directory and system level, as 2 + 4 = 6. In practice, there are no variables modifiable only in PHP_INI_USER or PHP_INI_PERDIR, and all variables are modifiable in PHP_INI_SYSTEM, so everything has a value of 4, 6, or 7.
You can also get variables belonging to a specific extension by passing the extension name to ini_get_all():


```php
// return just the session module specific variables
$session = ini_get_all('session');

```

By convention, the variables for an extension are prefixed with the extension name and a period. So all the session variables begin with session. and all the PDO variables begin with pdo, for example.

Because ini_get() returns the current value for a configuration directive, if you want to check the original value from the php.ini file, use get_cfg_var():

```php
$original = get_cfg_var('sendmail_from'); // have we changed our address?
```
The value returned by get_cfg_var() is the same as what appears in the global_val
ue element of the array returned by ini_get_all().

## Setting Configuration Variables

When you want to change the value of a PHP configuration setting.

Use ini_set():

```php

// add a directory to the include path
ini_set('include_path', ini_get('include_path') . ':/home/fezzik/php');

```

Configuration variables are not permanently changed by ini_set(). The new value lasts only for the duration of the request in which ini_set() is called. To make a persistent modification, alter the values stored in the php.ini file.

It isn’t meaningful to alter certain variables, such as asp_tags, because by the time you call ini_set() to modify the setting, it’s too late to change the behavior the setting affects. If a variable can’t be changed, ini_set() returns false.

However, it is useful to alter configuration variables in certain pages. For example, if you’re running a script from the command line, set html_errors to off. 

To reset a variable back to its original setting, use ini_restore():

```php
ini_restore('sendmail_from'); // go back to the default value
```