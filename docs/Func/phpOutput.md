PHP provides a set of functions that control what content is sent to the browser and when. This is referred to as output control.

Output can come from any of the following sources:

+ [echo](#echo), [print](#print), printf, print_r... and other similar functions and statements
+ Notices, warnings and errors from PHP
+ Any content outside of the <?php ?> tags

### echo

The echo statement sends output to the browser.

``` php
<?php
echo "Hello, World!";
?>
```

``` php
//Use echo to output multiple strings:
<?php
echo "Hello, World!", "<br>";
echo "I'm about to learn PHP";
?>
```	

### print

The print keyword is used to output text.

Unlike echo, print can only output one string at a time. Unlike echo, print has a return value, which is always 1.

``` php
<?php
print "Hello, World!";
?>
```


PHP and the backend on which it is running may hold the output in a buffer before sending it to the user.

The output control functions can create any number of output buffers. Output buffers catch output given by the program. Each new output buffer is placed on the top of a stack of output buffers, and any output it provides will be caught by the buffer below it. The output control functions handle only the topmost buffer, so the topmost buffer must be removed in order to control the buffers below it.

The behavior of output control functions is affected by settings in php.ini:

|Name	|Default	|Description	|Version|
|---|---|---|---|
|output_buffering|	"0"	|Enables output buffering for all PHP files by default	|4|
|output_handler|	NULL	|Set the name of the default function which handles the output of all output buffers	|4|
|implicit_flush|	"0"	|Enables implicit flush, which causes output to be sent directly to the browser on each output statement	|4|
|url_rewriter.tags|	"a=href,area=href, frame=src,form=,fieldset="	|Indicates which HTML tags and attributes can be modified by the URL rewriter (the output_add_rewrite_var() function.)	|4.3|
|url_rewriter.hosts|	The current value of $_SERVER['HTTP_HOST']	|URL rewriting is only done on the server's own URLs by default. To allow for rewriting URLs of other websites, set the hostnames of the other websites here.	|7.1|

## PHP Output Control Functions
|Method|	Function|
|---|---|
|[flush()](#flush)|	Attempts to send content from the system's output buffer to the browser|
|[ob_clean()](#ob_clean)|	Deletes all of the content from the topmost output buffer|
|ob_end_clean()|	Deletes the topmost output buffer and all of its contents|
|ob_end_flush()|	Deletes the topmost output buffer and outputs its contents|
|ob_flush()|	Outputs the contents of the topmost output buffer and clears the buffer|
|ob_get_clean()|	Returns all of the contents of the topmost output buffer and clears the buffer|
|ob_get_contents()|	Returns the contents of the topmost output buffer|
|ob_get_flush()|	Outputs and returns the contents of the topmost output buffer and then deletes the buffer|
|ob_get_length()|	Returns the number of bytes of data that are in the topmost output buffer|
|ob_get_level()|	Returns a number indicating how many output buffers are on the stack|
|ob_get_status()|	Returns information about the output buffers|
|ob_gzhandler()|	Used as a callback function for ob_start() to compress the contents of the buffer when sending it to the browser|
|ob_implicit_flush()|	Turns implicit flushing on or off|
|ob_list_handlers()|	Returns an array of callback function names that are being used by the topmost output buffer|
|ob_start()|	Creates a new output buffer and adds it to the top of the stack|
|output_add_rewrite_var()|	Used to append query string parameters to any URL in the output|
|output_reset_rewrite_vars()|	Removes all variables added by output_add_rewrite_var()|

### flush()

Output a string to the browser before the script has finished running:
```php	
<?php
// Some browsers will not display the content if it is too short
// We use str_pad() to make the output long enough
echo str_pad("Hello World!", 4096);

// Use flush() to send the string to the browser
flush();

// Display the rest of the content three seconds later
sleep(3);
echo "<br>";
echo "Hello World!";
?>
```

### ob_clean()

The ob_clean() function deletes all of the contents of the topmost output buffer, preventing them from getting sent to the browser.

```php
<?php
ob_start();
echo "This output will not be sent to the browser";
ob_clean();
echo "This output will be sent to the browser";
ob_end_flush();
?>

```