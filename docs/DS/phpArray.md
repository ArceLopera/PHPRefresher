An array stores multiple values in one single variable. 

In PHP, numerical arrays are associative arrays, and associative arrays are numerical arrays. So which kind are they really? Both and neither. The line between them constantly blurs back and forth from one to another. 

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

### Specifying an Array Not Beginning at Element 0

When specifying an array, you can specify the array not beginning at element 0.

```php
<?php
$presidents = array(1 => 'Washington', 'Adams', 'Jefferson', 'Madison');
?>
```

PHP even allows you to use negative numbers in the array() call. (In fact, this method works for noninteger keys, too.) What you’ll get is technically an associative array, although as we said, the line between numeric arrays and associative arrays is often blurred in PHP; this is just another one of these cases:

```php
<?php
$us_leaders = array(-1 => 'George II', 'George III', 'Washington');
// alternatively,
$us_leaders = [-1 => 'George II', 'George III', 'Washington'];
?>
```	

Of course, you can mix and match numeric and string keys in one array() definition,
but it’s confusing and very rarely needed:

```php
<?php
$presidents = array(1 => 'Washington', 'Adams', 'Honest' => 'Lincoln',
 'Jefferson');
// alternatively,
$presidents = [1 => 'Washington', 'Adams', 'Honest' => 'Lincoln', 'Jefferson'];
?>
```

``` php
<?php
$presidents[1] = 'Washington'; // Key is 1
$presidents[] = 'Adams'; // Key is 1 + 1 => 2
$presidents['Honest'] = 'Lincoln'; // Key is 'Honest'
$presidents[] = 'Jefferson'; // Key is 2 + 1 => 3
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
|[array_splice()](#array_splice)|	Removes and replaces specified elements of an array|
|array_unique()|	Removes duplicate values from an array|
|array_unshift()|	Adds one or more elements to the beginning of an array|
|compact()|	Create array containing variables and their values|
|[range()](#range)|	Creates an array containing a range of elements|

#### array_splice
The array_splice() function removes and replaces specified elements of an array.

The array_splice() function removes selected elements from an array and replaces it with new elements. The function also returns an array with the removed elements.

Tip: If the function does not remove any elements (length=0), the replaced array will be inserted from the position of the start parameter (See Example 2).

Note: The keys in the replaced array are not preserved.


```php
<?php

$a1=array("a"=>"red","b"=>"green","c"=>"blue","d"=>"yellow");
$a2=array("a"=>"purple","b"=>"orange");
array_splice($a1,0,2,$a2);
print_r($a1);

?>
```


```php
<?php
$a1=array("0"=>"red","1"=>"green");
$a2=array("0"=>"purple","1"=>"orange");
array_splice($a1,1,0,$a2);
print_r($a1);
?>
```

If you unset() an element, PHP adjusts the array so that looping still works correctly. It doesn’t compact the array to fill in the missing holes. This is what we mean when we say that all arrays are associative, even when they appear to be numeric. Here’s an example:

```php
<?php
// create a "numeric" array
$animals = array('ant', 'bee', 'cat', 'dog', 'elk', 'fox');
print $animals[1]; // prints 'bee'
print $animals[2]; // prints 'cat'
count($animals); // returns 6
// unset()
unset($animals[1]); // removes element $animals[1] = 'bee'
print $animals[1]; // prints nothing and throws an E_NOTICE error
print $animals[2]; // still prints 'cat'
count($animals); // returns 5, even though $array[5] is 'fox'
// add new element
$animals[] = 'gnu'; // add new element (not Unix)
print $animals[1]; // prints nothing, still throws an E_NOTICE error
print $animals[6]; // prints 'gnu', this is where 'gnu' ended up
count($animals); // returns 6
// assign ''
$animals[2] = ''; // zero out value
print $animals[2]; // prints ''
count($animals); // returns 6, count does not decrease
?>
```

To compact the array into a densely filled numeric array, use array_values():

```php
<?php
$animals = array_values($animals);
?>
```

Alternatively, array_splice() automatically reindexes arrays to avoid leaving holes:

```php
<?php
// create a "numeric" array
$animals = array('ant', 'bee', 'cat', 'dog', 'elk', 'fox');
array_splice($animals, 2, 2);
print_r($animals);
?>
```
```
Array
(
 [0] => ant
 [1] => bee
 [2] => elk
 [3] => fox
)

```

This is useful if you’re using the array as a queue and want to remove items from the
queue while still allowing random access. To safely remove the first or last element from
an array, use array_shift() and array_pop(), respectively.

#### range
The range() function creates an array containing a range of elements.
```php
<?php
$numbers = range(1, 10);
print_r($numbers);
?>
```



The advantage of using range() is its brevity, but this technique has a disadvantage: a large array can take up unnecessary memory.

If you want range to skip steps, provide a third argument indicating how big each step should be. For example, range(1, 10, 2) returns an array containing 1, 3, 5, 7,9. It’s also valid for $start to be larger than $end. In this case, the numbers returned by range() are in descending order.
range() can also be used to retrieve character sequences:
```php
<?php
print_r(range('l', 'p'));
?>
```

```php
<?php
Array
(
 [0] => l
 [1] => m
 [2] => n
 [3] => o
 [4] => p
)

?>
```

### Update Information in Arrays
|Function	|Description|
|---|---|
|array_change_key_case()|	Changes all keys in an array to lowercase or uppercase|
|array_fill()|	Fills an array with values|
|array_fill_keys()|	Fills an array with values, specifying keys|
|array_flip()|	Flips/Exchanges all keys with their associated values in an array|
|[array_map()](#array_map)|	Sends each value of an array to a user-made function, which returns new values|
|array_replace()|	Replaces the values of the first array with the values from following arrays|
|array_replace_recursive()|	Replaces the values of the first array with the values from following arrays recursively|
|array_walk()|	Applies a user function to every member of an array|
|array_walk_recursive()|	Applies a user function recursively to every member of an array|
|[list()](#the-list-function)|	Assigns variables as if they were an array|

#### Deleting Elements from an Array

When you want to remove one or more elements from an array. 

To delete one element, use [unset()](../PR/phpVar4.md#unset):

```php
<?php
unset($array[3]);
unset($array['foo']);
?>
```
To delete multiple noncontiguous elements, also use [unset()](../PR/phpVar4.md#unset):

```php
<?php
unset($array[3], $array[5]);
unset($array['foo'], $array['bar']);
?>
```

To delete multiple contiguous elements, use array_splice():

```php
<?php
array_splice($array, $offset, $length);
?>
```

#### The list Function
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
|[array_values()](#array_values)|	Returns all the values of an array|
|[count()](#count)|	Returns the number of elements in an array|
|sizeof()|	Alias of count()|
|each()|	Deprecated from PHP 7.2. Returns the current key and value pair from an array|
|extract()| Imports variables into the current symbol table from an array|
|in_array()|	Checks if a specified value exists in an array|

#### array_values()
The array_values() function is used to return all the values of an array.

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
print_r(array_values($cars));
?>
```


#### count()
The count() function is used to return the length (the number of elements) of an array.

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
echo count($cars);
?>
```	

#### Iterating Through an Array
When you want to cycle though an array and operate on all or some of the elements inside.

Use foreach:
``` php
foreach ($array as $value) {
 // Act on $value
}
```
Or to get an array’s keys and values:
``` php
foreach ($array as $key => $value) {
 // Act II
}
```
Another technique is to use for:
``` php
for ($key = 0, $size = count($array); $key < $size; $key++) {
 // Act III
}
```
Finally, you can use each() in combination with list() and while:
``` php
reset($array); // reset internal pointer to beginning of array
while (list($key, $value) = each ($array)) {
 // Final Act
}
```



#### each()
The each() function is used to return the current key and value pair from an array.

With foreach, PHP iterates over a copy of the array instead of the actual array. In contrast, when using each() and for, PHP iterates over the original array. So if you modify the array inside the loop, you may (or may not) get the behavior you expect.

```php
<?php
foreach ($items as $item => $cost) {
 if (! in_stock($item)) {
 unset($items[$item]); // address the array directly
 }
}
?>
```

The variables returned by foreach() aren’t aliases for the original values in the array: they’re copies, so if you modify them, it’s not reflected in the array. That’s why you need to modify $items[$item] instead of $cost.

When using each(), PHP keeps track of where you are inside the loop. After completing a first pass through, to begin again at the start, call reset() to move the pointer back to the front of the array. Otherwise, each() returns false.

The for loop works only for arrays with consecutive integer keys. Unless you’re modifying the size of your array, it’s inefficient to recompute the count() of $items each time through the loop, so we always use a $size variable to hold the array’s size:

```php
<?php
for ($item = 0, $size = count($items); $item < $size; $item++) {
 // ...
}

?>
```

If you prefer to count efficiently with one variable, count backward:

```php
<?php
for ($item = count($items) - 1; $item >= 0; $item--) {
 // ...
}

?>
```

The associative array version of the for loop is:

```php
<?php
for (reset($array); $key = key($array); next($array) ) {
 // ...
}
?>
```

This fails if any element holds a string that evaluates to false, so a perfectly normal value such as 0 causes the loop to end early. Therefore, this syntax is rarely used, and is included only to help you understand older PHP code.

#### array_map()

Finally, use array_map() to hand off each element to a function for processing:

```php
<?php
// lowercase all words
$lc = array_map('strtolower', $words);
?>
```

The first argument to array_map() is a function to modify an individual element, and the second is the array to be iterated through.



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
|[array_reverse()](../PR/phpStr1.md#reverse-by-words)|	Returns an array in the reverse order|
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
