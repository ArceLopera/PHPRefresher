PHP has a set of keywords that are reserved words which cannot be used as function names, class names or method names. Prior to PHP 7, these keywords could not be used as class property names either:


### OOP Keywords
|Keyword|	Description|
|---|---|
|[abstract](../Classes/phpAbstract.md)|	Declare a class as abstract|
|[class](../Classes/phpCls.md)|	Declare a class|
|[clone](../Classes/phpCls.md#php-clone-keyword)|	Create a copy of an object|
|[const](phpConst.md)|	Define a class constant|
|extends|	Extends a class or interface|
|final|	Declare a class, property or method as final|
|private|	Declare a property, method or constant as private|
|protected|	Declare a property, method or constant as protected|
|public|	Declare a property, method or constant as public|
|static|	Declare a property or method as static|
|implements|	Implement an interface|
|instanceof|	Test an object's class|
|insteadof|	Resolve conflicts with traits|
|interface|	Declare an interface|
|namespace|	Declares a namespace|
|new|	Creates an object|
|trait|	Declare a trait|
|use|	Use a namespace|

### Control Flow Keywords
|Keyword|	Description|
|---|---|
|[and](phpOperators1.md#php-logical-operators)|	A logical operator|
|or|	A logical operator|
|xor|	A logical operator|

### Conditional Keywords
|Keyword|	Description|
|---|---|
|switch|	Create a switch block|
|[case](phpIF.md#switch-statement)|	Used in the switch conditional|
|default|	Used in the switch statement|
|[break](phpLoops.md#break-and-continue)|	Break [out of loops](phpLoops.md#break-and-continue) and [switch statements](phpIF.md#switch-statement)|
|[continue](phpLoops.md#break-and-continue)|	Jump to the next iteration of a loop |
|endswitch|	End a switch block|
|if|	Create a conditional statement|
|else|	Used in conditional statements|
|elseif|	Used in conditional statements|
|empty|	Check if an expression is empty|
|endif|	End an if or elseif block|
|isset|	Check if a variable exists and is not null|


### Loop Keywords

|Keyword|	Description|
|---|---|
|do|	Create a do...while loop|
|while|	Create a while loop or end a do...while loop|
|endwhile|	End a while block|
|for|	Create a for loop|
|endfor|	End a for block|
|foreach|	Create a foreach loop|
|[as](phpLoops.md#foreach)|	Used in the foreach loop [to traverse an associative array](phpLoops.md#foreach) </br>To give an [alias to the method of a trait](../Classes/phpTraits.md#trait-alias), or </br>To give an [alias to a namespace](../Classes/phpNamespaces.md#namespace-alias)|
|endforeach|	End a foreach block|
|return|	Exit a function and return a value|
|[break](phpLoops.md#break-and-continue)|	Break [out of loops](phpLoops.md#break-and-continue) and [switch statements](phpIF.md#switch-statement)|
|[continue](phpLoops.md#break-and-continue)|	Jump to the next iteration of a loop |


### Exception Keywords
|Keyword|	Description|
|---|---|
|try|	Create a try...catch structure|
|[catch](../Func/phpExceptions.md#the-trycatch-statement)|	Used in the try..catch statement|
|finally|	Used in the try...catch statement|
|throw|	Throw an exception|

### I/O Keywords
|Keyword|	Description|
|---|---|
|echo|	Output text|
|print|	Output text|


### Functions Keywords
|Keyword|	Description|
|---|---|
|fn|	Declare an arrow function|
|function|	Create a function|
|yield|	Used in generator functions|
|yield from|	Used in generator functions|
|[callable](../Func/phpCallback.md#php-callable-keyword)|	A data type which can be executed as a function|


### Code Keywords
|Keyword|	Description|
|---|---|
|declare|	Set directives for a block of code|
|enddeclare|	End a declare block|
|global|	Import variables from the global scope|
|goto|	Jump to a line of code|
|include|	Embed code from another file|
|include_once|	Embed code from another file|
|require	|Embed code from another file|
|require_once|	Embed code from another file|
|unset|	Delete a variable or array element|
|var|	Declare a variable|
|list|	Assigns array elements into variables|