## Declaring a Namespace
Namespaces are declared at the beginning of a file using the namespace keyword.

```php
<?php
namespace Html;
?>
```

A namespace declaration must be the first thing in the PHP file. The following code would be invalid.

Constants, classes and functions declared in this file will belong to the Html namespace:

```php

<?php
namespace Html;
class Table {
  public $title = "";
  public $numRows = 0;
  public function message() {
    echo "<p>Table '{$this->title}' has {$this->numRows} rows.</p>";
  }
}
$table = new Table();
$table->title = "My table";
$table->numRows = 5;
?>

<!DOCTYPE html>
<html>
<body>

<?php
$table->message();
?>

</body>
</html>
```

## Nested Namespaces
Namespaces can be nested.

```php
<?php
namespace Code\Html;
?>
```

## Using Namespaces

Any code that follows a namespace declaration is operating inside the namespace, so classes that belong to the namespace can be instantiated without any qualifiers. To access classes from outside a namespace, the class needs to have the namespace attached to it.

```php
<?php
$table = new Html\Table();
$row = new Html\Row();
?>
```

When many classes from the same namespace are being used at the same time, it is easier to use the namespace keyword.

```php
<?php
namespace Html;
$table = new Table();
$row = new Row();
?>
```

## Namespace Alias
It can be useful to give a namespace or class an alias to make it easier to write. This is done with the use keyword.

```php
<?php
use Html as H;
$table = new H\Table();
?>
```

```php
<?php
use Html\Table as T;
$table = new T();
?>
```	