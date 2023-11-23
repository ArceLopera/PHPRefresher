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

##  Handling Very Large or Very Small Numbers

You need to use numbers that are too large (or small) for PHP’s built-in floating-point numbers.
Use either the BCMath or GMP libraries.

### Using BCMath

``` php
<?php
// $sum = "9999999999999999"
$sum = bcadd('1234567812345678', '8765432187654321');
// $sum is now a string
print $sum; // prints 9999999999999999
?>
```

The BCMath library is easy to use. You pass in your numbers as strings, and the function returns the sum (or difference, product, etc.) as a string. However, the range of actions you can apply to numbers using BCMath is limited to basic arithmetic.


### Using GMP

``` php
<?php
$sum = gmp_add('1234567812345678', '8765432187654321');
// $sum is now a GMP resource, not a string; use gmp_strval() to convert
print gmp_strval($sum); // prints 9999999999999999
?>
```

While most members of the GMP family of functions accept integers and strings as arguments, they prefer to pass numbers around as resources, which are essentially pointers to internal representations of the numbers. So unlike BCMath functions, which return strings, GMP functions return only resources. You then pass the resource to any GMP function, and it acts as your number.

The only downside is that when you want to view or use the resource with a non-GMP function, you need to explicitly convert it using gmp_strval() or gmp_intval().

``` php
<?php
//Adding numbers using GMP
$four = gmp_add(2, 2); // You can pass integers
$eight = gmp_add('4', '4'); // Or strings
$twelve = gmp_add($four, $eight); // Or GMP resources

// Raising a number to a power
$pow = gmp_pow(2, 10);
// Computing large factorials very quickly
$factorial = gmp_fact(20);
// Finding a GCD
$gcd = gmp_gcd(123, 456);
// Other fancy mathematical stuff
$legendre = gmp_legendre(1, 7);

?>
```

The BCMath and GMP libraries aren’t necessarily enabled with all PHP configurations. BCMath is bundled with PHP, so it’s likely to be available. However, GMP isn’t bundled with PHP, so you’ll need to download, install it, and instruct PHP to use it during the configuration process. Check the values of function_defined('bcadd') and function_defined('gmp_init') to see if you can use BCMath and GMP.

###  PECL’s big_int library

It’s faster than BCMath, and almost as powerful as GMP. However, whereas GMP is licensed under the LGPL, big_int is under a BSD-style license.

``` php
<?php
$two = bi_from_str('2');
$four = bi_add($two, $two);
// Use bi_to_str() to get strings from big_int resources
print bi_to_str($four); // prints 4
// Computing large factorials very quickly
$factorial = bi_fact(20);

?>
```	
