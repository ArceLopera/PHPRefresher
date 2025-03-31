# Debugging in Moodle

Debugging is an essential part of software development, and Moodle provides multiple ways to output and track information for developers. 

## `mtrace()`

`mtrace()` is a Moodle-specific function used for logging and debugging, primarily in CLI scripts. It outputs messages to the console in real-time, making it useful for long-running scripts and background processes.

```php
mtrace(string $message, bool $eol = true);
```

- `$message` (string): The message to be printed.
- `$eol` (bool, optional): Whether to append a newline character (`true` by default).

```php
mtrace("Script execution started...");
// Perform some operations
mtrace("Processing data...");
mtrace("Script execution completed.");
```

+ Logging progress in long-running CLI scripts.
+ Debugging batch operations like cron jobs.
+ Providing real-time output during CLI-based maintenance tasks.

**Limitations**

❌ Not suitable for web-based debugging (since output goes to CLI).
❌ Considered a risky function in PHPUnit tests.
❌ Can interfere with structured output in automated scripts.

### Avoiding `mtrace()` in PHPUnit Tests

If `mtrace()` is triggering a "risky test" warning in PHPUnit, wrap it with a conditional check:
```php
if (!defined('PHPUNIT_TEST')) {
    mtrace("Normal execution mode");
}
```
Alternatively, use output buffering:
```php
if (defined('PHPUNIT_TEST')) {
    ob_start();
    mtrace("Debug message");
    ob_end_clean();
}
```

- Prevents PHPUnit from detecting unexpected output.
- Keeps `mtrace()` functional outside test environments.

## **`debugging()`**
Moodle provides the `debugging()` function to display debug messages based on the current debug level.

```php
debugging(string $message, int $level = DEBUG_DEVELOPER);
```
- `$message`: The debug message.
- `$level`: The debugging level (e.g., `DEBUG_DEVELOPER`, `DEBUG_NORMAL`).

```php
if (debugging()) {
    debugging("Debugging enabled: Checking variables...");
}
```
**Pros:**

- Respects Moodle's debugging settings.
- Can be disabled for production environments.

**Cons:**

- Not useful for CLI output (better for web-based debugging).

## **`error_log()` for Logging**
If you want to log debug messages instead of printing them, use `error_log()`.

```php
error_log("An error occurred in function XYZ");
```

**Pros:**

- Logs messages to the PHP error log.
- Useful for production environments.

**Cons:**

- Does not provide real-time CLI output.

## **PHPUnit’s `$this->debug()` in Tests**

For Moodle unit tests, avoid using `mtrace()`. Instead, use PHPUnit's `$this->debug()`.

```php
$this->debug("Running test case...");
```

**Pros:**

- Prevents unexpected output in PHPUnit.
- Allows debugging messages in test environments.

**Cons:**

- Only available inside PHPUnit test cases.

## **Using Moodle Logging API (`core\log\manager`)**

For logging within Moodle’s structured system, use the Moodle logging API.

```php
$logger = \core\log\manager::instance();
$logger->add_event(new \core\event\course_created(['context' => context_system::instance()]));
```

**Pros:**

- Integrated into Moodle's logging system.
- Useful for tracking events in production.

**Cons:**

- Requires more setup.

## Conclusion
- **Use `mtrace()`** for CLI-based debugging.
- **Use `debugging()`** for web-based debugging.
- **Use `error_log()`** for logging in production.
- **Use `$this->debug()`** for PHPUnit tests.
- **Use Moodle Logging API** for structured logging.


