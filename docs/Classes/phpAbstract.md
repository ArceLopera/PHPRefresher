# PHP Abstract Classes

> **Last updated:** April 6, 2026  
> **Minimum PHP Version:** PHP 5.3.5+

## Overview

Abstract classes and methods provide a way for parent classes to define a contract that child classes must fulfill. An abstract class is a class that contains at least one abstract method, and an abstract method is a method that is declared but not implemented in the code.

## When to Use

- Creating a base class that shouldn't be instantiated directly
- Defining a contract that child classes must follow
- Enforcing consistent method signatures across related classes
- Building class hierarchies with shared structure
- Implementing the Template Method design pattern

## Basic Example

```php
<?php
abstract class Animal {
    abstract public function makeSound();
    
    public function sleep() {
        echo "Zzzzz...";
    }
}

class Dog extends Animal {
    public function makeSound() {
        echo "Woof!";
    }
}

$dog = new Dog();
$dog->makeSound(); // Output: Woof!
$dog->sleep();     // Output: Zzzzz...
?>
```

## Advanced Example

```php
<?php
abstract class PaymentProcessor {
    abstract protected function validate($amount);
    abstract public function process($amount);
    
    final public function pay($amount) {
        $this->validate($amount);
        return $this->process($amount);
    }
}

class CreditCardProcessor extends PaymentProcessor {
    protected function validate($amount) {
        if ($amount <= 0) throw new Exception("Invalid amount");
    }
    
    public function process($amount) {
        return "Processing \$$amount via credit card";
    }
}
?>
```

## Comparison Table

| Feature | Abstract Class | Concrete Class | Interface |
|---------|---|---|---|
| Can be instantiated | ❌ No | ✅ Yes | ❌ No |
| Can have properties | ✅ Yes | ✅ Yes | ❌ No |
| Can have implementations | ✅ Yes | ✅ Yes | ❌ No (before PHP 8.0) |
| Can use inheritance | ✅ Yes | ✅ Yes | ✅ Yes (multiple) |

## Related Topics

- [Classes](./phpCls.md)
- [Inheritance](./phpInheritance.md)
- [Interfaces](./phpInterfaces.md)
- [Traits](./phpTraits.md)

## PHP Version Support

**Introduced:** PHP 5.3.5  
**Minimum Required:** PHP 5.3.5+

## See Also

- [Official PHP Abstract Classes Documentation](https://www.php.net/manual/en/language.oop5.abstract.php)

---

Abstract classes and methods are when the parent class has a named method, but need its child class(es) to fill out the tasks.

When inheriting from an abstract class, the child class method must be defined with the same name, and the same or a less restricted access modifier. So, if the abstract method is defined as protected, the child class method must be defined as either protected or public, but not private. Also, the type and number of required arguments must be the same. However, the child classes may have optional arguments in addition.

So, when a child class is inherited from an abstract class, we have the following rules:

+ The child class method must be defined with the same name and it redeclares the parent abstract method
+ The child class method must be defined with the same or a less restricted access modifier
+ The number of required arguments must be the same. However, the child class may have optional arguments in addition

``` php
<?php
// Parent class
abstract class Car {
  public $name;
  public function __construct($name) {
    $this->name = $name;
  }
  abstract public function intro() : string;
}

// Child classes
class Audi extends Car {
  public function intro() : string {
    return "Choose German quality! I'm an $this->name!";
  }
}

class Volvo extends Car {
  public function intro() : string {
    return "Proud to be Swedish! I'm a $this->name!";
  }
}

class Citroen extends Car {
  public function intro() : string {
    return "French extravagance! I'm a $this->name!";
  }
}

// Create objects from the child classes
$audi = new audi("Audi");
echo $audi->intro();
echo "<br>";

$volvo = new volvo("Volvo");
echo $volvo->intro();
echo "<br>";

$citroen = new citroen("Citroen");
echo $citroen->intro();
?>
```

``` php
<?php
abstract class ParentClass {
  // Abstract method with an argument
  abstract protected function prefixName($name);
}

class ChildClass extends ParentClass {
  public function prefixName($name) {
    if ($name == "John Doe") {
      $prefix = "Mr.";
    } elseif ($name == "Jane Doe") {
      $prefix = "Mrs.";
    } else {
      $prefix = "";
    }
    return "{$prefix} {$name}";
  }
}

$class = new ChildClass;
echo $class->prefixName("John Doe");
echo "<br>";
echo $class->prefixName("Jane Doe");
?>
```

``` php
<?php
abstract class ParentClass {
  // Abstract method with an argument
  abstract protected function prefixName($name);
}

class ChildClass extends ParentClass {
  // The child class may define optional arguments that are not in the parent's abstract method
  public function prefixName($name, $separator = ".", $greet = "Dear") {
    if ($name == "John Doe") {
      $prefix = "Mr";
    } elseif ($name == "Jane Doe") {
      $prefix = "Mrs";
    } else {
      $prefix = "";
    }
    return "{$greet} {$prefix}{$separator} {$name}";
  }
}

$class = new ChildClass;
echo $class->prefixName("John Doe");
echo "<br>";
echo $class->prefixName("Jane Doe");
?>
```