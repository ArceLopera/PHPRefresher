
In PHP, we store all pieces of data -- numbers, characters, strings, *everything* -- as objects, and we refer to these objects using variables.  As a simple case, we can *assign* a variable a value using the assignment operator, which is the "equals" sign. 

## Creating (Declaring) PHP Variables

In PHP, a variable starts with the $ sign, followed by the name of the variable:

Remember that variables are case-sensitive!

``` php
<?php
$txt = "Hello world!"; //No difference between "" and ''
$x = 5;
$y = 10.5;
?>
```
After the execution of the statements above, the variable $txt will hold the value Hello world!, the variable $x will hold the value 5, and the variable $y will hold the value 10.5.

Note: When you assign a text value to a variable, put quotes around the value.

Note: Unlike other programming languages, PHP has no command for declaring a variable. It is created the moment you first assign a value to it.

### Rules for PHP variables:

+ A variable starts with the $ sign, followed by the name of the variable
+ A variable name must start with a letter or the underscore character
+ A variable name cannot start with a number
+ A variable name can only contain alpha-numeric characters and underscores (A-z, 0-9, and _ )
+ Variable names are case-sensitive ($age and $AGE are two different variables)

## Output Variables
The PHP echo statement is often used to output data to the screen.

The following example will show how to output text and a variable:

``` php
<?php
$txt = "phpTutorial";
echo "I love $txt!";
?>
```

##**Tools for understanding strange objects**
### var_dump() function
+ var_dump() displays structured information about one or more expressions that includes its type and value. Arrays and objects are explored recursively with values indented to show structure.


``` php
<!DOCTYPE html>
<html>
<body>

<?php  
$x = 5985;
var_dump($x);
?>  

</body>
</html>
```
```
int(5985)
```
### print_r() function
+ print_r() displays the value of a variable, in a human-readable format.

```php
<?php
$a = array("red", "green", "blue");
print_r($a);

echo "<br>";

$b = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
print_r($b);
?>
```
```
Array ( [0] => red [1] => green [2] => blue )
Array ( [Peter] => 35 [Ben] => 37 [Joe] => 43 )
```
## NULL
The null type is PHP's unit type, i.e. it has only one value: null.

Undefined, and unset() variables will resolve to the value null.

There is only one value of type null, and that is the case-insensitive constant null.
``` php
<?php
$var = NULL;       
?>
```