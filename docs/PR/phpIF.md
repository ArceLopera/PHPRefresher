Conditional statements are used to perform different actions based on different conditions.

## PHP Conditional Statements

In PHP we have the following conditional statements:

+ [if statement](#if-statement) - executes some code if one condition is true
+ [if...else statement](#if...else-statement) - executes some code if a condition is true and another code if that condition is false
+ [if...elseif...else statement](#if...elseif...else-statement) - executes different codes for more than two conditions
+ [switch statement](#switch-statement) - selects one of many blocks of code to be executed

### if statement

``` php
<?php
$t = date("H");

if ($t < "20") {
  echo "Have a good day!";
}
?>
```

### if...else statement

``` php
<?php
$t = date("H");

if ($t < "20") {
  echo "Have a good day!";
} else {
  echo "Have a good night!";
}
?>
```

### if...elseif...else statement

``` php
<?php
$t = date("H");

if ($t < "10") {
  echo "Have a good morning!";
} elseif ($t < "20") {
  echo "Have a good day!";
} else {
  echo "Have a good night!";
}
?>
```

### switch statement

``` php
<?php
$favcolor = "red";

switch ($favcolor) {
  case "red":
    echo "Your favorite color is red!";
    break;
  case "blue":
    echo "Your favorite color is blue!";
    break;
  case "green":
    echo "Your favorite color is green!";
    break;
  default:
    echo "Your favorite color is neither red, blue, nor green!";
}
?>
```