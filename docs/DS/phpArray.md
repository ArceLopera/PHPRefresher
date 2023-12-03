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
|[array_merge()](#array_merge)|	Merges one or more arrays into one array|
|array_merge_recursive()|	Merges one or more arrays into one array recursively|
|[array_pad()](#array_pad)|	Inserts a specified number of items, with a specified value, to an array|
|array_pop()|	Deletes the last element of an array|
|array_push()|	Inserts one or more elements to the end of an array|
|array_shift()|	Removes the first element from an array, and returns the value of the removed element|
|[array_splice()](#array_splice)|	Removes and replaces specified elements of an array|
|array_unique()|	Removes duplicate values from an array|
|array_unshift()|	Adds one or more elements to the beginning of an array|
|compact()|	Create array containing variables and their values|
|[range()](#range)|	Creates an array containing a range of elements|

#### array_merge

The array_merge() function works with both predefined arrays and arrays defined in place using array():

```php
<?php
$p_languages = array('Perl', 'PHP');
$p_languages = array_merge($p_languages, array('Python'));
print_r($p_languages);
Array
(
 [0] => Perl
 [1] => PHP
 [2] => Python
)

?>
```

Accordingly, merged arrays can be either preexisting arrays, as with $p_languages, or anonymous arrays, as with array('Python').

You can’t use array_push(), because PHP won’t automatically flatten out the array into a series of independent variables, and you’ll end up with a nested array. 


```php
<?php
array_push($p_languages, array('Python'));
print_r($p_languages);
Array
(
 [0] => Perl
 [1] => PHP
 [2] => Array
 (
 [0] => Python
 )
)
?>
```

Merging arrays with only numerical keys causes the arrays to get renumbered, so values aren’t lost. Merging arrays with string keys causes the second array to overwrite the value of any duplicated keys. Arrays with both types of keys exhibit both types of behavior.

``` php
<?php
$lc = array('a', 'b' => 'b'); // lowercase letters as values
$uc = array('A', 'b' => 'B'); // uppercase letters as values
$ac = array_merge($lc, $uc); // all-cases?
print_r($ac);
Array
(
 [0] => a
 [b] => B
 [1] => A
)
?>

```

The uppercase A has been renumbered from index 0 to index 1, to avoid a collision, and merged onto the end. The uppercase B has overwritten the lowercase b and replaced it in the original place within the array.

The + operator can also merge arrays. For any identically named keys found in both arrays, the value from the left will be used. It doesn’t do any reordering to prevent collisions.

```php
<?php
print_r($uc + $lc);
print_r($lc + $uc);
Array
(
 [0] => A
 [b] => B
)
Array
(
 [0] => a
 [b] => b
)   
?>

```

Because a and A both have a key of 0, and b and B both have a key of b, you end up with a total of only two elements in the merged arrays. In the first case, $a + $b becomes just $b, and in the other, $b + $a becomes $a. However, if you had two distinctly keyed arrays, this wouldn’t be a problem, and the new array would be the union of the two arrays.

#### array_pad

When you want to modify the size of an array, either by making it larger or smaller than its
current size. Arrays aren’t a predeclared size in PHP, so you can resize them on the fly.


Use array_pad() to make an array grow:

```php
<?php
// start at three
$array = array('apple', 'banana', 'coconut');
// grow to five
$array = array_pad($array, 5, '');

?>
```

Now, count($array) is 5, and the last two elements, $array[3] and $array[4], contain
the empty string.

To reduce an array, you can use array_splice():
```php
<?php
// no assignment to $array
array_splice($array, 2);
?>
```
This removes all but the first two elements from $array.

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

#### array_unique

When you want to eliminate duplicates from an array.

```php
<?php
$numbers = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
$unique_numbers = array_unique($numbers);
print_r($unique_numbers);
?>
```

If the array is already complete, use array_unique(), which returns a new array that
contains no duplicate values. 

If you create the array while processing results, here is a technique for numerical arrays:

```php
<?php
$numbers = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
$unique_numbers = array();
foreach ($numbers as $number) {
    if (!in_array($number, $unique_numbers)) {
        $unique_numbers[] = $number;
    }
}
print_r($unique_numbers);
?>
```

Here’s one for associative arrays:

```php
<?php
foreach ($_GET['fruits'] as $fruit) {
 $array[$fruit] = $fruit;
}

?>
```

An even faster method than using in_array() is to create a hybrid array in which the key and the value for each element are the same. This eliminates the linear check of in_array() but still allows you to take advantage of the array family of functions that operate over the values of an array instead of the keys.

In fact, it’s faster to use the associative array method and then call array_values() on the result (or, for that matter, array_keys(), but array_values() is slightly faster) than to create a numeric array directly with the overhead of in_array().


### Update Information in Arrays
|Function	|Description|
|---|---|
|array_change_key_case()|	Changes all keys in an array to lowercase or uppercase|
|array_fill()|	Fills an array with values|
|array_fill_keys()|	Fills an array with values, specifying keys|
|[array_flip()](#array_flip)|	Flips/Exchanges all keys with their associated values in an array|
|[array_map()](#array_map)|	Sends each value of an array to a user-made function, which returns new values|
|array_replace()|	Replaces the values of the first array with the values from following arrays|
|array_replace_recursive()|	Replaces the values of the first array with the values from following arrays recursively|
|[array_walk()](#array_walk)|	Applies a user function to every member of an array|
|[array_walk_recursive()](#array_walk_recursive)|	Applies a user function recursively to every member of an array|
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

#### array_map()

Use array_map() to hand off each element to a function for processing:

```php
<?php
// lowercase all words
$lc = array_map('strtolower', $words);
?>
```

The first argument to array_map() is a function to modify an individual element, and the second is the array to be iterated through.

#### array_walk()

Use array_walk() to hand off each element to a function for processing. When you want to apply a function or method to each element in an array. This allows you to transform the input data for the entire set all at once.

```php
<?php
// uppercase all words
array_walk($words, 'strtoupper');
?>
```

This function takes an array and a callback function, which is the function that processes the elements of the array. The callback function takes two parameters: a value and a key. It can also take an optional third parameter, which is any additional data you wish to expose within the callback. Because array_walk operates in-place instead of returning a modified copy of the array, you must pass in values by reference when you want to modify the elements. 

#### array_walk_recursive()

When you have a series of nested arrays, use the array_walk_recursive() function to iterate through them.

```php
<?php
// uppercase all words
array_walk_recursive($words, 'strtoupper');
?>
```

The array_walk_recursive() function only passes nonarray elements to the callback,
so you don’t need to modify a callback when switching from array_walk().







### Extracting Information from Arrays
|Function	|Description|
|---|---|
|array_column()|	Returns the values from a single column in the input array|
|array_count_values()|	Counts all the values of an array|
|[array_filter()](#array_filter)|	Filters the values of an array using a callback function|
|[array_key_exists()](#array_key_exists)|	Checks if the specified key exists in the array|
|array_keys()|	Returns all the keys of an array|
|array_product()|	Calculates the product of the values in an array|
|array_rand()|	Returns one or more random keys from an array|
|array_reduce()|	Returns an array as a string, using a user-defined function|
|[array_search()](#array_search)|	Searches an array for a given value and returns the key|
|array_slice()|	Returns selected parts of an array|
|current()|	Returns the current element in an array|
|key()|	Returns the current key in an array|
|array_sum()|	Returns the sum of the values in an array|
|[array_values()](#array_values)|	Returns all the values of an array|
|[count()](#count)|	Returns the number of elements in an array|
|sizeof()|	Alias of count()|
|each()|	Deprecated from PHP 7.2. Returns the current key and value pair from an array|
|extract()| Imports variables into the current symbol table from an array|
|[in_array()](#in_array)|	Checks if a specified value exists in an array|


#### Finding the Largest or Smallest Valued Element in an Array

When you have an array of elements, and you want to find the largest or smallest valued element. For example, you want to find the appropriate scale when creating a histogram.


```php
<?php
//To find the largest element, use max():
$largest = max($array);
//To find the smallest element, use min():
$smallest = min($array);

?>
```

Normally, [max()](../PR/phpMath1.md#min-and-max) returns the larger of two elements, but if you pass it an array, it searches the entire array instead. Unfortunately, there’s no way to find the index of the largest element using max(). To do that, you must sort the array in reverse order to put the largest element in position 0.


```php
<?php
arsort($array);
//The value of the largest element is $array[0]

?>
```

#### array_filter()
The array_filter() function is used to remove elements from an array that don’t pass a certain test.
When you want to locate entries in an array that meet certain requirements.


```php
//Use a foreach loop:
<?php
$movies = array(/*...*/);
foreach ($movies as $movie) {
 if ($movie['box_office_gross'] < 5000000) { $flops[] = $movie; }
}
//Or array_filter():
$movies = array(/* ... */);
$flops = array_filter($movies, function ($movie) {
 return ($movie['box_office_gross'] < 5000000) ? 1 : 0;
});
?>
```

With array_filter(), however, you first create an anonymous function that returns true for values you want to keep and false for values you don’t. Using array_filter(), you then instruct PHP to process the array as you do in the foreach.



#### array_key_exists()
The array_key_exists() function is used to check if the specified key exists in the array. Use array_key_exists() to check for a key no matter what the associated value is.

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
if (array_key_exists(1, $cars)) {
 echo "Key 1 exists!";
}
?>
```

The array_key_exists() function completely ignores array values—it just reports whether there is an element in the array with a particular key.

The [isset() function](../Func/phpEmpty.md#isset-function) is used to check if the specified key exists in the array. Use isset() to find a key whose associated value is anything but null.

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
if (isset($cars[1])) {
 echo "Key exists!";
}
?>
```

isset(), however, behaves the same way on array keys as it does with other variables. A null value causes is set() to return false.


#### array_search()
The array_search() function is used to search for a specified value in an array. Use array_search() to find a value in an array no matter what the associated key is.  It returns the key of the found value. If the value is not in the array, it returns false.

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
$found = array_search("BMW", $cars);
echo $found;
?>
```

Use in_array() to find if an array contains a value; use array_search() to discover where that value is located. However, because array_search() gracefully handles searches in which the value isn’t found, it’s better to use array_search() instead of in_array(). The speed difference is minute, and the extra information is potentially useful.

```php
<?php
$favorite_foods = array(1 => 'artichokes', 'bread', 'cauliflower', 'deviled eggs');
$food = 'cauliflower';
$position = array_search($food, $favorite_foods);
if ($position !== false) {
 echo "My #$position favorite food is $food";
} else {
 echo "Blech! I hate $food!";
}

?>
```

Use the !== check against false because if your string is found in the array at position 0, the if evaluates to a logical false, which isn’t what is meant or wanted. If a value is in the array multiple times, array_search() is only guaranteed to return one of the instances, not the first instance.

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

#### in_array()
The in_array() function is used to check if a value exists in an array.

```php
<?php
$book_collection = array('Emma', 'Pride and Prejudice', 'Northhanger Abbey');
$book = 'Sense and Sensibility';
if (in_array($book, $book_collection)) {
 echo 'Own it.';
} else {
 echo 'Need it.';
}

?>
```

The default behavior of in_array() is to compare items using the == operator. To use the strict equality check, ===, pass true as the third parameter to in_array().

```php
<?php
$array = array(1, '2', 'three');
in_array(0, $array); // true!
in_array(0, $array, true); // false
in_array(1, $array); // true
in_array(1, $array, true); // true
in_array(2, $array); // true
in_array(2, $array, true); // false
?>
```

The first check, in_array(0, $array), evaluates to true because to compare the number 0 against the string three, PHP casts three to an integer. Because three isn’t a numeric string, as is 2, it becomes 0. Therefore, in_array() thinks there’s a match.

Consequently, when comparing numbers against data that may contain strings, it’s safest to use a strict comparison. If you find yourself calling in_array() multiple times on the same array, it may be better
to use an associative array, with the original array elements as the keys in the new associative array. Looking up entries using in_array() takes linear time; with an associative array, it takes constant time.

#### array_flip()

If you can’t create the associative array directly but need to convert from a traditional one with integer keys, use array_flip() to swap the keys and values of an array.


```php
<?php
$book_collection = array('Emma',
 'Pride and Prejudice',
'Northhanger Abbey');
// convert from numeric array to associative array
$book_collection = array_flip($book_collection);
$book = 'Sense and Sensibility';
if (isset($book_collection[$book])) {
 echo 'Own it.';
} else {
 echo 'Need it.';
}

?>
```	
Note that doing this condenses multiple keys with the same value into one element in the flipped array.

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
|[array_multisort()](#array_multisort)|	Sorts multiple or multi-dimensional arrays|
|[array_reverse()](../PR/phpStr1.md#reverse-by-words)|	Returns an array in the reverse order|
|[arsort()](#arsort)|	Sorts an associative array in descending order, according to the value|
|[asort()](#asort)|	Sorts an associative array in ascending order, according to the value|
|[krsort()](#krsort)	|Sorts an associative array in descending order, according to the key|
|[ksort()](#ksort) |	Sorts an associative array in ascending order, according to the key|
|natcasesort()|	Sorts an array using a case insensitive "natural order" algorithm|
|[natsort()](#natsort)|	Sorts an array using a "natural order" algorithm|
|[rsort()](#rsort)|	Sorts an indexed array in descending order|
|[shuffle()](#shuffle)|	Shuffles an array|
|[sort()](#sort)|	Sorts an indexed array in ascending order|
|uasort()|	Sorts an array by values using a user-defined comparison function and maintains the index association|
|uksort()|	Sorts an array by keys using a user-defined comparison function|
|[usort()](#sorting-an-array-by-a-computable-field)|	Sorts an array by values using a user-defined comparison function|

#### sort()
The sort() function sorts an array alphabetically.

```php
<?php
$cars = array("Volvo", "BMW", "Toyota");
sort($cars);
echo $cars[0];
?>
```

To sort numerically, pass SORT_NUMERIC as the second argument to sort().

```php
<?php
$scores = array(1, 10, 2, 20);
sort($scores, SORT_NUMERIC);
?>
```
This resorts the numbers in ascending order (1, 2, 10, 20) instead of lexicographical order (1, 10, 2, 20).

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

The sort() function doesn’t preserve the key/value association between elements; instead, entries are reindexed starting at 0 and going upward. To preserve the key/value links, use asort(). The asort() function is normally used for associative arrays, but it can also be useful when the indexes of the entries are meaningful.

```php
<?php
$states = array(1 => 'Delaware', 'Pennsylvania', 'New Jersey');
asort($states);
while (list($rank, $state) = each($states)) {
 print "$state was the #$rank state to join the United States\n";
}
?>
```


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

#### natsort()
The natsort() function sorts an array using a "natural order" algorithm. Use natsort() to sort the array using a natural sorting algorithm. Under natural sorting, you can mix strings and numbers inside your elements and still get the right answer:

```php
<?php
$tests = array('test1.php', 'test10.php', 'test11.php', 'test2.php');
natsort($tests);
print_r($tests);
?>
```


The elements are now ordered 'test1.php', 'test2.php', 'test10.php', and 'test11.php'. With natural sorting, the number 10 comes after the number 2; the opposite occurs under traditional sorting. For case-insensitive natural sorting, use natcasesort().

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

####  Sorting an Array by a Computable Field

Use usort() in combination with a custom comparison function:

```php
<?php
$tests = array('test1.php', 'test10.php', 'test11.php', 'test2.php');
// sort in reverse natural order
usort($tests, function ($a, $b) {
 return strnatcmp($b, $a);
});
print_r($tests);
?>
```

When you want to define a custom sorting routine to order an array. However, instead of using
a function, you want to use an object method. As with a custom sort function, the object method needs to take two input arguments and return 1, 0, or −1, depending on whether the first parameter is larger than, equal to, or less than the second.


```php
<?php
class sort {
 // reverse-order string comparison
 static function strrcmp($a, $b) {
 return strcmp($b, $a);
 }
}
usort($words, array('sort', 'strrcmp'));
?>
```

It must also be declared as static. Alternatively, you can use an instantiated object:


```php
<?php
class Dates {
 public function compare($a, $b) { /* compare here */ }
}
$dates = new Dates;
usort($access_times, array($dates, 'compare'));
?>
```


#### array_multisort()
The array_multisort() function sorts an array of values using multiple keys. When you want to sort multiple arrays or an array with multiple dimensions.


```php
<?php
$colors = array('Red', 'White', 'Blue');
$cities = array('Boston', 'New York', 'Chicago');
array_multisort($colors, $cities);
print_r($colors);
print_r($cities);
Array
(
 [0] => Blue
 [1] => Red
 [2] => White
)
Array
(
 [0] => Chicago
 [1] => Boston
 [2] => New York
)
//To sort multiple dimensions within a single array, pass the specific array elements:
$stuff = array('colors' => array('Red', 'White', 'Blue'),
 'cities' => array('Boston', 'New York', 'Chicago'));
array_multisort($stuff['colors'], $stuff['cities']);
print_r($stuff);
Array
(
 [colors] => Array
 (
 [0] => Blue
 [1] => Red
 [2] => White
 )
 [cities] => Array
 (
 [0] => Chicago
 [1] => Boston
 [2] => New York
 )
)
?>
```

To modify the sort type, as in sort(), pass in SORT_REGULAR, SORT_NUMERIC, or SORT_STRING after the array. To modify the sort order, unlike in sort(), pass in SORT_ASC or SORT_DESC after the array. You can also pass in both a sort type and a sort order after the array.

The array_multisort() function can sort several arrays at once or a multidimensional array by one or more dimensions. The arrays are treated as columns of a table to be sorted by rows. The first array is the main one to sort by; all the items in the other arrays are reordered based on the sorted order of the first array. If items in the first array compare as equal, the sort order is determined by the second array, and so on.

The default sorting values are SORT_REGULAR and SORT_ASC, and they’re reset after each array, so there’s no reason to pass either of these two values, except for clarity:

```php
<?php
$numbers = array(0, 1, 2, 3);
$letters = array('a', 'b', 'c', 'd');
array_multisort($numbers, SORT_NUMERIC, SORT_DESC,
 $letters, SORT_STRING , SORT_DESC);
?>
```

This example reverses the arrays.


#### shuffle()

When you want to scramble the elements of an array in a random order.

```php
<?php
$colors = array('Red', 'White', 'Blue');
shuffle($colors);
print_r($colors);
?>
```