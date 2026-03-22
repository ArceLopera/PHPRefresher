Attributes (PHP 8.0+) provide a way to add metadata to classes, methods, properties, and functions without modifying the code itself.

## Basic Syntax

```php
<?php
#[Attribute]
class MyAttribute
{
    public function __construct(
        public string $description = ''
    ) {}
}
?>
```

## Using Attributes

```php
<?php
#[Attribute]
class Route
{
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}

#[Route('/users', method: 'GET')]
class UserController
{
    #[Route('/users', method: 'POST')]
    public function create(): void
    {
        // Create user
    }

    #[Route('/users/{id}', method: 'GET')]
    public function show(int $id): void
    {
        // Show user
    }
}
?>
```

## Reading Attributes

```php
<?php
#[Attribute]
class Route
{
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}

#[Route('/api/users')]
class UserController
{
    #[Route('/api/users/{id}', method: 'GET')]
    public function getUser(int $id): void {}
}

$reflection = new ReflectionClass(UserController::class);
$attributes = $reflection->getAttributes(Route::class);

foreach ($attributes as $attribute) {
    $route = $attribute->newInstance();
    echo $route->path; // /api/users
}
?>
```

## Common Use Cases

### Validation

```php
<?php
#[Attribute]
class NotBlank
{
    public function __construct(
        public string $message = 'This field cannot be blank'
    ) {}
}

#[Attribute]
class MinLength
{
    public function __construct(
        public int $length,
        public string $message = ''
    ) {}
}

class UserDTO
{
    public function __construct(
        #[NotBlank]
        #[MinLength(3)]
        public string $username,

        #[NotBlank]
        #[MinLength(8)]
        public string $password
    ) {}
}
?>
```

### Caching

```php
<?php
#[Attribute]
class Cacheable
{
    public function __construct(
        public int $ttl = 3600,
        public string $key = ''
    ) {}
}

class ProductService
{
    #[Cacheable(ttl: 600, key: 'product_list')]
    public function getProducts(): array
    {
        // Expensive database query
        return [];
    }
}
?>
```

### Deprecation

```php
<?php
#[Deprecated(
    replacement: 'newMethod',
    since: '2.0'
)]
function oldMethod(): void
{
    // Old implementation
}
?>
```

## Built-in PHP Attributes

### #[ReturnTypeWillChange]

```php
<?php
class MyArray implements ArrayAccess
{
    #[ReturnTypeWillChange]
    public function offsetGet($key) { }

    #[ReturnTypeWillChange]
    public function offsetSet($key, $value) { }

    #[ReturnTypeWillChange]
    public function offsetExists($key): bool { }

    #[ReturnTypeWillChange]
    public function offsetUnset($key) { }
}
?>
```

### #[AllowDynamicProperties]

```php
<?php
class StdClass
{
    #[AllowDynamicProperties]
    public string $dynamic = 'value';
}
?>
```

### #[NoDiscard]

```php
<?php
#[NoDiscard]
function getConfig(): Config
{
    return new Config();
}

getConfig(); // Warning: discarded return value
?>
```

## Attribute vs PHPDoc Annotations

| Feature | Attributes | PHPDoc |
|---------|-----------|--------|
| Syntax | Native PHP syntax | Docblock comments |
| Parseable at runtime | Yes | Requires reflection |
| IDE support | Native | Via plugins |
| Type checking | Yes | No |
| Performance | No overhead | Parsing required |
| Tooling support | Growing | Extensive |
