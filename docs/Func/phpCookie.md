A cookie is often used to identify a user. A cookie is a small file that the server embeds on the user's computer. Each time the same computer requests a page with a browser, it will send the cookie too. With PHP, you can both create and retrieve cookie values.

HTTP requests aren’t “stateful”; each request isn’t connected to a previous one. A cookie, however, can link different requests by the same user. This makes it easier to build features such as shopping carts or to keep track of a user’s search history.

## setcookie()

When you want to set a cookie so that your website can recognize subsequent requests from the same web browser. Call setcookie() with a cookie name and value:

``` php
setcookie($name, $value = "", $expire = "", $path = "", $domain = "", $secure = "", $httponly = "");
```

Only the name parameter is required. All other parameters are optional. Cookies are sent with the HTTP headers, so if you’re not using output buffering, set cookie() must be called before any output is generated. . The third argument to setcookie() is an expiration time, expressed as an epoch timestamp. For example, this cookie expires at noon GMT on December 3, 2014:

``` php
setcookie('flavor','chocolate chip',1417608000);
```

If the third argument to setcookie() is missing (or empty), the cookie expires when the browser is closed. Also, many systems can’t handle a cookie expiration time greater than 2147483647, because that’s the largest epoch timestamp that fits in a 32-bit integer.

The fourth argument to setcookie() is a path. The cookie is sent back to the server only when pages whose path begin with the specified string are requested. For example, a cookie sent back only to pages whose path begins with /products/:

``` php
setcookie('flavor','chocolate chip',1417608000,'/products/');
```	

The page that’s setting the cookie doesn’t have to have a URL whose path component begins with /products/, but the cookie is sent back only to pages that do.

The fifth argument to setcookie() is a domain. The cookie is sent back to the server only when pages whose hostname ends with the specified domain are requested. Here the first cookie is sent back to all hosts in the example.com domain, but the second cookie is sent only with requests to the host carlos.example.com:

``` php
setcookie('flavor','chocolate chip',1417608000,'/products/','example.com');
setcookie('flavor','chocolate chip',1417608000,'/products/','carlos.example.com');
```

If the first cookie’s domain was just example.com instead of .example.com, it would be sent only to the single host example.com (and not www.example.com or carlos.example.com). If a domain is not specified when setcookie() is called, the browser sends back the cookie only with requests to the same hostname as the request in which the cookie was set.

The last optional argument to setcookie() is a flag that, if set to true, instructs the browser only to send the cookie over an SSL connection. This can be useful if the cookie contains sensitive information, but remember that the data in the cookie is stored as unencrypted plain text on the user’s computer.

Different browsers handle cookies in slightly different ways, especially with regard to how strictly they match path and domain strings and how they determine priority between different cookies of the same name.

## Create/Retrieve a Cookie
The following example creates a cookie named "user" with the value "John Doe". The cookie will expire after 30 days (86400 * 30). The "/" means that the cookie is available in entire website (otherwise, select the directory you prefer).

We then retrieve the value of the cookie "user" (using the global variable $_COOKIE). We also use the isset() function to find out if the cookie is set:

```php
<?php
$cookie_name = "user";
$cookie_value = "John Doe";
setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
?>
<html>
<body>

<?php
if(!isset($_COOKIE[$cookie_name])) {
  echo "Cookie named '" . $cookie_name . "' is not set!";
} else {
  echo "Cookie '" . $cookie_name . "' is set!<br>";
  echo "Value is: " . $_COOKIE[$cookie_name];
}
?>

</body>
</html>
```

The setcookie() function must appear BEFORE the html tag.

The value of the cookie is automatically URLencoded when sending the cookie, and automatically decoded when received (to prevent URLencoding, use setrawcookie() instead).

A cookie’s value isn’t available in $_COOKIE during the request in which the cookie is set.
In other words, calling the setcookie() function doesn’t alter the value of $_COOKIE. On subsequent requests, however, each cookie sent back to the server is stored in $_COOKIE.

When a browser sends a cookie back to the server, it sends only the value. You can’t access the cookie’s domain, path, expiration time, or secure status through $_COOKIE because the browser doesn’t send that to the server.

To print the names and values of all cookies sent in a particular request, loop through the $_COOKIE array:

```php
<?php
foreach ($_COOKIE as $cookie_name => $cookie_value) {
 print "$cookie_name = $cookie_value <br/>";
}
?>
```

## Modify a Cookie Value
To modify a cookie, just set (again) the cookie using the setcookie() function:

```php
<?php
$cookie_name = "user";
$cookie_value = "Alex Porter";
setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
?>
<html>
<body>

<?php
if(!isset($_COOKIE[$cookie_name])) {
  echo "Cookie named '" . $cookie_name . "' is not set!";
} else {
  echo "Cookie '" . $cookie_name . "' is set!<br>";
  echo "Value is: " . $_COOKIE[$cookie_name];
}
?>

</body>
</html>
```

## Delete a Cookie

When you want to delete a cookie so a browser doesn’t send it back to the server. For example, you’re using cookies to track whether a user is logged in to your website, and a user logs out.

To delete a cookie, use the setcookie() function with an expiration date in the past:

```php
<?php
// set the expiration date to one hour ago
setcookie("user", "", time() - 3600);
?>
<html>
<body>

<?php
echo "Cookie 'user' is deleted.";
?>

</body>
</html>
```



## Check if Cookies are Enabled
The following example creates a small script that checks whether cookies are enabled. First, try to create a test cookie with the setcookie() function, then count the $_COOKIE array variable:

```php
<?php
setcookie("test_cookie", "test", time() + 3600, '/');
?>
<html>
<body>

<?php
if(count($_COOKIE) > 0) {
  echo "Cookies are enabled.";
} else {
  echo "Cookies are disabled.";
}
?>

</body>
</html>
```

## Using Cookie Authentication

When you want more control over the user login procedure, such as presenting your own login form.

Store authentication status in a cookie or as part of a session. When a user logs in successfully, put her username (or another unique value) in a cookie. Also include a hash of the username and a secret word so a user can’t just make up an authentication cookie with a username in it:

```php
<?php
$secret_word = 'if i ate spinach';
if (validate($_POST['username'],$_POST['password'])) {
 setcookie('login',
 $_POST['username'].','.md5($_POST['username'].$secret_word));
}
?>

```
