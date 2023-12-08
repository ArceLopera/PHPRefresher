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

When you want to assign a default value to a variable that doesn’t already have a value. It often happens that you want a hardcoded default value for a variable that can be overridden from form input or through an environment variable.

Use isset() to assign a default to a variable that may already have a value:

``` php
<?php
if (! isset($cars)) {
 $cars = $default_cars;
}
?>
```


Use the ternary (a ? b : c) operator to give a new variable a (possibly default) value:

``` php
<?php
$cars = isset($_GET['cars']) ? $_GET['cars'] : $default_cars;
?>
```

Using isset() is essential when assigning default values. Without it, the nondefault value can’t be 0 or anything else that evaluates to false. Consider this assignment:

``` php
<?php
$cars = isset($_GET['cars']) ? $_GET['cars'] : $default_cars;
?>
```
If $_GET['cars'] is 0, cars is set to default_cars even though 0 may be a valid value for cars.
An alternative syntax for checking arrays is the array_key_exists() function:

``` php
<?php
$cars = array_key_exists('cars', $_GET) ? $_GET['cars'] : $default_cars;
?>
```

The one difference between isset() and array_key_exists() is that when a key exists but its value is null, then array_key_exists() returns true, whereas isset() returns false:

``` php
<?php
$vehicles = array('cars' => null);
// array_key_exists() returns TRUE because the key is present.
$ake_result = array_key_exists('cars', $vehicles);
// isset() returns values because the key's value is NULL
$isset_result = isset($vehicles['cars']);
?>
```

Use an array of defaults to set multiple default values easily. The keys in the defaults array are variable names, and the values in the array are the defaults for each variable:

``` php
<?php
$defaults = array('emperors' => array('Rudolf II','Caligula'),
 'vegetable' => 'celery',
 'acres' => 15);
foreach ($defaults as $k => $v) {
 if (! isset($GLOBALS[$k])) { $GLOBALS[$k] = $v; }
}
?>
```


Because the variables are set in the global namespace, the previous code doesn’t work for setting default variables private within a function. To do that, use variable variables:

``` php
<?php
foreach ($defaults as $k => $v) {
 if (! isset($$k)) { $$k = $v; }
}
?>
```

In this example, the first time through the loop, $k is emperors, so $$k is $emperors.