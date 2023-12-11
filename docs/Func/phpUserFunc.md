+ A function is a block of statements that can be used repeatedly in a program.
+ A function will not execute automatically when a page loads.
+ A function will be executed by a call to the function.


A PHP function is made of three things:

1. Its code
2. Its documentation (using PHPDoc)
3. Its prototype

In PHP, a function prototype (also called “signature”) is made of the name, arguments and, since PHP 7, its return type.

Arguments can be typed, we call this “type-hint”, and since PHP 7 we can type an argument with scalar types (bool, int, string…), but since early PHP has objects, we can type-hint with a class. Also, arguments can have a default value.

When you want to access the values passed to a function.

```php
<?php
//Use the names from the function prototype:
function commercial_sponsorship($letter, $number) {
 print "This episode of Sesame Street is brought to you by ";
 print "the letter $letter and number $number.\n";
}
commercial_sponsorship('G', 3);
$another_letter = 'X';
$another_number = 15;
commercial_sponsorship($another_letter, $another_number);
?>
```


## Create a User Defined Function

```php
<?php
function writeMsg() {
  echo "Hello world!";
}

writeMsg(); // call the function
?>
```	

##  Arguments

Information can be passed to functions through arguments. 

Arguments are specified after the function name, inside the parentheses. You can add as many arguments as you want, just separate them with a comma.

```php
<?php
function familyName($fname) {
  echo "$fname Refsnes.<br>";
}

familyName("Jani");
familyName("Hege");
familyName("Stale");
familyName("Kai Jim");
familyName("Borge");
?>
```

```php
<?php
function familyName($fname, $year) {
  echo "$fname Refsnes. Born in $year <br>";
}

familyName("Hege", "1975");
familyName("Stale", "1978");
familyName("Kai Jim", "1983");
?>
```
### PHP is a Loosely Typed Language
In the example above, notice that we did not have to tell PHP which data type the variable is.

PHP automatically associates a data type to the variable, depending on its value. Since the data types are not set in a strict sense, you can do things like adding a string to an integer without causing an error.

In PHP 7, type declarations were added. This gives us an option to specify the expected data type when declaring a function, and by adding the strict declaration, it will throw a "Fatal Error" if the data type mismatches.

``` php
<?php
function addNumbers(int $a, int $b) {
  return $a + $b;
}
echo addNumbers(5, "5 days");
// since strict is NOT enabled "5 days" is changed to int(5), and it will return 10
?>
```

To specify strict we need to set declare(strict_types=1);. This must be on the very first line of the PHP file.

```php
<?php declare(strict_types=1); // strict requirement

function addNumbers(int $a, int $b) {
  return $a + $b;
}
echo addNumbers(5, "5 days");
// since strict is enabled and "5 days" is not an integer, an error will be thrown
?>
```

### Default Parameter Values

``` php
<?php declare(strict_types=1); // strict requirement
function setHeight(int $minheight = 50) {
  echo "The height is : $minheight <br>";
}

setHeight(350);
setHeight(); // will use the default value of 50
setHeight(135);
setHeight(80);
?>
```

There are two important things to remember when assigning default values. First, all parameters with default values must appear after parameters without defaults. Otherwise, PHP can’t tell which parameters are omitted and should take the default value and which arguments are overriding the default.

```php
<?php
function wrap_in_html_tag($tag = 'strong', $text)
{
  return "<$tag>$text</$tag>";
}
echo wrap_in_html_tag('p', 'Hello World');
echo wrap_in_html_tag('em', 'Hello World');
?>
```

If you do this and pass wrap_in_html_tag() only a single argument, PHP assigns the value to $tag and issues a warning complaining of a missing second argument.

Second, the assigned value must be a constant, such as a string or a number. It can’t be a variable. Again, using wrap_in_html_tag(), such as our example, you can’t do this:

```php
<?php
$my_favorite_html_tag = 'blink';
function wrap_in_html_tag($text, $tag = $my_favorite_html_tag) {
 return "<$tag>$text</$tag>";
}
echo wrap_in_html_tag('Hello World');
echo wrap_in_html_tag('Hello World', 'blink');
?>
```

If you want to assign a default of nothing, one solution is to assign the empty string to your parameter:

```php
<?php
function wrap_in_html_tag($text, $tag = '') {
 if (empty($tag)) { return $text; }
 return "<$tag>$text</$tag>";
}
echo wrap_in_html_tag('Hello World');
echo wrap_in_html_tag('Hello World', 'blink');
?>
```

This function returns the original string, if no value is passed in for the $tag. If a nonempty tag is passed in, it returns the string wrapped inside of tags.

## Returning values
To let a function return a value, use the return statement

```php
<?php
function sum(int $x, int $y) {
  return $x + $y;
}   
echo sum(5, 5);
?>
```

### PHP Return Type Declarations

PHP 7 also supports Type Declarations for the return statement. Like with the type declaration for function arguments, by enabling the strict requirement, it will throw a "Fatal Error" on a type mismatch.

To declare a type for the function return, add a colon ( : ) and the type right before the opening curly ( /{ )bracket when declaring the function.

```php 
<?php declare(strict_types=1); // strict requirement
function addNumbers(float $a, float $b) : float {
  return $a + $b;
}
echo addNumbers(1.2, 5.2);
?>
```

```php	
<?php declare(strict_types=1); // strict requirement
function addNumbers(float $a, float $b) : int {
  return (int)($a + $b);
}
echo addNumbers(1.2, 5.2);
?>
```

## Passing Arguments by Reference
In PHP, arguments are usually passed by value, which means that a copy of the value is used in the function and the variable that was passed into the function cannot be changed.

When a function argument is passed by reference, changes to the argument also change the variable that was passed in. To turn a function argument into a reference, the & operator is used

```php
<?php
function add_five(&$value) {
  $value += 5;
}

$num = 2;
add_five($num);
echo $num;
?>
```

## Returning Values by Reference

When you want to return a value by reference, not by value. This allows you to avoid making a duplicate copy of a variable.

The syntax for returning a variable by reference is similar to passing it by reference. However, instead of placing an & before the parameter, place it before the name of the function:

```php
<?php
function &array_find_value($needle, &$haystack) {
 foreach ($haystack as $key => $value) {
 if ($needle == $value) {
 return $haystack[$key];
 }
 }
}
?>
```

Also, you must use the =& assignment operator instead of plain = when invoking the function:

```php
<?php
$band =& array_find_value('The Doors', $artists);
echo $band;
?>
```

##  Returning More Than One Value

Return an array and use list() to separate elements:

```php
<?php
function array_stats($values) {
 $min = min($values);
 $max = max($values);
 $mean = array_sum($values) / count($values);
 return array($min, $max, $mean);
}
$values = array(1,3,5,9,13,1442);
list($min, $max, $mean) = array_stats($values);
echo "Min: $min, Max: $max, Mean: $mean";
?>
```



## PHP callable Keyword

Use callable to require a callback function as an argument.

The callable keyword is used to force a function argument to be a reference to a function.

A callable can be one of the following:

+ An anonymous function
+ A string containing the name of a function
+ An array describing a static class method
+ An array describing an object method

```php
<?php
function printFormatted(callable $format, $str) {
  echo $format($str);
  echo "<br>";
}

function exclaim($str) { return $str . "!"; }
printFormatted("exclaim", "Hello World");
?>
```

## Creating Dynamic Functions

When you want to create and define a function as your program is running. Use the closure syntax to define a function and store it in a variable:

```php
<?php
$increment = 7;
$add = function($i, $j) use ($increment) { return $i + $j + $increment; };
$sum = $add(1, 2);
echo $sum;
?>
```

$sum is now 10. If you are using a version of PHP earlier than 5.3.0, use create_function() instead:

```php
<?php
$increment = 7;
$add = create_function('$i,$j', 'return $i+$j + ' . $increment. ';');
$sum = $add(1, 2);
echo $sum;
?>
```