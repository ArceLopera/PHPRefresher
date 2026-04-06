> **Last updated:** April 6, 2026  
> **Minimum PHP Version:** PHP 7.4+  
> **Status:** Stable

# PHP Version-Specific Documentation Strategy

This guide documents the PHPRefresher approach to handling PHP version differences in documentation. As a project supporting PHP 7.4 through 8.3+, we need clear strategies for showing version-specific features, breaking changes, and upgrade paths.

---

## Quick Reference

- **Supported Versions:** PHP 7.4, 8.0, 8.1, 8.2, 8.3
- **Actively Supported:** PHP 8.2, 8.3
- **Documentation Focus:** Modern PHP 8.0+ with backward compatibility notes

---

## Version Support Documentation

### Feature Availability Tables

Use these tables in documentation to show which versions support each feature:

```markdown
| Feature | PHP 7.4 | PHP 8.0 | PHP 8.1 | PHP 8.2 | PHP 8.3 |
|---------|---------|---------|---------|---------|---------|
| Constructor Promotion | ❌ | ✅ | ✅ | ✅ | ✅ |
| Named Arguments | ❌ | ✅ | ✅ | ✅ | ✅ |
| Match Expressions | ❌ | ✅ | ✅ | ✅ | ✅ |
```

**Include in:** Constructor docs, type system docs, OOP features, control flow docs

### Code Comparison: Before & After

Show how to write compatible code for different versions:

```php
// PHP 7.4
class User {
    private string $name;
    public function __construct(string $name) {
        $this->name = $name;
    }
}

// PHP 8.0+ (Constructor Promotion)
class User {
    public function __construct(private string $name) {}
}
```

### Upgrade Guides

Quick reference guides for upgrading between major versions:

- [Upgrading from PHP 7.4 to 8.0](getting-started/upgrades/upgrading-from-php-74.md) - Major breaking changes
- [Version Comparison Matrix](getting-started/upgrades/version-comparison.md) - Feature matrix by version

---

## Using This Strategy

### In Your Documentation

1. **Add version table** at the top of files with version-specific info
2. **Use features appropriately** - Show modern syntax first, then legacy if needed
3. **Link to upgrade guides** when breaking changes apply
4. **Cross-reference** related topics in "See Also" sections

### Files Following This Strategy

These files include version support information:

- `docs/Classes/phpConstructor.md` - Constructor features by version
- `docs/Classes/phpEnums.md` - Enum support (PHP 8.1+)
- `docs/Classes/phpAttributes.md` - Attributes (PHP 8.0+)

---

## Resources

- **Version Comparison:** [Full Feature Matrix](getting-started/upgrades/version-comparison.md)
- **Upgrade Guides:** [Upgrade Documentation](getting-started/upgrades/)
- **Official PHP:** [PHP Version Support Timeline](https://www.php.net/supported-versions.php)

---

For detailed information, see [Version Comparison Matrix](getting-started/upgrades/version-comparison.md).
