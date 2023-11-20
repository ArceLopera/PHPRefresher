PHP contains many useful built-in functions and methods to accomplish common tasks.



## Most Common Functions
### strlen()

The PHP strlen() function returns the length of a string.

```php
<?php
echo strlen("Hello world!"); // outputs 12
?>
```

### str_word_count() 

The PHP str_word_count() function counts the number of words in a string.

```php
<?php
echo str_word_count("Hello world!"); // outputs 2
?>
```

### strrev() 

#### Reverse by byte
The PHP strrev() function reverses a string by byte.

```php
<?php
echo strrev("Hello world!"); // outputs !dlrow olleH
?>
```
#### Reverse by words
To reverse by words, explode the string by word boundary, reverse the words, and then rejoin.

```php
<?php
echo implode(" ", array_reverse(explode(" ", "Hello world!"))); // outputs world! Hello
?>
```

``` php
<?php
$s = "Once upon a time there was a turtle.";
// break the string up into words
$words = explode(' ',$s);
// reverse the array of words
$words = array_reverse($words);
// rebuild the string
$s = implode(' ',$words);
print $s;
?>
```


```
turtle. a was there time a upon Once
```


### strpos() 

The PHP strpos() function searches for a specific text within a string. If a match is found, the function returns the character position of the first match. If no match is found, it will return FALSE.

```php
<?php
echo strpos("Hello world!", "world"); // outputs 6
?>
```	
The first character position in a string is 0 (not 1).

You want to know if a string contains a particular substring. For example, you want to find out if an email address contains a @.

```php
<?php
if (strpos($_POST['email'], '@') === false) {
 print 'There was no @ in the e-mail address!';
}

?>
```

To differentiate between return values of 0 and false, you must use the identity operator (===) or the not–identity operator (!==) instead of regular equals (==) or not-equals (!=).

### substr()

The PHP substr() function extracts a part of a string and returns the extracted part as a new string.

You want to extract part of a string, starting at a particular place in the string. For example, you want the first eight characters of a username entered into a form. If $start and $length are positive, substr() returns $length characters in the string, starting at $start. 

If $start is negative, the string is counted from the end of the string. If $length is negative, the string is counted from the end of the string.

```php
<?php
//$substring = substr($string,$start,$length);
$username = substr($_GET['username'],0,8);

?>
```
### substr_replace()

The PHP substr_replace() function replaces part of a string with another string.

You want to replace a substring with a different string. For example, you want to obscure all but the last four digits of a credit card number before printing it.

```php
<?php
// Everything from position $start to the end of $old_string
// becomes $new_substring
$new_string = substr_replace($old_string,$new_substring,$start);
//$length characters, starting at position $start, become $new_substring
$new_string = substr_replace($old_string,$new_substring,$start,$length);
?>
```

Without the $length argument, substr_replace() replaces everything from $start to the end of the string. If $length is specified, only that many characters are replaced.

```	php
<?php
print substr_replace('My pet is a blue dog.','fish.',12);
print substr_replace('My pet is a blue dog.','green',12,4);
$credit_card = '4111 1111 1111 1111';
print substr_replace($credit_card,'xxxx ',0,strlen($credit_card)-4);

?>
```

```
My pet is a fish.
My pet is a green dog.
xxxx 1111
```

If $start is negative, the new substring is placed by counting $start characters from the end of $old_string, not from the beginning.

If $start and $length are 0, the new substring is inserted at the start of $old_string.

The function substr_replace() is useful when you’ve got text that’s too big to display all at once, and you want to display some of the text with a link to the rest.

```php
<?php
/*
Displays the first 25 characters of a message with an ellipsis after it as a link to a page
that displays more text
*/
$r = mysql_query("SELECT id,message FROM messages WHERE id = $id") or die();
$ob = mysql_fetch_object($r);
printf('<a href="more-text.php?id=%d">%s</a>',
 $ob->id, substr_replace($ob->message,' ...',25));
?>

/* 
The more-text.php page referenced can use the message ID passed in
the query string to retrieve the full message and display it.
*/

```

### str_replace()

The PHP str_replace() function replaces some characters with some other characters in a string.

```php	
<?php
echo str_replace("world", "Earth", "Hello world!"); // outputs Hello Earth!
?>
```

#### Expanding and Compressing Tabs

You want to change spaces to tabs (or tabs to spaces) in a string while keeping text aligned with tab stops. For example, you want to display formatted text to users in a standardized way.

```php
<?php
//  Switching tabs and spaces
$rows = $db->query('SELECT message FROM messages WHERE id = 1');
$obj = $rows->fetch(PDO::FETCH_OBJ);
$tabbed = str_replace(' ' , "\t", $obj->message);
$spaced = str_replace("\t", ' ' , $obj->message);
print "With Tabs: <pre>$tabbed</pre>";
print "With Spaces: <pre>$spaced</pre>";

?>
```

Using str_replace() for conversion, however, doesn’t respect tab stops. If you want tab stops every eight characters, a line beginning with a five-letter word and a tab should have that tab replaced with three spaces, not one. Use the tab_expand() function shown below to turn tabs to spaces in a way that respects tab stops.

```php
<?php
function tab_expand($text) {
    while (strstr($text,"\t")) {
    $text = preg_replace_callback('/^([^\t\n]*)(\t+)/m',
    'tab_expand_helper', $text);
    }
    return $text;
}
function tab_expand_helper($matches) {
    $tab_stop = 8;
    return $matches[1] .
    str_repeat(' ',strlen($matches[2]) *
    $tab_stop - (strlen($matches[1]) % $tab_stop));
}
$spaced = tab_expand($obj->message);
?>
```	

You can use the tab_unexpand() function shown below to reverse the process to turn spaces back
to tabs.

```php
<?php
function tab_unexpand($text) {
    $tab_stop = 8;
    $lines = explode("\n",$text);
    foreach ($lines as $i => $line) {
    // Expand any tabs to spaces
    $line = tab_expand($line);
    $chunks = str_split($line, $tab_stop);
    $chunkCount = count($chunks);
    // Scan all but the last chunk
    for ($j = 0; $j < $chunkCount - 1; $j++) {
        $chunks[$j] = preg_replace('/ {2,}$/',"\t",$chunks[$j]);
    }
    // If the last chunk is a tab-stop's worth of spaces
    // convert it to a tab; Otherwise, leave it alone
    if ($chunks[$chunkCount-1] == str_repeat(' ', $tab_stop)) {
        $chunks[$chunkCount-1] = "\t";
    }
    // Recombine the chunks
    $lines[$i] = implode('',$chunks);
    }
    // Recombine the lines
    return implode("\n",$lines);
    }
    $tabbed = tab_unexpand($obj->message);
?>
```

Each function assumes tab stops are every eight spaces, but that can be modified by changing the setting of the $tab_stop variable.

The regular expression in tab_expand() matches both a group of tabs and all the text in a line before that group of tabs. It needs to match the text before the tabs because the length of that text affects how many spaces the tabs should be replaced with so that subsequent text is aligned with the next tab stop. The function doesn’t just replace each tab with eight spaces; it adjusts text after tabs to line up with tab stops.

Similarly, tab_unexpand() doesn’t just look for eight consecutive spaces and then replace them with one tab character. It divides up each line into eight-character chunks and then substitutes ending whitespace in those chunks (at least two spaces) with tabs. This not only preserves text alignment with tab stops; it also saves space in the string.

### str_repeat()

The str_repeat() function repeats a string a specified number of times.

```php
<?php
echo str_repeat("Hello ", 3); // outputs Hello Hello Hello 
?>
```

### str_split()

The str_split() function splits a string into an array.

```php
<?php
echo str_split("Hello world!"); // outputs ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
?>
```

### str_shuffle()

The str_shuffle() function randomly shuffles all the characters of a string.

```php
<?php
echo str_shuffle("Hello world!"); // outputs !Wdroel loHl
?>
```

### str_rand()

The str_rand() function returns a random string of specified length.

```php
<?php
function str_rand($length = 32,$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    if (!is_int($length) || $length < 0) {
    return false;
    }
    $characters_length = strlen($characters) - 1;
    $string = '';
    for ($i = $length; $i > 0; $i--) {
        $string .= $characters[mt_rand(0, $characters_length)];
    }
    return $string;
}

?>
```
PHP has native functions for generating random numbers, but nothing for random strings. The str_rand() function returns a 32-character string constructed from letters and numbers.
Pass in an integer to change the length of the returned string. To use an alternative set of characters, pass them as a string as the second argument. For example, to get a 16-digit Morse Code:

```php
<?php
print str_rand(16, '.-');
?>
```

```
.--..-.-.--.----
```

### ucfirst()

The PHP ucfirst() function capitalizes the first character of a string.

```php
<?php
echo ucfirst("hello world!"); // outputs Hello world!
?>
```

### ucwords()

The PHP ucwords() function capitalizes the first character of each word in a string.

```php
<?php
echo ucwords("hello world!"); // outputs Hello World!
?>
```

### strtolower()

The PHP strtolower() function converts a string to lowercase.

```php
<?php
echo strtolower("Hello world!"); // outputs hello world!
?>
```

### strtoupper()

The PHP strtoupper() function converts a string to uppercase.

```php
<?php
echo strtoupper("Hello world!"); // outputs HELLO WORLD!
?>
```



## All String Functions
The PHP string functions are part of the PHP core. No installation is required to use these functions.

For more information, see [PHP String Functions](https://www.php.net/manual/en/ref.strings.php)


|Function|	Description|
|--------|-----------|  
|addcslashes()	|Returns a string with backslashes in front of the specified characters|
|addslashes()	|Returns a string with backslashes in front of predefined characters|
|bin2hex()	|Converts a string of ASCII characters to hexadecimal values|
|chop()|	Removes whitespace or other characters from the right end of a string|
|chr()	|Returns a character from a specified ASCII value|
|chunk_split()|	Splits a string into a series of smaller parts|
|convert_cyr_string()|	Converts a string from one Cyrillic character-set to another|
|convert_uudecode()|	Decodes a uuencoded string|
|convert_uuencode()|	Encodes a string using the uuencode algorithm|
|count_chars()|	Returns information about characters used in a string|
|crc32()|	Calculates a 32-bit CRC for a string|
|crypt()|	One-way string hashing|
|echo()|	Outputs one or more strings|
|[explode()](#reverse-by-words)|	Breaks a string into an array|
|fprintf()|	Writes a formatted string to a specified output stream|
|get_html_translation_table()|	Returns the translation table used by htmlspecialchars() and htmlentities()|
|hebrev()|	Converts Hebrew text to visual text|
|hebrevc()|	Converts Hebrew text to visual text and new lines (\n) into <br>|
|hex2bin()|	Converts a string of hexadecimal values to ASCII characters|
|html_entity_decode()|	Converts HTML entities to characters|
|htmlentities()|	Converts characters to HTML entities|
|htmlspecialchars_decode()|	Converts some predefined HTML entities to characters|
|htmlspecialchars()|	Converts some predefined characters to HTML entities|
|[implode()](#reverse-by-words)|	Returns a string from the elements of an array|
|join()|	Alias of implode()|
|lcfirst()|	Converts the first character of a string to lowercase|
|levenshtein()|	Returns the Levenshtein distance between two strings|
|localeconv()|	Returns locale numeric and monetary formatting information|
|ltrim()|	Removes whitespace or other characters from the left side of a string|
|md5()|	Calculates the MD5 hash of a string|
|md5_file()|	Calculates the MD5 hash of a file|
|metaphone()|	Calculates the metaphone key of a string|
|money_format()|	Returns a string formatted as a currency string|
|nl_langinfo()|	Returns specific local information|
|nl2br()|	Inserts HTML line breaks in front of each newline in a string|
|number_format()|	Formats a number with grouped thousands|
|ord()|	Returns the ASCII value of the first character of a string|
|parse_str()|	Parses a query string into variables|
|print()|	Outputs one or more strings|
|printf()|	Outputs a formatted string|
|quoted_printable_decode()|	Converts a quoted-printable string to an 8-bit string|
|quoted_printable_encode()|	Converts an 8-bit string to a quoted printable string|
|quotemeta()|	Quotes meta characters|
|rtrim()|	Removes whitespace or other characters from the right side of a string|
|setlocale()|	Sets locale information|
|sha1()|	Calculates the SHA-1 hash of a string|
|sha1_file()|	Calculates the SHA-1 hash of a file|
|similar_text()|	Calculates the similarity between two strings|
|soundex()|	Calculates the soundex key of a string|
|sprintf()|	Writes a formatted string to a variable|
|sscanf()|	Parses input from a string according to a format|
|str_getcsv()|	Parses a CSV string into an array|
|str_ireplace()|	Replaces some characters in a string (case-insensitive)
|str_pad()|	Pads a string to a new length|
|[str_repeat()](#str_repeat)|	Repeats a string a specified number of times|
|[str_replace()](#str_replace)|	Replaces some characters in a string (case-sensitive)|
|str_rot13()|	Performs the ROT13 encoding on a string|
|[str_shuffle()](#str_shuffle)|	Randomly shuffles all characters in a string|
|[str_split()](#str_split)|	Splits a string into an array|
|[str_word_count()](#str_word_count)|	Count the number of words in a string|
|strcasecmp()|	Compares two strings (case-insensitive)|
|strchr()	|Finds the first occurrence of a string inside another string (alias of strstr())|
|strcmp()|	Compares two strings (case-sensitive)|
|strcoll()|	Compares two strings (locale based string comparison)|
|strcspn()|	Returns the number of characters found in a string before any part of some specified characters are found|
|strip_tags()|	Strips HTML and PHP tags from a string|
|stripcslashes()|	Unquotes a string quoted with addcslashes()|
|stripslashes()|	Unquotes a string quoted with addslashes()|
|stripos()	|Returns the position of the first occurrence of a string inside another string (case-insensitive)|
|stristr()|	Finds the first occurrence of a string inside another string (case-insensitive)|
|[strlen()](#strlen)|	Returns the length of a string|
|strnatcasecmp()|	Compares two strings using a "natural order" algorithm (case-insensitive)|
|strnatcmp()|	Compares two strings using a "natural order" algorithm (case-sensitive)|
|strncasecmp()|	String comparison of the first n characters (case-insensitive)|
|strncmp()|	String comparison of the first n characters (case-sensitive)|
|strpbrk()|	Searches a string for any of a set of characters|
|[strpos()](#strpos)|	Returns the position of the first occurrence of a string inside another string (case-sensitive)|
|strrchr()|	Finds the last occurrence of a string inside another string|
|[strrev()](#strrev)|	Reverses a string|
|strripos()|	Finds the position of the last occurrence of a string inside another string (case-insensitive)|
|strrpos()|	Finds the position of the last occurrence of a string inside another string (case-sensitive)|
|strspn()|	Returns the number of characters found in a string that contains only characters from a specified charlist|
|strstr()|	Finds the first occurrence of a string inside another string (case-sensitive)|
|strtok()|	Splits a string into smaller strings|
|[strtolower()](#strtolower)|	Converts a string to lowercase letters|
|[strtoupper()](#strtoupper)|	Converts a string to uppercase letters|
|strtr()|	Translates certain characters in a string|
|[substr()](#substr)|	Returns a part of a string|
|substr_compare()|	Compares two strings from a specified start position (binary safe and optionally case-sensitive)|
|substr_count()	|Counts the number of times a substring occurs in a string|
|[substr_replace()](#substr_replace)|	Replaces a part of a string with another string|
|trim()|	Removes whitespace or other characters from both sides of a string|
|[ucfirst()](#ucfirst)|	Converts the first character of a string to uppercase|
|[ucwords()](#ucwords)|	Converts the first character of each word in a string to uppercase|
|vfprintf()|	Writes a formatted string to a specified output stream|
|vprintf()|	Outputs a formatted string|
|vsprintf()|	Writes a formatted string to a variable|
|wordwrap()|	Wraps a string to a given number of characters|