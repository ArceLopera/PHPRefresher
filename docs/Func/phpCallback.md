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