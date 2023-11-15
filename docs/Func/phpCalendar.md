The calendar extension contains functions that simplifies converting between different calendar formats.

It is based on the Julian Day Count, which is a count of days starting from January 1st, 4713 B.C.

Note: To convert between calendar formats, you must first convert to Julian Day Count, then to the calendar of your choice.

Note: The Julian Day Count is not the same as the Julian Calendar!

## PHP Calendar Functions

|Function|	Description|
|--------|------------|
|cal_days_in_month()	|Returns the number of days in a month for a specified year and calendar|
| cal_from_jd()	|Converts a Julian Day Count into a date of a specified calendar|
| cal_info()	|Returns information about a specified calendar|
| cal_to_jd()	|Converts a date in a specified calendar to Julian Day Count|
| easter_date()	|Returns the Unix timestamp for midnight on Easter of a specified year|
| easter_days()	|Returns the number of days after March 21, that the Easter Day is in a specified year|
| frenchtojd()	|Converts a French Republican date to a Julian Day Count|
| gregoriantojd()	|Converts a Gregorian date to a Julian Day Count|
| jddayofweek()	|Returns the day of the week|
| jdmonthname()	|Returns a month name|
| jdtofrench()	|Converts a Julian Day Count to a French Republican date|
| jdtogregorian()	|Converts a Julian Day Count to a Gregorian date|
| jdtojewish()	|Converts a Julian Day Count to a Jewish date|
| jdtojulian()	|Converts a Julian Day Count to a Julian date|
| jdtounix()	|Converts Julian Day Count to Unix timestamp|
| jewishtojd()	|Converts a Jewish date to a Julian Day Count|
| juliantojd()	|Converts a Julian date to a Julian Day Count|
| unixtojd()	|Converts Unix timestamp to Julian Day Count|

## PHP Predefined Calendar Constants
|Constant	|Type	|PHP Version|
|--------|--------|-----------|
|CAL_GREGORIAN	|Integer|	PHP 4|
|CAL_JULIAN	|Integer|	PHP 4|
|CAL_JEWISH	|Integer|	PHP 4|
|CAL_FRENCH	|Integer|	PHP 4|
|CAL_NUM_CALS	|Integer|	PHP 4|
|CAL_DOW_DAYNO	|Integer|	PHP 4|
|CAL_DOW_SHORT	|Integer|	PHP 4|
|CAL_DOW_LONG	|Integer|	PHP 4|
|CAL_MONTH_GREGORIAN_SHORT	|Integer|	PHP 4|
|CAL_MONTH_GREGORIAN_LONG	|Integer|	PHP 4|
|CAL_MONTH_JULIAN_SHORT	|Integer|	PHP 4|
|CAL_MONTH_JULIAN_LONG	|Integer|	PHP 4|
|CAL_MONTH_JEWISH	|Integer|	PHP 4|
|CAL_MONTH_FRENCH	|Integer|	PHP 4|
|CAL_EASTER_DEFAULT	|Integer|	PHP 4.3|
|CAL_EASTER_ROMAN	|Integer|	PHP 4.3|
|CAL_EASTER_ALWAYS_GREGORIAN	|Integer|	PHP 4.3|
|CAL_EASTER_ALWAYS_JULIAN	|Integer|	PHP 4.3|
|CAL_JEWISH_ADD_ALAFIM_GERESH	|Integer|	PHP 5.0|
|CAL_JEWISH_ADD_ALAFIM	|Integer|	PHP 5.0|
|CAL_JEWISH_ADD_GERESHAYIM	|Integer|	PHP 5.0|