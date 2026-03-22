There are three access modifiers:

1. public - the property or method can be accessed from everywhere. This is default
2. protected - the property or method can be accessed within the class and by classes derived from that class
3. private - the property or method can ONLY be accessed within the class

```php
<?php
class Fruit {
  public $name;
  protected $color;
  private $weight;
}

$mango = new Fruit();
$mango->name = 'Mango'; // OK
$mango->color = 'Yellow'; // ERROR
$mango->weight = '300'; // ERROR
?>
```

```php
<?php
class Fruit {
  public $name;
  public $color;
  public $weight;

  function set_name($n) {  // a public function (default)
    $this->name = $n;
  }
  protected function set_color($n) { // a protected function
    $this->color = $n;
  }
  private function set_weight($n) { // a private function
    $this->weight = $n;
  }
}

$mango = new Fruit();
$mango->set_name('Mango'); // OK
$mango->set_color('Yellow'); // ERROR
$mango->set_weight('300'); // ERROR
?>
```

## Readonly Properties (PHP 8.1+)

The `readonly` modifier prevents a property from being modified after initialization. This is useful for immutability patterns.

```php
<?php
class Config
{
    public function __construct(
        public readonly string $host,
        public readonly int $port,
        public readonly string $name
    ) {}
}

$config = new Config('localhost', 3306, 'myapp');
echo $config->host; // OK - reading
$config->host = 'example.com'; // ERROR - cannot modify
?>
```

### With Constructor Property Promotion

```php
<?php
class User
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $email,
        public readonly DateTimeImmutable $createdAt
    ) {}
}

$user = new User(1, 'John', 'john@example.com', new DateTimeImmutable());
$user->name = 'Jane'; // ERROR - cannot modify readonly property
?>
```

### Initialization Rules

```php
<?php
class Example
{
    public readonly string $value;

    public function __construct(string $value)
    {
        $this->value = $value;
    }
}

$ex = new Example('test');
$ex->value = 'changed'; // ERROR - cannot modify after initialization
?>
```

### Difference from `const`

| Feature | `const` | `readonly` |
|---------|---------|------------|
| Value set at | Compile time | Runtime (construction) |
| Can be dynamic | No | Yes |
| Per-instance | No (static) | Yes |
| Type flexible | Limited | All types |	
