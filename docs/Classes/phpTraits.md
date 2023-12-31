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