The PHP date() function is used to format a date and/or a time.

The function date() (and the DateTime object) can produce a variety of formatted time and date strings.

## Date() Function
The PHP date() function formats a timestamp to a more readable date and time.

date(format,timestamp)

|Parameter|	Description|
|---------|-----------|
|format	|Required. Specifies the format of the timestamp|
|timestamp|	Optional. Specifies a timestamp. Default is the current date and time. A timestamp is a sequence of characters, denoting the date and/or time at which a certain event occurred.|

### Get a Date
The required format parameter of the date() function specifies how to format the date (or time).

Here are some characters that are commonly used for dates:

+ d - Represents the day of the month (01 to 31)
+ m - Represents a month (01 to 12)
+ Y - Represents a year (in four digits)
+ l (lowercase 'L') - Represents the day of the week

Other characters, like"/", ".", or "-" can also be inserted between the characters to add additional formatting.

```php
<?php
echo "Today is " . date("Y/m/d") . "<br>";
echo "Today is " . date("Y.m.d") . "<br>";
echo "Today is " . date("Y-m-d") . "<br>";
echo "Today is " . date("l");

&copy; 2010-<?php echo date("Y");?> #Automatic Copyright Year
?>
```

### Get a Time
Here are some characters that are commonly used for times:

+ H - 24-hour format of an hour (00 to 23)
+ h - 12-hour format of an hour with leading zeros (01 to 12)
+ i - Minutes with leading zeros (00 to 59)
+ s - Seconds with leading zeros (00 to 59)
+ a - Lowercase Ante meridiem and Post meridiem (am or pm)

```php
<?php
echo "The time is " . date("h:i:sa");
?>
```

PHP date() function will return the current date/time of the server.

### Get Your Time Zone
If the time you got back from the code is not correct, it's probably because your server is in another country or set up for a different timezone.

So, if you need the time to be correct according to a specific location, you can set the timezone you want to use.
```php
<?php
date_default_timezone_set('America/New_York');
echo "The time is " . date("h:i:sa");
?>
```	

## DateTime Object
The DateTime object can be used to format a date and/or a time.

```php
<?php
$d = new DateTime();
echo $d->format('Y-m-d H:i:s');
?>
```

Use getdate() or localtime() if you want time parts.

```php
<?php
$now_1 = getdate();
$now_2 = localtime();
print "{$now_1['hours']}:{$now_1['minutes']}:{$now_1['seconds']}\n";
print "$now_2[2]:$now_2[1]:$now_2[0]";
?>
```

```
18:23:45
18:23:45

```

Use DateTime::createFromFormat() if you want date parts.

```php
<?php
// 7:45:03 PM on March 10, 1975, in a particular timezone
$then = DateTime::createFromFormat(DateTime::ATOM, "1975-03-10T19:45:03-04:00");

?>
```

The createFromFormat() method of the DateTime class behaves more flexibly. Instead of accepting already-chopped-up time parts, you give it a formatted time or date string and tell it the structure of that string. It then decomposes the parts properly and calculates the correct timestamp. In addition to the format strings listed in Recipe 3.4 that the date() function understands, createFromFormat() also uses the characters listed below.

|Character| Meaning|
|---------|--------|
|space or tab||
|# |Any one of the separation bytes ;, :, /, ., ,, -, (, )|
|;, :, /, ., ,, -, (, ) |Literal character|
|? |Any byte (not a character, just one byte)|
|* |Any number of bytes until the next digit or separation character|
|! |Resetall fieldsto“startof Unixepoch”values(without this,anyunspecifiedfieldswillbeset tothecurrent
date/time)|
|\| |Reset any unparsed fields to “start of Unix epoch” values|
|+ |Treat unparsed trailing data as a warning rather than an error|

```php
<?php
$text = "Birthday: May 11, 1918.";
$when = DateTime::createFromFormat("*: F j, Y.|", $text);
// $formatted is "Saturday, 11-May-18 00:00:00 UTC"
$formatted = $when->format(DateTime::RFC850);

?>
```


```php
<?php
$when = new DateTime("@163727100");
$when->setTimezone(new DateTimeZone('America/Los_Angeles'));
$parts = explode('/', $when->format('Y/m/d/H/i/s'));
// Year, month, day, hour, minute, second
// $parts is array('1975', '03','10', '16','45', '00'))

?>
```
The @ character tells DateTime that the rest of the argument to the constructor is an epoch timestamp. When specifying a timestamp as the initial value, DateTime ignores any time zone also passed to the constructor, so setting that requires an additional call to setTimezone(). Once that’s done, format() can generate any parts you need.



## getdate()
Both localtime() and getdate() return arrays whose elements are the different pieces of the specified date and time. The associative array getdate() returns the key/value pairs listed below.



|Key| Value|
|---|---|
|seconds |Seconds|
|minutes| Minutes|
|hours |Hours|
|mday |Day of the month|
|wday |Day of the week, numeric (Sunday is 0, Saturday is 6)|
|mon |Month, numeric|
|year |Year, numeric (4 digits)|
|yday |Day of the year, numeric (e.g., 299)|
|weekday |Day of the week, textual, full (e.g., “Friday”)|
|month |Month, textual, full (e.g., “January”)|
|0 |Seconds since epoch (what time() returns)|


```php
<?php
//Finding the month, day, and year
$a = getdate();
printf('%s %d, %d',$a['month'],$a['mday'],$a['year']);
?>
```
```
January 10, 2023
```

## localtime()

The function localtime() also returns an array of time and date parts. It also takes an epoch timestamp as an optional first argument, as well as a boolean as an optional second argument. If that second argument is true, localtime() returns an associative array instead of a numerically indexed array. The keys of that array are the same as the members of the tm_struct structure that the C function localtime() returns, as shown below.

|Numeric position |Key Value|
|---|---|
|0| tm_sec Second|
|1| tm_min Minutes|
|2| tm_hour Hour|
|3| tm_mday Day of the month|
|4| tm_mon Month of the year (January is 0)|
|5| tm_year Years since 1900|
|6| tm_wday Day of the week (Sunday is 0)|
|7| tm_yday Day of the year|
|8| tm_isdst Is daylight saving time in effect?|

```php	
<?php
$a = localtime();
$a[4] += 1;
$a[5] += 1900;
print "$a[4]/$a[3]/$a[5]";
?>
```
```
1/10/2023
```

The month is incremented by 1 before printing because localtime() starts counting months with 0 for January, but we want to display 1 if the current month is January. Similarly, the year is incremented by 1900 because localtime() starts counting years with 0 for 1900.

The functions getdate() and localtime() both use the same internal implementation to generate the returned date and time parts. They differ only in the format of the returned arrays and in some of the information they return. (For example, local time() includes whether DST is in effect at the specified time.)




## mktime()
The optional timestamp parameter in the date() function specifies a timestamp. If omitted, the current date and time will be used (as in the examples above).

The PHP mktime() function returns the Unix timestamp for a date. The Unix timestamp contains the number of seconds between the Unix Epoch (January 1 1970 00:00:00 GMT) and the time specified.

Use mktime() if your time and date parts are in the local time zone.

Syntax
```php	
mktime(hour, minute, second, month, day, year)
```


```php
<?php
$d=mktime(11, 14, 54, 8, 12, 2014);
echo "Created date is " . date("Y-m-d h:i:sa", $d);
?>
```

The functions mktime() and gmmktime() each take a date and time’s parts (hour, minute, second, month, day, year) and return the appropriate Unix epoch timestamp. The components are treated as local time by mktime(), while gmmktime() treats them as a date and time in UTC.


## gmktime()

Use gmmktime() if your time and date parts are in the GMT time zone.

```php
<?php
// 7:45:03 PM on March 10, 1975, in GMT
$then = gmmktime(19,45,3,3,10,1975);

?>
```

## Create a Date From a String With strtotime()
The PHP strtotime() function is used to convert a human readable date string into a Unix timestamp (the number of seconds since January 1 1970 00:00:00 GMT).

Syntax
```php	
strtotime(time, now)
```
```php
<?php
$d=strtotime("10:30pm April 15 2014");
echo "Created date is " . date("Y-m-d h:i:sa", $d);
?>
```

``` php
<?php
$d=strtotime("tomorrow");
echo date("Y-m-d h:i:sa", $d) . "<br>";

$d=strtotime("next Saturday");
echo date("Y-m-d h:i:sa", $d) . "<br>";

$d=strtotime("+3 Months");
echo date("Y-m-d h:i:sa", $d) . "<br>";
?>
```

``` php
<?php
$d=strtotime("last Sunday");
echo date("Y-m-d h:i:sa", $d) . "<br>";

$startdate = strtotime("Saturday");
$enddate = strtotime("+6 weeks", $startdate);

while ($startdate < $enddate) {
  echo date("M d", $startdate) . "<br>";
  $startdate = strtotime("+1 week", $startdate);
}
?>
```

``` php	
<?php
$d1=strtotime("July 04");
$d2=ceil(($d1-time())/60/60/24);
echo "There are " . $d2 ." days until 4th of July.";
?>
```

## Printing a Date or Time in a Specified Format

Both date() and DateTime::format() use the same code internally for generating formatted time and date strings. They are flexible functions that can produce a formatted time string with a variety of components. The format characters for these functions are listed below.

|Type |Character |Description |Range or examples|
|-----|----------|-------------|-----------------|
|Hour| H| Hour, numeric, 24-hour clock, leading zero| 00–23|
|Hour| h| Hour, numeric, 12-hour clock, leading zero| 01–12|
|Hour| G| Hour, numeric, 24-hour clock| 0–23|
|Hour| g| Hour, numeric, 12-hour clock| 1–12|
|Hour| A| Ante/Post Meridiem designation| AM, PM|
|Hour| a| Ante/Post Meridiem designation| am, pm|
|Minute| i| Minute, numeric| 00–59|
|Second| s| Second, numeric| 00–59|
|Second| u| Microseconds, string| 000000–999999|
|Day| d| Day of the month, numeric, leading zero| 01–31|
|Day| j| Day of the month, numeric| 1–31|
|Day| z| Day of the year, numeric| 0–365|
|Day| N| Day of the week, numeric (Monday is 1)| 1–7|
|Day| w| Day of the week, numeric (Sunday is 0)| 0–6|
|Day| S| Englishordinalsuffixfordayofthemonth,textual| “st,” “th,” “nd,” “rd”|
|Week| D| Abbreviated weekday name| Mon, Tue, Wed, Thu, Fri, Sat, Sun|
|Week| l| Full weekday name| Monday, Tuesday, Wednesday Thursday, Friday, Saturday, Sunday|
|Week| W| ISO8601:1988 week number in the year,numeric, week 1 is the first week that has at least 4 days in the current year, Monday is the first day of the week |1–53|
|Month| F| Full month name |January–December|
|Month| M| Abbreviated month name |Jan–Dec|
|Month| m| Month, numeric, leading zero |01–12|
|Month| n| Month, numeric |1–12|
|Month| t| Month length in days, numeric |28, 29, 30, 31|
|Year| Y| Year, numeric, including century |e.g., 2016|
|Year| y| Year without century, numeric |e.g., 16|
|Year| o| ISO 8601 year with century; numeric; the fourdigityearcorrespondingtotheISOweek number; sameas Y exceptiftheISOweek number belongs to the previous or next year, that year is used instead |e.g. 2016|
|Year| L| Leap year flag (yes is 1) |0, 1|
|Time zone| O| Hour offset from GMT, ±HHMM (e.g., −0400, +0230)|−1200–+1200|
|Time zone| P| Like O, but with a colon −12:00 |–+12:00|
|Time zone| Z| Seconds offset from GMT; west of GMT is negative, east of GMT is positive |-43200–50400|
|Time zone| e| Time zone identifier |e.g., America/New_York|
|Time zone| T| Time zone abbreviation |e.g., EDT|
|Time zone| I| Daylight saving time flag (yes is 1) |0, 1|
|Compound| c| ISO 8601–formatted date and time |e.g., 2012-09-06T15:29:34+0000|
|Compound| r| RFC 2822–formatted date |e.g., Thu, 22 Aug 2002 16:01:07 +0200|
|Other| U| Seconds since the Unix epoch |0−2147483647|
|Other| B| Swatch Internet time |000–999|

Format characters such as F, M, or D, which generate words, not numbers, produce output
in English.

There are also some handy constants for common date formats that represent the format
string to be passed to date() or DateTime::format(). These constants are listed below.

|Constant |Class constant |Value |Example |Usage|
|---|---|---|---|---|
|DATE_ATOM| DateTime::ATOM| Y-m-d<br>TH:i:sP| 2013-02-22<br>T20:25:31+00:00| Atom Syndication format|
|DATE_ISO8601| DateTime::ISO8601|Y-m-d<br>TH:i:sO| 2013-02-22<br>T20:25:31+0000| ISO 8601 |
|DATE_RFC822| DateTime::RFC822 |D, d M y <br> H:i:s O|Fri, 22 Feb 13 <br>20:25:31 +0000| Email messages |
|DATE_RFC850| DateTime::RFC850 |l, d-M-y <br> H:i:s T|Friday, 22-Feb-13 <br>20:25:31 UTC| Usenet messages|
|DATE_RFC1036| DateTime::RFC1036|D, d M y <br> H:i:s O|Fri, 22 Feb 13 <br>20:25:31 +0000| Usenet messages|
|DATE_RFC1123| DateTime::RFC1123|D, d M Y <br>H:i:s O|Fri, 22 Feb 2013 <br>20:25:31 +0000||
|DATE_RFC2822| DateTime::RFC2822|D, d M Y <br>H:i:s O|Fri, 22 Feb 2013 <br>20:25:31 +0000| E-mail messages |
|DATE_RFC3339| DateTime::RFC3339|Y-m-d<br>TH:i:sP| 2013-02-22<br>T20:25:31+00:00| |
|DATE_RSS| DateTime::RSS| D, d M Y <br>H:i:s O|Fri, 22 Feb 2013 <br>20:25:31 +0000| RSS feeds|
|DATE_W3C| DateTime::W3C| Y-m-d<br>TH:i:sP| 2013-02-22<br>T20:25:31+00:00| |

