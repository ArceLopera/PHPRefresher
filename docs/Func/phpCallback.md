# PHP Callbacks

> **Last updated:** April 6, 2026  
> **Minimum PHP Version:** PHP 5.0+

## Overview

A callback function is a function which is passed as an argument into another function. Callbacks enable functional programming patterns and are fundamental to modern PHP development, especially with array functions and event systems.

## When to Use

- Processing array elements with array_map(), array_filter(), array_reduce()
- Implementing event handlers and observers
- Creating higher-order functions
- Building flexible, reusable code
- Implementing design patterns like Strategy or Command

## Basic Example

```php
<?php
function processArray($callback, $array) {
    $result = [];
    foreach ($array as $item) {
        $result[] = $callback($item);
    }
    return $result;
}

function doubleValue($num) {
    return $num * 2;
}

$numbers = [1, 2, 3, 4];
$doubled = processArray("doubleValue", $numbers);
print_r($doubled);  // Output: Array ( [0] => 2 [1] => 4 [2] => 6 [3] => 8 )
?>
```

## Advanced Example

```php
<?php
// Using array_map with callbacks
$strings = ["apple", "orange", "banana"];
$lengths = array_map("strlen", $strings);

// Using anonymous functions
$numbers = [1, 2, 3, 4, 5];
$evens = array_filter($numbers, function($n) {
    return $n % 2 === 0;
});

// Arrow functions (PHP 7.4+)
$squared = array_map(fn($x) => $x ** 2, $numbers);
?>
```

## Related Topics

- [Arrow Functions](./phpArrowFunc.md)
- [Array Functions](../DS/phpArray.md)

## PHP Version Support

**Introduced:** PHP 5.0  
**Minimum Required:** PHP 5.0+  
**Anonymous Functions:** PHP 5.3+  
**Arrow Functions:** PHP 7.4+

## See Also

- [Official PHP Callbacks Documentation](https://www.php.net/manual/en/language.types.callable.php)
- [Array Functions](https://www.php.net/manual/en/ref.array.php)

---

A callback function (often referred to as just "callback") is a function which is passed as an argument into another function.

Any existing function can be used as a callback function. To use a function as a callback function, pass a string containing the name of the function as the argument of another function:

```php
<?php
function my_callback($item) {
  return strlen($item);
}

$strings = ["apple", "orange", "banana", "coconut"];
$lengths = array_map("my_callback", $strings);
print_r($lengths);
?>
```

Starting with version 7, PHP can pass anonymous functions as callback functions:

```php
<?php
$strings = ["apple", "orange", "banana", "coconut"];
$lengths = array_map( function($item) { return strlen($item); } , $strings);
print_r($lengths);
?>
```

## Callbacks in User Defined Functions
User-defined functions and methods can also take callback functions as arguments. To use callback functions inside a user-defined function or method, call it by adding parentheses to the variable and pass arguments as with normal functions:

```php
<?php
function exclaim($str) {
  return $str . "! ";
}

function ask($str) {
  return $str . "? ";
}

function printFormatted($str, $format) {
  // Calling the $format callback function
  echo $format($str);
}

// Pass "exclaim" and "ask" as callback functions to printFormatted()
printFormatted("Hello world", "exclaim");
printFormatted("Hello world", "ask");
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

``` php
<?php
function printFormatted(callable $format, $str) {
  echo $format($str);
  echo "<br>";
}

class MyClass {
  public static function ask($str) {
    return $str . "?";
  }
  public function brackets($str) {
    return "[$str]";
  }
}

// An anonymous function
$func = function($str) { return substr($str, 0, 5); };
printFormatted($func , "Hello World");

// A string containing the name of a function
printFormatted("strtoupper", "Hello World");

// An array describing a static class method
printFormatted(["MyClass", "ask"], "Hello World");

// An array describing an object method
$obj = new MyClass();
printFormatted([$obj, "brackets"], "Hello World");
?>
```