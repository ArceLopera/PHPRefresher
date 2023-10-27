Operators are used to perform operations on variables and values.

PHP divides the operators in the following groups:

+ [Arithmetic operators](#php-arithmetic-operators)
+ [Assignment operators](#php-assignment-operators)
+ [Comparison operators](#php-comparison-operators)
+ Increment/Decrement operators
+ Logical operators
+ String operators
+ Array operators
+ Conditional assignment operators


## PHP Arithmetic Operators

The PHP arithmetic operators are used with numeric values to perform common arithmetical operations, such as addition, subtraction, multiplication etc.

| Operator | Description |Example|Result|
| -------- | ----------- | ---- | ----- |
| `+` | Addition | $x + $y | Sum of $x and $y|  
| `-` | Subtraction | $x - $y | Difference of $x and $y |
| `*` | Multiplication | $x * $y | Product of $x and $y |
| `/` | Division | $x / $y | Quotient of $x and $y |
| `%` | Modulus | $x % $y | Remainder of $x divided by $y |
| `**` | Exponentiation | $x ** $y | $x to the power of $y |

## PHP Assignment Operators
The PHP assignment operators are used with numeric values to write a value to a variable.

The basic assignment operator in PHP is "=". It means that the left operand gets set to the value of the assignment expression on the right.

| Operator | Description |Example|Result|
| -------- | ----------- | ---- | ----- |
| `=` | Assignment | $x = $y | Assign $y to $x |
| `+=` | Addition Assignment | $x = $x + $y | Add $y to $x and assign the result to $x |
| `-=` | Subtraction Assignment | $x = $x - $y | Subtract $y from $x and assign the result to $x |
| `*=` | Multiplication Assignment | $x = $x * $y | Multiply $x by $y and assign the result to $x |
| `/=` | Division Assignment | $x = $x / $y | Divide $x by $y and assign the result to $x |
| `%=` | Modulus Assignment | $x = $x % $y | Modulus of $x divided by $y and assign the result to $x |

## PHP Comparison Operators

The PHP comparison operators are used to compare two values (number or string):

| Operator | Description |Example|Result|
| -------- | ----------- | ---- | ----- |
| `==` | Equal to | $x == $y | Returns true if $x is equal to $y |
| `===` | Identical to | $x === $y | Returns true if $x is equal to $y, and they are of the same type |
| `!=` | Not equal to | $x != $y | Returns true if $x is not equal to $y |
| `<>` | Not equal to | $x <> $y | Returns true if $x is not equal to $y |
| `!==` | Not identical to | $x !== $y | Returns true if $x is not equal to $y, or they are not of the same type |
| `<` | Less than | $x < $y | Returns true if $x is less than $y |
| `<=` | Less than or equal to | $x <= $y | Returns true if $x is less than or equal to $y |
| `>` | Greater than | $x > $y | Returns true if $x is greater than $y |
| `>=` | Greater than or equal to | $x >= $y | Returns true if $x is greater than or equal to $y |
| `<=>` | Spaceship operator | $x <=> $y | Returns an integer less than, equal to, or greater than zero, depending on if $x is less than, equal to, or greater than $y.  Introduced in PHP 7. | 

