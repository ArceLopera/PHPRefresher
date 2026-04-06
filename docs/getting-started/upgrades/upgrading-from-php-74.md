> **Last updated:** April 6, 2026  
> **Minimum PHP Version:** PHP 8.0+  
> **Status:** Stable

# Upgrading from PHP 7.4 to 8.0

## Overview

PHP 8.0 (released November 26, 2020) introduced major language improvements and breaking changes. This guide covers the key changes and how to upgrade your code.

**Key Theme:** PHP 8.0 focuses on developer experience with better error handling, type system improvements, and cleaner syntax.

---

## Table of Contents

1. [Important Breaking Changes](#important-breaking-changes)
2. [New Features](#new-features)
3. [Step-by-Step Migration](#step-by-step-migration)
4. [Testing Strategy](#testing-strategy)
5. [Common Issues](#common-issues)
6. [Resources](#resources)

---

## Important Breaking Changes

### 1. Removed Functions

The following functions are **completely removed** in PHP 8.0. They were deprecated in PHP 7.4.

| Function | Replacement | Status |
|----------|-------------|--------|
| `create_function()` | Anonymous functions `fn()` or `function() {}` | ❌ Removed |
| `each()` | `foreach()` loop | ❌ Removed |
| `money_format()` | `NumberFormatter` from intl extension | ❌ Removed |
| `ldap_sort()` | Use custom sorting | ❌ Removed |

**Migration Example:**

```php
// PHP 7.4 ❌
$func = create_function('$a,$b', 'return $a + $b;');
$result = $func(5, 3);

// PHP 8.0+ ✅
$func = fn($a, $b) => $a + $b;
$result = $func(5, 3);
```

---

### 2. Type Coercion Changes

PHP 8.0 is stricter about type coercion. Operations that previously worked may now throw errors.

#### count() on Non-countable

**Before (PHP 7.4):** Silent warning  
**After (PHP 8.0+):** `TypeError` exception

```php
// PHP 7.4 ❌
$value = null;
echo count($value); // Returns 0, with warning

// PHP 8.0+ ✅
$value = null;
if (is_countable($value)) {
    echo count($value); // Only count if countable
} else {
    echo 0;
}

// Or use: count($value ?? []);
```

#### String to Number Coercion

```php
// PHP 7.4 ❌
$result = "5 apples" + 3; // Result: 8

// PHP 8.0 ✅ - Stricter but safer
// Numeric strings only: "5" works, "5 apples" throws TypeError
$result = intval("5 apples") + 3; // Explicit conversion: 8
```

---

### 3. Error Handling for Null

Operations on null are now strictly typed.

```php
// PHP 7.4 ❌
$user = null;
echo $user->name; // Returns null with warning

// PHP 8.0 ✅
$user = null;
// Option 1: Null coalescing
echo $user->name ?? "Unknown";

// Option 2: Nullsafe operator (PHP 8.0+)
echo $user?->name ?? "Unknown";
```

---

### 4. Variable Syntax Changes

Certain variable variables and indirect calls are no longer allowed.

```php
// PHP 7.4 ❌ - These may have worked differently
// Complex variable parsing

// PHP 8.0 ✅ - More explicit and predictable
// Use explicit method calls instead

class Handler {
    public function action(): string {
        return "Success";
    }
}

// Instead of: $obj->$method()
// Use:
$handler = new Handler();
$result = $handler->action(); // Explicit
```

---

## New Features

### 1. Constructor Property Promotion ⭐

Automatically assign constructor parameters to properties:

```php
// PHP 7.4 - Verbose
class User {
    private string $name;
    private int $age;
    private string $email;
    
    public function __construct(string $name, int $age, string $email) {
        $this->name = $name;
        $this->age = $age;
        $this->email = $email;
    }
}

// PHP 8.0+ - Concise
class User {
    public function __construct(
        private string $name,
        private int $age,
        private string $email,
    ) {}
}
```

**Benefit:** Eliminates 5 lines of boilerplate code per class.

---

### 2. Named Arguments ⭐

Call functions by parameter name instead of position:

```php
// PHP 7.4 - Position-based, easy to confuse
function sendEmail($to, $subject, $body, $from, $cc, $bcc) {
    // Implementation
}

sendEmail($to, $subject, $body, $from, '', ''); // What are these empty strings?

// PHP 8.0+ - Self-documenting with names
sendEmail(
    to: 'user@example.com',
    subject: 'Welcome',
    body: 'Hello!',
    from: 'noreply@site.com',
    cc: '',
    bcc: 'archive@site.com',
);

// Parameters can be in any order:
sendEmail(
    body: 'Hello!',
    to: 'user@example.com',
    from: 'noreply@site.com',
    subject: 'Welcome',
);
```

**Benefit:** Code is more readable and order-independent.

---

### 3. Match Expression ⭐

Better alternative to switch statements:

```php
// PHP 7.4 - switch is verbose
switch ($statusCode) {
    case 200:
        $message = 'OK';
        break;
    case 404:
        $message = 'Not Found';
        break;
    case 500:
        $message = 'Server Error';
        break;
    default:
        $message = 'Unknown';
}

// PHP 8.0+ - match is cleaner
$message = match($statusCode) {
    200 => 'OK',
    404 => 'Not Found',
    500 => 'Server Error',
    default => 'Unknown',
};

// match can group values:
$type = match($code) {
    200, 201, 204 => 'success',
    400, 401, 403 => 'client_error',
    500, 502, 503 => 'server_error',
    default => 'unknown',
};
```

**Benefits:** Shorter, returns a value, strict equality check.

---

### 4. Nullsafe Operator ⭐

Safely access properties/methods on potentially null objects:

```php
// PHP 7.4
$email = null;
if ($user !== null) {
    if ($user->profile !== null) {
        $email = $user->profile->email;
    }
}

// PHP 8.0+
$email = $user?->profile?->email;

// Works with method calls too:
$message = $user?->profile?->getMessage() ?? 'No message';
```

**Benefit:** Cleaner null-safe chaining.

---

### 5. Union Types

Variables can accept multiple types:

```php
// PHP 7.4 - Only single type hints
function process(string $value): string {
    return $value;
}

// PHP 8.0+ - Multiple allowed types
function process(string|int $value): string|int {
    if (is_string($value)) {
        return strtoupper($value);
    }
    return $value * 2;
}

process("hello");  // Works
process(5);        // Also works
```

---

### 6. static Return Type

Use `static` keyword for return types (allows subclass types):

```php
// PHP 8.0+
class Builder {
    public function reset(): static {
        return new static();
    }
}

class SpecialBuilder extends Builder {
    // reset() now returns SpecialBuilder, not Builder
}
```

---

## Step-by-Step Migration

### Phase 1: Preparation (Day 1)

```bash
# 1. Install PHP 8.0 locally
# 2. Set up development environment
# 3. Back up current code

# 4. Run PHP compatibility checker
composer require --dev phpstan/phpstan
vendor/bin/phpstan analyse src/
```

### Phase 2: Remove Deprecated Functions (Day 1-2)

Find and replace:

```bash
# Search for removed functions
grep -r "create_function" src/
grep -r "each(" src/
grep -r "money_format" src/

# Update each occurrence
# Replace with modern equivalents
```

### Phase 3: Fix Type Coercion (Day 2-3)

Review error-prone patterns:

- [ ] `count()` calls - add null checks
- [ ] String to number operations - use intval()
- [ ] Null property access - use nullsafe operator
- [ ] Array operations - verify arrays exist

### Phase 4: Update Syntax (Day 3-4)

Modernize code using new features:

- [ ] Convert property assignment to constructor promotion
- [ ] Use named arguments for clarity
- [ ] Replace switch with match expressions
- [ ] Use nullsafe operator for chains

### Phase 5: Testing (Day 4-5)

```bash
# 1. Run unit tests
phpunit tests/

# 2. Run integration tests
# 3. Manual testing of critical paths
# 4. Load testing
# 5. Error log review

# 6. Staging deployment
# 7. Final QA
```

### Phase 6: Production (Day 6)

```bash
# 1. Monitor error logs closely
# 2. Have rollback plan ready
# 3. Gradually roll out to users
# 4. Monitor performance
```

---

## Testing Strategy

### Before Upgrading

```bash
# 1. Run existing tests
phpunit tests/ --coverage-html coverage/

# 2. Static analysis
vendor/bin/phpstan analyse src/

# 3. Code style
vendor/bin/php-cs-fixer fix src/ --dry-run
```

### After Upgrading

```bash
# 1. Check for new errors
php -l src/  # Basic syntax check

# 2. Run all tests
phpunit tests/ -v

# 3. Integration testing
php artisan test  # If using Laravel

# 4. User acceptance testing
# - Test critical workflows
# - Check error handling
# - Verify edge cases
```

### Key Tests to Add

```php
// Test null coalescing
$this->assertNull($nullVar->property ?? null);

// Test type safety
$this->expectTypeError();
$result = "string" + 1;  // Should throw

// Test new syntax
$config = match($env) {
    'dev' => $this->devConfig,
    'prod' => $this->prodConfig,
    default => $this->defaultConfig,
};
$this->assertNotNull($config);
```

---

## Common Issues

### Issue 1: "Undefined array key" Warnings

```php
// PHP 7.4 ❌
$value = $data['key']; // Warning if key doesn't exist

// PHP 8.0 ✅
$value = $data['key'] ?? null; // Safe
// Or:
$value = $data['key'] ?? 'default';
```

### Issue 2: Type Errors on Null Operations

```php
// PHP 7.4 ❌
$result = null + 5; // Returns 5

// PHP 8.0 ✅
$result = ($value ?? 0) + 5; // Explicit null handling
```

### Issue 3: Function Call Changes

```php
// PHP 7.4 ❌
$callback = 'myFunction';
$callback();  // May work

// PHP 8.0 ✅
if (function_exists('myFunction')) {
    call_user_func('myFunction');
}
```

---

## Performance Notes

### Improvements in PHP 8.0

- ✅ Constructor property promotion reduces memory overhead
- ✅ Union types enable better optimizations
- ✅ JIT compiler available (optional, significant speedup)
- ✅ Faster array operations
- ✅ Better string handling

### Potential Slowdowns

- ❌ Stricter type checking (minor overhead)
- ❌ More thorough error handling (usually worth it)

**Overall:** PHP 8.0 is generally 5-15% faster than 7.4 for typical applications.

---

## Resources

### Official Documentation
- [PHP 8.0 Release Notes](https://www.php.net/releases/8.0/)
- [PHP 8.0 Migration Guide](https://www.php.net/manual/en/migration80.php)
- [Deprecations in PHP 8.0](https://www.php.net/manual/en/migration80.deprecated.php)

### Tools
- [PHPStan](https://phpstan.org/) - Static analysis
- [PHP Upgrader](https://github.com/rectorphp/rector) - Automated code upgrades
- [Psalm](https://psalm.dev/) - Static analysis and type checking

### Community
- [PHP Internals RFC](https://wiki.php.net/rfc) - Feature discussions
- [Stack Overflow](https://stackoverflow.com/questions/tagged/php-8.0) - PHP 8.0 Q&A
- [PHP Subreddits](https://www.reddit.com/r/PHP/) - Community discussions

---

## Checklist

Before marking your upgrade complete:

- [ ] All PHP 7.4 deprecated functions removed
- [ ] Type coercion issues resolved
- [ ] Null handling updated throughout
- [ ] New PHP 8.0 syntax adopted where beneficial
- [ ] All tests passing (unit + integration)
- [ ] Static analysis clean (PHPStan, Psalm)
- [ ] Performance benchmarks acceptable
- [ ] Production monitoring in place
- [ ] Rollback plan documented
- [ ] Team trained on new features

---

## Next Steps

After upgrading to PHP 8.0:

1. **Learn PHP 8.0 features** - Explore new capabilities
2. **Plan PHP 8.1 upgrade** - Start planning next upgrade
3. **Optimize code** - Use new syntax and features
4. **Monitor in production** - Ensure stability
5. **Contribute back** - Share your learnings

---

## See Also

- [Version Comparison Matrix](version-comparison.md)
- [PHP Version Support](../../VERSION-STRATEGY.md)
- [Constructor Property Promotion](../../Classes/phpConstructor.md)
- [Arrow Functions](../../Func/phpArrowFunc.md)
- [Official PHP 8.0 Migration Guide](https://www.php.net/manual/en/migration80.php)

---

**Migration Difficulty:** Medium ⭐⭐⭐  
**Estimated Time:** 2-5 days for typical project  
**Recommended:** Yes - PHP 7.4 security support ended November 2022
