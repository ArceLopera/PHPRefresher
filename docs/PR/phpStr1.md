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

## Fixed-Width Field Data Records

### pack()

The PHP pack() function converts an array into a binary string. When you need to format data records such that each field takes up a set amount of characters.

Use pack() with a format string that specifies a sequence of space-padded strings.

#### Format characters for pack( ) and unpack( )
|Format| character |Data type|
|---|---|---|
|a| NUL-padded string|
|A| Space-padded string|
|h| Hex string, low nibble first|
|H| Hex string, high nibble first|
|c| signed char|
|C| unsigned char|
|s| signed short (16 bit, machine byte order)|
|S| unsigned short (16 bit, machine byte order)|
|n| unsigned short (16 bit, big endian byte order)|
|v| unsigned short (16 bit, little endian byte order)|
|i| signed int (machine-dependent size and byte order)|
|I| unsigned int (machine-dependent size and byte order)|
|l| signed long (32 bit, machine byte order)|
|L| unsigned long (32 bit, machine byte order)|
|N| unsigned long (32 bit, big endian byte order)|
|V| unsigned long (32 bit, little endian byte order)|
|f| float (machine-dependent size and representation)|
|d| double (machine-dependent size and representation)|
|x| NUL byte|
|X| Back up one byte|
|@| NUL-fill to absolute position|

```php
<?php
//Generating fixed-width field data records
$books = array( array('Elmer Gantry', 'Sinclair Lewis', 1927),
 array('The Scarlatti Inheritance','Robert Ludlum', 1971),
 array('The Parsifal Mosaic','William Styron', 1979) );
foreach ($books as $book) {
 print pack('A25A15A4', $book[0], $book[1], $book[2]) . "\n";
}

?>
```	

The format string A25A14A4 tells pack() to transform its subsequent arguments into a 25-character space-padded string, a 14-character space-padded string, and a 4-character space-padded string. For space-padded fields in fixed-width records, pack() provides a concise solution.

#### Storing Binary Data in Strings

You can use pack() to store binary data in strings.
When you want to parse a string that contains values encoded as a binary structure or encode values into a string. For example, you want to store numbers in their binary representation instead of as sequences of ASCII characters.

```php
<?php
$packed = pack('S4',1974,106,28225,32725);
?>
```

Use [unpack()](#unpack) to extract binary data from a string:

```php
<?php
$nums = unpack('S4',$packed);
print_r($nums);
?>
```


### str_pad()

To pad fields with something other than a space, however, use substr() to ensure that the field values aren’t too long and str_pad() to ensure that the field values aren’t too short.

```php
<?php
//Generating fixed-width field data records without pack( )
$books = array( array('Elmer Gantry', 'Sinclair Lewis', 1927),
 array('The Scarlatti Inheritance','Robert Ludlum', 1971),
 array('The Parsifal Mosaic','William Styron', 1979) );
foreach ($books as $book) {
 $title = str_pad(substr($book[0], 0, 25), 25, '.');
 $author = str_pad(substr($book[1], 0, 15), 15, '.');
 $year = str_pad(substr($book[2], 0, 4), 4, '.');
 print "$title$author$year\n";
}
?>
```


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

When you need to break apart fixed-width records in strings and parsing Fixed-Width Field Data Records, use substr() instead of explode().

``` php
<?php

Parsing fixed-width records with substr( )
$fp = fopen('fixed-width-records.txt','r',true) or die ("can't open file");
while ($s = fgets($fp,1024)) {
 $fields[1] = substr($s,0,25); // first field: first 25 characters of the line
 $fields[2] = substr($s,25,15); // second field: next 15 characters of the line
 $fields[3] = substr($s,40,4); // third field: next 4 characters of the line
 $fields = array_map('rtrim', $fields); // strip the trailing whitespace
 // a function to do something with the fields
 process_fields($fields);
}
fclose($fp) or die("can't close file");
?>
```

### unpack()

The PHP unpack() function unpacks binary data from a string.

Multiple format characters must be separated with / in unpack():

```php
<?php
$packed = pack('S4',1974,106,28225,32725);
$nums = unpack('S1a/S1b/S1c/S1d',$packed);
print_r($nums);

?>
```

```
Array
(
 [a] => 1974
 [b] => 106
 [c] => 28225
 [d] => 32725
)
```

``` php
<?php
//Parsing fixed-width records with unpack( )
function fixed_width_unpack($format_string,$data) {
 $r = array();
 for ($i = 0, $j = count($data); $i < $j; $i++) {
 $r[$i] = unpack($format_string,$data[$i]);
 }
 return $r;
}

?>

```

Data in which each field is allotted a fixed number of characters per line may look like this list of books, titles, and publication dates:

```
$booklist=<<<END
Elmer Gantry Sinclair Lewis 1927
The Scarlatti InheritanceRobert Ludlum 1971
The Parsifal Mosaic Robert Ludlum 1982
Sophie's Choice William Styron 1979
END;
```

In each line, the title occupies the first 25 characters, the author’s name the next 15 characters, and the publication year the next 4 characters. Knowing those field widths, you can easily use substr() to parse the fields into an array:

```php
<?php
$books = explode("\n",$booklist);
for($i = 0, $j = count($books); $i < $j; $i++) {
 $book_array[$i]['title'] = substr($books[$i],0,25);
 $book_array[$i]['author'] = substr($books[$i],25,15);
 $book_array[$i]['publication_year'] = substr($books[$i],40,4);
}
?>
```

Exploding $booklist into an array of lines makes the looping code the same whether it’s operating over a string or a series of lines read in from a file.

The loop can be made more flexible by specifying the field names and widths in a
separate array that can be passed to a parsing function, as shown in the
fixed_width_substr() function below.

```php
<?php
//fixed_width_substr( )
function fixed_width_substr($fields,$data) {
 $r = array();
 for ($i = 0, $j = count($data); $i < $j; $i++) {
 $line_pos = 0;
 foreach($fields as $field_name => $field_length) {
 $r[$i][$field_name] = rtrim(substr($data[$i],$line_pos,$field_length));
 $line_pos += $field_length;
 }
 }
 return $r;
}
$book_fields = array('title' => 25,'author' => 15, 'publication_year' => 4);
$book_array = fixed_width_substr($book_fields,$booklist);
?>

```

The variable $line_pos keeps track of the start of each field and is advanced by the previous field’s width as the code moves through each line. Use rtrim() to remove trailing whitespace from each field.

You can use unpack() as a substitute for substr() to extract fields. Instead of specifying the field names and widths as an associative array, create a format string for unpack(). A fixed-width field extractor using unpack() looks like the fixed_width_unpack() function below.

```php
<?php
//fixed_width_unpack( )
function fixed_width_unpack($format_string,$data) {
 $r = array();
 for ($i = 0, $j = count($data); $i < $j; $i++) {
 $r[$i] = unpack($format_string,$data[$i]);
 }
 return $r;
}

?>

```

Because the A format to unpack() means space-padded string, there’s no need to rtrim() off the trailing spaces.


Once the fields have been parsed into $book_array by either function, the data can be printed as an HTML table, for example:

```php
<?php
$book_array = fixed_width_unpack('A25title/A15author/A4publication_year',
 $books);
print "<table>\n";
// print a header row
print '<tr><td>';
print join('</td><td>',array_keys($book_array[0]));
print "</td></tr>\n";
// print each data row
foreach ($book_array as $row) {
 print '<tr><td>';
 print join('</td><td>',array_values($row));
 print "</td></tr>\n";
}
print "</table>\n";
?>
```	
Both substr() and unpack() have equivalent capabilities when the fixed-width fields are strings, but unpack() is the better solution when the elements of the fields aren’t just strings.

## Taking Strings Apart

When you need to break a string into pieces. For example, you want to access each line that a
user enters in a textarea form field.


### explode()

Use explode() if what separates the pieces is a constant string:

``` php	
$words = explode(' ','My sentence is not very complicated');
```	

The simplest solution of the bunch is explode(). Pass it your separator string, the string to be separated, and an optional limit on how many elements should be returned:

```php
<?php
$dwarves = 'dopey,sleepy,happy,grumpy,sneezy,bashful,doc';
$dwarf_array = explode(',',$dwarves);

?>
```	

```php
Array
(
 [0] => dopey
 [1] => sleepy
 [2] => happy
 [3] => grumpy
 [4] => sneezy
 [5] => bashful
 [6] => doc
)

```

If the specified limit is less than the number of possible chunks, the last chunk contains the remainder:

```php
<?php
$dwarves = 'dopey,sleepy,happy,grumpy,sneezy,bashful,doc';
$dwarf_array = explode(',', $dwarves, 5);
print_r($dwarf_array);
?>
```

```
Array
(
 [0] => dopey
 [1] => sleepy
 [2] => happy
 [3] => grumpy
 [4] => sneezy,bashful,doc
)
```

The separator is treated literally by explode(). If you specify a comma and a space as a separator, it breaks the string only on a comma followed by a space, not on a comma or a space.

With [preg_split()](../Func/phpRegex.md#preg_split), you have more flexibility. Instead of a string literal as a separator, it uses a Perl-compatible regular expression engine. With preg_split(), you can take advantage of various Perl-ish regular expression extensions, as well as tricks such as including the separator text in the returned array of strings:

```php
<?php
$math = "3 + 2 / 7 - 9";
$stack = preg_split('/ *([+\-\/*]) */',$math,-1,PREG_SPLIT_DELIM_CAPTURE);
print_r($stack);
?>
```

```
Array
(
 [0] => 3
 [1] => +
 [2] => 2
 [3] => /
 [4] => 7
 [5] => -
 [6] => 9
)
```

The separator regular expression looks for the four mathematical operators (+, -, /, *), surrounded by optional leading or trailing spaces. The PREG_SPLIT_DELIM_CAPTURE flag tells preg_split() to include the matches as part of the separator regular expression in parentheses in the returned array of strings. Only the mathematical operator character class is in parentheses, so the returned array doesn’t have any spaces in it.

### str_split()

Use preg_split() if you need a Perl-compatible regular expression to describe the
separator:

```	php
$words = preg_split('/\d\. /','my day: 1. get up 2. get dressed 3. eat toast');
$lines = preg_split('/[\n\r]+/',$_POST['textarea']);
```	

Use the /i flag to preg_split() for case-insensitive separator matching:

```	php
$words = preg_split('/ x /i','31 inches x 22 inches X 9 inches');
```



If all of your fields are the same size, str_split() is a handy shortcut for chopping up
incoming data. It returns an array made up of sections of a string.

```php
<?php
$book_array = str_split($booklist,25);
?>
```

The str_split() function splits a string into an array.

```php
<?php
echo str_split("Hello world!"); // outputs ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
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

## Case Conversion

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

##  Trimming Blanks from a String

You want to remove whitespace from the beginning or end of a string. For example, you want to clean up user input before validating it.

Use ltrim(), rtrim(), or trim(). The ltrim() function removes whitespace from the beginning of a string, rtrim() from the end of a string, and trim() from both the beginning and end of a string.

For these functions, whitespace is defined as the following characters: newline, carriage return, space, horizontal and vertical tab, and null.
Trimming whitespace off of strings saves storage space and can make for more precise display of formatted data or text.

The trim() functions can also remove user-specified characters from strings. Pass the characters you want to remove as a second argument. You can indicate a range of characters with two dots between the first and last characters in the range.

```php
<?php
// Remove numerals and space from the beginning of the line
print ltrim('10 PRINT A$',' 0..9');
// Remove semicolon from the end of the line
print rtrim('SELECT * FROM turtles;',';');

?>
```

### ltrim()

The PHP ltrim() function removes leading whitespace from a string.

```php
<?php
echo ltrim("   Hello world!"); // outputs "Hello world!"
?>
```

### rtrim()

The PHP rtrim() function removes trailing whitespace from a string.

```php
<?php
echo rtrim("Hello world!   "); // outputs "Hello world!"
?>
```

### trim()

The PHP trim() function removes leading and trailing whitespace from a string.

```php
<?php
echo trim("   Hello world!   "); // outputs "Hello world!"
?>
```

## Formatting to CSV

### fgetcsv()

The PHP str_getcsv() function parses a CSV string into an array. Parsing Comma-Separated Data.

You have data in comma-separated values (CSV) format—for example, a file exported from Excel or a database—and you want to extract the records and fields into a format you can manipulate in PHP.

If the CSV data is in a file (or available via a URL), open the file with fopen() and read in the data with fgetcsv().

```php
<?php
//Reading CSV data from a file
$fp = fopen($filename,'r') or die("can't open file");
print "<table>\n";
while($csv_line = fgetcsv($fp)) {
 print '<tr>';
 for ($i = 0, $j = count($csv_line); $i < $j; $i++) {
 print '<td>'.htmlentities($csv_line[$i]).'</td>';
 }
 print "</tr>\n";
}
print "</table>\n";
fclose($fp) or die("can't close file");
?>
```

By default, fgetcsv() reads in an entire line of data. If your average line length is more than 8,192 bytes, your program may run faster if you specify an explicit line length instead of letting PHP figure it out. Do this by providing a second argument to fgetcsv() that is a value larger than the maximum length of a line in your CSV file. (Don’t forget to count the end-of-line whitespace.) If you pass a line length of 0, PHP will use the default behavior. 

You can pass fgetcsv() an optional third argument, a delimiter to use instead of a comma (,). However, using a different delimiter somewhat defeats the purpose of CSV as an easy way to exchange tabular data.
Don’t be tempted to bypass fgetcsv() and just read a line in and explode() on the commas. CSV is more complicated than that so that it can deal with field values that have, for example, literal commas in them that should not be treated as field delimiters. Using fgetcsv() protects you and your code from subtle errors.

### str_getcsv()

The PHP str_getcsv() function parses a CSV string into an array. Parsing Comma-Separated Data.

Use str_getcsv() only when you have the CSV already as a string in your program.

```php
<?php

$string = 'PHP,Java,Python,Kotlin,Swift';
$data = str_getcsv($string);

var_dump($data);
?>
```	



### fputcsv()

The PHP fputcsv() function converts an array into a CSV string and generating Comma-Separated Data.

You want to format data as comma-separated values (CSV) so that it can be imported by a spreadsheet or database.

```php
<?php
$sales = array( array('Northeast','2005-01-01','2005-02-01',12.54),
 array('Northwest','2005-01-01','2005-02-01',546.33),
 array('Southeast','2005-01-01','2005-02-01',93.26),
 array('Southwest','2005-01-01','2005-02-01',945.21),
 array('All Regions','--','--',1597.34) );
$filename = './sales.csv';
$fh = fopen($filename,'w') or die("Can't open $filename");
foreach ($sales as $sales_line) {
 if (fputcsv($fh, $sales_line) === false) {
 die("Can't write CSV line");
 }
}
fclose($fh) or die("Can't close $filename");
?>
```

To print the CSV-formatted data instead of writing it to a file, use the special output stream php://output . 

```php
<?php
$sales = array( array('Northeast','2005-01-01','2005-02-01',12.54),
 array('Northwest','2005-01-01','2005-02-01',546.33),
 array('Southeast','2005-01-01','2005-02-01',93.26),
 array('Southwest','2005-01-01','2005-02-01',945.21),
 array('All Regions','--','--',1597.34) );
$fh = fopen('php://output','w');
foreach ($sales as $sales_line) {
 if (fputcsv($fh, $sales_line) === false) {
 die("Can't write CSV line");
 }
}
fclose($fh);

?>
```

To put the CSV-formatted data into a string instead of printing it or writing it to a file.

```php
<?php
$sales = array( array('Northeast','2005-01-01','2005-02-01',12.54),
 array('Northwest','2005-01-01','2005-02-01',546.33),
 array('Southeast','2005-01-01','2005-02-01',93.26),
 array('Southwest','2005-01-01','2005-02-01',945.21),
 array('All Regions','--','--',1597.34) );
ob_start();
$fh = fopen('php://output','w') or die("Can't open php://output");
foreach ($sales as $sales_line) {
 if (fputcsv($fh, $sales_line) === false) {
 die("Can't write CSV line");
 }
}
fclose($fh) or die("Can't close php://output");
$output = ob_get_contents();
ob_end_clean();

?>
```	
##  Wrapping Text at a Certain Line Length

When you need to wrap lines in a string. For example, you want to display text by using  the pre tags but have it stay within a regularly sized browser window.



### wordwrap()

```php
<?php
$s = "Four score and seven years ago our fathers brought forth on this continent ↵
a new nation, conceived in liberty and dedicated to the proposition ↵
that all men are created equal.";
print "<pre>\n".wordwrap($s)."\n</pre>";
?>
```	

```
<pre>
Four score and seven years ago our fathers brought forth on this continent
a new nation, conceived in liberty and dedicated to the proposition that
all men are created equal.
</pre>
```

By default, wordwrap() wraps text at 75 characters per line. An optional second argu‐
ment specifies a different line length:

```php
<?php
print wordwrap($s,50);
?>
```

```
Four score and seven years ago our fathers brought
forth on this continent a new nation, conceived in
liberty and dedicated to the proposition that all
men are created equal.
```

Other characters besides \n can be used for line breaks. For double spacing, use "\n\n":

```php
<?php
print wordwrap($s,50,"\n\n");
?>
```

This prints:
```	
Four score and seven years ago our fathers brought
forth on this continent a new nation, conceived in
liberty and dedicated to the proposition that all
men are created equal.
```

There is an optional fourth argument to wordwrap() that controls the treatment of words that are longer than the specified line length. If this argument is 1, these words are wrapped. Otherwise, they span past the specified line length:

```php
<?php

print wordwrap('jabberwocky',5) . "\n";
print wordwrap('jabberwocky',5,"\n",1);
?>
```

This prints:

```php
jabberwocky
jabbe
rwock
y
```

##  Formatting Numbers

When you have a number and you want to print it with thousands and decimal separators. For example, you want to display the number of people who have viewed a page, or the percentage of people who have voted for an option in a poll.

### number_format()

```php
<?php
$number = 1234.56;
// $formatted1 is "1,235" - 1234.56 gets rounded up and , is
// the thousands separator");
$formatted1 = number_format($number);
// Second argument specifies number of decimal places to use.
// $formatted2 is 1,234.56
$formatted2 = number_format($number, 2);
// Third argument specifies decimal point character
// Fourth argument specifies thousands separator
// $formatted3 is 1.234,56
$formatted3 = number_format($number, 2, ",", ".");
?>
```

The number_format() function formats a number with decimal and thousands sepa‐
rators. By default, it rounds the number to the nearest integer. If you want to preserve
the entire number, but you don’t know ahead of time how many digits follow the decimal
point in your number:

```php
<?php
$number = 31415.92653; // your number
list($int, $dec) = explode('.', $number);
// $formatted is 31,415.92653
$formatted = number_format($number, strlen($dec));
?>
```

### NumberFormatter

If you need to generate appropriate formats for a particular locale, use NumberFormatter:

```php
<?php
$number = '1234.56';
// $formatted1 is 1,234.56
$usa = new NumberFormatter("en-US", NumberFormatter::DEFAULT_STYLE);
$formatted1 = $usa->format($number);
// $formatted2 is 1 234,56
// Note that it's a "non breaking space (\u00A0) between the 1 and the 2
$france = new NumberFormatter("fr-FR", NumberFormatter::DEFAULT_STYLE);
$formatted2 = $france->format($number);

?>
```

The NumberFormatter class, part of the intl extension, uses the extensive formatting rules that are part of the ICU library to give you an easy and powerful way to format numbers appropriately for anywhere in the world. You can even do fancy things such as spell out a number in words.

```php
<?php
$number = '1234.56';
$france = new NumberFormatter("fr-FR", NumberFormatter::SPELLOUT);
// $formatted is "mille-deux-cent-trente-quatre virgule cinq six"
$formatted = $france->format($number);
?>
```

When you have a number and you want to print it with thousands and decimal separators. For
instance, you want to display prices for items in a shopping cart.

```php
<?php
$number = 1234.56;
// US uses $ , and .
// $formatted1 is $1,234.56
$usa = new NumberFormatter("en-US", NumberFormatter::CURRENCY);
$formatted1 = $usa->format($number);
// France uses , and €
// $formatted2 is 1 234,56 €
$france = new NumberFormatter("fr-FR", NumberFormatter::CURRENCY);
$formatted2 = $france->format($number);
?>
```

The NumberFormatter::CURRENCY format style formats a number by inserting the correct currency symbol, decimal, and thousands separators for the locale used to create the NumberFormatter object instance. It assumes that the currency to use is the one native to the locale—US Dollars for the en-US locale, Euro for the fr-FR locale, and soon.
To produce the right format for a currency other than the locale’s native currency, use the formatCurrency() method. Its second argument lets you specify the currency to use. For example, what’s the correct way, in the USA, to format the price of something in Euro?

```php
<?php
$number = 1234.56;
// US uses € , and . for Euro
// $formatted is €1,234.56
$usa = new NumberFormatter("en-US", NumberFormatter::CURRENCY);
$formatted = $usa->formatCurrency($number, 'EUR');
?>
```

### printf()

printf() family of functions, which allows you to convert decimal numbers to binary, octal, and hexadecimal numbers with a wide range of formatting, such as leading zeros and a choice between upper- and lowercase letters for hexadecimal numbers.

For instance, say you want to print out HTML color values. You can use the %02X format specifier.

```php
<?php
$red = 0;
$green = 102;
$blue = 204;
// $color is '#0066CC'
$color = sprintf('#%02X%02X%02X', $red, $green, $blue);
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
|[chop()](#rtrim)|	Removes whitespace or other characters from the right end of a string|
|chr()	|Returns a character from a specified ASCII value|
|chunk_split()|	Splits a string into a series of smaller parts|
|convert_cyr_string()|	Converts a string from one Cyrillic character-set to another|
|convert_uudecode()|	Decodes a uuencoded string|
|convert_uuencode()|	Encodes a string using the uuencode algorithm|
|count_chars()|	Returns information about characters used in a string|
|crc32()|	Calculates a 32-bit CRC for a string|
|crypt()|	One-way string hashing|
|[echo()](../Func/phpOutput.md#echo)|	Outputs one or more strings|
|[explode()](#explode)|	Breaks a string into an array|
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
|[ltrim()](#ltrim)|	Removes whitespace or other characters from the left side of a string|
|md5()|	Calculates the MD5 hash of a string|
|md5_file()|	Calculates the MD5 hash of a file|
|metaphone()|	Calculates the metaphone key of a string|
|money_format()|	Returns a string formatted as a currency string|
|nl_langinfo()|	Returns specific local information|
|nl2br()|	Inserts HTML line breaks in front of each newline in a string|
|[number_format()](#number_format)|	Formats a number with grouped thousands|
|ord()|	Returns the ASCII value of the first character of a string|
|parse_str()|	Parses a query string into variables|
|[print()](../Func/phpOutput.md#print)|	Outputs one or more strings|
|[printf()](#printf)|	Outputs a formatted string|
|quoted_printable_decode()|	Converts a quoted-printable string to an 8-bit string|
|quoted_printable_encode()|	Converts an 8-bit string to a quoted printable string|
|quotemeta()|	Quotes meta characters|
|[rtrim()](#rtrim)|	Removes whitespace or other characters from the right side of a string|
|setlocale()|	Sets locale information|
|sha1()|	Calculates the SHA-1 hash of a string|
|sha1_file()|	Calculates the SHA-1 hash of a file|
|similar_text()|	Calculates the similarity between two strings|
|soundex()|	Calculates the soundex key of a string|
|sprintf()|	Writes a formatted string to a variable|
|sscanf()|	Parses input from a string according to a format|
|[str_getcsv()](#str_getcsv)|	Parses a CSV string into an array|
|str_ireplace()|	Replaces some characters in a string (case-insensitive)
|[str_pad()](#str_pad)|	Pads a string to a new length|
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
|[trim()](#trim)|	Removes whitespace or other characters from both sides of a string|
|[ucfirst()](#ucfirst)|	Converts the first character of a string to uppercase|
|[ucwords()](#ucwords)|	Converts the first character of each word in a string to uppercase|
|vfprintf()|	Writes a formatted string to a specified output stream|
|vprintf()|	Outputs a formatted string|
|vsprintf()|	Writes a formatted string to a variable|
|[wordwrap()](#wordwrap)|	Wraps a string to a given number of characters|