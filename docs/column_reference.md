# Custom column reference

## Introduction
It is an internal specification of the custom column required for customizing plug-ins and the like.

- For an overview of custom columns, see Custom Columns(/column).
- See [Function Reference](/func_reference) for an overall overview of the function.


In this reference, the following contents are described for each type of custom column.
- Get value: Return value of getValue for each custom column
- Value set: How to set by setValueStrictly for each custom column


## Return value summary of function getValue
To get the value stored in the data, use the getValue function.

`` `php
use Exceedone \ Exment \ Model \ CustomTable;
use Exceedone \ Exment \ Enums \ ValueType;

// Get the id1 data of the notification table
$ value = CustomTable :: getEloquent ('information')-> getValueModel (1);

$ title = $ value-> getValue ('title'); // Welcome to Exment!
$ priority = $ value-> getValue ('priority'); // 3
$ priority = $ value-> getValue ('priority', ValueType :: TEXT); // Normal
`` ```


To change the format of the value to get, set the format in the second argument of getValue.  
There are four main types of values ​​returned by getValue.

### pureValue
- A value that is as close as possible to the value registered in the database.
- If "ValueType :: PURE_VALUE" is specified in the second argument of getValue, it will be returned in this type.

* Main usage points:
- [Data Export (Normal)](/data_import_export)


### value
- Almost the same result as pureValue. However, some column types return objects.
- If the second argument of getValue is not specified, if it is false, or if "ValueType :: VALUE" is specified, it will be returned in this type.

* Main usage points:
- Internal processing.


### text
- A character string to be output as text (heading) on ​​a screen or file.
- If the second argument of getValue is true, or if "ValueType :: TEXT" is specified, it will be returned in this type.

※Main usage points:
- [Heading display column](/table? Id = Heading display column setting)
- [Data Export (View Format)](/data_import_export)
- [Parameter variable](/params)



### html
- Character strings and tags when outputting as HTML on the screen.
- If "ValueType :: HTML" is specified in the second argument of getValue, it will be returned in this type.

※Main usage points:
- [Data list] (/data_grid)
- [Data details](/data_details)
- [Dashboard](/dashboard)
- In addition, when displaying on the screen


## Overview of how to set with setValueStrictly
If you want to set the column value to the target data, use the function setValueStrictly.


`` `php
use Exceedone \ Exment \ Model \ CustomTable;
use Exceedone \ Exment \ Enums \ ValueType;

////// Create an object for new data in table "foo"
$ value = CustomTable :: getEloquent ('foo')-> getValueModel ();
////// Get id1 data of OR table "foo"
// $ value = CustomTable :: getEloquent ('foo')-> getValueModel (1);

////// A set of values. Array of "custom column name => value"
$ value-> setValueStrictly (['value1' =>'value 1','value2' => 2]);
// Update and save to database
$ value-> save ();
`` ```

At this time, if you do not set an appropriate value in the array of setValueStrictly, a \ Illuminate \ Validation \ ValidationException error (validation error) will occur.  
This section describes the format of the value to be set for each custom column.


## Specification details for each custom column

### text: 1 line text

#### getValue --When getting data

-##### pureValue, value, text, html
1 line text

#### setValueStrictly --When setting values
Set in string format

`` `php
$ value-> setValueStrictly (['text' =>'value 1']);
`` ```



### textarea: Multi-line text

#### getValue --When getting data

##### pureValue, value, text
Multi-line text

##### html
Multi-line text html format. However, only when displaying on the data list screen, if it is 50 characters or more, display up to 50 characters and replace the subsequent characters with "..."


#### setValueStrictly --When setting values
Set in string format. Set a line feed code for line breaks (\ n, \ r, \ r \ n can all be used)

`` `php
$ value-> setValueStrictly (['textarea' => "value 1. \ n value 2. \ n value 3"]);
`` ```

### editor: editor

#### getValue --When getting data

##### pureValue, value, text
Editor

##### html
Editor. However, only when displaying on the data list screen, if it is 50 characters or more, after removing the tag, display up to 50 characters and replace the rest with "..."


#### setValueStrictly --When setting values
Set in string format. Set a line feed code for line breaks (\ n, \ r, \ r \ n can all be used)

`` `php
$ value-> setValueStrictly (['editor' => "value 1. \ n value 2. \ n value 3"]);
`` ```

### email: email address

#### getValue --When getting data

##### pureValue, value, text, html
mail address

#### setValueStrictly --When setting values
Set your email address in string format

`` `php
$ value-> setValueStrictly (['email' =>'foobar@foobar.kajitori.co.jp']);
`` ```


### url: URL

#### getValue --When getting data

##### pureValue, value, text
URL string

#### html
A tag with the link destination set to the URL string

#### setValueStrictly --When setting values
Set URL in string format

`` `php
$ value-> setValueStrictly (['url' =>'https://exment.net']);
`` ```


### integer: integer

#### getValue --When getting data

##### pureValue, value
integer. Does not include commas.

##### text, html
integer. Includes commas if the Numeric Comma String option was enabled.

#### setValueStrictly --When setting values
Set with integer type and integer character string
※Can be set even if commas are included. In that case, the comma is automatically removed when saving to the database.

`` `php
// OK (1)
$ value-> setValueStrictly (['integer' => 1000]);
// OK (2)
$ value-> setValueStrictly (['integer' => '1000']);
// OK (3)
$ value-> setValueStrictly (['integer' => '1,000']);
`` ```


### decimal: decimal

#### getValue --When getting data

##### pureValue, value
Decimal. Does not include commas.

##### text, html
Decimal. Includes commas if the Numeric Comma String option was enabled.

#### setValueStrictly --When setting values
Set with decimal type and decimal character string
※Can be set even if commas are included. In that case, the comma is automatically removed when saving to the database.

`` `php
// OK (1)
$ value-> setValueStrictly (['decimal' => 1000.03]);
// OK (2)
$ value-> setValueStrictly (['decimal' => '1000.03']);
// OK (3)
$ value-> setValueStrictly (['decimal' => '1,000.03']);
`` ```


### currency: currency

#### getValue --When getting data

##### pureValue, value
The amount you entered. Does not include commas and currency units.

##### text, html
The amount you entered. Includes commas if the Numeric Comma String option was enabled. Also include the selected "currency display format".

#### setValueStrictly --When setting values
Set with numeric type and numeric character string
※Can be set even if commas are included. In that case, the comma is automatically removed when saving to the database.
※Currently, it is not possible to set the value including the currency unit. Please remove the currency unit before setting the value.

`` `php
// OK (1)
$ value-> setValueStrictly (['currency' => 1000]);
// OK (2)
$ value-> setValueStrictly (['currency' => '1000']);
// OK (3)
$ value-> setValueStrictly (['currency' => '1,000']);
// NG
$ value-> setValueStrictly (['currency' => '1,000 yen']);
`` ```


### date: date

#### getValue --When getting data

##### pureValue, value
Dates in "yyyy-MM-dd" format. Example: 2020-05-01

##### text, html
Dates in "yyyy-MM-dd" format. However, if a format is specified, it will be returned in that format.

#### setValueStrictly --When setting values
Date string, set with Carbon object.  
※It is recommended to set the date character string in the "yyyy-MM-dd" format. We are performing automatic conversion using Carbon objects, and we are not currently checking the operation of formats other than those shown on the left.

`` `php
// OK (1)
$ value-> setValueStrictly (['date' => '2020-07-22']);
// OK (2)
$ value-> setValueStrictly (['date' => \ Carbon \ Carbon :: now ()]);
`` ```


### time: time

#### getValue --When getting data

##### pureValue, value
Dates in "HH: mm: ss" format. Example: 21:31:00

##### text, html
Dates in "HH: mm: ss" format.

#### setValueStrictly --When setting values
Set by time string
`` `php
// OK (1)
$ value-> setValueStrictly (['time' => '08: 00: 00']);
// OK (2)
$ value-> setValueStrictly (['time' => '08: 00']);
`` ```

### datetime: Date and time

#### getValue --When getting data

##### pureValue
Date in "yyyy-MM-dd HH: mm: ss" format. Example: 2020-05-01 21:31:00

##### value
Carbon type object

##### text, html
Dates in "yyyy-MM-dd HH: mm: ss" format. However, if the format is specified, it will be returned in that format.


#### setValueStrictly --When setting values
Date and time string, set with Carbon object.
※It is recommended to set the date and time character string in the "yyyy-MM-dd HH: ii: ss" format. We are performing automatic conversion using Carbon objects, and we are not currently checking the operation of formats other than those shown on the left.

`` `php
// OK (1)
$ value-> setValueStrictly (['datetime' => '2020-07-22 08:00:00']);
// OK (2)
$ value-> setValueStrictly (['datetime' => \ Carbon \ Carbon :: now ()]);
`` ```

### select: Choices

#### getValue --When getting data

##### pureValue, value, text, html
The selected item.


#### setValueStrictly --When setting values
Set by choice item

`` `php
///// When the option is "Orange"
// OK
$ value-> setValueStrictly (['select' =>'Orange']);
`` ```

### select_valtext: Choices (register values ​​/ headings)

#### getValue --When getting data

##### pureValue, value
The value of the selected item.

##### text, html
Heading for the selected item.

#### setValueStrictly --When setting values
Set by choice value or heading

`` `php
///// When the heading of the option is "Orange" and the value is "val1"
// OK (1)
$ value-> setValueStrictly (['select_valtext' =>'val1']);
// OK (2)
$ value-> setValueStrictly (['select_valtext' =>'Orange']);
`` ```


### select_table: Choices (select from a list of values ​​in other tables)

#### getValue --When getting data

##### pureValue
The id of the selected data.

##### value
CustomValue object with the specified id.

##### text
The character string of [Heading display column](/table?Id=Heading-display-column-setting) set in the CustomValue object with the specified id.

##### html
A tag to open the data of the specified id modally.


#### setValueStrictly --When setting values
Set the id value of the data in the referenced table as an integer type or a character string

`` `php
// OK (1)
$ value-> setValueStrictly (['select_table' => 1]);
// OK (2)
$ value-> setValueStrictly (['select_table' => "3"]);
`` ```

### user: user
Same as select_table.

### organization: organization
Same as select_table.


### yesno: YES / NO

#### getValue --When getting data

##### pureValue, value
0 (if NO is selected) or 1 (if YES is selected).

##### text, html
NO or YES.

#### setValueStrictly --When setting values
Set one of the values ​​0,1, "0", "1", "YES", "NO", "yes", "no", true, false

`` `php
// OK (1)
$ value-> setValueStrictly (['yesno' => 1]);
// OK (2)
$ value-> setValueStrictly (['yesno' => "0"]);
// OK (3)
$ value-> setValueStrictly (['yesno' => "YES"]);
// OK (4)
$ value-> setValueStrictly (['yesno' => "no"]) ;;
// OK (5)
$ value-> setValueStrictly (['yesno' => false]);
`` ```


### boolean: Binary selection

#### getValue --When getting data

##### pureValue, value
The value of the selected side.

##### text, html
The display heading on the selected side.


#### setValueStrictly --When setting values
Set the value of two selections or the character string of the heading registered in the custom column setting

`` `php
///// When the heading of option 1 is "Orange" and the value is "val1"
// OK (1)
$ value-> setValueStrictly (['boolean' =>'val1']);
// OK (2)
$ value-> setValueStrictly (['boolean' =>'Orange']);
`` ```

### file: file

#### getValue --When getting data

##### pureValue, value
The internal file path of the saved file.

##### text
The URL to the link to the file.

##### html
A tag to the link destination to the file. The tag heading is the filename of the uploaded file.


#### setValueStrictly --When setting values
Adjusting


### image: image

#### getValue --When getting data

##### pureValue, value
The internal file path of the saved file.

##### text
The URL to the link to the file.

##### html
An img tag to the link destination to the file.

#### setValueStrictly --When setting values
Adjusting