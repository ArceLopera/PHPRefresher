## PHP Numbers
One thing to notice about PHP is that it provides automatic data type conversion.

So, if you assign an integer value to a variable, the type of that variable will automatically be an integer. Then, if you assign a string to the same variable, the type will change to a string.

This automatic conversion can sometimes break your code.

### PHP Integers

An integer data type is a non-decimal number between -2147483648 and 2147483647 in 32 bit systems, and between -9223372036854775808 and 9223372036854775807 in 64 bit systems. A value greater (or lower) than this, will be stored as float, because it exceeds the limit of an integer.

Another important thing to know is that even if 4 * 2.5 is 10, the result is stored as float, because one of the operands is a float (2.5).

Integers can be specified in three formats: decimal (10-based), hexadecimal (16-based - prefixed with 0x) or octal (8-based - prefixed with 0)

#### PHP Integer Constants
PHP has the following predefined constants for integers:

+ PHP_INT_MAX - The largest integer supported
+ PHP_INT_MIN - The smallest integer supported
+ PHP_INT_SIZE -  The size of an integer in bytes

#### PHP Integer Functions

PHP has the following functions to check if the type of a variable is integer:

+ is_int()
+ is_integer() - alias of is_int()
+ is_long() - alias of is_int()

### PHP Floats

The float data type can commonly store a value up to 1.7976931348623E+308 (platform dependent), and have a maximum precision of 14 digits.

#### PHP Float Constants

PHP has the following predefined constants for floats (from PHP 7.2):

+ PHP_FLOAT_MAX - The largest representable floating point number
+ PHP_FLOAT_MIN - The smallest representable positive floating point number
+ PHP_FLOAT_DIG - The number of decimal digits that can be rounded into a float and back without precision loss
+ PHP_FLOAT_EPSILON - The smallest representable positive number x, so that x + 1.0 != 1.0

#### PHP Float Functions

PHP has the following functions to check if the type of a variable is float:

+ is_float()
+ is_double() - alias of is_float()

### PHP Infinity
A numeric value that is larger than PHP_FLOAT_MAX is considered infinite.

PHP has the following functions to check if a numeric value is finite or infinite:

+ is_finite()
+ is_infinite()

``` php
<!DOCTYPE html>
<html>
<body>

<?php
// Check if a numeric value is finite or infinite 
$x = 1.9e411;
var_dump($x);
?>  

</body>
</html>
```

### PHP NaN
NaN stands for Not a Number.

NaN is used for impossible mathematical operations.

PHP has the following functions to check if a value is not a number:

+ is_nan()

``` php
<!DOCTYPE html>
<html>
<body>

<?php
// Invalid calculation will return a NaN value
$x = acos(8);
var_dump($x);
?>  

</body>
</html>
```

### Numerical Strings - is_numeric()

The PHP is_numeric() function can be used to find whether a variable is numeric. The function returns true if the variable is a number or a numeric string, false otherwise.

From PHP 7.0: The is_numeric() function will return FALSE for numeric strings in hexadecimal form (e.g. 0xf4c3b00c), as they are no longer considered as numeric strings.

``` php
<!DOCTYPE html>
<html>
<body>

<?php
// Check if the variable is numeric   
$x = 5985;
var_dump(is_numeric($x));

echo "<br>";

$x = "5985";
var_dump(is_numeric($x));

echo "<br>";

$x = "59.85" + 100;
var_dump(is_numeric($x));

echo "<br>";

$x = "Hello";
var_dump(is_numeric($x));
?>  

</body>
</html>
```

When you want to ensure that a variable contains a number, even if it’s typed as a string.
Alternatively, you want to check if a variable is not only a number, but is also specifically
typed as one.

``` php
<?php
foreach ([5, '5', '05', 12.3, '16.7', 'five', 0xDECAFBAD, '10e200']
 as $maybeNumber) {
 $isItNumeric = is_numeric($maybeNumber);
 $actualType = gettype($maybeNumber);
 print "Is the $actualType $maybeNumber numeric? ";
 if (is_numeric($maybeNumber)) {
 print "yes";
 } else {
 print "no";
 }
 print "\n";
}

?>

```
```
Is the integer 5 numeric? yes
Is the string 5 numeric? yes
Is the string 05 numeric? yes
Is the double 12.3 numeric? yes
Is the string 16.7 numeric? yes
Is the string five numeric? no
Is the integer 3737844653 numeric? yes
Is the string 10e200 numeric? yes
```

Helpfully, is_numeric() properly parses decimal numbers, such as 5.1; however, numbers with thousands separators, such as 5,100, cause is_numeric() to return false. To strip the thousands separators from your number before calling is_numeric(), use [str_replace()](../PR/phpStr1.md#str_replace).

``` php
<?php
$number = "5,100";
// This is_numeric() call returns false
$withCommas = is_numeric($number);
// This is_numeric() call returns true
$withoutCommas = is_numeric(str_replace(',', '', $number));
?>
```


## PHP Casting to Integers

Sometimes you need to cast a numerical value into another data type.

The (int), (integer), or intval() function are often used to convert a value to an integer.

``` php
<!DOCTYPE html>
<html>
<body>

<?php
// Cast float to int 
$x = 23465.768;
$int_cast = (int)$x;
echo $int_cast;
  
echo "<br>";

// Cast string to int
$x = "23465.768";
$int_cast = (int)$x;
echo $int_cast;
?>  

</body>
</html>
```