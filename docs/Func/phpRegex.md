A regular expression is a sequence of characters that forms a search pattern. When you search for data in a text, you can use this search pattern to describe what you are searching for. Regular expressions are an intricate and powerful tool for matching patterns and manipulating text. Though not as fast as plain-vanilla string matching, regular expressions are extremely flexible. Think of a regular expression as a program in a very restrictive programming language.
The only task of a regular expression program is to match a pattern in text. In regular expression patterns, most characters just match themselves.

REF [docs](https://www.php.net/pcre)

## Regular Expressions Functions

|Function	|Description|
|--------|--------|
|preg_filter()|	Returns a string or an array with pattern matches replaced, but only if matches were found|
|preg_grep()|	Returns an array consisting only of elements from the input array which matched the pattern|
|preg_last_error()|	Returns an error code indicating the reason that the most recent regular expression call failed|
|[preg_match()](#preg_match)|	Returns 1 if the pattern was found in the string and 0 if not|
|[preg_match_all()](#preg_match_all)|Returns the number of times the pattern was found in the string, which may also be 0|
|[preg_replace()](#preg_replace)	|Returns a new string where matched patterns have been replaced with another string|
|preg_replace_callback()|	Given an expression and a callback, returns a string where all matches of the expression are replaced with the substring returned by the callback|
|preg_replace_callback_array()|	Given an array associating expressions with callbacks, returns a string where all matches of each expression are replaced with the substring returned by the callback|
|[preg_split()](#preg_split)|	Breaks a string into an array using matches of a regular expression as separators|
|preg_quote()|	Escapes characters that have a special meaning in regular expressions by putting a backslash in front of them|

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

### preg_split()

```php
<?php
$str = "Hello World!";
$pattern = "/ /";
echo preg_split($pattern, $str); // Outputs array("Hello", "World!")
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