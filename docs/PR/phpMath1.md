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

### rand() 
The rand() function generates a random number.

``` php
<?php
echo(rand(1, 10)); // returns a random number between 1 and 10 (inclusive)
?>
```

## All Math Functions
The PHP math functions are part of the PHP core. No installation is required to use these functions.


|Function|	Description|
| -------- | -------- |
|[abs()](#abs)|	Returns the absolute (positive) value of a number|
|acos()|	Returns the arc cosine of a number|
|acosh()|	Returns the inverse hyperbolic cosine of a number|
|asin()|	Returns the arc sine of a number|
|asinh()|	Returns the inverse hyperbolic sine of a number|
|atan()|	Returns the arc tangent of a number in radians|
|atan2()|	Returns the arc tangent of two variables x and y|
|atanh()|	Returns the inverse hyperbolic tangent of a number|
|base_convert()|	Converts a number from one number base to another|
|bindec()|	Converts a binary number to a decimal number|
|[ceil()](#floor-and-ceil)|	Rounds a number up to the nearest integer|
|cos()|	Returns the cosine of a number|
|cosh()|	Returns the hyperbolic cosine of a number|
|decbin()|	Converts a decimal number to a binary number|
|dechex()|	Converts a decimal number to a hexadecimal number|
|decoct()|	Converts a decimal number to an octal number|
|deg2rad()|	Converts a degree value to a radian value|
|exp()|	Calculates the exponent of e|
|expm1()|	Returns exp(x) - 1|
|[floor()](#floor-and-ceil)|	Rounds a number down to the nearest integer|
|fmod()|	Returns the remainder of x/y|
|getrandmax()|	Returns the largest possible value returned by rand()|
|hexdec()|	Converts a hexadecimal number to a decimal number|
|hypot()|	Calculates the hypotenuse of a right-angle triangle|
|intdiv()|	Performs integer division|
|is_finite()|	Checks whether a value is finite or not|
|is_infinite()|	Checks whether a value is infinite or not|
|is_nan()	|Checks whether a value is 'not-a-number'|
|lcg_value()|	Returns a pseudo random number in a range between 0 and 1|
|log()|	Returns the natural logarithm of a number|
|log10()|	Returns the base-10 logarithm of a number|
|log1p()|	Returns log(1+number)|
|[max()](#min-and-max)|	Returns the highest value in an array, or the highest value of several specified values|
|[min()](#min-and-max)|	Returns the lowest value in an array, or the lowest value of several specified values|
|mt_getrandmax()|	Returns the largest possible value returned by mt_rand()|
|mt_rand()|	Generates a random integer using Mersenne Twister algorithm|
|mt_srand()|	Seeds the Mersenne Twister random number generator|
|octdec()|	Converts an octal number to a decimal number|
|[pi()](#pi)|	Returns the value of PI|
|pow()	|Returns x raised to the power of y|
|rad2deg()|	Converts a radian value to a degree value|
|[rand()](#rand)|	Generates a random integer|
|[round()](#round)|	Rounds a floating-point number|
|sin()|	Returns the sine of a number|
|sinh()|	Returns the hyperbolic sine of a number|
|[sqrt()](#sqrt)|	Returns the square root of a number|
|srand()|	Seeds the random number generator|
|tan()|	Returns the tangent of a number|
|tanh()|	Returns the hyperbolic tangent of a number|

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