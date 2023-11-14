In PHP, we have the following loop types:

+ [while](#while) - loops through a block of code as long as the specified condition is true
+ [do...while](#dowhile) - loops through a block of code once, and then repeats the loop as long as the specified condition is true
+ [for](#for) - loops through a block of code a specified number of times
+ [foreach](#foreach) - loops through a block of code for each element in an array

To control further the flow of a loop, you can use the [break](#php-break) and [continue](#php-continue) statements.

## while

The while loop - Loops through a block of code as long as the specified condition is true.

``` php
<?php
$x = 1;

while($x <= 5) {
  echo "The number is: $x <br>";
  $x++;
}
?>
```

### endwhile

The endwhile keyword is used to close the code block of a while loop which was started using the while(...): syntax.

``` php
<?php
$x = 1;

while($x <= 5):
  echo "The number is: $x <br>";
  $x++;
endwhile;
?>
```

## do...while

The do...while loop - Loops through a block of code once, and then repeats the loop as long as the specified condition is true.

In a do...while loop the condition is tested AFTER executing the statements within the loop. This means that the do...while loop will execute its statements at least once, even if the condition is false. See example below.

``` php
<?php
$x = 1;

do {
  echo "The number is: $x <br>";
  $x++;
} while ($x <= 5);
?>
```

## for

The for loop - Loops through a block of code a specified number of times. 

``` php
<?php
for ($x = 0; $x <= 10; $x++) {
  echo "The number is: $x <br>";
}
?>
```

### endfor

The endfor keyword is used to close the code block of a for loop which was started using the for(...): syntax.

``` php
<?php
for($i = 0; $i < 10; $i += 2):
  echo "$i <br>";
endfor;
?>
```

## foreach

The foreach loop - Loops through a block of code for each element in an array.

``` php
<?php
$colors = array("red", "green", "blue", "yellow");

foreach ($colors as $value) {
  echo "$value <br>";
}
?>
```

``` php
<?php
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");

foreach($age as $x => $val) {
  echo "$x = $val<br>";
}
?>
```	

### endforeach

The endforeach keyword is used to close the code block of a foreach loop which was started using the foreach(...): syntax.

``` php
<?php
$cars = ["Ford", "Volvo", "BMW"];
foreach($cars as $car):
  echo "$car <br>";
endforeach;
?>
```


## Break and Continue

### PHP Break
You have already seen the break statement used to "jump out" of a switch statement.

The break statement can also be used to jump out of a loop.

This example jumps out of the loop when x is equal to 4.

``` php
<?php
$x = 0;
while ($x < 10) {
  echo "The number is: $x <br>";
  $x++;
  if ($x == 4) {
    break;
  }
}
?>
```

### PHP Continue

The continue statement breaks one iteration (in the loop), if a specified condition occurs, and continues with the next iteration in the loop.

This example skips the value of 4.

``` php
<?php
for ($x = 0; $x < 10; $x++) {
  if ($x == 4) {
    continue;
  }
  echo "The number is: $x <br>";
}
?>
```


