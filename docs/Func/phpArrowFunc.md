The fn keyword is used to create arrow functions. Arrow functions are only available in PHP versions 7.4 and up.

Arrow functions have access to all variables from the scope in which they were created.

The general syntax of an arrow function is:
```
fn(arguments) => expression to be returned;

```

``` php
<?php
// This only works in PHP 7.4 and above
$str = "Hello World";
$my_function = fn($a) => $str . $a;
echo $my_function("!");
?>
```