
PHP strings are binary-safe (i.e., they can contain null bytes) and can grow and shrink on demand. Their size is limited only by the amount of memory that is available to PHP.

Usually, PHP strings are ASCII strings. You must do extra work to handle non-ASCII data like UTF-8 or other multibyte character encodings.

## Initialization

Similar in form and behavior to Perl and the Unix shell, strings can be initialized in four ways:
 
1. [With single quotes](#single-quoted-strings), 
2. [With double quotes](#double-quoted-strings), 
3. [With the “here document” (heredoc) format](#heredoc-strings), and
4. [With the “nowdoc” (nowdoc) format](#nowdoc-strings). 

### Single-quoted strings
With single-quoted strings, the only special characters you need to escape inside a string are the backslash and the single quote itself.

``` php
<?php
print 'I\'ve gone to the store.';
?>

```

### Double-quoted strings

Double-quoted strings don’t recognize escaped single quotes, but they do recognize
interpolated variables and the following escape sequences.

|Escape sequence |Character|
|----------------|---------|
|\n| Newline (ASCII 10)|
|\r| Carriage return (ASCII 13)|
|\t| Tab (ASCII 9)|
|\\| Backslash|
|\$| Dollar sign|
|"| Double quote|
|\0 through \777 |Octal value|
|\x0 through \xFF |Hex value|

``` php
<?php
print "I've gone to the store.";
print "The sauce cost \$10.25.";
$cost = '$10.25';
print "The sauce cost $cost.";
print "The sauce cost \$\061\060.\x32\x35.";
?>
```

### Heredoc strings

Heredoc-specified strings recognize all the interpolations and escapes of double-quoted strings, but they don’t require double quotes to be escaped. Heredocs start with <<< and a token. That token (with no leading or trailing whitespace), followed by a semicolon to end the statement (if necessary), ends the heredoc.

``` php
<?php
print <<< END
It's funny when signs say things like:
 Original "Root" Beer
 "Free" Gift
 Shoes cleaned while "you" wait
or have other misquoted words.
END;

```	

Newlines, spacing, and quotes are all preserved in a heredoc. By convention, the endof-string identifier is usually all caps, and it is case sensitive.

``` php
<?php
print <<< PARSLEY
It's easy to grow fresh:
Parsley
Chives
on your windowsill
PARSLEY;

print <<< DOGS
If you like pets, yell out:
DOGS AND CATS ARE GREAT!
DOGS;
?>

```

Heredocs are especially useful for printing out HTML with interpolated variables be‐
cause you don’t have to escape the double quotes that appear in the HTML elements.


#### Printing HTML with a here document
``` php
<?php
if ($remaining_cards > 0) {
 $url = '/deal.php';
 $text = 'Deal More Cards';
} else {
 $url = '/new-game.php';
 $text = 'Start a New Game';
}

print <<< HTML
There are <b>$remaining_cards</b> left.
<p>
<a href="$url">$text</a>
HTML;
?>
```	
####  Concatenation with a here document

The semicolon needs to go after the end-of-string delimiter to tell PHP the statement is ended. In some cases, however, you shouldn’t use the semicolon. 

``` php
<?php
$html = <<< END
<div class="$divClass">
<ul class="$ulClass">
<li>
END
. $listItem . '</li></div>';
print $html;
?>
```
The expression needs to continue on the next line, so you don’t use a semicolon. Note also that in order for PHP to recognize the end-of-string delimiter, the . string concatenation operator needs to go on a separate line from the end-of-string delimiter.

### NowDoc strings

Nowdocs are similar to heredocs, but there is no variable interpolation. So, nowdocs are to heredocs as single-quoted strings are to double-quoted strings. They’re best when you have a block of non-PHP code, such as JavaScript, that you want to print as part of an HTML page or send to another program.

For example, if you’re using jQuery:

``` php
<?php
$js = <<<'__JS__'
$.ajax({
 'url': '/api/getStock',
 'data': {
 'ticker': 'LNKD'
 },
 'success': function( data ) {
 $( "#stock-price" ).html( "<strong>$" + data + "</strong>" );
 }
});

__JS__;
print $js;
?>
```

+ Heredoc strings are like double-quoted strings without escaping.
+ Nowdoc strings are like single-quoted strings without escaping.

## Interpolating Functions and Expressions Within Strings

You want to include the results of executing a function or expression within a string.

Use the string concatenation operator (.), when the value you want to include can’t be inside the string.

```php
<?php
//String concatenation
print 'You have '.($_POST['boys'] + $_POST['girls']).' children.';
print "The word '$word' is ".strlen($word).' characters long.';
print 'You owe '.$amounts['payment'].' immediately.';
print "My circle's diameter is ".$circle->getDiameter().' inches.';
?>
```

You can put variables, object properties, and array elements (if the subscript is unquo‐
ted) directly in double-quoted strings.

```php
<?php
print "I have $children children.";
print "You owe $amounts[payment] immediately.";
print "My circle's diameter is $circle->diameter inches.";
?>
```

Interpolation with double-quoted strings places some limitations on the syntax of what
can be interpolated. In the previous example, $amounts['payment'] had to be written
as $amounts[payment] so it would be interpolated properly. Use curly braces around
more complicated expressions to interpolate them into a string. For example:

```php
<?php
print "I have {$children} children.";
print "You owe {$amounts['payment']} immediately.";
print "My circle's diameter is {$circle->getDiameter()} inches.";
?>
```

Direct interpolation or using string concatenation also works with heredocs. Interpo‐
lating with string concatenation in heredocs can look a little strange because the closing
heredoc delimiter and the string concatenation operator have to be on separate lines:

```php
<?php
print <<< END
Right now, the time is
END
. strftime('%c') . <<< END
but tomorrow it will be
END
. strftime('%c',time() + 86400);
?>
```

Also, if you’re interpolating with heredocs, make sure to include appropriate spacing for the whole string to appear properly. In the previous example, Right now, the time is has to include a trailing space, and but tomorrow it will be has to include leading and trailing spaces.


##  Processing a String One Byte at a Time

Loop through each byte in the string with for.

```php
$string = "This weekend, I'm going shopping for a pet chicken.";
$vowels = 0;
for ($i = 0, $j = strlen($string); $i < $j; $i++) {
 if (strstr('aeiouAEIOU',$string[$i])) {
 $vowels++;
 }
}
?>
```




### The "Look and Say" Algorithm

```php
function lookandsay($s) {
 // initialize the return value to the empty string
 $r = '';
 // $m holds the character we're counting, initialize to the first
 // character in the string
 $m = $s[0];
 // $n is the number of $m's we've seen, initialize to 1
 $n = 1;
 for ($i = 1, $j = strlen($s); $i < $j; $i++) {
 // if this character is the same as the last one
 if ($s[$i] == $m) {
 // increment the count of this character
 $n++;
 } else {
 // otherwise, add the count and character to the return value
 $r .= $n.$m;
 // set the character we're looking for to the current one
 $m = $s[$i];
 // and reset the count to 1
 $n = 1;
 }
 }
 // return the built up string as well as the last count and character
 return $r.$n.$m;
}
for ($i = 0, $s = 1; $i < 10; $i++) {
 $s = lookandsay($s);
 print "$s\n";
}

?>
```

```
1
11
21
1211
111221
312211
13112221
1113213211
31131211131221
```

It’s called the “Look and Say” sequence because each element is what you get by looking at the previous element and saying what’s in it. For example, looking at the first element, 1, you say “one one.” So the second element is “11.” That’s two ones, so the third element is “21.” Similarly, that’s one two and one one, so the fourth element is “1211,” and so on.