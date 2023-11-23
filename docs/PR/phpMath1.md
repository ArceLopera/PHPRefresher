##  Comparing Floating-Point Numbers

Floating-point numbers are represented in binary form with only a finite number of bits for the mantissa and the exponent. You get overflows when you exceed those bits. As a result, sometimes PHP (just like some other languages) doesn’t believe that two equal numbers are actually equal because they may differ toward the very end. To avoid this problem, instead of checking if $a == $b, make sure the first number is within a very small amount ($delta) of the second one. The size of your delta should be the smallest amount of difference you care about between two numbers. Then use [abs()](#abs) to get the absolute value of the difference.

``` php
<?php
$a = 1.00000001;
$b = 1.00000000;	
$delta = 0.00001;

if (abs($a - $b) < $delta) {
    echo "The numbers are almost equal";
}
?>
```

## Most Common Functions
### pi()
The pi() function returns the value of PI.

``` php
<?php
echo(pi()); // returns 3.1415926535898
?>
```

### min() and max() 
The min() and max() functions can be used to find the lowest or highest value in a list of arguments.

``` php
<?php
echo(min(1, 2, 3)); // returns 1
echo(max(1, 2, 3)); // returns 3
?>
```

### floor() and ceil()
The floor() and ceil() functions can be used to round a number down or up.

``` php
<?php
echo(floor(3.7)); // returns 3
echo(ceil(3.1)); // returns 4
?>
```

### abs() 
The abs() function returns the absolute value of a number.

``` php
<?php
echo(abs(-3.7)); // returns 3.7
?>
```

### sqrt()
The sqrt() function returns the square root of a number.

``` php
<?php
echo(sqrt(9)); // returns 3
?>
```

### round() 
The round() function rounds a number to the nearest integer.

``` php
<?php
echo(round(3.7)); // returns 4
?>
```

If a number falls exactly between two integers, PHP rounds away from 0:
``` php
<?php
$number = round(2.5);
printf("Rounding a positive number rounds up: %s\n", $number);
$number = round(-2.5);
printf("Rounding a negative number rounds down: %s\n", $number);
?>
``` 
``` 
Rounding a positive number rounds up: 3
Rounding a negative number rounds down: -3
``` 

To keep a set number of digits after the decimal point, round() accepts an optional precision argument. For example, perhaps you are calculating the total price for the items in a user’s shopping cart:

``` php
<?php
$cart = 54.23;
$tax = $cart * .05;
$total = $cart + $tax;
$final = round($total, 2);
print "Tax calculation uses all the digits it needs: $total, but ";
print "round() trims it to two decimal places: $final";

?>
```

``` 
Tax calculation uses all the digits it needs: 56.9415, but 
round() trims it to two decimal places: 56.94
```

### rand() 
The rand() function generates a random number.

``` php
<?php
echo(rand(1, 10)); // returns a random number between 1 and 10 (inclusive)
?>
```

mt_rand() is less predictable and faster than rand().

``` php
<?php
$lower = 65;
$upper = 97;
// random number between $upper and $lower, inclusive
$random_number = mt_rand($lower, $upper);

?>
```
### mt_srand()

The mt_srand() function is used to seed the random number generator.
When you want to make the random number generate predictable numbers so you can guarantee repeatable behavior. 

Seed the random number generator with a known value using mt_srand() (or srand()):

``` php
<?php
function pick_color() {
 $colors = array('red','orange','yellow','blue','green','indigo','violet');
 $i = mt_rand(0, count($colors) - 1);
 return $colors[$i];
}
mt_srand(34534);
$first = pick_color();
$second = pick_color();
// Because a specific value was passed to mt_srand(), we can be
// sure the same colors will get picked each time: red and yellow
print "$first is red and $second is yellow.";

?>
```

For unpredictable random numbers, letting PHP generate the seed is perfect. But seeding your random number generator with a known value is useful when you want the random number generator to generate a predictable series of values. This is handy when writing tests for your code. If you are writing a unit test to verify the behavior of a function that retrieves a random element from an array, the condition you’re testing for will change each time the test runs if your numbers are really random. But by calling
mt_srand() (or srand()) with a specific value at the beginning of your test, you can ensure that the sequence of random numbers that is generated is the same each time the test is run.

### Generating Biased Random Numbers

You want to generate random numbers, but you want these numbers to be somewhat biased, so that numbers in certain ranges appear more frequently than others. For example, you want to spread out a series of banner ad impressions in proportion to the number of impressions remaining for each ad campaign.


``` php
<?php
// returns the weighted randomly selected key
function rand_weighted($numbers) {
 $total = 0;
 foreach ($numbers as $number => $weight) {
 $total += $weight;
 $distribution[$number] = $total;
 }
 $rand = mt_rand(0, $total - 1);
 foreach ($distribution as $number => $weights) {
 if ($rand < $weights) { return $number; }
 }
}

?>
```

With a generator in PHP 5.5, you could select the weighted random number without having to build the distribution array first:

``` php
<?php
function incremental_total($numbers) {
 $total = 0;
 foreach ($numbers as $number => $weight) {
 $total += $weight;
 yield $number => $total;
 }
}
// returns the weighted randomly selected key
function rand_weighted_generator($numbers) {
 $total = array_sum($numbers);
 $rand = mt_rand(0, $total - 1);
 foreach (incremental_total($numbers) as $number => $weight) {
 if ($rand < $weight) { return $number; }
 }
}

?>

```


##  Converting Between Bases

### base_convert()

The PHP base_convert() function converts a number from one base to another. The base_convert() function changes a string representing a number in one base to the correct string in another base. It works for all bases from 2 to 36 inclusive, using the letters a through z as additional symbols for bases above 10. The first argument is the number to be converted, followed by the base it is in and the base you want it to become.

There are also a few specialized functions for conversions to and from base 10 and the most commonly used other bases of 2, 8, and 16. They’re bindec() and decbin(), octdec() and decoct(), and hexdec() and dechex():

``` php
<?php
echo base_convert(100, 10, 2); // outputs 1100100
// hexadecimal number (base 16)
$hex = 'a1';
// convert from base 16 to base 10
// $decimal is '161'
$decimal = base_convert($hex, 16, 10);
// convert from base 2 to base 10
// $a = 27
$a = bindec(11011);
// convert from base 8 to base 10
// $b = 27
$b = octdec(33);
// convert from base 16 to base 10
// $c = 27
$c = hexdec('1b');
// convert from base 10 to base 2
// $d = '11011'
$d = decbin(27);
// $e = '33'
$e = decoct(27);
// $f = '1b'
$f = dechex(27);
?>
```

Note that the specialized functions that convert to base 10 return integers. The functions that convert from base 10 return strings.

Another alternative is to use the [printf()](../PR/phpStr1.md#printf) family of functions.



## All Math Functions
The PHP math functions are part of the PHP core. No installation is required to use these functions.


### Base Conversion

|Function|	Description|
| -------- | -------- |
|[base_convert()](#base_convert)|	Converts a number from one number base to another|
|bindec()|	Converts a binary number to a decimal number|
|decbin()|	Converts a decimal number to a binary number|
|dechex()|	Converts a decimal number to a hexadecimal number|
|hexdec()|	Converts a hexadecimal number to a decimal number|
|decoct()|	Converts a decimal number to an octal number|
|octdec()|	Converts an octal number to a decimal number|
|deg2rad()|	Converts a degree value to a radian value|
|rad2deg()|	Converts a radian value to a degree value|


### Trigonometric Functions

|Function|	Description|
| -------- | -------- |
|acos()|	Returns the arc cosine of a number|
|acosh()|	Returns the inverse hyperbolic cosine of a number|
|asin()|	Returns the arc sine of a number|
|asinh()|	Returns the inverse hyperbolic sine of a number|
|atan()|	Returns the arc tangent of a number in radians|
|atan2()|	Returns the arc tangent of two variables x and y|
|atanh()|	Returns the inverse hyperbolic tangent of a number|
|cos()|	Returns the cosine of a number|
|cosh()|	Returns the hyperbolic cosine of a number|
|hypot()|	Calculates the hypotenuse of a right-angle triangle|
|sin()|	Returns the sine of a number|
|sinh()|	Returns the hyperbolic sine of a number|
|tan()|	Returns the tangent of a number|
|tanh()|	Returns the hyperbolic tangent of a number|

### Random Number Functions

|Function|	Description|
| -------- | -------- |
|getrandmax()|	Returns the largest possible value returned by rand()|
|lcg_value()|	Returns a pseudo random number in a range between 0 and 1|
|mt_getrandmax()|	Returns the largest possible value returned by mt_rand()|
|[mt_rand()](#rand)|	Generates a random integer using Mersenne Twister algorithm|
|[mt_srand()](#mt_srand)|	Seeds the Mersenne Twister random number generator|
|[rand()](#rand)|	Generates a random integer|
|[srand()](#mt_srand)|	Seeds the random number generator|


### Power Functions

|Function|	Description|
| -------- | -------- |
|exp()|	Calculates the exponent of e|
|expm1()|	Returns exp(x) - 1|
|log()|	Returns the natural logarithm of a number|
|log10()|	Returns the base-10 logarithm of a number|
|log1p()|	Returns log(1+number)|
|pow()	|Returns x raised to the power of y|
|[sqrt()](#sqrt)|	Returns the square root of a number|

### Miscellaneous Functions

|Function|	Description|
| -------- | -------- |
|[abs()](#abs)|	Returns the absolute (positive) value of a number|
|[ceil()](#floor-and-ceil)|	Rounds a number up to the nearest integer|
|[floor()](#floor-and-ceil)|	Rounds a number down to the nearest integer|
|fmod()|	Returns the remainder of x/y|
|intdiv()|	Performs integer division|
|is_finite()|	Checks whether a value is finite or not|
|is_infinite()|	Checks whether a value is infinite or not|
|is_nan()	|Checks whether a value is 'not-a-number'|
|[max()](#min-and-max)|	Returns the highest value in an array, or the highest value of several specified values|
|[min()](#min-and-max)|	Returns the lowest value in an array, or the lowest value of several specified values|
|[pi()](#pi)|	Returns the value of PI|
|[round()](#round)|	Rounds a floating-point number|




## Predefined Math Constants
|Constant	|Value|	Description|
|--------|--------|--------|
|INF|INF|	The infinite|
|M_E|	2.7182818284590452354|	Returns e|
|M_EULER|	0.57721566490153286061|	Returns Euler constant|
|M_LNPI|	1.14472988584940017414|	Returns the natural logarithm of PI: log_e(pi)|
|M_LN2|	0.69314718055994530942	|Returns the natural logarithm of 2: log_e 2|
|M_LN10|	2.30258509299404568402|	Returns the natural logarithm of 10: log_e 10|
|M_LOG2E|	1.4426950408889634074|	Returns the base-2 logarithm of E: log_2 e|
|M_LOG10E|	0.43429448190325182765|	Returns the base-10 logarithm of E: log_10 e|
|M_PI|	3.14159265358979323846	|Returns Pi|
|M_PI_2|	1.57079632679489661923|	Returns Pi/2|
|M_PI_4|	0.78539816339744830962|	Returns Pi/4|
|M_1_PI|	0.31830988618379067154|	Returns 1/Pi|
|M_2_PI|	0.63661977236758134308|	Returns 2/Pi|
|M_SQRTPI|	1.77245385090551602729|	Returns the square root of PI: sqrt(pi)|
|M_2_SQRTPI|	1.12837916709551257390	|Returns 2/square root of PI: 2/sqrt(pi)|
|M_SQRT1_2|	0.70710678118654752440	|Returns the square root of 1/2: 1/sqrt(2)|
|M_SQRT2|	1.41421356237309504880|	Returns the square root of 2: sqrt(2)|
|M_SQRT3|	1.73205080756887729352|	Returns the square root of 3: sqrt(3)|
|NAN|	NAN|	Not A Number|
|PHP_ROUND_HALF_UP	|1|	Round halves up|
|PHP_ROUND_HALF_DOWN|	2|	Round halves down|
|PHP_ROUND_HALF_EVEN|	3|	Round halves to even numbers
|PHP_ROUND_HALF_ODD	|4|	Round halves to odd numbers|