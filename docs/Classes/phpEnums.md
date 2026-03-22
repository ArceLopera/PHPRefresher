PHP Enums allow you to define a type that has a fixed set of values. Enums were introduced in PHP 8.1.

## Basic Enums

```php
<?php
enum Status
{
    case Draft;
    case Published;
    case Archived;
}

function publish(Status $status): void
{
    if ($status === Status::Draft) {
        echo "Cannot publish a draft!";
    }
}

publish(Status::Draft);
?>
```

## Backed Enums

Backed enums have a scalar value (string or int) associated with each case.

```php
<?php
enum Priority: int
{
    case Low = 1;
    case Medium = 2;
    case High = 3;
    case Critical = 4;
}

enum Color: string
{
    case Red = '#FF0000';
    case Green = '#00FF00';
    case Blue = '#0000FF';
}

$priority = Priority::High;
echo $priority->value; // 3
echo $priority->name;  // High
?>
```

## Enum Methods

Enums can have methods.

```php
<?php
enum Status
{
    case Draft;
    case Published;
    case Archived;

    public function label(): string
    {
        return match($this) {
            self::Draft => 'Draft',
            self::Published => 'Published',
            self::Archived => 'Archived',
        };
    }

    public function isActive(): bool
    {
        return $this !== self::Archived;
    }
}

echo Status::Published->label();   // "Published"
echo Status::Draft->isActive();    // true
echo Status::Archived->isActive(); // false
?>
```

## Enum with Interfaces

```php
<?php
interface Labeled
{
    public function label(): string;
}

enum Status implements Labeled
{
    case Draft;
    case Published;
    case Archived;

    public function label(): string
    {
        return match($this) {
            self::Draft => 'Draft',
            self::Published => 'Published',
            self::Archived => 'Archived',
        };
    }
}
?>
```

## Enum as Type

```php
<?php
enum OrderStatus: string
{
    case Pending = 'pending';
    case Processing = 'processing';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public static function active(): array
    {
        return [
            self::Pending,
            self::Processing,
        ];
    }
}

function processOrder(OrderStatus $status): void
{
    // Type safety - only valid statuses allowed
}

processOrder(OrderStatus::Pending);    // OK
processOrder(OrderStatus::Completed);  // OK
processOrder('invalid');              // TypeError
?>
```

## Iterating Over Cases

```php
<?php
enum Status
{
    case Draft;
    case Published;
    case Archived;
}

// Loop through all cases
foreach (Status::cases() as $case) {
    echo $case->name . PHP_EOL;
}
?>
```

## Enums vs Class Constants

| Feature | Class Constants | Enums |
|---------|----------------|-------|
| Type safety | No | Yes |
| IDE support | Limited | Excellent |
| Exhaustiveness | No | Yes |
| Methods | No | Yes |
| Cases as values | No | Yes |
