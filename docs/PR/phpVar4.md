## Variable Handling Functions
The PHP variable handling functions are part of the PHP core. No installation is required to use these functions.

|Function|	Description|
|--------|-----------|
|boolval()|	Returns the boolean value of a variable|
|debug_zval_dump()|	Dumps a string representation of an internal zend value to output|
|doubleval()|	Alias of floatval()|
|[empty()](../Func/phpEmpty.md)|	Checks whether a variable is empty|
|floatval()|	Returns the float value of a variable|
|get_defined_vars()|	Returns all defined variables, as an array|
|get_resource_type()|	Returns the type of a resource|
|gettype()|	Returns the type of a variable|
|intval()|	Returns the integer value of a variable|
|is_array()|	Checks whether a variable is an array|
|is_bool()|	Checks whether a variable is a boolean|
|is_callable()|	Checks whether the contents of a variable can be called as a function|
|is_countable()|	Checks whether the contents of a variable is a countable value|
|is_double()|	Alias of is_float()|
|is_float()|	Checks whether a variable is of type float|
|is_int()|	Checks whether a variable is of type integer|
|is_integer()|	Alias of is_int()|
|is_iterable()|	Checks whether the contents of a variable is an iterable value|
|is_long()|	Alias of is_int()|
|is_null()|	Checks whether a variable is NULL|
|is_numeric()|	Checks whether a variable is a number or a numeric string|
|is_object()|	Checks whether a variable is an object|
|is_real()|	Alias of is_float()|
|is_resource()|	Checks whether a variable is a resource|
|is_scalar()|	Checks whether a variable is a scalar|
|is_string()|	Checks whether a variable is of type string|
|[isset()](../Func/phpEmpty.md#isset-function)|	Checks whether a variable is set (declared and not NULL)|
|print_r()|	Prints the information about a variable in a human-readable way|
|serialize()|	Converts a storable representation of a value|
|settype()|	Converts a variable to a specific type|
|strval()|	Returns the string value of a variable|
|unserialize()|	Converts serialized data back into actual data|
|[unset()](#unset)|	Unsets a variable|
|[var_dump()](#var_dump)	|Dumps information about one or more variables|
|var_export()|	Returns structured information (valid PHP code) about a variable|

### unset()

A variable is either set or unset. A variable with any value assigned to it, true or false, empty or nonempty, is set. The function isset() returns true when passed a variable that’s set. To turn a variable that’s set into one that’s unset, call unset() on the variable or assign null to the variable. Scalars, arrays, and objects can all be passed to unset(). You can also pass unset() multiple variables to unset them all:


```php
<?php
unset($vegetables);
unset($fruits[12]);
unset($earth, $moon, $stars);

?>
```

All unset variables are also empty. Set variables may be empty or nonempty. Empty
variables have values that evaluate to false as a boolean.




```php
<?php
$a = "Hello world!";
echo "The value of variable 'a' before unset: " . $a . "<br>";
unset($a);
echo "The value of variable 'a' after unset: " . $a;
?>
```

#### Values that evaluate to false
|Type| Value|
|---|---|
|integer| 0|
|double| 0.0|
|string| “” (empty string)|
|string| “0”|
|boolean| false|
|array| array() (empty array)|
|null| NULL|
|object| An object with no properties, only prior to PHP 5|


### var_dump()

Dump information about different variables.


```php
<?php

$a = 32;
echo var_dump($a) . "<br>";

$b = "Hello world!";
echo var_dump($b) . "<br>";

$c = 32.5;
echo var_dump($c) . "<br>";

$d = array("red", "green", "blue");
echo var_dump($d) . "<br>";

$e = array(32, "Hello world!", 32.5, array("red", "green", "blue"));
echo var_dump($e) . "<br>";

// Dump two variables
echo var_dump($a, $b) . "<br>";

?>
```