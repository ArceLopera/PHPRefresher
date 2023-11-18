
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
