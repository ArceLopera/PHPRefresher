# SplStack

> **Last updated:** April 6, 2026
> **Minimum PHP Version:** PHP 5.3+
> **Status:** Stable

## Overview

Stack (LIFO - Last In First Out) data structure implementation. Perfect for undo/redo operations, expression parsing, or browser history.

### Stack Operation Diagram

```mermaid
graph TB
    D["⬆️ push<br/>Add to Top"]
    D --> E["Item 3"]
    E --> F["Item 2"]
    F --> G["Item 1"]
    G --> H["⬇️ pop<br/>Remove from Top"]
    
    I["Top<br/>Add/Remove Here"] -.-> E
    J["Bottom"] -.-> G
    
    style D fill:#c8e6c9,stroke:#388e3c,color:#000
    style E fill:#fff3e0,stroke:#f57c00,color:#000
    style F fill:#fff3e0,stroke:#f57c00,color:#000
    style G fill:#fff3e0,stroke:#f57c00,color:#000
    style H fill:#ffccbc,stroke:#d84315,color:#000
    style I fill:#f3e5f5,stroke:#7b1fa2,color:#000
    style J fill:#f3e5f5,stroke:#7b1fa2,color:#000
```


## When to Use

-  Appropriate use case 1
-  Appropriate use case 2
-  Not for use case 1
- ❌ Not for use case 2

## Basic Example

```php
<?php
// Basic usage example
?>
```

## Advanced Example

```php
<?php
// Advanced usage example
?>
```

## Comparison

| Feature | SplStack | Alternative |
|---------|---------|-------------|
| Use Case | Primary use | Secondary use |
| Performance | Fast | Varies |

## Related Topics

- [Arrays](phpArray.md) - Standard arrays
- [Iterables](phpIterables.md) - Iterable objects

## See Also

- [PHP SplStack](https://www.php.net/manual/en/class.spl{title-lower}.php)
- [SPL Data Structures](https://www.php.net/manual/en/intro.spl.php)
