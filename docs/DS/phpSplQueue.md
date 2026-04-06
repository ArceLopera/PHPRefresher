# SplQueue

> **Last updated:** April 6, 2026
> **Minimum PHP Version:** PHP 5.3+
> **Status:** Stable

## Overview

Queue (FIFO - First In First Out) data structure implementation. Perfect for managing task queues, request buffers, or any scenario where order matters.

### Queue Operation Diagram

```mermaid
graph LR
    A["📥 enqueue<br/>Add to Back"] --> B["Item 1"]
    B -->|FIFO| C["Item 2"]
    C -->|FIFO| D["Item 3"]
    D --> E["📤 dequeue<br/>Remove from Front"]
    
    F["Front<br/>Remove Here"] -.-> B
    G["Back<br/>Add Here"] -.-> D
    
    style A fill:#c8e6c9,stroke:#388e3c,color:#000
    style B fill:#fff3e0,stroke:#f57c00,color:#000
    style C fill:#fff3e0,stroke:#f57c00,color:#000
    style D fill:#fff3e0,stroke:#f57c00,color:#000
    style E fill:#ffccbc,stroke:#d84315,color:#000
    style F fill:#f3e5f5,stroke:#7b1fa2,color:#000
    style G fill:#f3e5f5,stroke:#7b1fa2,color:#000
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

| Feature | SplQueue | Alternative |
|---------|---------|-------------|
| Use Case | Primary use | Secondary use |
| Performance | Fast | Varies |

## Related Topics

- [Arrays](phpArray.md) - Standard arrays
- [Iterables](phpIterables.md) - Iterable objects

## See Also

- [PHP SplQueue](https://www.php.net/manual/en/class.spl{title-lower}.php)
- [SPL Data Structures](https://www.php.net/manual/en/intro.spl.php)
