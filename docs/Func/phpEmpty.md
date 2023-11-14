The empty keyword acts as a function which returns true if a variable does not exist, or if its value is considered empty. The empty keyword also evaluates expressions which are not in a variable.

A value is considered empty if its value is any of the following:

+ An empty string
+ An empty array
+ The integer 0
+ The floating point number 0.0
+ The string "0"
+ Boolean false
+ null

``` php
<?php
// A variable that does not exist
if(empty($x)) {
  echo '$x does not exist<br>';
}

// An empty integer
if(empty(0)) {
  echo '0 is empty<br>';
}

// An empty float
if(empty(0.0)) {
  echo '0.0 is empty<br>';
}

// An empty string
if(empty("")) {
  echo '"" is an empty string<br>';
}

// null
if(empty(null)) {
  echo 'null is empty<br>';
}

// A value that is not empty
if(empty('A')) {
  echo '"A" is empty<br>';
} else {
  echo '"A" is not empty<br>';
}
?>
```

## isset() function

The isset() function checks whether a variable is set, which means that it has to be declared and is not NULL.

This function returns true if the variable exists and is not NULL, otherwise it returns false.

Note: If multiple variables are supplied, then this function will return true only if all of the variables are set.

Tip: A variable can be unset with the unset() function.

``` php
<?php
$a = 0;
// True because $a is set
if (isset($a)) {
  echo "Variable 'a' is set.<br>";
}

$b = null;
// False because $b is NULL
if (isset($b)) {
  echo "Variable 'b' is set.";
}
?>
```