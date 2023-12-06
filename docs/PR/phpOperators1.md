Operators are used to perform operations on variables and values.

PHP divides the operators in the following groups:

+ [Arithmetic operators](#php-arithmetic-operators)
+ [Assignment operators](#php-assignment-operators)
+ [Comparison operators](#php-comparison-operators)
+ [Increment/Decrement operators](#php-increment-decrement-operators)
+ [Logical operators](#php-logical-operators)
+ [String operators](#php-string-operators)
+ [Array operators](#php-array-operators)
+ [Conditional assignment operators](#conditional-assignment-operators)


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

### Avoiding == Versus = Confusion

Use:

```php
if (12 == $dwarves) { ... }
```
instead of:

```php
if ($dwarves == 12) { ... }
```
Putting the constant on the left triggers a parse error with the assignment operator. In
other words, PHP complains when you write:

```php
if (12 = $dwarves) { ... }
```
but:

```php
if ($dwarves = 12) { ... }
```
silently executes, assigning 12 to the variable dwarves, and then executing the code
inside the block. ($dwarves = 12 evaluates to 12, which is true.)

Putting a constant on the left side of a comparison coerces the comparison to the type of the constant. This causes problems when you are comparing an integer with a variable that could be an integer or a string. 0 == $dwarves is true when $dwarves is 0, but it’s also true when $dwarves is sleepy. Because an integer (0) is on the left side of the comparison, PHP converts what’s on the right (the string sleepy) to an integer (0) before comparing. To avoid this, use the identity operator, 0 === $dwarves, instead.

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

## PHP Increment / Decrement Operators

The PHP increment and decrement operators are used to increase or decrease the value of a variable.

| Operator | Description |Result|
| -------- | ----------- | ----- |
| `++$x` | Pre-increment | Increments $x by one, then returns $x |
| `$x++` | Post-increment | Returns $x, then increments $x by one |
| `--$x` | Pre-decrement | Decrements $x by one, then returns $x |
| `$x--` | Post-decrement | Returns $x, then decrements $x by one |

## PHP Logical Operators

The PHP logical operators are used to combine conditional statements.

| Operator | Description |Example|Result|
| -------- | ----------- | ---- | ----- |
| `&&` | Logical AND | $x && $y | Returns true if both $x and $y are true |
| `||` | Logical OR | $x `||` $y | Returns true if either $x or $y is true |
| `!` | Logical NOT | ! $x | Returns the opposite of $x |
| `and` | Logical AND | $x and $y | Returns true if both $x and $y are true |
| `or` | Logical OR | $x or $y | Returns true if either $x or $y is true |
| `xor` | Logical Xor | $x xor $y | True if either $x or $y is true, but not both |


## PHP String Operators

The PHP string operators are used to concatenate strings.

| Operator | Description |Example|Result|
| -------- | ----------- | ---- | ----- |
| `.` | Concatenation | $x . $y | Concatenates $x and $y |
| `.=` | Concatenation assignment | $x .= $y | Appends $y to $x |

## PHP Array Operators

The PHP array operators are used to perform operations on arrays.

| Operator | Description |Example|Result|
| -------- | ----------- | ---- | ----- |
| `+` | Union |	$x + $y	|Union of $x and $y|
| `==`	|Equality|	$x == $y|	Returns true if $x and $y have the same key/value pairs|
|`===`|	Identity|	$x === $y|	Returns true if $x and $y have the same key/value pairs in the same order and of the same types|
|`!=`|	Inequality|	$x != $y|	Returns true if $x is not equal to $y|
|`<>`	|Inequality	|$x <> $y|	Returns true if $x is not equal to $y|
|`!==`	|Non-identity|	$x !== $y|	Returns true if $x is not identical to $y|


## Conditional Assignment Operators

| Operator | Description |Example|Result|
| -------- | ----------- | ---- | ----- |
| `?:` | Ternary Operator | $x = expr1 ? expr2 : expr3|	Returns the value of $x. The value of $x is expr2 if expr1 = TRUE. The value of $x is expr3 if expr1 = FALSE |
|`??`|	Null coalescing	|$x = expr1 ?? expr2	|Returns the value of $x. The value of $x is expr1 if expr1 exists, and is not NULL. If expr1 does not exist, or is NULL, the value of $x is expr2. Introduced in PHP 7|
