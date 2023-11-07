Procedural programming is about writing procedures or functions that perform operations on the data, while object-oriented programming is about creating objects that contain both data and functions.

Object-oriented programming has several advantages over procedural programming:

+ OOP is faster and easier to execute
+ OOP provides a clear structure for the programs
+ OOP helps to keep the PHP code DRY "Don't Repeat Yourself", and makes the code easier to maintain, modify and debug
+ OOP makes it possible to create full reusable applications with less code and shorter development time

## Classes

A class is a template for objects, and an object is an instance of class.

A class is defined by using the class keyword, followed by the name of the class and a pair of curly braces ({}). All its properties and methods go inside the braces.

``` php
<?php
class Person
{
    // Properties
    public $name;
    public $age;

    // Methods	
    public function __construct($name, $age)
    {
        $this->name = $name;
        $this->age = $age;
    }
    public function greeting()
    {
        echo "Hello, my name is " . $this->name;
    }
}
?>
```

## Objects

We can create multiple objects from a class. Each object has all the properties and methods defined in the class, but they will have different property values.

Objects of a class are created using the new keyword.

```php
$person1 = new Person("John", 36);
$person2 = new Person("Jane", 30);
```	

```php
$person1->greeting();
```

```php
$person2->greeting();
```

## $this keyword

The $this keyword refers to the current object.

```php
<?php
class Fruit {
  public $name;
  function set_name($name) {
    $this->name = $name;
  }
}
$apple = new Fruit();
$apple->set_name("Apple");

echo $apple->name;
?>
```

```php
<?php
class Fruit {
  public $name;
}
$apple = new Fruit();
$apple->name = "Apple";

echo $apple->name;
?>
```

## instanceof
You can use the instanceof keyword to check if an object belongs to a specific class

```php
<?php
class Fruit {
  public $name;
}
$apple = new Fruit();
$apple->name = "Apple";

if ($apple instanceof Fruit) {
  echo "Yes, $apple is an instance of Fruit";
}
?>
```