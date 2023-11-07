## The __construct Function
A constructor allows you to initialize an object's properties upon creation of the object.

If you create a __construct() function, PHP will automatically call this function when you create an object from a class.

```php
<?php
class Person
{
    public $name;
    public $age;

    public function __construct($name, $age)
    {
        $this->name = $name;
        $this->age = $age;
    }
}
?>
```

### Calling the __construct Function

```php
<?php
$person1 = new Person("John", 36);
$person2 = new Person("Jane", 30);
?>
```

## The __destruct Function
A destructor is called when the object is destructed or the script is stopped or exited.

If you create a __destruct() function, PHP will automatically call this function at the end of the script.

```php
<?php
class Person
{
    public $name;
    public $age;

    public function __construct($name, $age)
    {
        $this->name = $name;
        $this->age = $age;
    }
    public function __destruct()
    {
        echo "The person named " . $this->name . " is destructed.";
    }
}
?>
```
