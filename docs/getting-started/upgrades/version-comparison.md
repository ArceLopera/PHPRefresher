> **Last updated:** April 6, 2026  
> **Minimum PHP Version:** PHP 7.4+  
> **Status:** Stable

# PHP Version Comparison Matrix

Quick reference showing which PHP features are available in each version. Use this to understand version requirements and plan upgrades.

---

## OOP & Language Features

| Feature | PHP 7.4 | PHP 8.0 | PHP 8.1 | PHP 8.2 | PHP 8.3 | First Available |
|---------|---------|---------|---------|---------|---------|-----------------|
| Named Arguments | ❌ | ✅ | ✅ | ✅ | ✅ | **8.0** |
| Constructor Promotion | ❌ | ✅ | ✅ | ✅ | ✅ | **8.0** |
| Match Expression | ❌ | ✅ | ✅ | ✅ | ✅ | **8.0** |
| Nullsafe Operator | ❌ | ✅ | ✅ | ✅ | ✅ | **8.0** |
| Union Types | ❌ | ✅ | ✅ | ✅ | ✅ | **8.0** |
| Static Return Type | ❌ | ✅ | ✅ | ✅ | ✅ | **8.0** |
| Attributes (Annotations) | ❌ | ✅ | ✅ | ✅ | ✅ | **8.0** |
| Intersection Types | ❌ | ❌ | ✅ | ✅ | ✅ | **8.1** |
| Enums | ❌ | ❌ | ✅ | ✅ | ✅ | **8.1** |
| First-Class Callable Syntax | ❌ | ❌ | ✅ | ✅ | ✅ | **8.1** |
| Fibers (Async) | ❌ | ❌ | ✅ | ✅ | ✅ | **8.1** |
| Readonly Properties | ❌ | ❌ | ✅ | ✅ | ✅ | **8.1** |
| Readonly Classes | ❌ | ❌ | ❌ | ✅ | ✅ | **8.2** |
| Disjunctive Normal Form Types | ❌ | ❌ | ❌ | ✅ | ✅ | **8.2** |
| Constants in Traits | ❌ | ❌ | ❌ | ✅ | ✅ | **8.2** |
| Attributes on Parameters | ❌ | ❌ | ❌ | ✅ | ✅ | **8.2** |

---

## Type System

| Feature | PHP 7.4 | PHP 8.0 | PHP 8.1 | PHP 8.2 | PHP 8.3 |
|---------|---------|---------|---------|---------|---------|
| Scalar Type Hints | ✅ | ✅ | ✅ | ✅ | ✅ |
| `int`, `string`, `bool`, `float` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `array` Type | ✅ | ✅ | ✅ | ✅ | ✅ |
| `object` Type | ✅ | ✅ | ✅ | ✅ | ✅ |
| `iterable` Type | ✅ | ✅ | ✅ | ✅ | ✅ |
| `callable` Type | ✅ | ✅ | ✅ | ✅ | ✅ |
| `?type` (Nullable) | ✅ | ✅ | ✅ | ✅ | ✅ |
| `void` Return Type | ✅ | ✅ | ✅ | ✅ | ✅ |
| `mixed` Type | ❌ | ✅ | ✅ | ✅ | ✅ |
| Union Types (`int\|string`) | ❌ | ✅ | ✅ | ✅ | ✅ |
| Intersection Types (`A&B`) | ❌ | ❌ | ✅ | ✅ | ✅ |
| `never` Return Type | ❌ | ❌ | ✅ | ✅ | ✅ |
| Weak vs Strict Comparison | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Functions & Closures

| Feature | PHP 7.4 | PHP 8.0 | PHP 8.1 | PHP 8.2 | PHP 8.3 | Status |
|---------|---------|---------|---------|---------|---------|--------|
| Arrow Functions (`fn =>`) | ✅ | ✅ | ✅ | ✅ | ✅ | Stable |
| Variadic Arguments (`...`) | ✅ | ✅ | ✅ | ✅ | ✅ | Stable |
| Unpacking Arguments (`...`) | ✅ | ✅ | ✅ | ✅ | ✅ | Stable |
| Default Arguments | ✅ | ✅ | ✅ | ✅ | ✅ | Stable |
| Named Arguments | ❌ | ✅ | ✅ | ✅ | ✅ | **NEW in 8.0** |
| Anonymous Classes | ✅ | ✅ | ✅ | ✅ | ✅ | Stable |
| Return Type Covariance | ✅ | ✅ | ✅ | ✅ | ✅ | Stable |
| Parameter Type Contravariance | ❌ | ✅ | ✅ | ✅ | ✅ | **NEW in 8.0** |
| `string` Argument Unpacking | ❌ | ✅ | ✅ | ✅ | ✅ | **NEW in 8.0** |

---

## Control Flow

| Feature | PHP 7.4 | PHP 8.0 | PHP 8.1 | PHP 8.2 | PHP 8.3 |
|---------|---------|---------|---------|---------|---------|
| `if/else` Statements | ✅ | ✅ | ✅ | ✅ | ✅ |
| `switch` Statements | ✅ | ✅ | ✅ | ✅ | ✅ |
| `match` Expressions | ❌ | ✅ | ✅ | ✅ | ✅ |
| `try/catch/finally` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `throw` as Expression | ❌ | ✅ | ✅ | ✅ | ✅ |
| `foreach` with Keys/Values | ✅ | ✅ | ✅ | ✅ | ✅ |
| Alternative Control Syntax | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Error Handling

| Feature | PHP 7.4 | PHP 8.0 | PHP 8.1 | PHP 8.2 | PHP 8.3 |
|---------|---------|---------|---------|---------|---------|
| Exceptions | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Error` Class | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Throwable` Interface | ✅ | ✅ | ✅ | ✅ | ✅ |
| `ValueError` | ❌ | ✅ | ✅ | ✅ | ✅ |
| `DivisionByZeroError` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `CompileError` | ❌ | ✅ | ✅ | ✅ | ✅ |
| `ParseError` | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Arrays & Collections

| Feature | PHP 7.4 | PHP 8.0 | PHP 8.1 | PHP 8.2 | PHP 8.3 |
|---------|---------|---------|---------|---------|---------|
| Array Destructuring | ✅ | ✅ | ✅ | ✅ | ✅ |
| Short Array Syntax `[]` | ✅ | ✅ | ✅ | ✅ | ✅ |
| Spread Operator `...` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `array_key_exists()` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `count()` on Objects | ✅ | ⚠️ Strict | ⚠️ Strict | ⚠️ Strict | ⚠️ Strict |
| SPL Data Structures | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Strings

| Feature | PHP 7.4 | PHP 8.0 | PHP 8.1 | PHP 8.2 | PHP 8.3 |
|---------|---------|---------|---------|---------|---------|
| String Type Hints | ✅ | ✅ | ✅ | ✅ | ✅ |
| String Interpolation | ✅ | ✅ | ✅ | ✅ | ✅ |
| Heredoc/Nowdoc | ✅ | ✅ | ✅ | ✅ | ✅ |
| String Character Access | ✅ | ✅ | ✅ | ✅ | ✅ |
| `str_*()` Functions | ✅ | ✅ | ✅ | ✅ | ✅ |
| Multibyte Functions | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Performance Features

| Feature | PHP 7.4 | PHP 8.0 | PHP 8.1 | PHP 8.2 | PHP 8.3 | Notes |
|---------|---------|---------|---------|---------|---------|-------|
| Just-In-Time (JIT) Compilation | ❌ | ⚠️ Opt-in | ⚠️ Opt-in | ⚠️ Opt-in | ⚠️ Opt-in | Massive speedup if enabled |
| Opcache | ✅ | ✅ | ✅ | ✅ | ✅ | Recommended always |
| Preloading | ❌ | ✅ | ✅ | ✅ | ✅ | Works with JIT |
| Fibers | ❌ | ❌ | ✅ | ✅ | ✅ | Async/concurrent code |

---

## Deprecations & Removals

| Feature | PHP 7.4 | PHP 8.0 | PHP 8.1 | PHP 8.2 | PHP 8.3 | Status |
|---------|---------|---------|---------|---------|---------|--------|
| `create_function()` | ⚠️ Dep. | ❌ Removed | ❌ Removed | ❌ Removed | ❌ Removed | Use anonymous functions |
| `each()` | ⚠️ Dep. | ❌ Removed | ❌ Removed | ❌ Removed | ❌ Removed | Use `foreach()` |
| `money_format()` | ⚠️ Dep. | ❌ Removed | ❌ Removed | ❌ Removed | ❌ Removed | Use `NumberFormatter` |
| `ldap_sort()` | ⚠️ Dep. | ❌ Removed | ❌ Removed | ❌ Removed | ❌ Removed | Use custom sorting |
| Variadic Functions Limitation | ✅ Limited | ✅ Fixed | ✅ | ✅ | ✅ | Named args help |

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Feature fully supported and recommended |
| ⚠️ | Feature supported but deprecated or limited |
| ❌ | Feature not available or removed |
| **NEW** | Significant new feature in this version |
| Opt-in | Feature requires configuration to enable |
| Dep. | Deprecated (works but avoid using) |

---

## Version Release Timeline

| Version | Release Date | Security Support Ends | LTS | Current |
|---------|--------------|----------------------|-----|---------|
| PHP 7.4 | 2019-11-28 | 2022-11-28 | ❌ | ⏳ Legacy |
| PHP 8.0 | 2020-11-26 | 2023-11-26 | ❌ | ⏳ Legacy |
| PHP 8.1 | 2021-11-25 | 2023-11-25 | ❌ | ⏳ Legacy |
| PHP 8.2 | 2022-12-08 | 2025-12-08 | ❌ | 🟢 Active |
| PHP 8.3 | 2023-11-23 | 2026-11-23 | ❌ | 🟢 Current |
| PHP 9.0 | TBA | TBA | TBA | ⏸️ Future |

---

## Quick Decision Guide

### "Should I upgrade?"

**From PHP 7.4:**
- ✅ **YES** - PHP 7.4 support ended November 2022
- ✅ Go directly to PHP 8.2+ (8.0/8.1 are also EOL)
- ✅ See: [Upgrading from PHP 7.4 to 8.0](upgrading-from-php-74.md)

**From PHP 8.0:**
- ✅ **YES** - PHP 8.0 support ended November 2023
- ✅ Upgrade to PHP 8.2+ for active support

**From PHP 8.1:**
- ✅ **SOON** - PHP 8.1 support ends November 2023
- ✅ Plan upgrade to PHP 8.2+ or 8.3

**From PHP 8.2:**
- ⏳ **NOT URGENT** - Support until December 2025
- ✅ Consider upgrading to PHP 8.3 for latest features

**From PHP 8.3:**
- ✅ **STABLE** - Latest version, fully supported

---

## See Also

- [Upgrading from PHP 7.4 to 8.0](upgrading-from-php-74.md)
- [PHP Version Strategy](../../VERSION-STRATEGY.md)
- [Official PHP Support Timeline](https://www.php.net/supported-versions.php)
- [PHP Internals RFCs](https://wiki.php.net/rfc)

---

**Last Updated:** April 2026  
**Coverage:** PHP 7.4 through 8.3  
**Status:** Complete and actively maintained
