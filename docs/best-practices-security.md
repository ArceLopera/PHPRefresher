# Best Practices: Security Essentials

> **Last updated:** April 6, 2026
> **Minimum PHP Version:** PHP 7.4+
> **Status:** Stable

## Overview

Security is not an afterthought—it's foundational. This guide covers the essential security practices every PHP developer must know to protect user data, prevent attacks, and build trustworthy applications.

## The Big Picture

**Security Issues by Severity:**
1. **SQL Injection** - Attackers modify database queries
2. **XSS (Cross-Site Scripting)** - Attackers inject malicious scripts
3. **CSRF (Cross-Site Request Forgery)** - Attackers trick users into actions
4. **Weak Authentication** - Passwords stored incorrectly
5. **Insecure Dependencies** - Using vulnerable libraries

The good news: modern PHP has built-in tools to prevent all of these.

## Rule 1: Never Trust User Input

Every input from users is potentially malicious.

❌ **DANGEROUS:**
```php
<?php
// User submits: Robert'; DROP TABLE users; --
$name = $_GET['name'];
$query = "SELECT * FROM users WHERE name = '$name'";
// Query becomes: SELECT * FROM users WHERE name = 'Robert'; DROP TABLE users; --'
?>
```

✅ **SAFE - Use Prepared Statements:**
```php
<?php
$pdo = new PDO('mysql:host=localhost;dbname=mydb', 'user', 'pass');
$stmt = $pdo->prepare("SELECT * FROM users WHERE name = ?");
$stmt->execute([$_GET['name']]);
$results = $stmt->fetchAll();
?>
```

**Why it works:**
- Query structure is fixed
- Data is treated as data, never as code
- Database can't execute injected commands

## Rule 2: Escape Output

When displaying user data, escape it to prevent XSS attacks.

❌ **DANGEROUS:**
```php
<?php
$comment = $_GET['comment'];  // User enters: <script>alert('hacked')</script>
echo "<p>Comment: $comment</p>";  // Script runs in user's browser!
?>
```

✅ **SAFE:**
```php
<?php
$comment = $_GET['comment'];
echo "<p>Comment: " . htmlspecialchars($comment) . "</p>";
// Outputs: Comment: &lt;script&gt;alert('hacked')&lt;/script&gt;
?>
```

**Functions to use:**
- `htmlspecialchars()` - Escape HTML entities
- `htmlentities()` - Escape all HTML entities
- `urlencode()` - Escape URLs

## Rule 3: Hash Passwords, Never Store Plaintext

❌ **DANGEROUS:**
```php
<?php
$password = $_POST['password'];
$query = "INSERT INTO users (email, password) VALUES (?, ?)";
$stmt->execute([$email, $password]);  // Plaintext in database!
?>
```

✅ **SAFE:**
```php
<?php
$password = $_POST['password'];
$hash = password_hash($password, PASSWORD_DEFAULT);
$query = "INSERT INTO users (email, password) VALUES (?, ?)";
$stmt->execute([$email, $hash]);

// Later, verify password:
if (password_verify($_POST['password'], $hash_from_database)) {
    echo "Login successful!";
}
?>
```

**Key points:**
- `password_hash()` creates one-way encryption
- `password_verify()` checks passwords safely
- Never try to "decrypt" passwords
- If database is breached, passwords are still safe

## Rule 4: Use HTTPS Always

Data sent over HTTP is visible to anyone on the network.

✅ **Always use HTTPS:**
- Certificate: Usually free (Let's Encrypt)
- Configuration: Your host handles it
- In PHP: Check and redirect if needed

```php
<?php
if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
    $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header("Location: $redirect");
    exit;
}
?>
```

## Rule 5: Keep Dependencies Updated

Vulnerable libraries are a major attack vector.

```bash
# Check for vulnerabilities
composer update

# Use a security scanner
composer audit

# Or use Symfony Security Advisories
php bin/console security:check
```

## Rule 6: Validate Input

Check that data is what you expect.

```php
<?php
// Validate email
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    die("Invalid email!");
}

// Validate integer
if (!filter_var($_POST['age'], FILTER_VALIDATE_INT)) {
    die("Age must be a number!");
}

// Validate URL
if (!filter_var($_POST['website'], FILTER_VALIDATE_URL)) {
    die("Invalid URL!");
}
?>
```

## Rule 7: Protect Against CSRF

CSRF tokens prevent attackers from tricking users into unwanted actions.

```php
<?php
// Generate token (on form display)
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<form method="POST">
    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
    <input type="email" name="email">
    <button type="submit">Update Email</button>
</form>

<?php
// Verify token (on form submission)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'] ?? '')) {
        die("CSRF token validation failed!");
    }
    // Process form...
}
?>
```

## Rule 8: Error Messages

Don't expose system details in error messages.

❌ **DANGEROUS:**
```php
<?php
try {
    $query = "SELECT * FROM users...";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();  // Shows database structure!
}
?>
```

✅ **SAFE:**
```php
<?php
try {
    $query = "SELECT * FROM users...";
} catch (Exception $e) {
    error_log($e->getMessage());  // Log details for developers
    echo "An error occurred. Please try again.";  // Safe message for users
}
?>
```

## Security Checklist

- [ ] Use prepared statements for all database queries
- [ ] Escape all user output with htmlspecialchars()
- [ ] Hash passwords with password_hash()
- [ ] Use HTTPS on all pages
- [ ] Keep dependencies updated (composer update)
- [ ] Validate all input with filter_var()
- [ ] Use CSRF tokens on forms
- [ ] Don't expose system errors to users
- [ ] Set secure PHP.ini settings
- [ ] Run security audit regularly

## Related Topics

- [Best Practices: Error Handling](best-practices-error-handling.md)
- [Moodle](Moodle/phpMoodle.md) - Moodle-specific security
- [User Functions](Func/phpUserFunc.md)

## See Also

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PHP Security Guide](https://www.php.net/manual/en/security.php)
- [PHP Password Hashing](https://www.php.net/manual/en/function.password-hash.php)

---

**Next: [Best Practices: Error Handling](best-practices-error-handling.md)**

