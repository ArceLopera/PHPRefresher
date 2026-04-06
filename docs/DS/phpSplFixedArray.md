# SplFixedArray

> **Last updated:** April 6, 2026
> **Minimum PHP Version:** PHP 5.3+
> **Status:** Stable

## Overview

`SplFixedArray` is a data structure that provides a fixed-size array implementation with better memory efficiency than standard PHP arrays. Unlike regular arrays which are dynamic and can change size, a fixed array allocates a specific amount of memory upfront.

When you need a large array of numeric-indexed data, `SplFixedArray` uses significantly less memory than a standard PHP array.

## When to Use

- ✅ Working with large datasets needing memory efficiency
- ✅ Performance-critical loops with numeric indices
- ✅ When array size is known and fixed
- ❌ When you need dynamic sizing (use regular arrays)
- ❌ When you need string keys (use regular arrays)

## Basic Example

```php
<?php
// Create fixed array with 5 elements
$array = new SplFixedArray(5);

// Set values
$array[0] = "Apple";
$array[1] = "Banana";
$array[2] = "Cherry";

// Access values
echo $array[1]; // Output: Banana

// Get size
echo $array->getSize(); // Output: 5
?>
```

## Advanced Example

```php
<?php
// Create from array
$data = [10, 20, 30, 40, 50];
$fixedArray = SplFixedArray::fromArray($data);

// Resize (reallocates memory)
$fixedArray->setSize(10);

// Convert back to array
$newArray = $fixedArray->toArray();

// Iterate efficiently
foreach ($fixedArray as $key => $value) {
    echo "[$key] => $value\n";
}
?>
```

## Comparison with Regular Arrays

| Feature | SplFixedArray | Regular Array |
|---------|---------------|---------------|
| Memory Usage | Low (optimized) | High |
| Dynamic Sizing | No | Yes |
| String Keys | No | Yes |
| Performance | Faster | Slower |
| Use Case | Large numeric datasets | General use |

## Related Topics

- [Arrays](phpArray.md) - Standard PHP arrays
- [Iterables](phpIterables.md) - Iterator interface

## See Also

- [PHP SplFixedArray](https://www.php.net/manual/en/class.splfixedarray.php)
- [Memory Optimization](https://www.php.net/manual/en/intro.spl.php)
