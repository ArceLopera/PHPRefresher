Conditional statements are used to perform different actions based on different conditions.

## PHP Conditional Statements

In PHP we have the following conditional statements:

+ [if statement](#if-statement) - executes some code if one condition is true
+ [if...else statement](#if...else-statement) - executes some code if a condition is true and another code if that condition is false
+ [if...elseif...else statement](#if...elseif...else-statement) - executes different codes for more than two conditions
+ [switch statement](#switch-statement) - selects one of many blocks of code to be executed

### if statement

``` php
<?php
$t = date("H");

if ($t < "20") {
  echo "Have a good day!";
}
?>
```

### if...else statement

``` php
<?php
$t = date("H");

if ($t < "20") {
  echo "Have a good day!";
} else {
  echo "Have a good night!";
}
?>
```

### if...elseif...else statement

``` php
<?php
$t = date("H");

if ($t < "10") {
  echo "Have a good morning!";
} elseif ($t < "20") {
  echo "Have a good day!";
} else {
  echo "Have a good night!";
}
?>
```

#### endif

The endif keyword is used to mark the end of an if conditional which was started with the if(...): syntax. It also applies to any variation of the if conditional, such as if...elseif and if...else.

``` php
<?php
$a = 4;
if($a < 5):
  echo "Less than five";
endif;
?>
```

``` php
<?php
$a = 4;
if($a < 5):
  echo "Less than five";
elseif($a < 10):
  echo "More than five but less than ten";
else:
  echo "Greater than ten";
endif;
?>
```

### switch statement

``` php
<?php
$favcolor = "red";

switch ($favcolor) {
  case "red":
    echo "Your favorite color is red!";
    break;
  case "blue":
    echo "Your favorite color is blue!";
    break;
  case "green":
    echo "Your favorite color is green!";
    break;
  //Use default to handle unspecified cases in a switch block
  default:
    echo "Your favorite color is neither red, blue, nor green!";
}
?>
```

#### endswitch

The endswitch keyword is used to mark the end of a switch conditional which was started with the switch(...): syntax.

``` php
<?php
$a = 4;
switch($a):
  case 1: echo "One"; break;
  case 2: echo "Two"; break;
  case 3: echo "Three"; break;
  default: echo "Many"; break;
endswitch;
?>
```

## match statement

The `match` expression, introduced in PHP 8, is an improvement over the traditional `switch` statement. It provides a more concise syntax and has strict type comparison (`===`), making it safer to use in certain scenarios.  


```php
$result = match ($variable) {
    value1 => return_value1,
    value2 => return_value2,
    default => return_value_default,
};
```
- Each **case** is written as `value => return_value,`
- `match` **returns a value**, so it's an expression, not just a control structure.
- **No `break` is needed**, unlike `switch`.
- **Strict comparison (`===`)** is used instead of loose comparison (`==`), reducing unexpected bugs.

---

### **Comparing `match` vs. `switch`**
##### **Example 1: Basic Comparison**
###### Using `switch`
```php
$color = 'red';

switch ($color) {
    case 'red':
        $message = 'Stop';
        break;
    case 'yellow':
        $message = 'Slow down';
        break;
    case 'green':
        $message = 'Go';
        break;
    default:
        $message = 'Invalid color';
        break;
}

echo $message; // Output: Stop
```
 **Using `match` (More Concise)**
```php
$color = 'red';

$message = match ($color) {
    'red' => 'Stop',
    'yellow' => 'Slow down',
    'green' => 'Go',
    default => 'Invalid color',
};

echo $message; // Output: Stop
```
##### **Advantages of `match`**
1. **More Concise** – No need for `break`.
2. **Strict Comparison (`===`)** – Prevents unintended type coercion.
3. **Returns a Value Directly** – No need to define `$message` beforehand.

---

##### ** Example 2: Handling Numeric Cases**
######  `switch` with Loose Comparison (`==`)
```php
$value = '2';

switch ($value) {
    case 2: // This will match because switch uses loose comparison (==)
        $result = 'Matched as number 2';
        break;
    default:
        $result = 'No match';
}

echo $result; // Output: Matched as number 2
```
#####  `match` with Strict Comparison (`===`)
```php
$value = '2';

$result = match ($value) {
    2 => 'Matched as number 2', // This will NOT match because `match` uses strict comparison
    default => 'No match',
};

echo $result; // Output: No match
```
##### **⚠️ Key Difference**
- `switch` **matches** `'2'` with `2` because it uses `==` (loose comparison).
- `match` **does NOT match** `'2'` with `2` because it uses `===` (strict comparison).

---

##### ** Example 3: Multiple Assignments in `switch` vs. `match`**
If multiple variables need to be assigned in each case, `switch` is usually the better choice.

###### `switch` with Multiple Assignments
```php
$url = 'https://uat.net';

switch ($url) {
    case 'https://uat.net':
        $accesskeyid = 'url';
        $another_variable = 'value1';
        break;
    case 'https://prod.net':
        $accesskeyid = 'prod';
        $another_variable = 'value2';
        break;
    default:
        $accesskeyid = 'test';
        $another_variable = 'value3';
        break;
}

echo $accesskeyid; // Output: url
echo $another_variable; // Output: value1
```
###### **Alternative Approach Using `match`**
Since `match` does not support multiple statements directly, a workaround is required:
####### **Option 1: Returning an Array**
```php
$config = match ($url) {
    'https://uat.net' => ['accesskeyid' => 'url', 'another_variable' => 'value1'],
    'https://prod.net' => ['accesskeyid' => 'prod', 'another_variable' => 'value2'],
    default => ['accesskeyid' => 'test', 'another_variable' => 'value3'],
};

$accesskeyid = $config['accesskeyid'];
$another_variable = $config['another_variable'];

echo $accesskeyid; // Output: url
echo $another_variable; // Output: value1
```
###### **Option 2: Using a Function**
```php
function getConfig($url) {
    return match ($url) {
        'https://uat.net' => ['url', 'value1'],
        'https://prod.net' => ['prod', 'value2'],
        default => ['test', 'value3'],
    };
}

[$accesskeyid, $another_variable] = getConfig($url);

echo $accesskeyid; // Output: url
echo $another_variable; // Output: value1
```
#### **When to Use `switch` vs. `match`**
| Feature | `switch` | `match` |
|---------|---------|--------|
| **Strict comparison (`===`)** | ❌ No | ✅ Yes |
| **Returns a value** | ❌ No | ✅ Yes |
| **Requires `break`** | ✅ Yes | ❌ No |
| **Multiple Statements Per Case** | ✅ Yes | ❌ No (Workaround needed) |
| **Concise Syntax** | ❌ No | ✅ Yes |

---

##### **Summary**
###### **Use `match` when:**

+ You want a **concise syntax**.  
+ You need **strict comparison (`===`)**.  
+ You only need to return a **single value** per case.  

###### **Use `switch` when:**

+ You need **loose comparison (`==`)**.  
+ You need to execute **multiple statements per case**.  
+ You are using **complex logic** inside each case.  

