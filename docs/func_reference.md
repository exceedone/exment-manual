# Function reference
> In this reference, only the classes and functions that are particularly important when customizing plugins and the like are described.

## Introduction
Exment is an open source system using PHP.  
Also, [Laravel](https://laravel.com/) and [laravel-admin](http://laravel-admin.org/docs/#/) are used for the framework.  
Therefore, all of these functions and models can be used.  

However, there are some places in Exment that require special notation, which is different from ordinary Laravel's Eloquent, mainly for realizing custom tables.  
In addition, it defines necessary function processing for more effective development.  
In this page, the functions defined by Exment are described.  


## ModelBase / Model base class
This is the base class for each model.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Property

| name | type | description |
| ---- | ---- | ---- |
| created_user | CustomValue(user) | User instance that created the data |
| updated_user | CustomValue(user) | User instance that updated the data |



## CustomTable
Class for custom table.  

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Property

| name | type | description |
| ---- | ---- | ---- |
| table_name | string | Table name (alphanumeric) |
| table_view_name | string | Column display name |
| description | string | Explanatory textdescription文 |


### Property(hasMany)
List of properties defined as Laravel HasMany object.  

| name | type | description |
| ---- | ---- | ---- |
| custom_columns | CustomColumn | Custom columns |
| custom_forms | CustomForm | Form |
| custom_views | CustomView | The view |
| custom_operations | CustomOperation | Bulk update |
| notifies | Notify | notification |
| custom_relations | CustomRelation | (The table is the parent) the relation |
| child_custom_relations | CustomRelation | Relation (the table is a child) |

### Function list


#### (static)getEloquent
Get the custom table object.  
The key $ obj can be id, table_name, CustomTable, CustomColumn, CustomValue.  
In the request, the custom table information that has already been obtained is stored in memory, so there is no need to obtain it again.  

##### argument
| name | type | description |
| ---- | ---- | ---- |
| $obj | mixed | Key value to get (id, table_name, CustomTable, CustomColumn, CustomValue) |

##### Return value
| type | description |
| ---- | ---- |
| CustomTable | Information of the acquired custom table |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->table_name); // information

$user = CustomTable::getEloquent(4);
\Log::debug($user->table_view_name); // user
~~~

---

#### getValueModel
Get the model for custom data.  
※The model of custom data is instantiated based on the class CustomValue and a dynamic class name that inherits the class.  

##### argument
| name | type | description |
| ---- | ---- | ---- |
| $id | string,int | If you want to get the model of the specified custom data ID, its id. Initial value is null |
| $withTrashed | bool | True if you want to retrieve deleted models. Initial value is false |

##### Return value
| type | description |
| ---- | ---- |
| CustomValue | Custom data (inherited, dynamic class) object |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 1.Create a query to get the announcement data
$info = CustomTable::getEloquent('information');
$query = $info->getValueModel()->query();
// Write a database query builder for $ query

// 2.Get the data with notification data ID 1
$value = $info->getValueModel(1);
\Log::debug($value->getValue('title')); // Welcome to Exment!
\Log::debug($value->getValue('body')); // Exment is a simple and affordable data management Web system.

~~~

---

#### getSearchEnabledColumns
Get a searchable custom column list.

##### argument
None

##### Return value
| type | description |
| ---- | ---- |
| Collection(CustomColumn) | Custom column object list |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
return $info->getSearchEnabledColumns();

~~~

---

#### getOption
Get the option settings of the custom table.  

##### argument
| name | type | description |
| ---- | ---- | ---- |
| $key | string | The key of the setting to get. color, icon, search_enabled, etc. |
| $default | mixed | Default value if no key value exists. Null if not specified |


##### Return value
| type | description |
| ---- | ---- |
| mixed | Option values ​​for custom tables |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->getOption('icon')); //fa-exclamation

~~~

---

#### hasPermission
Determines whether the logged-in user has permission to access the table.  


##### argument
| name | type | description |
| ---- | ---- | ---- |
| $role_key | \Exceedone\Exment\Enums\Permission | Key of permission to judge. Initial value is AVAILABLE_VIEW_CUSTOM_VALUE (view permission for custom table) |

##### Return value
| type | description |
| ---- | ---- |
| bool | True if permission, false if not |

##### Example of use

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Determine whether the logged-in user has permission to view the Contracts table
\Log::debug(CustomTable::getEloquent('contract')->hasPermission());

// Determines whether the logged-in user has edit authority for the "Sales" table
\Log::debug(CustomTable::getEloquent('sale')->hasPermission(Permission::AVAILABLE_EDIT_CUSTOM_VALUE));

~~~

---

#### hasPermissionData
Determines whether the logged-in user has permission to view the specified id in the specified table.  

##### argument
| name | type | description |
| ---- | ---- | ---- |
| $id | string,int | Id of the target custom_value |

##### Return value
| type | description |
| ---- | ---- |
| bool | True if permission, false if not |

##### Example of use

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Determine whether the logged-in user has display authority for the data of id3 in the "Contract" table
\Log::debug(CustomTable::getEloquent('contract')->hasPermissionData(3));

~~~

---

#### hasPermissionEditData
---
Determines whether the login user has permission to edit the specified id in the specified table.  

##### argument
| name | type | description |
| ---- | ---- | ---- |
| $id | string,int | Id of the target custom_value |

##### Return value
| type | description |
| ---- | ---- |
| bool | True if permission, false if not |

##### Example of use

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Determine whether the logged-in user has permission to view the id5 data in the "Sales" table
\Log::debug(CustomTable::getEloquent('sale')->hasPermissionEditData(5));

~~~


## CustomColumn
Class for custom column.  

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Property

| name | type | description |
| ---- | ---- | ---- |
| column_name | string | Column name (alphanumeric) |
| column_view_name | string | Column display name |
| required | bool | Whether the column is required |
| index_enabled | bool | Whether it is a search index column |
| unique | bool | 	Whether the column is unique |


### Property(hasMany)
List of properties defined as Laravel HasMany object.

| name | type | description |
| ---- | ---- | ---- |
| custom_form_columns | CustomFormColumn | Form columns |
| custom_view_columns | CustomViewColumn | View column |


### Property(belongsTo)
List of properties defined as belongsTo object of Laravel.  

| name | type | description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table |


### Function list

#### (static)getEloquent
Get a custom column object.  
The key $ obj can be id, column_name, CustomColumn.  
In the request, the custom column information that has already been obtained is stored in memory, so there is no need to obtain it again.  

##### argument
| name | type | description |
| ---- | ---- | ---- |
| $column_obj | mixed | Key value to get (id, column_name, CustomColumn) |
| $table_obj | mixed | 	If $ column_obj is specified as column_name, to narrow down the table, the id of the target custom table, table_name, CustomTable, etc. |

##### Return value
| type | description |
| ---- | ---- |
| CustomColumn | Custom column information obtained |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// Get information of "Title" column of "Notice" table by specifying ID of custom column.
$column = CustomColumn::getEloquent(45);
\Log::debug($column->column_name); // title

// Get the information in the "Body" column of the "Notification" table by specifying a custom column name.  
// column information may be used in another table, so table information is also required as an argument.  
$column = CustomColumn::getEloquent('body', 'information');
\Log::debug($column->column_view_name); // Column display name
~~~

---


#### getIndexColumnName
Gets the INDEX name of the database if the column had search indexes enabled.  

##### argument
| name | type | description |
| ---- | ---- | ---- |
| $alterColumn | bool | Whether to create a virtual column for that column if it does not exist in the database. Initial value is true |

##### Return value
| type | description |
| ---- | ---- |
| string | The index name. |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// Search for columns in the "Notices" table where "Title" starts with "Exment"
$info = CustomTable::getEloquent('information');
$title = CustomColumn::getEloquent('title', $info);

$query = $info->getValueModel()->query();
$query->where($title->getIndexColumnName(), 'LIKE', 'Exment%')
    ->get();
~~~

---





## CustomValue / custom data
Class for custom data.  
※ This class is an abstract class. With this class as base, a class is dynamically generated for each custom table.  
If you want to get custom data class for each table , please refer to [getValueModel of CustomTable](#getValueModel) class .  

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Property

| name | type | description |
| ---- | ---- | ---- |
| parent_type | string | If the data has a parent table, the parent table name |
| parent_id | int | If the data has a parent table, the id of the custom data in the parent table |
| label | string | Heading when displaying the data on the screen |


### Property(belongsTo)
List of properties defined as belongsTo object of Laravel.  

| name | type | description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table |


### Function list

#### notify
Execute the notification of the custom data.  

##### argument
| name | type | description |
| ---- | ---- | ---- |
| $notifySavedType | \Exceedone\Exment\Enums\NotifySavedType | Notification type |

##### Return value
None

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Notification of data creation is executed for the data of id1 in the notification table
CustomTable::getEloquent('information')
    ->getValueModel(1)
    ->notify(\Exceedone\Exment\Enums\NotifySavedType::CREATE);
~~~

---

#### getValue
Gets the stored value using the specified custom column as a key.  
※ When the argument $ label is false, it may be obtained as an object depending on the type of custom column.  
For example, if the custom column type is "Choices (obtain from other tables)", if $ label is false, the object of the selected data and the value registered in the database will be returned.  
If $ label is true, returns the header column to display on the screen.  


##### argument
| name | type | description |
| ---- | ---- | ---- |
| $column | CustomColumn,string,int | CustomColumn instance, column_name, or id |
| $label | bool | Whether to get as label. Initial value is false |
| $options | array | Acquisition method options |

##### Return value
| type | description |
| ---- | ---- |
| mixed | Custom data value for the specified column |


##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Get the data of id1 in the notification table
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Welcome to Exment!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', true); // Normal 
~~~

---

#### setValue
Assigns a value using the specified custom column as a key.  
※In Exment, the value entered in the custom data is stored as a json type in the "value" column of the database.  
Also, in a CustomValue instance, its value property is cast to an associative array.  
This function is a process to assign a value to a value column by specifying a key.  

##### argument
| name | type | description |
| ---- | ---- | ---- |
| $key | string | Custom column names |
| $val | mixed | The value to substitute |
| $forgetIfNull | bool | If $ val is null, remove key from associative array. Initial value is false |

##### Return value
| type | description |
| ---- | ---- |
| CustomValue | CustomValue instance (magic method)) |


##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Get the data of id1 in the notification table
$value = CustomTable::getEloquent('information')->getValueModel(1);

// Update and save to database
$value->setValue('title', 'Title update');
$value->save();
~~~

---


#### getLabel
Gets the header string of custom data.  

##### argument
None

##### Return value
| type | description |
| ---- | ---- |
| string | Custom data header string |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Get the data of id1 in the notification table
$value = CustomTable::getEloquent('information')->getValueModel(1);

$label = $value->getLabel();  // Welcome to Exment!
~~~

---

#### getUrl
Get the URL that links to the custom data page.  


##### argument
| name | type | description |
| ---- | ---- | ---- |
| $options | array | 	An associative array that specifies the acquisition method. <br />tag: true if you want to get as a tag. Initial value is false<br />list: true if you want to get a list page. Default value is false<br />icon: If you want to add an icon, font-awesome class name  

##### Return value
| type | description |
| ---- | ---- |
| string | URL or tag |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Get the data of id1 in the notification table
$value = CustomTable::getEloquent('information')->getValueModel(1);

$value->getUrl(); // http://localhost/admin/data/information/1
$value->getUrl(['tag' => true]); // <a href="http://localhost/admin/data/information/1">Welcome to Exment!</a>

~~~
