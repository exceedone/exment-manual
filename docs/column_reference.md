# Custom column reference

## Introduction
This page describes the internal specifications of custom columns, which you need when customizing Exment with plugins and the like.  

- For an overview of custom columns, see [Custom columns](/column).
- For a general overview of the functions, see [Function reference](/func_reference).


For each custom column type, this reference describes the following.
- Database type : The type stored in the database for each custom column
- Getting a value : The return value of getValue for each custom column
- Setting a value : How to set a value with setValueStrictly and with the API for each custom column


## Type stored in the database for each custom column: overview
This describes the value that is stored in the database when data is saved from the screen or the API.  
※In the database, the values of all custom columns are stored in a json-type column named "value". This description shows which type each value is stored as inside that json-type column "value".  


## Return value of the function getValue: overview
To get a value stored in the data, use the function getValue.  

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// Get the data with id 1 from the information table
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Welcome to Exment!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // Normal 
```


To change the format of the value you get, set the format in the second argument of getValue.  
The values returned by getValue come in the following four main types.  

### pureValue
・The value closest to the one registered in the database.  
・Returned in this type when "ValueType::PURE_VALUE" is specified in the second argument of getValue.  
・Values are also returned in this type when you [get data with the API](https://exment.net/reference/webapi.html).

※Mainly used in:  
- [Data export (normal)](/data_import_export)
- [Getting data with the API](https://exment.net/reference/webapi.html)


### value
・Almost the same result as pureValue. However, some column types return an object.  
・Returned in this type when the second argument of getValue is not specified, is false, or is "ValueType::VALUE".

※Mainly used in:  
- Internal processing.


### text
・The string used when outputting to the screen or a file as text (label).  
・Returned in this type when the second argument of getValue is true or is "ValueType::TEXT".

※Mainly used in:  
- [Heading display column](/table?id=heading-display-column-setting)
- [Data export (view format)](/data_import_export)
- [Parameter variables](/params)



### html
・The string or tag used when outputting to the screen as HTML.  
・Returned in this type when "ValueType::HTML" is specified in the second argument of getValue.

※Mainly used in:  
- [Data list](/data_grid)
- [Data details](/data_details)
- [Dashboard](/dashboard)
- Any other place where the value is displayed on the screen


## Setting values with setValueStrictly: overview
To set column values on the target data, use the function setValueStrictly.

``` php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

////// Create an object for new data in the table "foo"
$value = CustomTable::getEloquent('foo')->getValueModel();
////// OR get the data with id 1 from the table "foo"
//$value = CustomTable::getEloquent('foo')->getValueModel(1);

////// Set the values. An array of "custom column name => value"
$value->setValueStrictly(['value1' => 'Value 1', 'value2' => 2]);
// Update and save to the database
$value->save();
```

If you do not set appropriate values in the array passed to setValueStrictly, a \Illuminate\Validation\ValidationException error (validation error) occurs.  
This section describes, for each custom column, the format of the value to set.  


## Setting values with the API: overview
This describes the type and format to set when sending values with the [API](https://exment.net/reference/webapi.html).  


## Specification details for each custom column

### text : One-Line Text

#### Database type
string type

#### getValue - When getting data

- ##### pureValue,value,text,html
One-line text

#### setValueStrictly - When setting a value
Set as a string

``` php
$value->setValueStrictly(['text' => 'Value 1']);
```

#### API - When setting a value
Set as a string

``` json
{
  "value":{
    "text": "Value 1" 
  }
}
```



### textarea : Multiple-Line Text

#### Database type
string type

#### getValue - When getting data

- ##### pureValue,value,text
Multiple-line text

- ##### html
Multiple-line text in html format. However, only when displayed on the data list screen, if the text is 50 characters or longer, the first 50 characters are displayed and the rest is replaced with "..."


#### setValueStrictly - When setting a value
Set as a string. For line breaks, set a line break code (\n, \r and \r\n are all accepted)

``` php
$value->setValueStrictly(['textarea' => "This is value 1.\nThis is value 2.\nThis is value 3."]);
```

#### API - When setting a value
Set as a string. For line breaks, set a line break code (\n, \r and \r\n are all accepted)

``` json
{
  "value":{
    "textarea": "This is value 1.\nThis is value 2.\nThis is value 3." 
  }
}
```

### editor : Text Editor

#### Database type
string type

#### getValue - When getting data

- ##### pureValue,value,text
Editor content

- ##### html
Editor content. However, only when displayed on the data list screen, if the text is 50 characters or longer, the tags are removed, the first 50 characters are displayed, and the rest is replaced with "..."


#### setValueStrictly - When setting a value
Set as a string. For line breaks, set a line break code (\n, \r and \r\n are all accepted)

``` php
$value->setValueStrictly(['editor' => "This is value 1.\nThis is value 2.\nThis is value 3."]);
```

#### API - When setting a value
Set as a string. For line breaks, set a line break code (\n, \r and \r\n are all accepted)

``` json
{
  "value":{
    "editor": "This is value 1.\nThis is value 2.\nThis is value 3." 
  }
}
```

### email : Email

#### Database type
string type

#### getValue - When getting data

- ##### pureValue,value,text,html
Email address

#### setValueStrictly - When setting a value
Set the email address as a string

``` php
$value->setValueStrictly(['email' => 'foobar@foobar.kajitori.co.jp']);
```

#### API - When setting a value
Set the email address as a string

``` json
{
  "value":{
    "email": "foobar@foobar.kajitori.co.jp" 
  }
}
```

### url :  URL

#### Database type
string type

#### getValue - When getting data

- ##### pureValue,value,text
URL string

- ##### html
An a tag whose link destination is the URL string

#### setValueStrictly - When setting a value
Set the URL as a string

``` php
$value->setValueStrictly(['url' => 'https://exment.net']);
```

#### API - When setting a value
Set the URL as a string

``` json
{
  "value":{
    "url": "https://exment.net" 
  }
}
```

### integer : Integer

#### Database type
<span class="red">string type</span>  

> In the current specification, even when the custom column type is "Integer", the value is stored in the database as a string type.


#### getValue - When getting data

- ##### pureValue,value
Integer. Does not include commas.

- ##### text,html
Integer. Includes commas if the "Use Number Comma String" option is enabled.

#### setValueStrictly - When setting a value
Set as an integer type or an integer string  
※The value can be set even if it contains commas. In that case, the commas are removed automatically when saving to the database.

``` php
// OK(1)
$value->setValueStrictly(['integer' => 1000]);
// OK(2)
$value->setValueStrictly(['integer' => '1000']);
// OK(3)
$value->setValueStrictly(['integer' => '1,000']);
```

#### API - When setting a value
Set as an integer type or an integer string  
※The value can be set even if it contains commas. In that case, the commas are removed automatically when saving to the database.

``` json
// OK(1)
{
  "value":{
    "integer": 1000
  }
}
// OK(2)
{
  "value":{
    "integer": "1000"
  }
}
// OK(3)
{
  "value":{
    "integer": "1,000"
  }
}
```


### decimal : Decimal

#### Database type
<span class="red">string type</span>  

> In the current specification, even when the custom column type is "Decimal", the value is stored in the database as a string type.

#### getValue - When getting data

- ##### pureValue,value
Decimal. Does not include commas.

- ##### text,html
Decimal. Includes commas if the "Use Number Comma String" option is enabled.

#### setValueStrictly - When setting a value
Set as a decimal type or a decimal string  
※The value can be set even if it contains commas. In that case, the commas are removed automatically when saving to the database.

``` php
// OK(1)
$value->setValueStrictly(['decimal' => 1000.03]);
// OK(2)
$value->setValueStrictly(['decimal' => '1000.03']);
// OK(3)
$value->setValueStrictly(['decimal' => '1,000.03']);
```

#### API - When setting a value
Set as a decimal type or a decimal string  
※The value can be set even if it contains commas. In that case, the commas are removed automatically when saving to the database.

``` json
// OK(1)
{
  "value":{
    "decimal": 1000.03
  }
}
// OK(2)
{
  "value":{
    "decimal": "1000.03"
  }
}
// OK(3)
{
  "value":{
    "decimal": "1,000.03"
  }
}
```

### currency : Currency

#### Database type
<span class="red">string type</span>  

> In the current specification, even when the custom column type is "Currency", the value is stored in the database as a string type.

#### getValue - When getting data

- ##### pureValue,value
The amount entered. Does not include commas or the currency unit.

- ##### text,html
The amount entered. Includes commas if the "Use Number Comma String" option is enabled. Also includes the selected "Currency Format".

#### setValueStrictly - When setting a value
Set as a numeric type or a numeric string  
※The value can be set even if it contains commas. In that case, the commas are removed automatically when saving to the database.  
※Currently, a value that includes the currency unit cannot be set. Please remove the currency unit before setting the value.

``` php
// OK(1)
$value->setValueStrictly(['currency' => 1000]);
// OK(2)
$value->setValueStrictly(['currency' => '1000']);
// OK(3)
$value->setValueStrictly(['currency' => '1,000']);
// NG
$value->setValueStrictly(['currency' => '1,000円']);
```

#### API - When setting a value
Set as a numeric type or a numeric string  
※The value can be set even if it contains commas. In that case, the commas are removed automatically when saving to the database.  
※Currently, a value that includes the currency unit cannot be set. Please remove the currency unit before setting the value.

``` json
// OK(1)
{
  "value":{
    "currency": 1000
  }
}
// OK(2)
{
  "value":{
    "currency": "1000"
  }
}
// OK(3)
{
  "value":{
    "currency": "1,000"
  }
}
// NG
{
  "value":{
    "currency": "1,000円"
  }
}
```


### date : Date

#### Database type
string type in the format "2021-04-21"

#### getValue - When getting data

- ##### pureValue,value
Date in "yyyy-MM-dd" format.  Example: 2020-05-01

- ##### text,html
Date in "yyyy-MM-dd" format.  However, if a format is specified, the value is returned in that format.


#### setValueStrictly - When setting a value
Set as a date string or a Carbon object  
※We recommend setting date strings in "yyyy-MM-dd" format. The value is converted automatically with a Carbon object, and other formats have not currently been tested.

``` php
// OK(1)
$value->setValueStrictly(['date' => '2020-07-22']);
// OK(2)
$value->setValueStrictly(['date' => \Carbon\Carbon::now()]);
```

#### API - When setting a value
Set as a date string  
※We recommend setting date strings in "yyyy-MM-dd" format. The value is converted automatically with a Carbon object, and other formats have not currently been tested.

``` json
// OK
{
  "value":{
    "date": "2020-07-22"
  }
}
```

### time : Time

#### Database type
string type in the format "15:53:00"

#### getValue - When getting data

- ##### pureValue,value
Time in "HH:mm:ss" format.  Example: 21:31:00

- ##### text,html
Time in "HH:mm:ss" format.  

#### setValueStrictly - When setting a value
Set as a time string  
``` php
// OK(1)
$value->setValueStrictly(['time' => '08:00:00']);
// OK(2)
$value->setValueStrictly(['time' => '08:00']);
```

#### API - When setting a value
Set as a time string

``` json
// OK(1)
{
  "value":{
    "time": "08:00:00"
  }
}
// OK(2)
{
  "value":{
    "time": "08:00"
  }
}
```


### datetime : Date and Time

#### Database type
string type in the format "2021-04-21 12:24:00"

#### getValue - When getting data

- ##### pureValue
Date and time in "yyyy-MM-dd HH:mm:ss" format.  Example: 2020-05-01 21:31:00

- ##### value
Carbon object

- ##### text,html
Date and time in "yyyy-MM-dd HH:mm:ss" format.  However, if a format is specified, the value is returned in that format.


#### setValueStrictly - When setting a value
Set as a date and time string or a Carbon object  
※We recommend setting date and time strings in "yyyy-MM-dd HH:ii:ss" format. The value is converted automatically with a Carbon object, and other formats have not currently been tested.

``` php
// OK(1)
$value->setValueStrictly(['datetime' => '2020-07-22 08:00:00']);
// OK(2)
$value->setValueStrictly(['datetime' => \Carbon\Carbon::now()]);
```

#### API - When setting a value
Set as a date and time string  
※We recommend setting date and time strings in "yyyy-MM-dd HH:ii:ss" format. The value is converted automatically with a Carbon object, and other formats have not currently been tested.

``` json
// OK
{
  "value":{
    "datetime": "2020-07-22 08:00:00"
  }
}
```

### select : Select (From Static Value)

#### Database type
string type (an array of strings when multiple selection is allowed)

#### getValue - When getting data

- ##### pureValue,value,text,html
The selected item.


#### setValueStrictly - When setting a value
Set one of the option items  

``` php
///// When the option is "Orange"
// OK
$value->setValueStrictly(['select' => 'Orange']);
```

※When multiple selection is allowed, set the value as an array

``` php
// OK
$value->setValueStrictly(['selects' => ['Orange', 'Apple']]);
```

#### API - When setting a value
Set one of the option items

``` json
// OK
{
  "value":{
    "select": "Orange"
  }
}
```

※When multiple selection is allowed, set the value as an array

``` json
// OK
{
  "value":{
    "selects": ["Orange", "Apple"]
  }
}
```

### select_valtext : Select (Save Value and Label)

#### Database type
string type (an array of strings when multiple selection is allowed)

#### getValue - When getting data

- ##### pureValue,value
The value of the selected item.

- ##### text,html
The label of the selected item.

#### setValueStrictly - When setting a value
Set the value or the label of an option  

``` php
///// When the label of the option is "Orange" and its value is "val1"
// OK(1)
$value->setValueStrictly(['select_valtext' => 'val1']);
// OK(2)
$value->setValueStrictly(['select_valtext' => 'Orange']);
```

※When multiple selection is allowed, set the value as an array

``` php
// OK
$value->setValueStrictly(['select_valtexts' => ['val1', 'val2']]);
```

#### API - When setting a value
Set the value or the label of an option  

``` json
// OK(1)
{
  "value":{
    "select_valtext": "val1"
  }
}
// OK(2)
{
  "value":{
    "select_valtext": "Orange"
  }
}
```

※When multiple selection is allowed, set the value as an array

``` json
// OK
{
  "value":{
    "select_valtexts": ["val1", "val2"]
  }
}
```

### select_table : Select (From Table)

#### Database type
string type (an array of strings when multiple selection is allowed)

#### getValue - When getting data

- ##### pureValue
The id of the selected data.

- ##### value
The CustomValue object with the specified id.

- ##### text
The string of the [heading display column](/table?id=heading-display-column-setting) set for the CustomValue object with the specified id.

- ##### html
An a tag that opens the data with the specified id in a modal.


#### setValueStrictly - When setting a value
Set the id of the data in the referenced table, as an integer type or a string  

``` php
// OK(1)
$value->setValueStrictly(['select_table' => 1]);
// OK(2)
$value->setValueStrictly(['select_table' => "3"]);
```

※When multiple selection is allowed, set the value as an array

``` php
// OK
$value->setValueStrictly(['select_tables' => [1, 2, 3]]);
```

#### API - When setting a value
Set the id of the data in the referenced table, as an integer type or a string  

``` json
// OK(1)
{
  "value":{
    "select_table": 1
  }
}
// OK(2)
{
  "value":{
    "select_table": "3"
  }
}
```

※When multiple selection is allowed, set the value as an array

``` json
// OK
{
  "value":{
    "select_table2": ["3", "4", "6"]
  }
}
```

### user : User
Same as select_table.

### organization : Organization
Same as select_table.


### yesno : YES/NO

#### Database type
integer type, 0 or 1

#### getValue - When getting data

- ##### pureValue,value
0 (when NO is selected) or 1 (when YES is selected).

- ##### text,html
NO or YES.

#### setValueStrictly - When setting a value
Set one of the following values: 0,1,"0","1","YES","NO","yes","no",true,false

``` php
// OK(1)
$value->setValueStrictly(['yesno' => 1]);
// OK(2)
$value->setValueStrictly(['yesno' => "0"]);
// OK(3)
$value->setValueStrictly(['yesno' => "YES"]);
// OK(4)
$value->setValueStrictly(['yesno' => "no"]);;
// OK(5)
$value->setValueStrictly(['yesno' => false]);
```

#### API - When setting a value
Set one of the following values: 0,1,"0","1","YES","NO","yes","no",true,false

``` json
// OK(1)
{
  "value":{
    "yesno": 1
  }
}
// OK(2)
{
  "value":{
    "yesno": false
  }
}
```


### boolean : Select 2-value

#### Database type
string type

#### getValue - When getting data

- ##### pureValue,value
The value of the selected side.

- ##### text,html
The display label of the selected side.


#### setValueStrictly - When setting a value
Set the value or the label string of one of the two options registered in the custom column settings

``` php
///// When the label of option 1 is "Orange" and its value is "val1"
// OK(1)
$value->setValueStrictly(['boolean' => 'val1']);
// OK(2)
$value->setValueStrictly(['boolean' => 'Orange']);
```

#### API - When setting a value
Set the value or the label string of one of the two options registered in the custom column settings

``` json
// OK
{
  "value":{
    "boolean": "val1"
  }
}
```

### file : File

#### Database type
string type (an array of strings when multiple selection is allowed)

#### getValue - When getting data

- ##### pureValue,value
The internal file path of the saved file.

- ##### text
The URL that links to the file.

- ##### html
An a tag that links to the file. The text of the tag is the file name of the uploaded file.


#### setValueStrictly - When setting a value
Under preparation


### image : Image

#### Database type
string type (an array of strings when multiple selection is allowed)

#### getValue - When getting data

- ##### pureValue,value
The internal file path of the saved file.

- ##### text
The URL that links to the file.

- ##### html
An img tag that links to the file.

#### setValueStrictly - When setting a value
Under preparation
