PHP has a set of keywords that are reserved words which cannot be used as function names, class names or method names. Prior to PHP 7, these keywords could not be used as class property names either:


### Logical OPs Keywords
|Keyword|	Description|
|---|---|
|[and](phpOperators1.md#php-logical-operators)|	A logical operator|
|[or](phpOperators1.md#php-logical-operators)|	A logical operator|
|[xor](phpOperators1.md#php-logical-operators)|	A logical operator|

### Conditional Keywords
|Keyword|	Description|
|---|---|
|[switch](phpIF.md#switch-statement)|	Create a switch block|
|[case](phpIF.md#switch-statement)|	Used in the switch conditional|
|[default](phpIF.md#switch-statement)|	Used in the switch statement|
|[break](phpLoops.md#break-and-continue)|	Break [out of loops](phpLoops.md#break-and-continue) and [switch statements](phpIF.md#switch-statement)|
|[continue](phpLoops.md#break-and-continue)|	Jump to the next iteration of a loop |
|[endswitch](phpIF.md#endswitch)    |	End a switch block|
|[if](phpIF.md#if-statement)|	Create a conditional statement|
|[else](phpIF.md#ifelse-statement)|	Used in conditional statements|
|[elseif](phpIF.md#ifelseifelse-statement)|	Used in conditional statements|
|[endif](phpIF.md#endif)|	End an if or elseif block|
|[empty](../Func/phpEmpty.md)|	Check if an expression is empty|
|[isset](../Func/phpEmpty.md#isset-function)|	Check if a variable exists and is not null|


### Loop Keywords

|Keyword|	Description|
|---|---|
|[do](phpLoops.md#dowhile)|	Create a do...while loop|
|[while](phpLoops.md#while)|	Create a while loop or end a do...while loop|
|[endwhile](phpLoops.md#endwhile)|	End a while block|
|[for](phpLoops.md#for)|	Create a for loop|
|[endfor](phpLoops.md#endfor)|	End a for block|
|[foreach](phpLoops.md#foreach)|	Create a foreach loop|
|[as](phpLoops.md#foreach)|	Used in the foreach loop [to traverse an associative array](phpLoops.md#foreach) </br>To give an [alias to the method of a trait](../Classes/phpTraits.md#trait-alias), or </br>To give an [alias to a namespace](../Classes/phpNamespaces.md#namespace-alias)|
|[endforeach](phpLoops.md#endforeach)|	End a foreach block|
|[break](phpLoops.md#break-and-continue)|	Break [out of loops](phpLoops.md#break-and-continue) and [switch statements](phpIF.md#switch-statement)|
|[continue](phpLoops.md#break-and-continue)|	Jump to the next iteration of a loop |

### I/O Keywords
|Keyword|	Description|
|---|---|
|[echo](../Func/phpOutput.md#echo)|	Output text|
|[print](../Func/phpOutput.md#print)|	Output text|


### Exception Keywords
|Keyword|	Description|
|---|---|
|[try](../Func/phpExceptions.md#the-trycatch-statement)|	Create a try...catch structure|
|[catch](../Func/phpExceptions.md#the-trycatch-statement)|	Used in the try..catch statement|
|[finally](../Func/phpExceptions.md#the-trycatchfinally-statement)|	Used in the try...catch statement|
|[throw](../Func/phpExceptions.md#throwing-an-exception)|	Throw an exception|

### Functions Keywords
|Keyword|	Description|
|---|---|
|[fn](../Func/phpArrowFunc.md)|	Declare an arrow function|
|[function](../Func/phpUserFunc.md  )|	Create a function|
|[return](../Func/phpUserFunc.md#returning-values)|	Exit a function and return a value|
|[yield](../Func/phpGenerators.md#the-yield-keyword)|	Used in generator functions|
|[yield from](../Func/phpGenerators.md#the-yield-from-keyword)|	Used in generator functions|
|[callable](../Func/phpCallback.md#php-callable-keyword)|	A data type which can be executed as a function|

### OOP Keywords
|Keyword|	Description|
|---|---|
|[abstract](../Classes/phpAbstract.md)|	Declare a class as abstract|
|[class](../Classes/phpCls.md)|	Declare a class|
|[clone](../Classes/phpCls.md#php-clone-keyword)|	Create a copy of an object|
|[const](phpConst.md)|	Define a class constant|
|[extends](../Classes/phpInheritance.md)|	Extends a class or interface|
|[final](../Classes/phpInheritance.md#the-final-keyword)|	Declare a class, property or method as final|
|[global](phpVar3.md#global-scope)|	Import variables from the global scope|
|[private](../Classes/phpModifiers.md)|	Declare a property, method or constant as private|
|[protected](../Classes/phpModifiers.md)|	Declare a property, method or constant as protected|
|[public](../Classes/phpModifiers.md)|	Declare a property, method or constant as public|
|[static](phpVar3.md#php-the-static-keyword)|	Declare a property or method as static|
|[implements](../Classes/phpInterfaces.md)|	Implement an interface|
|[instanceof](../Classes/phpCls.md#instanceof)|	Test an object's class|
|[insteadof](../Classes/phpTraits.md#the-insteadof-keyword)|	Resolve conflicts with traits|
|[interface](../Classes/phpInterfaces.md)|	Declare an interface|
|[namespace](../Classes/phpNamespaces.md)|	Declares a namespace|
|[new](../Classes/phpCls.md#objects)|	Creates an object|
|[trait](../Classes/phpTraits.md)|	Declare a trait|
|[use](../Classes/phpNamespaces.md#namespace-alias)|	Tells a class [to inherit a trait](../Classes/phpTraits.md#trait-alias) and it gives an [alias to a namespace](../Classes/phpNamespaces.md#namespace-alias)|


### Code Keywords
|Keyword|	Description|
|---|---|
|[declare](../Func/phpDeclare.md)|	Set directives for a block of code|
|[enddeclare](../Func/phpDeclare.md#enddeclare)|	End a declare block|
|[goto](../Adv/phpGoto.md)|	Jump to a line of code|
|[include](../Adv/phpInclude.md)|	Embed code from another file|
|[include_once](../Adv/phpInclude.md#include_once)|	Embed code from another file|
|[require](../Adv/phpInclude.md#php-include-vs-require)	|Embed code from another file|
|[require_once](../Adv/phpInclude.md#require_once)|	Embed code from another file|
|[unset](phpVar1.md#null)|	Delete a variable or array element|
|[var](phpVar1.md#creating-declaring-php-variables)|	Declare a variable|
|[list](../DS/phpArray.md#the-list-function)|	Assigns array elements into variables|