# Best Practices: Error Handling

> **Last updated:** April 6, 2026
> **Minimum PHP Version:** PHP 7.4+
> **Status:** Stable

## Overview

Good error handling prevents crashes, helps debugging, and improves user experience. This guide covers PHP's error handling mechanisms and best practices.

## The Three Levels of Problems

| Level | Severity | Example | Handling |
|-------|----------|---------|----------|
| **Errors** | Fatal | Undefined variable | Try to prevent |
| **Exceptions** | Handleable | Database connection fails | Try/catch |
| **Warnings** | Non-fatal | File not found | Log and continue |

## Try/Catch: The Foundation

Use exceptions for problematic operations:

```php
<?php
try {
    // Code that might fail
    $pdo = new PDO('mysql:host=localhost;dbname=test', 'user', 'pass');
    $stmt = $pdo->prepare("SELECT * FROM nonexistent_table");
    $stmt->execute();
} catch (PDOException $e) {
    // Handle the error
    echo "Database error: " . $e->getMessage();
}
?>
```

**Flow:**
1. Try block executes
2. If error occurs → jumps to catch block
3. Code continues after try/catch

## Specific Exception Catching

Catch specific exceptions, not generic ones:

❌ **Too Broad:**
```php
<?php
try {
    // Many operations
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();  // Which operation failed?
}
?>
```

✅ **Specific:**
```php
<?php
try {
    $pdo = new PDO($dsn, $user, $pass);
} catch (PDOException $e) {
    echo "Database connection failed!";
} catch (ValueError $e) {
    echo "Invalid DSN format!";
}
?>
```

## Multiple Catches

Handle different errors differently:

```php
<?php
try {
    $file = fopen($path, 'r');
    $content = file_get_contents($path);
    $data = json_decode($content, true);
    
    if ($data === null) {
        throw new Exception("Invalid JSON");
    }
} catch (RuntimeException $e) {
    // File operations failed
    error_log("File error: " . $e->getMessage());
    echo "Unable to read file. Try again later.";
} catch (Exception $e) {
    // Other errors
    error_log("Error: " . $e->getMessage());
    echo "Something went wrong.";
}
?>
```

## Finally Block

Code that runs regardless of success or failure:

```php
<?php
$handle = null;
try {
    $handle = fopen("important.txt", "r");
    $data = fread($handle, filesize("important.txt"));
} catch (Exception $e) {
    echo "Error reading file!";
} finally {
    // ALWAYS runs
    if ($handle) {
        fclose($handle);  // Clean up resources
    }
}
?>
```

## Custom Exceptions

Create specific exceptions for your application:

```php
<?php
class InvalidUserException extends Exception {}
class UserNotFound Exception {}

function getUser($id) {
    if (!is_numeric($id)) {
        throw new InvalidUserException("User ID must be numeric!");
    }
    
    $user = findUserInDatabase($id);
    
    if (!$user) {
        throw new UserNotFoundException("User $id not found!");
    }
    
    return $user;
}

// Usage:
try {
    $user = getUser($id);
} catch (InvalidUserException $e) {
    echo "Invalid request: " . $e->getMessage();
} catch (UserNotFoundException $e) {
    echo "User not found: " . $e->getMessage();
}
?>
```

## Logging Errors

Don't just echo errors—log them for analysis:

```php
<?php
// Configure logging
ini_set('log_errors', 1);
ini_set('error_log', '/var/log/php_errors.log');

try {
    // Risky operation
} catch (Exception $e) {
    // Log for debugging
    error_log($e->__toString());
    
    // Show safe message to user
    echo "An error occurred. Our team has been notified.";
}
?>
```

Or use a logging library:

```php
<?php
use Monolog\Logger;
use Monolog\Handlers\StreamHandler;

$log = new Logger('name');
$log->pushHandler(new StreamHandler('/var/log/app.log'));

try {
    // Code
} catch (Exception $e) {
    $log->error($e->getMessage(), ['exception' => $e]);
}
?>
```

## Global Error Handler

Catch errors that aren't in try/catch blocks:

```php
<?php
// Define custom error handler
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    error_log("Error in $errfile at line $errline: $errstr");
    return true;  // Suppress default handler
});

set_exception_handler(function($exception) {
    error_log("Exception: " . $exception->getMessage());
    echo "An unexpected error occurred.";
});

// Now uncaught errors are handled gracefully
undefinedFunction();  // Won't crash, will be logged
?>
```

## PHP Configuration

Important php.ini settings:

```ini
; Display errors during development
display_errors = On

; But log them instead in production
display_errors = Off
log_errors = On
error_log = /var/log/php_errors.log

; Show all error types
error_reporting = E_ALL

; Set default timezone
date.timezone = "UTC"
```

## Common Error Types

```php
<?php
// Parse error - code won't run
echo "Missing semicolon"

// Fatal error - script stops
undefined_function();

// Warning - non-fatal, script continues
$array['key'];  // Undefined key

// Notice - minor issue
$undefined_var;

// Type error - wrong type
function expectString(string $s) {}
expectString(123);  // PHP 8+: TypeError
?>
```

## Error Handling Checklist

- [ ] Use try/catch for risky operations
- [ ] Catch specific exceptions, not generic
- [ ] Log errors with error_log() or library
- [ ] Show safe messages to users
- [ ] Never expose system details in errors
- [ ] Use finally block for cleanup
- [ ] Set global error handler
- [ ] Configure php.ini properly
- [ ] Test error scenarios
- [ ] Monitor error logs regularly

## Related Topics

- [Security Essentials](best-practices-security.md) - Secure your code
- [Exceptions](Func/phpExceptions.md) - Exception details

## See Also

- [PHP Exceptions](https://www.php.net/manual/en/class.exception.php)
- [Error Handling](https://www.php.net/manual/en/errorfunc.error-handling.php)
- [Monolog Library](https://github.com/Seldaek/monolog)

---

**Next: Explore more [Best Practices](best-practices-index.md) or continue with [Basics](PR/phpVar1.md)**

