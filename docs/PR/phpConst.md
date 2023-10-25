A valid constant name starts with a letter or underscore (no $ sign before the constant name).

Unlike variables, constants are automatically global across the entire script.

## Create a PHP Constant

There are 2 ways to create a constant:
1. Using the define() function
2. Using the const keyword

### const vs. define()

+ const are always case-sensitive
+ define() has has a case-insensitive option.
+ const cannot be created inside another block scope, like inside a function or inside an if statement.
+ define can be created inside another block scope.

### Using the define() function.

Syntax
define(name, value, case-insensitive)

Parameters:

name: Specifies the name of the constant
value: Specifies the value of the constant
case-insensitive: Specifies whether the constant name should be case-insensitive. Default is false. Note: Defining case-insensitive constants was deprecated in PHP 7.3. PHP 8.0 accepts only false, the value true will produce a warning.

``` php
<?php
define("GREETING", "Hello World!"); // Create a constant with a case-sensitive name
define("GREETING", "Welcome to W3Schools.com!", true);// Create a constant with a case-insensitive name
echo GREETING;
?>
```

#### PHP Constant Arrays

In PHP7, you can create an Array constant using the define() function.

``` php
<?php
define("cars", [
  "Alfa Romeo",
  "BMW",
  "Toyota"
]);
echo cars[0];
?>
```

### PHP const Keyword
You can also create a constant by using the const keyword.

``` php
<?php
const MYCAR = "Volvo";
echo MYCAR;
?>
```

