PHP (recursive acronym for PHP: Hypertext Preprocessor) is a widely-used open source general-purpose scripting language that is especially suited for web development and can be embedded into HTML.

A PHP script is executed on the server, and the plain HTML result is sent back to the browser.

``` php
<!DOCTYPE html>
<html>
    <head>
        <title>Example</title>
    </head>
    <body>

        <?php
            echo "Hi, I'm a PHP script!";
        ?>

    </body>
</html>
```

PHP is lossly typed (i.e. types are not necessarily enforced), dynamically, implicitly typed (i.e. you don’t have to declare variables), case sensitive (i.e. var and VAR are two different variables) and object-oriented (i.e. everything is an object, like C# and Java).

PHP is a language like C that uses curly braces to contain code statements within loops or conditionals. PHP statements end with a semicolon (;) just like C.
There are not dot notation in PHP. Everything is function based.
``` php
"name".split(); //doesnt work
split("name"); //works
```

## PHP Resources
 
1.   The website <http://www.php.net> is the official website for the PHP language,  and [Docs](https://www.php.net/manual/en/index.php)
2.   The [PHP  cookbook](https://www.oreilly.com/library/view/php-cookbook-3rd/9781449363741/)
3.   [Composer](https://getcomposer.org): Composer is a dependency manager for PHP that provides a structured way both to declare dependencies in your project and to install them.
4. [PHP: The Right Way](https://phptherightway.com/): A quick reference that attempts to be a comprehensive source of PHP best practices. A great place to start if you’re wondering about the idiomatic way to do something
in PHP.


##  PHP Syntax
A PHP script can be placed anywhere in the document.

A PHP script starts with <mark><?php</mark> and ends with <mark>?></mark>

The default file extension for PHP files is ".php".

A PHP file normally contains HTML tags, and some PHP scripting code.

## PHP Case Sensitivity
In PHP, keywords (e.g. if, else, while, echo, etc.), classes, functions, and user-defined functions are not case-sensitive.

> **Warning:** However; all variable names are case-sensitive!

## PHP Comments

A comment in PHP code is a line that is not executed as a part of the program. Its only purpose is to be read by someone who is looking at the code.

### Syntax for single-line comments:

``` php
<!DOCTYPE html>
<html>
<body>

<?php
// This is a single-line comment

# This is also a single-line comment
?>

</body>
</html>
```

### Syntax for multiple-line comments:

``` php
<!DOCTYPE html>
<html>
<body>

<?php
/*
This is a multiple-lines comment block
that spans over multiple
lines
*/
?>

</body>
</html>
```