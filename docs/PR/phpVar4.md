## Variable Handling Functions
The PHP variable handling functions are part of the PHP core. No installation is required to use these functions.

|                   Function                    |                              Description                              |
| --------------------------------------------- | --------------------------------------------------------------------- |
| boolval()                                     | Returns the boolean value of a variable                               |
| debug_zval_dump()                             | Dumps a string representation of an internal zend value to output     |
| doubleval()                                   | Alias of floatval()                                                   |
| [empty()](../Func/phpEmpty.md)                | Checks whether a variable is empty                                    |
| floatval()                                    | Returns the float value of a variable                                 |
| get_defined_vars()                            | Returns all defined variables, as an array                            |
| get_resource_type()                           | Returns the type of a resource                                        |
| gettype()                                     | Returns the type of a variable                                        |
| intval()                                      | Returns the integer value of a variable                               |
| is_array()                                    | Checks whether a variable is an array                                 |
| is_bool()                                     | Checks whether a variable is a boolean                                |
| is_callable()                                 | Checks whether the contents of a variable can be called as a function |
| is_countable()                                | Checks whether the contents of a variable is a countable value        |
| is_double()                                   | Alias of is_float()                                                   |
| is_float()                                    | Checks whether a variable is of type float                            |
| is_int()                                      | Checks whether a variable is of type integer                          |
| is_integer()                                  | Alias of is_int()                                                     |
| is_iterable()                                 | Checks whether the contents of a variable is an iterable value        |
| is_long()                                     | Alias of is_int()                                                     |
| is_null()                                     | Checks whether a variable is NULL                                     |
| is_numeric()                                  | Checks whether a variable is a number or a numeric string             |
| is_object()                                   | Checks whether a variable is an object                                |
| is_real()                                     | Alias of is_float()                                                   |
| is_resource()                                 | Checks whether a variable is a resource                               |
| is_scalar()                                   | Checks whether a variable is a scalar                                 |
| is_string()                                   | Checks whether a variable is of type string                           |
| [isset()](../Func/phpEmpty.md#isset-function) | Checks whether a variable is set (declared and not NULL)              |
| [print_r()](#print_r)                         | Prints the information about a variable in a human-readable way       |
| [serialize()](#serialize)                     | Converts a storable representation of a value                         |
| settype()                                     | Converts a variable to a specific type                                |
| strval()                                      | Returns the string value of a variable                                |
| [unserialize()](#unserialize)                 | Converts serialized data back into actual data                        |
| [unset()](#unset)                             | Unsets a variable                                                     |
| [var_dump()](#var_dump)                       | Dumps information about one or more variables                         |
| [var_export() ](#var_export)                  | Returns structured information (valid PHP code) about a variable      |

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
|  Type   |                       Value                       |
| ------- | ------------------------------------------------- |
| integer | 0                                                 |
| double  | 0.0                                               |
| string  | “” (empty string)                                 |
| string  | “0”                                               |
| boolean | false                                             |
| array   | array() (empty array)                             |
| null    | NULL                                              |
| object  | An object with no properties, only prior to PHP 5 |


## Dumping Variable Contents as Strings

When you want to inspect the values stored in a variable. It may be a complicated nested array or object, so you can’t just print it out or loop through it.

Use var_dump(), print_r(), or var_export(), depending on exactly what you need.
The var_dump() and print_r() functions provide different human-readable representations of variables.

### print_r()

The print_r() function is a little more concise:

```php
<?php
$info = array('name' => 'frank', 12.6, array(3, 4));
print_r($info);
?>
```

prints:

```
Array
(
 [name] => frank
 [0] => 12.6
 [1] => Array
 (
 [0] => 3
 [1] => 4
 )
)
```

### var_dump()


```php
<?php
$info = array('name' => 'frank', 12.6, array(3, 4));
var_dump($info);
?>
```

prints:

```
array (
 'name' => 'frank',
 0 => 12.6,
 1 =>
 array (
 0 => 3,
 1 => 4,
 ),
)
```


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

### var_export()

The var_export() function outputs or returns structured information about a variable.

This function works similar to var_dump(), except that the returned value for this function is valid PHP code.

```php
<?php

$a = 32;
echo var_export($a) . "<br>";

$b = "Hello world!";
echo var_export($b) . "<br>";

$c = 32.5;
echo var_export($c) . "<br>";

$d = array("red", "green", "blue");
echo var_export($d) . "<br>";

$e = array(32, "Hello world!", 32.5, array("red", "green", "blue"));
echo var_export($e) . "<br>";

?>
```

```php
32
'Hello world!'
32.5
array ( 0 => 'red', 1 => 'green', 2 => 'blue', )
array ( 0 => 32, 1 => 'Hello world!', 2 => 32.5, 3 => array ( 0 => 'red', 1 => 'green', 2 => 'blue', ), )
```

## Creating a Dynamic Variable Name

When you want to construct a variable’s name dynamically. For example, you want to use variable names that match the field names from a database query.

Use PHP’s [variable variable](https://www.php.net/language.variables.variable) syntax by prepending a $ to a variable whose value is the variable name you want:

```php
<?php
$animal = 'turtles';
$turtles = 103;
print $$animal;
?>
```

This prints:

```
103
```

Placing two dollar signs before a variable name causes PHP to dereference the right variable name to get a value. It then uses that value as the name of your real variable. The preceding example prints 103 because $animal = turtles, so $$animal is $tur
tles, which equals 103. Using curly braces, you can construct more complicated expressions that indicate variable names:

```php
<?php
$stooges = array('Moe','Larry','Curly');
$stooge_moe = 'Moses Horwitz';
$stooge_larry = 'Louis Feinberg';
$stooge_curly = 'Jerome Horwitz';
foreach ($stooges as $s) {
 print "$s's real name was ${'stooge_'.strtolower($s)}.\n";
}
?>
```

PHP evaluates the expression between the curly braces and uses it as a variable name.
That expression can even have function calls in it, such as strtolower().

Variable variables are also useful when iterating through similarly named variables. Say you are querying a database table that has fields named title_1, title_2, etc. If you want to check if a title matches any of those values, the easiest way is to loop through them like this:

```php
<?php
for ($i = 1; $i <= $n; $i++) {
 $t = "title_$i";
 if ($title == $$t) { /* match */ }
}
?>
```

Of course, it would be more straightforward to store these values in an array, but if you are maintaining old code that uses this technique (and you can’t change it), variable variables are helpful.
The curly brace syntax is also necessary in resolving ambiguity about array elements.
The variable variable $$donkeys[12] could have two meanings. The first is take what’s in the 12th element of the $donkeys array and use that as a variable name. 

Write this as:\${$donkeys[12]}. 

The second is use what’s in the scalar $donkeys as an array name and look in the 12th element of that array. 

Write this as: \${$donkeys}[12].


You are not limited by two dollar signs. You can use three, or more, but in practice it’s rare to see greater than two levels of indirection.

## Encapsulating Complex Data Types in a String

When you want a string representation of an array or object for storage in a file or database.
This string should be easily reconstitutable into the original array or object.

### serialize()

Use serialize() to encode variables and their values into a textual form:

```php
<?php
$pantry = array('sugar' => '2 lbs.','butter' => '3 sticks');
$fp = fopen('/tmp/pantry','w') or die ("Can't open pantry");
fputs($fp,serialize($pantry));
fclose($fp);
?>
```

### unserialize()

To re-create the variables, use unserialize():

```php
<?php
// $new_pantry will be the array:
// array('sugar' => '2 lbs.','butter' => '3 sticks'
$new_pantry = unserialize(file_get_contents('/tmp/pantry'));
?>
```

For easier interoperability with other languages (at a slight performance cost), use [json_encode()](../Func/phpJSON.md#json_encode) to serialize data:

```php
<?php
$pantry = array('sugar' => '2 lbs.','butter' => '3 sticks');
$fp = fopen('/tmp/pantry.json','w') or die ("Can't open pantry");
fputs($fp,json_encode($pantry));
fclose($fp);
?>
```

And use [json_decode()](../Func/phpJSON.md#json_decode) to re-create the variables:

```php
<?php
// $new_pantry will be the array:
// array('sugar' => '2 lbs.','butter' => '3 sticks')
$new_pantry = json_decode(file_get_contents('/tmp/pantry.json'), TRUE);
?>
```

The PHP serialized string that is reconstituted into $pantry looks like:

```php

a:2:{s:5:"sugar";s:6:"2 lbs.";s:6:"butter";s:8:"3 sticks";}

```
The JSON-encoded version looks like:

```json
{"sugar":"2 lbs.","butter":"3 sticks"}
```

The extra business in the serialized string that’s not in the JSON string encodes the types and lengths of the values. This makes it uglier to look at but a little faster to decode. If you’re just shuttling data among PHP applications, native serialization is great. If you need to work with other languages, use JSON instead.

Both native serialization and JSON store enough information to bring back all the values in the array, but the variable name itself isn’t stored in either serialized representation.
JSON can’t distinguish between objects and associative arrays in its serialization format, so you have to choose which you want when you call json_decode(). A second argument of true, as in the previous example, produces associative arrays. Without that argument, the same JSON would be decoded into an object of class stdClass with two properties: sugar and butter.

When passing serialized data from page to page in a URL, call urlencode() on the data to make sure URL metacharacters are escaped in it:

```php
<?php
$shopping_cart = array('Poppy Seed Bagel' => 2,
 'Plain Bagel' => 1,
 'Lox' => 4);
print '<a href="next.php?cart='.urlencode(serialize($shopping_cart)).
 '">Next</a>';
?>
```

Serialized data going into a database always needs to be escaped as well.

When you unserialize an object, PHP automatically invokes its __wakeUp() method.
This allows the object to reestablish any state that’s not preserved across serialization, such as database connection. This can alter your environment, so be sure you know what you’re unserializing.