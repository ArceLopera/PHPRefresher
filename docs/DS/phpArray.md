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

### The list Function
The list() function is used to create an array from a list of variables.

If there are not enough elements in the array it will output a notice and assign null to the remaining variables.

```php
<?php
list($a, $b, $c) = [1, 2, 3];
echo "$a is " . $a . "<br>";
echo "$b is " . $b . "<br>";
echo "$c is " . $c . "<br>";
?>
```

Since PHP 7.1.0, which elements are assigned to the variables can be selected using arrow => syntax.

```php
<?php
list(2 => $a, 0 => $b, 1 => $c) = [1, 2, 3];
echo "$a is " . $a . "<br>";
echo "$b is " . $b . "<br>";
echo "$c is " . $c . "<br>";
?>
```


## The Array Functions
The PHP array functions are used to perform operations on arrays.

### Modifying Arrays
|Function	|Description|
|---|---|
|array()|	Creates an array|
|array_chunk()|	Splits an array into chunks of arrays|
|array_combine()|	Creates an array by using the elements from one "keys" array and one "values" array|
|array_merge()|	Merges one or more arrays into one array|
|array_merge_recursive()|	Merges one or more arrays into one array recursively|
|array_pad()|	Inserts a specified number of items, with a specified value, to an array|
|array_pop()|	Deletes the last element of an array|
|array_push()|	Inserts one or more elements to the end of an array|
|array_shift()|	Removes the first element from an array, and returns the value of the removed element|
|array_splice()|	Removes and replaces specified elements of an array|
|array_unique()|	Removes duplicate values from an array|
|array_unshift()|	Adds one or more elements to the beginning of an array|
|compact()|	Create array containing variables and their values|
|range()|	Creates an array containing a range of elements|

### Update Information in Arrays
|Function	|Description|
|---|---|
|array_change_key_case()|	Changes all keys in an array to lowercase or uppercase|
|array_fill()|	Fills an array with values|
|array_fill_keys()|	Fills an array with values, specifying keys|
|array_flip()|	Flips/Exchanges all keys with their associated values in an array|
|array_map()|	Sends each value of an array to a user-made function, which returns new values|
|array_replace()|	Replaces the values of the first array with the values from following arrays|
|array_replace_recursive()|	Replaces the values of the first array with the values from following arrays recursively|
|array_walk()|	Applies a user function to every member of an array|
|array_walk_recursive()|	Applies a user function recursively to every member of an array|
|list()|	Assigns variables as if they were an array|

### Extracting Information from Arrays
|Function	|Description|
|---|---|
|array_column()|	Returns the values from a single column in the input array|
|array_count_values()|	Counts all the values of an array|
|array_filter()|	Filters the values of an array using a callback function|
|array_key_exists()|	Checks if the specified key exists in the array|
|array_keys()|	Returns all the keys of an array|
|array_product()|	Calculates the product of the values in an array|
|array_rand()|	Returns one or more random keys from an array|
|array_reduce()|	Returns an array as a string, using a user-defined function|
|array_search()|	Searches an array for a given value and returns the key|
|array_slice()|	Returns selected parts of an array|
|current()|	Returns the current element in an array|
|key()|	Returns the current key in an array|
|array_sum()|	Returns the sum of the values in an array|
|array_values()|	Returns all the values of an array|
|[count()](#count)|	Returns the number of elements in an array|
|sizeof()|	Alias of count()|
|each()|	Deprecated from PHP 7.2. Returns the current key and value pair from an array|
|extract()| Imports variables into the current symbol table from an array|
|in_array()|	Checks if a specified value exists in an array|

#### count()
The count() function is used to return the length (the number of elements) of an array.

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
echo count($cars);
?>
```	

### Comparing Arrays
|Function	|Description|
|---|---|
|array_diff()|	Compare arrays, and returns the differences (compare values only)|
|array_diff_assoc()|	Compare arrays, and returns the differences (compare keys and values)|
|array_diff_key()|	Compare arrays, and returns the differences (compare keys only)|
|array_diff_uassoc()|	Compare arrays, and returns the differences (compare keys and values, using a user-defined key comparison function)|
|array_diff_ukey()|	Compare arrays, and returns the differences (compare keys only, using a user-defined key comparison function)|
|array_intersect()|	Compare arrays, and returns the matches (compare values only)|
|array_intersect_assoc()|	Compare arrays and returns the matches (compare keys and values)|
|array_intersect_key()|	Compare arrays, and returns the matches (compare keys only)|
|array_intersect_uassoc()|	Compare arrays, and returns the matches (compare keys and values, using a user-defined key comparison function)|
|array_intersect_ukey()|	Compare arrays, and returns the matches (compare keys only, using a user-defined key comparison function)|
|array_udiff()|	Compare arrays, and returns the differences (compare values only, using a user-defined key comparison function)|
|array_udiff_assoc()|	Compare arrays, and returns the differences (compare keys and values, using a built-in function to compare the keys and a user-defined function to compare the values)|
|array_udiff_uassoc()|	Compare arrays, and returns the differences (compare keys and values, using two user-defined key comparison functions)|
|array_uintersect()|	Compare arrays, and returns the matches (compare values only, using a user-defined key comparison function)|
|array_uintersect_assoc()|	Compare arrays, and returns the matches (compare keys and values, using a built-in function to compare the keys and a user-defined function to compare the values)|
|array_uintersect_uassoc()|	Compare arrays, and returns the matches (compare keys and values, using two user-defined key comparison functions)|

### Pointer Functions
|Function	|Description|
|---|---|
|current()|	Returns the current element in an array|
|pos()|	Alias of current()|
|key()|	Returns the current key in an array|
|next()|	Advances the internal array pointer of an array|
|prev()|	Rewinds the internal array pointer|
|reset()|	Sets the internal pointer of an array to its first element|
|end()|	Sets the internal pointer of an array to its last element|


### Sorting Arrays
|Function	|Description|
|---|---|
|array_multisort()|	Sorts multiple or multi-dimensional arrays|
|array_reverse()|	Returns an array in the reverse order|
|[arsort()](#arsort)|	Sorts an associative array in descending order, according to the value|
|[asort()](#asort)|	Sorts an associative array in ascending order, according to the value|
|[krsort()](#krsort)	|Sorts an associative array in descending order, according to the key|
|[ksort()](#ksort) |	Sorts an associative array in ascending order, according to the key|
|natcasesort()|	Sorts an array using a case insensitive "natural order" algorithm|
|natsort()|	Sorts an array using a "natural order" algorithm|
|[rsort()](#rsort)|	Sorts an indexed array in descending order|
|shuffle()|	Shuffles an array|
|[sort()](#sort)|	Sorts an indexed array in ascending order|
|uasort()|	Sorts an array by values using a user-defined comparison function and maintains the index association|
|uksort()|	Sorts an array by keys using a user-defined comparison function|
|usort()	Sorts an array by values using a user-defined comparison function|

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
