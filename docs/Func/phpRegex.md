A regular expression is a sequence of characters that forms a search pattern. When you search for data in a text, you can use this search pattern to describe what you are searching for.

## Regular Expressions Functions

|Function	|Description|
|--------|--------|
|[preg_match()](#preg_match)|	Returns 1 if the pattern was found in the string and 0 if not|
|[preg_match_all()](#preg_match_all)|Returns the number of times the pattern was found in the string, which may also be 0|
|[preg_replace()](#preg_replace)	|Returns a new string where matched patterns have been replaced with another string|

### preg_match()

```php
<?php
$str = "Visit arcelopera.github.io";
$pattern = "/arce/i";
echo preg_match($pattern, $str); // Outputs 1
?>
```

### preg_match_all()

```php
<?php
$str = "The rain in SPAIN falls mainly on the plains.";
$pattern = "/ain/i";
echo preg_match_all($pattern, $str); // Outputs 4
?>
```

### preg_replace()

```php
<?php
$str = "Visit Microsoft!";
$pattern = "/microsoft/i";
echo preg_replace($pattern, "ME", $str); // Outputs "Visit ME!"
?>
```

## Regular Expression Modifiers

|Modifier	|Description|
|--------|--------|
|i	|Performs a case-insensitive search|
|m	|Performs a multiline search (patterns that search for the beginning or end of a string will match the beginning or end of each line)|
|u	|Enables correct matching of UTF-8 encoded patterns|

## Regular Expression Patterns
Brackets are used to find a range of characters:

|Expression	|Description|
|--------|--------|
|[abc]	|Find one character from the options between the brackets|
|[^abc]	|Find any character NOT between the brackets|
|[0-9]	|Find one character from the range 0 to 9|

## Metacharacters
Metacharacters are characters with a special meaning.

|Metacharacter	|Description|
|--------|--------|
|\|	|Find a match for any one of the patterns separated by \| as in: cat\|dog\|fish|
|.	|Find just one instance of any character|
|^	|Finds a match as the beginning of a string as in: ^Hello|
|$	|Finds a match at the end of the string as in: World$|
|\d	|Find a digit|
|\s	|Find a whitespace character|
|\b	|Find a match at the beginning of a word like this: \bWORD, or at the end of a word like this: WORD\b|
|\uxxxx	|Find the Unicode character specified by the hexadecimal number xxxx|


## Quantifiers
Quantifiers define quantities

|Quantifier	|Description|
|--------|--------|
|n+	|Find one or more n|
|n*	|Find zero or more n|
|n?	|Find zero or one n|
|n{x}	|Matches any string that contains a sequence of X n's|
|n{x,}	|Matches any string that contains a sequence of at least X n's|
|n{,y}	|Matches any string that contains a sequence of up to Y n's|
|n{x,y}	|Matches any string that contains a sequence of X to Y n's|


If your expression needs to search for one of the special characters you can use a backslash ( \ ) to escape them. For example, to search for one or more question marks you can use the following expression: 
```php	
$pattern = '/\?+/';
```

## Grouping
You can use parentheses ( ) to apply quantifiers to entire patterns. They also can be used to select parts of the pattern to be used as a match.

```php
<?php
$str = "Apples and bananas.";
$pattern = "/ba(na){2}/i";
echo preg_match($pattern, $str); // Outputs 1
?>  
```	
