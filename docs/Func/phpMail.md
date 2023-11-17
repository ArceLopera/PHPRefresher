The mail() function allows you to send emails directly from a script.

The behavior of the mail functions is affected by settings in php.ini:

|Name	|Default	|Description|	Changeable|
|--------|--------|-----------|-----------|
|mail.add_x_header|	"0"	|Add X-PHP-Originating-Script that will include UID of the script followed by the filename. For PHP 5.3.0 and above	|PHP_INI_PERDIR|
|mail.log	|NULL	|The path to a log file that will log all mail() calls. Log  include full path of script, line number, To address and headers. For PHP 5.3.0 and above	|PHP_INI_PERDIR|
|SMTP	|"localhost"	|Windows only: The DNS name or IP address of the SMTP server	|PHP_INI_ALL|
|smtp_port|	"25"	|Windows only: The SMTP port number. For PHP 4.3.0 and above	|PHP_INI_ALL|
|sendmail_from	|NULL|	Windows only: Specifies the "from" address to be used when sending mail from mail()	|PHP_INI_ALL|
|sendmail_path|	"/usr/sbin/sendmail -t -i"|	Specifies where the sendmail program can be found. This directive works also under Windows. If set, SMTP, smtp_port and sendmail_from are ignored	|PHP_INI_SYSTEM|


## Mail Functions
|Function|	Description|
|--------|-----------|
|[ezmlm_hash()](#ezmlm_hash)|	Calculates the hash value needed by EZMLM|
|[mail()](#mail)|	Allows you to send emails directly from a script|

### ezmlm_hash()

Calculate the hash value for an email address.
The ezmlm_hash() function calculates the hash value needed when keeping EZMLM mailing lists in a MySQL database.

This function accepts an email address, for which it calculates an integer hash value. This value is compatible with the EZMLM mailing list manager, and can then be used with the EZMLM database for user management.


```php
<?php
$user = "someone@example.com";
$hash = ezmlm_hash($user);

echo "The hash value for $user is: $hash.";
?>
```	

### mail()

Allows you to send emails directly from a script.


```php
// Send an email:
<?php
// the message
$msg = "First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("someone@example.com","My subject",$msg);
?>
```

|Parameter|	Description|
|---|-----------|
|to	|Required. Specifies the receiver / receivers of the email|
|subject|Required. Specifies the subject of the email. Note: This parameter cannot contain any newline characters|
|message	|Required. Defines the message to be sent. Each line should be separated with a LF (\n). Lines should not exceed 70 characters. Windows note: If a full stop is found on the beginning of a line in the message, it might be removed. To solve this problem, replace the full stop with a double dot:
|headers	|Optional. Specifies additional headers, like From, Cc, and Bcc. The additional headers should be separated with a CRLF (\r\n). Note: When sending an email, it must contain a From header. This can be set with this parameter or in the php.ini file.|
|parameters|	Optional. Specifies an additional parameter to the sendmail program (the one defined in the sendmail_path configuration setting). (i.e. this can be used to set the envelope sender address when using sendmail with the -f sendmail option)|

``` php
// Send an email with extra headers:

<?php
$to = "somebody@example.com";
$subject = "My subject";
$txt = "Hello world!";
$headers = "From: webmaster@example.com" . "\r\n" .
"CC: somebodyelse@example.com";

mail($to,$subject,$txt,$headers);
?>
```

``` php
Send an HTML email:

<?php
$to = "somebody@example.com, somebodyelse@example.com";
$subject = "HTML email";

$message = "
<html>
<head>
<title>HTML email</title>
</head>
<body>
<p>This email contains HTML Tags!</p>
<table>
<tr>
<th>Firstname</th>
<th>Lastname</th>
</tr>
<tr>
<td>John</td>
<td>Doe</td>
</tr>
</table>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <webmaster@example.com>' . "\r\n";
$headers .= 'Cc: myboss@example.com' . "\r\n";

mail($to,$subject,$message,$headers);
?>
```