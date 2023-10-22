PHP contains many useful built-in functions and methods to accomplish common tasks.

## strlen()

The PHP strlen() function returns the length of a string.

```php
<?php
echo strlen("Hello world!"); // outputs 12
?>
```

## str_word_count() 

The PHP str_word_count() function counts the number of words in a string.

```php
<?php
echo str_word_count("Hello world!"); // outputs 2
?>
```

## strrev() 

The PHP strrev() function reverses a string.

```php
<?php
echo strrev("Hello world!"); // outputs !dlrow olleH
?>
```

## strpos() 

The PHP strpos() function searches for a specific text within a string. If a match is found, the function returns the character position of the first match. If no match is found, it will return FALSE.

```php
<?php
echo strpos("Hello world!", "world"); // outputs 6
?>
```	
The first character position in a string is 0 (not 1).

## str_replace()

The PHP str_replace() function replaces some characters with some other characters in a string.

```php	
<?php
echo str_replace("world", "Earth", "Hello world!"); // outputs Hello Earth!
?>
```

## str_repeat()

The str_repeat() function repeats a string a specified number of times.

```php
<?php
echo str_repeat("Hello ", 3); // outputs Hello Hello Hello 
?>
```

## str_split()

The str_split() function splits a string into an array.

```php
<?php
echo str_split("Hello world!"); // outputs ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
?>
```

## str_shuffle()

The str_shuffle() function randomly shuffles all the characters of a string.

```php
<?php
echo str_shuffle("Hello world!"); // outputs !Wdroel loHl
?>
```

For more information, see [PHP String Functions](https://www.php.net/manual/en/ref.strings.php)