The XML language is a way to structure data for sharing across websites.

Several web technologies like RSS Feeds and Podcasts are written in XML.

In PHP there are two major types of XML parsers:

+ [Tree-Based Parsers](#tree-based-parsers)
+ [Event-Based Parsers](#event-based-parsers)

## Tree-Based Parsers
Tree-based parsers holds the entire document in Memory and transforms the XML document into a Tree structure. It analyzes the whole document, and provides access to the Tree elements (DOM).

This type of parser is a better option for smaller XML documents, but not for large XML document as it causes major performance issues.

Example of tree-based parsers:

+ [SimpleXML](#simplexml)
+ DOM

### SimpleXML

SimpleXML is a PHP extension that allows us to easily manipulate and get XML data.

SimpleXML is a tree-based parser.

SimpleXML provides an easy way of getting an element's name, attributes and textual content if you know the XML document's structure or layout.

SimpleXML turns an XML document into a data structure you can iterate through like a collection of arrays and objects.

Compared to DOM or the Expat parser, SimpleXML takes a fewer lines of code to read text data from an element.

#### Read From String
The PHP simplexml_load_string() function is used to read XML data from a string.

``` php
<?php
$myXMLData =
"<?xml version='1.0' encoding='UTF-8'?>
<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>";

$xml=simplexml_load_string($myXMLData) or die("Error: Cannot create object");
print_r($xml);
?>
```

The output of the code above will be:

```php
SimpleXMLElement Object ( [to] => Tove [from] => Jani [heading] => Reminder [body] => Don't forget me this weekend! )
```	
Error Handling Tip: Use the libxml functionality to retrieve all XML errors when loading the document and then iterate over the errors. 

The following example tries to load a broken XML string:

```php
<?php
libxml_use_internal_errors(true);
$myXMLData =
"<?xml version='1.0' encoding='UTF-8'?>
<document>
<user>John Doe</wronguser>
<email>john@example.com</wrongemail>
</document>";

$xml = simplexml_load_string($myXMLData);
if ($xml === false) {
  echo "Failed loading XML: ";
  foreach(libxml_get_errors() as $error) {
    echo "<br>", $error->message;
  }
} else {
  print_r($xml);
}
?>
```

The output of the code above will be:

```php
Failed loading XML:
Opening and ending tag mismatch: user line 3 and wronguser
Opening and ending tag mismatch: email line 4 and wrongemail
```

#### Read From File
The PHP simplexml_load_file() function is used to read XML data from a file.

Assume we have an XML file called "note.xml".

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
```
The example below shows how to use the simplexml_load_file() function to read XML data from a file.

``` php
<?php
$xml=simplexml_load_file("note.xml") or die("Error: Cannot create object");
print_r($xml);
?>
```

The output of the code above will be:
```
SimpleXMLElement Object ( [to] => Tove [from] => Jani [heading] => Reminder [body] => Don't forget me this weekend! )
```

#### Get Node Values
Get the node values from the "note.xml" file.

``` php
<?php
$xml=simplexml_load_file("note.xml") or die("Error: Cannot create object");
echo $xml->to . "<br>";
echo $xml->from . "<br>";
echo $xml->heading . "<br>";
echo $xml->body;
?>
```

The output of the code above will be:
```
Tove
Jani
Reminder
Don't forget me this weekend!
```

#### Get Node Values of Specific Elements

Assume we have an XML file called "books.xml", that looks like this: 

``` xml
<?xml version="1.0" encoding="utf-8"?>
<bookstore>
  <book category="COOKING">
    <title lang="en">Everyday Italian</title>
    <author>Giada De Laurentiis</author>
    <year>2005</year>
    <price>30.00</price>
  </book>
  <book category="CHILDREN">
    <title lang="en">Harry Potter</title>
    <author>J K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
  <book category="WEB">
    <title lang="en-us">XQuery Kick Start</title>
    <author>James McGovern</author>
    <year>2003</year>
    <price>49.99</price>
  </book>
  <book category="WEB">
    <title lang="en-us">Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
</bookstore>
```

``` php
<?php
$xml=simplexml_load_file("books.xml") or die("Error: Cannot create object");
echo $xml->book[0]->title . "<br>";
echo $xml->book[1]->title;
?>
```
The output of the code above will be:

```php
Everyday Italian
Harry Potter
```

#### Get Node Values - Loop
The following example loops through all the book elements in the "books.xml" file, and gets the node values of the title, author, year, and price elements.

``` php
<?php
$xml=simplexml_load_file("books.xml") or die("Error: Cannot create object");
foreach($xml->children() as $books) {
  echo $books->title . ", ";
  echo $books->author . ", ";
  echo $books->year . ", ";
  echo $books->price . "<br>";
}
?>
```
The output of the code above will be:

```php
Everyday Italian, Giada De Laurentiis, 2005, 30.00
Harry Potter, J K. Rowling, 2005, 29.99
XQuery Kick Start, James McGovern, 2003, 49.99
Learning XML, Erik T. Ray, 2003, 39.95
```

#### Get Attribute Values
The following example gets the attribute value of the "category" attribute of the first book element and the attribute value of the "lang" attribute of the title element in the second book element.

``` php
<?php
$xml=simplexml_load_file("books.xml") or die("Error: Cannot create object");
echo $xml->book[0]['category'] . "<br>";
echo $xml->book[1]->title['lang'];
?>
```
The output of the code above will be:

```php
COOKING
en
```

#### Get Attribute Values - Loop
The following example gets the attribute values of the title elements in the "books.xml" file.

``` php
<?php
$xml=simplexml_load_file("books.xml") or die("Error: Cannot create object");
foreach($xml->children() as $books) {
  echo $books->title['lang'];
  echo "<br>";
}
?>
```
The output of the code above will be:

```php
en
en
en-us
en-us
```

### XML DOM Parser

The DOM parser is a tree-based parser.

Look at the following XML document fraction:

```	xml
<?xml version="1.0" encoding="UTF-8"?>
<from>Jani</from>
```	

The DOM sees the XML above as a tree structure:

+ Level 1: XML Document
+ Level 2: Root element: <from>
+ Level 3: Text element: "Jani"

The XML file below ("note.xml") will be used in our example:

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>
```

#### Load and Output XML
We want to initialize the XML parser, load the xml, and output it:

``` php
<?php
$xmlDoc = new DOMDocument();
$xmlDoc->load("note.xml");

print $xmlDoc->saveXML();
?>
```

The output of the code above will be:
```	
Tove Jani Reminder Don't forget me this weekend!
```
If you select "View source" in the browser window, you will see the following HTML:

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>
```


The example above creates a DOMDocument-Object and loads the XML from "note.xml" into it.

Then the saveXML() function puts the internal XML document into a string, so we can output it.

#### Looping through XML
We want to initialize the XML parser, load the XML, and loop through all elements of the <note> element:

``` php
<?php
$xmlDoc = new DOMDocument();
$xmlDoc->load("note.xml");

$x = $xmlDoc->documentElement;
foreach ($x->childNodes AS $item) {
  print $item->nodeName . " = " . $item->nodeValue . "<br>";
}
?>
```

The output of the code above will be:

```
#text =
to = Tove
#text =
from = Jani
#text =
heading = Reminder
#text =
body = Don't forget me this weekend!
#text =
```

In the example above you see that there are empty text nodes between each element.

When XML generates, it often contains white-spaces between the nodes. The XML DOM parser treats these as ordinary elements, and if you are not aware of them, they sometimes cause problems.

## Event-Based Parsers

Event-based parsers do not hold the entire document in Memory, instead, they read in one node at a time and allow you to interact with in real time. Once you move onto the next node, the old one is thrown away.

This type of parser is well suited for large XML documents. It parses faster and consumes less memory.

Example of event-based parsers:

+ XMLReader
+ [XML Expat Parser](#xml-expat-parser)

### XML Expat Parser
The Expat parser is an event-based parser.

Look at the following XML fraction:
```	xml
<from>Jani</from>
```	
An event-based parser reports the XML above as a series of three events:

+ Start element: from
+ Start CDATA section, value: Jani
+ Close element: from

The XML Expat Parser functions are part of the PHP core. There is no installation needed to use these functions.

The XML file "note.xml" will be used in the example below:

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>
```

#### Initializing the XML Expat Parser
We want to initialize the XML Expat Parser in PHP, define some handlers for different XML events, and then parse the XML file.

``` php
<?php
// Initialize the XML parser
$parser=xml_parser_create();

// Function to use at the start of an element
function start($parser,$element_name,$element_attrs) {
  switch($element_name) {
    case "NOTE":
    echo "-- Note --<br>";
    break;
    case "TO":
    echo "To: ";
    break;
    case "FROM":
    echo "From: ";
    break;
    case "HEADING":
    echo "Heading: ";
    break;
    case "BODY":
    echo "Message: ";
  }
}

// Function to use at the end of an element
function stop($parser,$element_name) {
  echo "<br>";
}

// Function to use when finding character data
function char($parser,$data) {
  echo $data;
}

// Specify element handler
xml_set_element_handler($parser,"start","stop");

// Specify data handler
xml_set_character_data_handler($parser,"char");

// Open XML file
$fp=fopen("note.xml","r");

// Read data
while ($data=fread($fp,4096)) {
  xml_parse($parser,$data,feof($fp)) or
  die (sprintf("XML Error: %s at line %d",
  xml_error_string(xml_get_error_code($parser)),
  xml_get_current_line_number($parser)));
}

// Free the XML parser
xml_parser_free($parser);
?>
```

