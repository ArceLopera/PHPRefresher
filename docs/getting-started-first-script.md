# Getting Started: Your First PHP Script

> **Last updated:** April 6, 2026
> **Minimum PHP Version:** PHP 7.4+
> **Status:** Stable

## Overview

In this guide, you'll write and run your first PHP program. You'll learn how PHP works, how to output text, and how to save and execute your code.

## Your First Program

### Step 1: Create a File

Create a new file called `hello.php` in your web server directory:
- **XAMPP:** `C:\xampp\htdocs\hello.php` (Windows) or `/Applications/XAMPP/htdocs/hello.php` (Mac)
- **PHP Server:** Any directory, e.g., `/home/user/php-projects/hello.php`

### Step 2: Write PHP Code

Open the file in your editor and type:

```php
<?php
echo "Hello, PHP!";
?>
```

### Step 3: Save and Run

**If using XAMPP:**
1. Save the file
2. Open browser: `http://localhost/hello.php`
3. See output: `Hello, PHP!`

**If using command-line:**
```bash
# Navigate to file directory
cd /path/to/file

# Run the file
php hello.php

# Output: Hello, PHP!
```

**If using built-in server:**
```bash
# Start server
php -S localhost:8000

# Open browser: http://localhost:8000/hello.php
```

Congratulations! You just ran your first PHP program! 🎉

## Understanding What Happened

```php
<?php              # Opening tag: tells server "PHP code starts here"
echo "Hello!";     # Command: output text to browser/console
?>                 # Closing tag: tells server "PHP code ends here"
```

**Key points:**
- PHP files start with `<?php` and end with `?>`
- `echo` outputs text
- Statements end with `;` (semicolon)
- PHP runs on the SERVER, then sends HTML to browser

## Try More Examples

### Example 1: Math

```php
<?php
echo 5 + 3;        # Outputs: 8
?>
```

### Example 2: Combining Text

```php
<?php
echo "I am " . 25 . " years old";  # Outputs: I am 25 years old
?>
```

### Example 3: Variables

```php
<?php
$name = "Alice";
echo "Hello, " . $name;  # Outputs: Hello, Alice
?>
```

### Example 4: Current Date

```php
<?php
echo date("Y-m-d");  # Outputs: 2026-04-06
?>
```

## Common First Mistakes

❌ **Mistake 1: Forgetting the opening tag**
```php
echo "Hello";  # Won't work - PHP doesn't know this is PHP!
```
✅ **Correct:**
```php
<?php
echo "Hello";
?>
```

❌ **Mistake 2: Forgetting the semicolon**
```php
<?php
echo "Hello"   # Parse error!
?>
```
✅ **Correct:**
```php
<?php
echo "Hello";
?>
```

❌ **Mistake 3: Mixing HTML and PHP incorrectly**
```html
<!-- Wrong way -->
<h1><?php echo "Title"; </h1>   <!-- Missing closing tag! -->
```
✅ **Correct:**
```html
<h1><?php echo "Title"; ?></h1>
```

## Mixing PHP with HTML

PHP excels at generating HTML dynamically:

```php
<?php
$title = "My Website";
$year = 2026;
?>
<html>
  <head>
    <title><?php echo $title; ?></title>
  </head>
  <body>
    <h1><?php echo $title; ?></h1>
    <p>Copyright © <?php echo $year; ?></p>
  </body>
</html>
```

Browser sees:
```html
<html>
  <head>
    <title>My Website</title>
  </head>
  <body>
    <h1>My Website</h1>
    <p>Copyright © 2026</p>
  </body>
</html>
```

## What You Learned

✅ How to create a PHP file  
✅ How to run PHP code  
✅ How `echo` outputs text  
✅ How PHP generates web pages  
✅ Common beginner mistakes  

## Next Steps

1. ✅ [Environment Setup](getting-started-setup.md) - Done!
2. ✅ [Your First Script](getting-started-first-script.md) - You are here!
3. ⏳ Continue with [Basics: Variables](PR/phpVar1.md)

Then explore other topics in [Basics](index.md) section.

## Related Topics

- [Variables](PR/phpVar1.md) - Storing data
- [Strings](PR/phpStr1.md) - Working with text
- [Functions](Func/phpUserFunc.md) - Reusable code

## See Also

- [PHP Echo Documentation](https://www.php.net/manual/en/function.echo.php)
- [PHP Date Function](https://www.php.net/manual/en/function.date.php)

---

**Continue with [Basics](PR/phpVar1.md) or explore [Best Practices](best-practices-index.md)!**

