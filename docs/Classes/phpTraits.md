# PHP Traits

> **Last updated:** April 6, 2026  
> **Minimum PHP Version:** PHP 5.4+

## Overview

Traits solve the limitation of single inheritance by allowing a class to reuse a set of methods. Since PHP doesn't support multiple inheritance, traits provide a mechanism to group functionality and apply it to multiple classes independently.

## When to Use

- Adding shared functionality to multiple unrelated classes
- Avoiding code duplication across class hierarchies
- Mimicking multiple inheritance safely
- Creating mixins and shared behaviors
- Building reusable component libraries

## Basic Example

```php
<?php
trait Logger {
    public function log($message) {
        echo "[LOG] " . $message;
    }
}

class Application {
    use Logger;
}

class Database {
    use Logger;
}

$app = new Application();
$app->log("App started");  // Output: [LOG] App started

$db = new Database();
$db->log("Connected");    // Output: [LOG] Connected
?>
```

## Advanced Example

```php
<?php
trait Timestamps {
    public $createdAt;
    public $updatedAt;
    
    public function setCreatedAt() {
        $this->createdAt = date('Y-m-d H:i:s');
    }
    
    public function setUpdatedAt() {
        $this->updatedAt = date('Y-m-d H:i:s');
    }
}

trait Serializable {
    public function toArray() {
        return get_object_vars($this);
    }
}

class User {
    use Timestamps, Serializable;
    public $name;
    
    public function __construct($name) {
        $this->name = $name;
        $this->setCreatedAt();
    }
}

$user = new User("Alice");
print_r($user->toArray());
// Output: Array ( [name] => Alice [createdAt] => 2026-04-06 14:33:22 [updatedAt] => )
?>
```

## Related Topics

- [Classes](./phpCls.md)
- [Inheritance](./phpInheritance.md)
- [Abstract Classes](./phpAbstract.md)
- [Interfaces](./phpInterfaces.md)

## PHP Version Support

**Introduced:** PHP 5.4  
**Minimum Required:** PHP 5.4+

## See Also

- [Official PHP Traits Documentation](https://www.php.net/manual/en/language.oop5.traits.php)

---

PHP only supports single inheritance: a child class can inherit only from one single parent.

So, what if a class needs to inherit multiple behaviors? OOP traits solve this problem.

Traits are used to declare methods that can be used in multiple classes. Traits can have methods and abstract methods that can be used in multiple classes, and the methods can have any access modifier (public, private, or protected).

Traits are declared with the trait keyword.

``` php
<?php
trait message1 {
public function msg1() {
    echo "OOP is fun! ";
  }
}

class Welcome {
  use message1;
}

$obj = new Welcome();
$obj->msg1();
?>
```

## Using Multiple Traits

``` php
<?php
trait message1 {
  public function msg1() {
    echo "OOP is fun! ";
  }
}

trait message2 {
  public function msg2() {
    echo "OOP reduces code duplication!";
  }
}

class Welcome {
  use message1;
}

class Welcome2 {
  use message1, message2;
}

$obj = new Welcome();
$obj->msg1();
echo "<br>";

$obj2 = new Welcome2();
$obj2->msg1();
$obj2->msg2();
?>
```

## Trait Alias

``` php
<?php
trait message1 {
  public function msg1() {
    echo "OOP is fun! ";
  }
}

class Welcome {
  use message1 {
    message1::msg1 as msg;
  }
}

$obj = new Welcome();
$obj->msg();
?>
```

### The insteadof Keyword

The insteadof keyword allows you to select from which trait a method should be taken if more than one trait has a method with the same name.

``` php
<?php
trait message1 {
  public function msgA() {
    echo "My favorite color is red. ";
  }

  public function msgB() {
    echo "My favorite number is 5. ";
  }
}

trait message2 {
  public function msgA() {
    echo "My favorite color is blue. ";
  }

  public function msgB() {
    echo "My favorite number is 7. ";
  }
}

class MyClass {
  use message1, message2 {
    message1::msgA insteadof message2;
    message2::msgB insteadof message1;
  }
}

$obj = new MyClass();
$obj->msgA();
$obj->msgB();
?>
```