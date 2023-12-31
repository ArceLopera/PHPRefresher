Validating data = Determine if the data is in proper form.

Sanitizing data = Remove any illegal character from the data.

PHP filters are used to validate and sanitize external input.

The PHP filter extension has many of the functions needed for checking user input, and is designed to make data validation easier and quicker.

The filter_list() function can be used to list what the PHP filter extension offers:

``` php
<table>
  <tr>
    <td>Filter Name</td>
    <td>Filter ID</td>
  </tr>
  <?php
  foreach (filter_list() as $id =>$filter) {
    echo '<tr><td>' . $filter . '</td><td>' . filter_id($filter) . '</td></tr>';
  }
  ?>
</table>
```


|Filter Name	|Filter ID|
|------------	|------------|
|int	|257|
|boolean	|258|
|float	|259|
|validate_regexp	|272|
|validate_domain	|277|
|validate_url	|273|
|validate_email	|274|
|validate_ip	|275|
|validate_mac	|276|
|string	|513|
|stripped	|513|
|encoded	|514|
|special_chars	|515|
|full_special_chars	|522|
|unsafe_raw	|516|
|email	|517|
|url	|518|
|number_int	|519|
|number_float	|520|
|magic_quotes	|521|
|callback	|1024|

## Why Use Filters?
Many web applications receive external input. External input/data can be:

+ User input from a form
+ Cookies
+ Web services data
+ Server variables
+ Database query results

Invalid submitted data can lead to security problems and break your webpage!
By using PHP filters you can be sure your application gets the correct input!

## filter_var()
The filter_var() function both validate and sanitize data.

The filter_var() function filters a single variable with a specified filter. It takes two pieces of data:

+ The variable you want to check
+ The type of check to use

### Sanitize a String
The following example uses the filter_var() function to remove all HTML tags from a string:
```php
<?php
$input = "<b>Hello!</b>";
$output = filter_var($input, FILTER_SANITIZE_STRING);
echo $output;
?>
```

### Validate an Integer
The following example uses the filter_var() function to check if the variable $int is an integer. If $int is an integer, the output of the code below will be: "Integer is valid". If $int is not an integer, the output will be: "Integer is not valid":
```php
<?php
$int = 100;

if (!filter_var($int, FILTER_VALIDATE_INT) === false) {
  echo("Integer is valid");
} else {
  echo("Integer is not valid");
}
?>
```

filter_var() and Problem With 0
In the example above, if $int was set to 0, the function above will return "Integer is not valid". To solve this problem, use the code below:

```php
<?php
$int = 0;

if (filter_var($int, FILTER_VALIDATE_INT) === 0 || !filter_var($int, FILTER_VALIDATE_INT) === false) {
  echo("Integer is valid");
} else {
  echo("Integer is not valid");
}
?>
```

### Validate an IP Address
The following example uses the filter_var() function to check if the variable $ip is a valid IP address:
```php
<?php
$ip = "127.0.0.1";

if (!filter_var($ip, FILTER_VALIDATE_IP) === false) {
  echo("$ip is a valid IP address");
} else {
  echo("$ip is not a valid IP address");
}
?>
```

### Sanitize and Validate an Email Address
The following example uses the filter_var() function to first remove all illegal characters from the $email variable, then check if it is a valid email address:

```php	
<?php
$email = "john.doe@example.com";

// Remove all illegal characters from email
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

// Validate e-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
  echo("$email is a valid email address");
} else {
  echo("$email is not a valid email address");
}
?>
```

### Sanitize and Validate a URL
The following example uses the filter_var() function to first remove all illegal characters from a URL, then check if $url is a valid URL:

```php
<?php
$url = "https://www.example.com";
// Remove all illegal characters from a url
$url = filter_var($url, FILTER_SANITIZE_URL);

// Validate url
if (!filter_var($url, FILTER_VALIDATE_URL) === false) {
  echo("$url is a valid URL");
} else {
  echo("$url is not a valid URL");
}
?>
```
### Validate an Integer Within a Range
The following example uses the filter_var() function to check if a variable is both of type INT, and between 1 and 200:
```php
<?php
$int = 122;
$min = 1;
$max = 200;

if (filter_var($int, FILTER_VALIDATE_INT, array("options" => array("min_range"=>$min, "max_range"=>$max))) === false) {
  echo("Variable value is not within the legal range");
} else {
  echo("Variable value is within the legal range");
}
?>
```

### Validate IPv6 Address
The following example uses the filter_var() function to check if the variable $ip is a valid IPv6 address:

```php
<?php
$ip = "2001:0db8:85a3:08d3:1319:8a2e:0370:7334";

if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) === false) {
  echo("$ip is a valid IPv6 address");
} else {
  echo("$ip is not a valid IPv6 address");
}
?>
```

### Validate URL - Must Contain QueryString
The following example uses the filter_var() function to check if the variable $url is a URL with a querystring:

```php
<?php
$url = "https://www.example.com?name=Alex";

if (!filter_var($url, FILTER_VALIDATE_URL, FILTER_FLAG_QUERY_REQUIRED) === false) {
  echo("$url is a valid URL with a query string");
} else {
  echo("$url is not a valid URL with a query string");
}
?>
```

### Remove Characters With ASCII Value > 127
The following example uses the filter_var() function to sanitize a string. It will both remove all HTML tags, and all characters with ASCII value > 127, from the string:

```php
<?php
$str = "<h1>Hello WorldÆØÅ!</h1>";

$newstr = filter_var($str, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
echo $newstr;
?>
```

