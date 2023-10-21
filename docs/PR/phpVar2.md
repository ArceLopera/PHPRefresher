## Data Types
PHP supports the following data types:

+ [String](#php-string)
+ [Integer](#php-integer)
+ [Float](#php-float)
+ [Boolean](#php-boolean)
+ [Array](#php-array)
+ [Object](#php-object)
+ [NULL](#php-null-value)
+ [Resource](#php-resource)

### PHP String
A string is a sequence of characters, like "Hello world!".

A string can be any text inside quotes. You can use single or double quotes.

``` php
$x = "Hello world!";
```

### PHP Integer
An integer data type is a non-decimal number between -2,147,483,648 and 2,147,483,647.

Integers can be specified in: decimal (base 10), hexadecimal (base 16), octal (base 8), or binary (base 2) notation

``` php
<?php
$a = 1234; // decimal number
$a = 0123; // octal number (equivalent to 83 decimal)
$a = 0o123; // octal number (as of PHP 8.1.0)
$a = 0x1A; // hexadecimal number (equivalent to 26 decimal)
$a = 0b11111111; // binary number (equivalent to 255 decimal)
$a = 1_234_567; // decimal number (as of PHP 7.4.0)
?>
```

### PHP Float
A float (floating point number) is a number with a decimal point or a number in exponential form.

```php
$x = 10.365;
```

### PHP Boolean
A Boolean represents two possible states: TRUE or FALSE.

```php
$x = true;
$y = false;
```

### PHP Array
An array stores multiple values in one single variable.

```php
$x = array("Volvo", "BMW", "Toyota");
```

### PHP Object
Classes and objects are the two main aspects of object-oriented programming.

A class is a template for objects, and an object is an instance of a class.

When the individual objects are created, they inherit all the properties and behaviors from the class, but each object will have different values for the properties.

Let's assume we have a class named Car. A Car can have properties like model, color, etc. We can define variables like $model, $color, and so on, to hold the values of these properties.

When the individual objects (Volvo, BMW, Toyota, etc.) are created, they inherit all the properties and behaviors from the class, but each object will have different values for the properties.

If you create a __construct() function, PHP will automatically call this function when you create an object from a class.

```php
<?php
class Car {
  public $color;
  public $model;
  public function __construct($color, $model) {
    $this->color = $color;
    $this->model = $model;
  }
  public function message() {
    return "My car is a " . $this->color . " " . $this->model . "!";
  }
}

$myCar = new Car("black", "Volvo");
echo $myCar -> message();
echo "<br>";
$myCar = new Car("red", "Toyota");
echo $myCar -> message();
?>
```

### PHP NULL Value
Null is a special data type which can have only one value: NULL.

A variable of data type NULL is a variable that has no value assigned to it.

Tip: If a variable is created without a value, it is automatically assigned a value of NULL.

Variables can also be emptied by setting the value to NULL

### PHP Resource
The special resource type is not an actual data type. It is the storing of a reference to functions and resources external to PHP.

A common example of using the resource data type is a database call.

## Type Casting

PHP does not require explicit type definition in variable declaration. In this case, the type of a variable is determined by the value it stores. That is to say, if a string is assigned to variable $var, then $var is of type string. If afterwards an int value is assigned to $var, it will be of type int.

Type casting converts the value to a chosen type by writing the type within parentheses before the value to convert.

The casts allowed are:

+ (int) - cast to int
+ (bool) - cast to bool
+ (float) - cast to float
+ (string) - cast to string
+ (array) - cast to array
+ (object) - cast to object
+ (unset) - cast to NULL

``` php
<?php
$bool_false = false;
$int_val =  (int) $bool_false ;
var_dump($int_val); //Output will be 0
$bool_true = true;
$int_val =  (int) $bool_true ;
var_dump($int_val); //Output will be 1
?>
```

Casting literal strings and variables to binary strings:

``` php
<?php
$binary = (binary) $string;
$binary = b"binary string";
?>
```


Instead of casting a variable to a string, it is also possible to enclose the variable in double quotes.

``` php
<?php
$foo = 10;            // $foo is an integer
$str = "$foo";        // $str is a string
$fst = (string) $foo; // $fst is also a string

// This prints out that "they are the same"
if ($fst === $str) {
    echo "they are the same";
}
?>

```