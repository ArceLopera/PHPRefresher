A regular expression is a sequence of characters that forms a search pattern. When you search for data in a text, you can use this search pattern to describe what you are searching for. Regular expressions are an intricate and powerful tool for matching patterns and manipulating text. Though not as fast as plain-vanilla string matching, regular expressions are extremely flexible. Think of a regular expression as a program in a very restrictive programming language.
The only task of a regular expression program is to match a pattern in text. In regular expression patterns, most characters just match themselves.

REF [docs](https://www.php.net/pcre)

## Regular Expressions Functions

|Function	|Description|
|--------|--------|
|preg_filter()|	Returns a string or an array with pattern matches replaced, but only if matches were found|
|[preg_grep()](#preg_grep)|	Returns an array consisting only of elements from the input array which matched the pattern|
|preg_last_error()|	Returns an error code indicating the reason that the most recent regular expression call failed|
|[preg_match()](#preg_match)|	Returns 1 if the pattern was found in the string and 0 if not|
|[preg_match_all()](#preg_match_all)|Returns the number of times the pattern was found in the string, which may also be 0|
|[preg_replace()](#preg_replace)	|Returns a new string where matched patterns have been replaced with another string|
|[preg_replace_callback()](#preg_replace_callback)|	Given an expression and a callback, returns a string where all matches of the expression are replaced with the substring returned by the callback|
|preg_replace_callback_array()|	Given an array associating expressions with callbacks, returns a string where all matches of each expression are replaced with the substring returned by the callback|
|[preg_split()](#preg_split)|	Breaks a string into an array using matches of a regular expression as separators|
|[preg_quote()](#preg_quote)|	Escapes characters that have a special meaning in regular expressions by putting a backslash in front of them|


### preg_replace_callback() 

When you want to process matched text with a PHP function. For example, you want to decode all HTML entities in captured subpatterns.

Use preg_replace_callback(). Instead of a replacement pattern, give it a callback function. This callback function is passed an array of matched subpatterns and should return an appropriate replacement string.

```php
<?php
// Generating replacement strings with a callback function
$h = 'The &lt;b&gt; tag makes text bold: <code>&lt;b&gt;bold&lt;/b&gt;</code>';
print preg_replace_callback('@<code>(.*?)</code>@','decode', $h);
// $matches[0] is the entire matched string
// $matches[1] is the first captured subpattern
function decode($matches) {
 return html_entity_decode($matches[1]);
}
}	
?>

```
This prints:
```
The <b> tag makes text bold: <b>bold</b>
```	

The second argument to preg_replace_callback() specifies the function that is to be called to calculate replacement strings. Like everywhere the PHP “callable” pseudotype is used, this argument can be a string or an array. Use a string to specify a function name. To use an object instance method as a callback, pass an array whose first element is the object and whose second element is a string containing the method name. 

To use a static class method as a callback, pass an array of two strings: the class name and the method name. In PHP 5.4.0 and later, you can pass a variable containing an anonymous function, or define the function inline with the call to preg_replace_callback().

The callback function is passed one argument: an array of matches. Element 0 of this array is always the text that matched the entire pattern. If the pattern given to preg_replace_callback() has any parenthesized subpatterns, these are present in subsequent elements of the $matches array. The keys of the $matches array are numeric, even if there are named subpatterns in the pattern.

If you are providing an anonymous function as a callback, it can be memory intensive if the function creation is inline with the call to preg_replace_callback() and inside a loop. If you want to use an anonymous function with preg_replace_callback(), store the anonymous function callback in a variable. Then, provide the variable to preg_replace_callback() as the callback function.

``` php
<?php
// Generating replacement strings with an anonymous function
$callbackFunction = function($matches) {
 return html_entity_decode($matches[1]);
};
$fp = fopen(__DIR__ . '/html-to-decode.html','r');
while (! feof($fp)) {
 $line = fgets($fp);
 print preg_replace_callback('@<code>(.*?)</code>@',$callbackFunction, $line);
}
fclose($fp);
?>	

```

### preg_quote()
Escapes characters that have a special meaning in regular expressions by putting a backslash in front of them. When you want to have characters such as * or + treated as literals, not as metacharacters,
inside a regular expression. This is useful when allowing users to type in search strings you want to use inside a regular expression.

```php
<?php
$pattern = preg_quote('The Education of H*Y*M*A*N K*A*P*L*A*N').':(\d+)';
if (preg_match("/$pattern/",$book_rank,$matches)) {
 print "Leo Rosten's book ranked: ".$matches[1];
}

?>
```

Here are the characters that preg_quote() escapes:

. \ + * ? ^ $ [ ] () { } < > = ! | :

It escapes the metacharacters with a backslash.

You can also pass preg_quote() an additional character to escape as a second argument. It’s useful to pass your pattern delimiter (usually /) as this argument so it also gets escaped. This is important if you incorporate user input into a regular expression pattern. The following code expects $_GET['search_term'] from a web form and searches for words beginning with $_GET['search_term'] in a string $s:

```php
<?php
$search_term = preg_quote($_GET['search_term'],'/');
if (preg_match("/\b$search_term/i",$s)) {
 print 'match!';
}
?>
```	

Using preg_quote() ensures the regular expression is interpreted properly if, for example, a Magnum, P.I. fan enters t.c as a search term. Without preg_quote(), this matches tic, tucker, and any other words whose first letter is t and third letter is c.

Passing the pattern delimiter to preg_quote() as well makes sure that user input with forward slashes in it, such as CP/M, is also handled correctly.


### preg_grep()
When you want to find all the lines in a file that match a pattern.

There are two ways to do this. First example is faster, but uses more memory. It uses
the file() function to put each line of the file into an array and preg_grep() to filter
out the nonmatching lines.

```php
// Efficiently finding lines that match a pattern
<?php
$pattern = "/\bo'reilly\b/i"; // only O'Reilly books
$ora_books = preg_grep($pattern, file('/path/to/your/file.txt'));
?>
```	

The next example is slower, but more memory efficient. It reads the file a line at a time and
uses preg_match() to check each line after it’s read.

```php
<?php
//Efficiently finding lines that match a pattern
$fh = fopen('/path/to/your/file.txt', 'r') or die($php_errormsg);
while (!feof($fh)) {
 $line = fgets($fh);
 if (preg_match($pattern, $line)) { $ora_books[ ] = $line; }
}
fclose($fh);

?>
```

Keep in mind that because both methods operate on individual lines of the file, they can’t successfully use patterns that match text that spans multiple lines.

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

For example, when you want to capture text inside HTML tags, you can find all the heading tags in an HTML document.

```php
<?php
// Capturing HTML headings
$html = file_get_contents(__DIR__ . '/example.html');
preg_match_all('@<h([1-6])>(.+?)</h\1>@is', $html, $matches);
foreach ($matches[2] as $text) {
 print "Heading: $text\n";
}
?>
```

Robust parsing of HTML is difficult using a simple regular expression. This is one advantage of using XHTML; it’s significantly easier to validate and parse.



Regular expressions can be moderately useful for parsing small amounts of HTML, especially if the structure of that HTML is reasonably constrained (or you’re generating it yourself). For more generalized and robust HTML parsing, use the [Tidy](https://www.php.net/tidy) extension. 

It provides an interface to the popular libtidy HTML cleanup library. After Tidy has cleaned up your HTML, you can use its methods for getting at parts of the document. Or if you’ve told Tidy to convert your HTML to XHTML, you can use all of the XML manipulation power of SimpleXML or the DOM extension to slice and dice your HTML document.


### preg_replace()

```php
<?php
$str = "Visit Microsoft!";
$pattern = "/microsoft/i";
echo preg_replace($pattern, "ME", $str); // Outputs "Visit ME!"
?>
```

### preg_split()

```php
<?php
$str = "Hello World!";
$pattern = "/ /";
echo preg_split($pattern, $str); // Outputs array("Hello", "World!")
?>
```

When you want to read in records from a file, in which each record is separated by a pattern you can match with a regular expression.

Read the entire file into a string and then split on the regular expression:

```php
<?php
$contents = file_get_contents('/path/to/your/file.txt');
$records = preg_split('/[0-9]+\) /', $contents);

?>
```	

This breaks apart a numbered list and places the individual list items into array elements.
So if you have a list like this:
1) Gödel
2) Escher
3) Bach
you end up with a four-element array, with an empty opening element. That’s because
preg_split() assumes the delimiters are between items, but in this case, the numbers
are before items:

```php
array(4) {
 [0]=>
 string(0) ""
 [1]=>
 string(7) "Gödel
"
 [2]=>
 string(7) "Escher
"
 [3]=>
 string(5) "Bach
"
}
```

From one point of view, this can be a feature, not a bug, because the nth element holds the nth item. But, to compact the array, you can eliminate the first element:

```php
$records = preg_split('/[0-9]+\) /', $contents);
array_shift($records);
```

Another modification you might want is to strip newlines from the elements and substitute the empty string instead:

```php
$records = preg_split('/[0-9]+\) /', str_replace("\n",'',$contents));
array_shift($records);
```

PHP doesn’t allow you to change the input record separator to anything other than a newline, so this technique is also useful for breaking apart records divided by strings. However, if you find yourself splitting on a string instead of a regular expression, substitute explode() for preg_split() for a more efficient operation.




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


##  Finding the nth Occurrence of a Match

Use preg_match_all() to pull all the matches into an array; then pick out the specific matches in which you’re interested.

```php
<?php
$todo = "1. Get Dressed 2. Eat Jelly 3. Squash every week into a day";
preg_match_all("/\d\. ([^\d]+)/", $todo, $matches);
print "The second item on the todo list is: ";
// $matches[1] is an array of each substring captured by ([^\d]+)
print $matches[1][1] . "\n";
print "The entire todo list is: ";
foreach($matches[1] as $match) {
 print "$match\n";
}

?>
```

Because the preg_match() function stops after it finds one match, you need to use preg_match_all() instead if you’re looking for additional matches. The preg_match_all() function returns the number of full pattern matches it finds. If it finds no matches, it returns 0. If it encounters an error, such as a syntax problem in the pattern, it returns false.


The third argument to preg_match_all() is populated with an array holding information about the various substrings that the pattern has matched. . The first element holds an array of matches of the complete pattern. For example, this means that $matches[0] holds the parts of $todo that match /\d\. ([^\d]+)/: 1. Get Dressed, 2. Eat Jelly, and 3. Squash every week into a day.

Subsequent elements of the $matches array hold arrays of text matched by each parenthesized subpattern. The pattern in the example has just one subpattern ([^\d\]+). 
So $matches[1] is an array of strings that match that subpattern: Get Dressed, Eat Jelly, and Squash every week into a day.


If there were a second subpattern, the substrings that it matched would be in $matches[2], a third subpattern’s matches would be in $matches[3], and so on.
Instead of returning an array divided into full matches and then submatches, preg_match_all() can return an array divided by matches, with each submatch inside.
To trigger this, pass PREG_SET_ORDER in as the fourth argument. This is particularly useful when you’ve got multiple captured subpatterns and you want to iterate through the subpattern groups one group at a time.

```php
<?php
$todo = "
first=Get Dressed
next=Eat Jelly
last=Squash every week into a day
";
preg_match_all("/([a-zA-Z]+)=(.*)/", $todo, $matches, PREG_SET_ORDER);
foreach ($matches as $match) {
 print "The {$match[1]} action is {$match[2]}\n";
}

?>
```

```php
The first action is Get Dressed
The next action is Eat Jelly
The last action is Squash every week into a day
```

With PREG_SET_ORDER, each value of $match in the foreach loop contains all the subpatterns: $match[0] is the entire matched string, $match[1] the bit before the =, and $match[2] the bit after the =.

## Choosing Greedy or Nongreedy Matches

When you want your pattern to match the smallest possible string instead of the largest. Place a ? after a quantifier to alter that portion of the pattern. 

```php	
// find all <em>emphasized</em> sections
preg_match_all('@<em>.+?</em>@', $html, $matches);
```	

Or use the U pattern-modifier ending to invert all quantifiers from greedy (“match as many characters as possible”) to nongreedy (“match as few characters as possible”). 

```php
// find all <em>emphasized</em> sections
preg_match_all('@<em>.+</em>@U', $html, $matches);

```

By default, all regular expression quantifiers in PHP are greedy. For example, consider the pattern <em>.</em>, which matches "<em>, one or more characters, </em>,” matching against the string I simply <em>love</em> your <em>work</em>. A greedy regular expression finds one match, because after it matches the opening <em>, its .+ slurps up as much as possible, finally grinding to a halt at the final </em>. The .+ matches love</em> your <em>work.

A nongreedy regular expression, on the other hand, finds a pair of matches. The first <em> is matched as before, but then .+ stops as soon as it can, only matching love. A second match then goes ahead: the next .+ matches work.

```	php
$html = 'I simply <em>love</em> your <em>work</em>';
// Greedy
$matchCount = preg_match_all('@<em>.+</em>@', $html, $matches);
print "Greedy count: " . $matchCount . "\n";
// Nongreedy
$matchCount = preg_match_all('@<em>.+?</em>@', $html, $matches);
print "First non-greedy count: " . $matchCount . "\n";
// Nongreedy
$matchCount = preg_match_all('@<em>.+</em>@U', $html, $matches);
print "Second non-greedy count: " . $matchCount . "\n";
```

```
Greedy count: 1
First non-greedy count: 2
Second non-greedy count: 1
```	

Greedy matching is also known as maximal matching and nongreedy matching can be called minimal matching, because these methods match either the maximum or minimum number of characters possible.

Although nongreedy matching is useful for simplistic HTML parsing, it can break down if your markup isn’t 100 percent valid and there are, for example, stray <em> tags lying around.

If your goal is just to remove all (or some) HTML tags from a block of text, you’re better off not using a regular expression. Instead, use the built-in function strip_tags(); it’s faster and it works correctly.

Finally, even though the idea of nongreedy matching comes from Perl, the U modifier is incompatible with Perl and is unique to PHP’s Perl-compatible regular expressions. It inverts all quantifiers, turning them from greedy to nongreedy and also the reverse. So to get a greedy quantifier inside of a pattern operating under a trailing /U, just add a ? to the end, the same way you would normally turn a greedy quantifier into a non‐greedy one.