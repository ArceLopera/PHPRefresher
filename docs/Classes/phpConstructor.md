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

## Constructor Property Promotion

Constructor Property Promotion (PHP 8.0+) allows you to combine property declaration, constructor parameter, and assignment in a single statement.

```php
<?php
class Person
{
    public function __construct(
        public string $name,
        public int $age
    ) {}
}

$person = new Person("John", 36);
echo $person->name; // John
echo $person->age;  // 36
?>
```

### Traditional vs Promoted

```php
<?php
// Traditional approach
class User {
    private string $name;
    private string $email;
    
    public function __construct(string $name, string $email) {
        $this->name = $name;
        $this->email = $email;
    }
}

// With constructor promotion (PHP 8.0+)
class User {
    public function __construct(
        private string $name,
        private string $email
    ) {}
}
?>
```

### With Default Values

```php
<?php
class Config {
    public function __construct(
        public string $host = 'localhost',
        public int $port = 3306,
        public bool $debug = false
    ) {}
}

$config = new Config();                      // defaults
$config = new Config('example.com');        // custom host
$config = new Config('example.com', 5432);  // custom host and port
?>
```

### With Types and Visibility

```php
<?php
class Point {
    public function __construct(
        public float $x = 0.0,
        public float $y = 0.0,
        public readonly float $z = 0.0  // can combine with readonly
    ) {}
}
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
