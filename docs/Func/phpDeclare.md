The declare keyword sets an execution directive for a block of code. If the declare statement is not followed by a block then the directive applies to the rest of the code in the file.

There are three directives which can be declared: ticks, encoding and strict_types.

The ticks directive will send a tick event each time a specified number of instructions have been executed. A tick function can be registered which will run each time a tick event fires.

The encoding directive is used to indicate what character encoding the file is using. It cannot be used on a block, it has to apply to the whole file.

When the strict_types directive is set, values of the wrong type passed into function arguments with type hints will throw a fatal error instead of being cast to the correct type.

```php
//Run a function after each instruction
<?php
$count = 0;
function example() {
  global $count;
  $count++;
  echo "$count instructions executed<br>";
}

register_tick_function('example');

declare(ticks=1) {
  $cars = ["Ford", "Volvo", "BMW"];
  foreach($cars as $car) {
    echo "$car <br>";
  }
}
?>
```

``` php
//Run a function after each instruction
<?php
declare(strict_types=1);
function sum(int $a, int $b) {
  return $a + $b;
}

// Throws a fatal error because '5' is a string instead of a number
sum("5", 1);
?>
```

## enddeclare

The enddeclare keyword is used to close a declare block which was started using the declare(...): syntax.

``` php
<?php
$count = 0;
function example() {
  global $count;
  $count++;
  echo "$count instructions executed<br>";
}
register_tick_function('example');

declare(ticks=1):
  $cars = ["Ford", "Volvo", "BMW"];
  foreach($cars as $car) {
    echo "$car <br>";
  }
enddeclare;
?>
```