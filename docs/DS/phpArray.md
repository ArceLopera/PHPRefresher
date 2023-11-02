An array stores multiple values in one single variable.

``` php
<?php
$cars = array("Volvo", "BMW", "Toyota");
echo "I like " . $cars[0] . ", " . $cars[1] . " and " . $cars[2] . ".";
?>
```

## Create an Array in PHP
In PHP, the array() function is used to create an array:
```php	
array();
```	
In PHP, there are three types of arrays:

+ [Indexed arrays](#php-indexed-arrays) - Arrays with a numeric index
+ [Associative arrays](#php-associative-arrays) - Arrays with named keys
+ [Multidimensional arrays](#php-multidimensional-arrays) - Arrays containing one or more arrays

## PHP Indexed Arrays
There are two ways to create indexed arrays:

The index can be assigned automatically (index always starts at 0), like this:

$cars = array("Volvo", "BMW", "Toyota");
or the index can be assigned manually:

$cars[0] = "Volvo";
$cars[1] = "BMW";
$cars[2] = "Toyota";

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
echo "I like " . $cars[0] . ", " . $cars[1] . " and " . $cars[2] . ".";
?>
```

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
$arrlength = count($cars);
for($x = 0; $x < $arrlength; $x++) {
    echo $cars[$x];
    echo "<br>";
}
?>
```

## PHP Associative Arrays
Associative arrays are arrays with named keys.

There are two ways to create an associative array: 

``` php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
```
or:
``` php
$age['Peter'] = "35";
$age['Ben'] = "37";
$age['Joe'] = "43";
```

```php
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
echo "Peter is " . $age['Peter'] . " years old.";
?>
```

```php
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");

foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```	

## PHP Multidimensional Arrays
Multidimensional arrays are arrays containing one or more arrays.

```php
<?php
$cars = array
  (
  array("Volvo",22,18),
  array("BMW",15,13),
  array("Saab",5,2),
  array("Land Rover",17,15)
  );
echo $cars[0][0].": In stock: ".$cars[0][1].", sold: ".$cars[0][2].".<br>";
echo $cars[1][0].": In stock: ".$cars[1][1].", sold: ".$cars[1][2].".<br>";
echo $cars[2][0].": In stock: ".$cars[2][1].", sold: ".$cars[2][2].".<br>";
echo $cars[3][0].": In stock: ".$cars[3][1].", sold: ".$cars[3][2].".<br>";
?>
```	

```php
<?php
for ($row = 0; $row < 4; $row++) {
  echo "<p><b>Row number $row</b></p>";
  echo "<ul>";
  for ($col = 0; $col < 3; $col++) {
    echo "<li>".$cars[$row][$col]."</li>";
  }
  echo "</ul>";
}
?>
```	


## The Array Functions
The PHP array functions are used to perform operations on arrays.

All functions at the [reference](https://www.w3schools.com/php/php_ref_array.asp).

### The count() Function
The count() function is used to return the length (the number of elements) of an array.

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
echo count($cars);
?>
```	
### Sorting Arrays

+ [sort()](#sort) - sort arrays in ascending order
+ [rsort()](#rsort) - sort arrays in descending order
+ [asort()](#asort) - sort associative arrays in ascending order, according to the value
+ [ksort()](#ksort) - sort associative arrays in ascending order, according to the key
+ [arsort()](#arsort) - sort associative arrays in descending order, according to the value
+ [krsort()](#krsort) - sort associative arrays in descending order, according to the key

#### sort()
The sort() function sorts an array alphabetically.

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
sort($cars);
echo $cars[0];
?>
```

#### rsort()
The rsort() function sorts an array in descending order.

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
rsort($cars);
echo $cars[0];
?>
```

#### asort()
The asort() function sorts an associative array in ascending order, according to the value.

```php
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
asort($age);
foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```

#### ksort()
The ksort() function sorts an associative array in ascending order, according to the key.

```php
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
ksort($age);
foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```

#### arsort()
The arsort() function sorts an associative array in descending order, according to the value.

```php
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
arsort($age);
foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```

#### krsort()
The krsort() function sorts an associative array in descending order, according to the key.

```php
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
krsort($age);
foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```
