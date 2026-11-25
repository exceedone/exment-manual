# Function reference
> This reference describes only the classes and functions that are especially important for customization, such as plugins.

## Introduction
Exment is an open source system written in PHP. It uses the following.

- Framework: [Laravel](https://laravel.com/)
- Admin library: [exment-admin-core](https://github.com/exceedone/exment-admin-core) (a library based on laravel-admin / open-admin)
Note: Exment v6.x or earlier uses [laravel-admin](http://laravel-admin.org/docs/#/) as the admin library.

Therefore, all of their functions and models can be used.

However, Exment has places that need a special way of writing, different from the usual Eloquent of Laravel, mainly to make custom tables possible.
It also defines functions that make development easier.
This page explains the functions that Exment defines by itself.


## ModelBase / Model base class
The base class of each model.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Property

| Name | Type | Description |
| ---- | ---- | ---- |
| id | string (integer) | ID |
| created_user | CustomValue(user) | The user instance that created the data |
| updated_user | CustomValue(user) | The user instance that updated the data |



## LoginUser / Login user class
The information of the login user.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Property

| Name | Type | Description |
| ---- | ---- | ---- |
| id | string (integer) | The ID in the login user table |
| base_user_id | string (integer) | The ID of the custom data "User".<br/><span class="red">Note: the created user ID, the updated user ID, etc. of the screens all use this ID</span> |
| user_code | string | User code |
| user_name | string | User display name |
| email | string | Email address |
| display_avatar | string | User avatar (the default avatar when not set) |
| login_type | string | The type of the login provider.<br/>pure: normal<br/>oauth: OAuth2 authentication<br/>saml: SAML authentication<br/>ldap: LDAP authentication |
| login_provider | string | The name of the login provider. Set for logins other than the normal one. google, github, etc. |



### Function list

#### \Exment::user()
Gets the information of the logged-in user.  
Note: this is not a function of LoginUser, but it is described here for convenience.

##### argument
None

##### Return value
| Type | Description |
| ---- | ---- |
| ?LoginUser | The login user information when logged in. null when not logged in |

##### Example of use

~~~ php
$login_user = \Exment::user();
\Log::debug($login_user->user_code); //Ex. admin
\Log::debug($login_user->user_name); //Ex. Administrator
\Log::debug($login_user->email); //Ex. admin@admin.admin
~~~

---

#### getUserId
Returns the ID of the custom data "User".

##### argument
None

##### Return value
| Type | Description |
| ---- | ---- |
| string (integer) | The ID of the custom data "User" |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

$login_user = \Exment::user();
\Log::debug($login_user->getUserId()); //Ex.1
~~~

---


### Supplement: id and base_user_id
Exment has two DB tables about users: the "'User (user)' of custom data" table and the "login user (login_users)" table.  
Their main features are as follows.

- **The "'User (user)' of custom data" table**
    - Has the user code, the user name and the email address
    - Managed on the screen at the URL "/data/user"
    - The list can be obtained from the API

- **The "login user (login_users)" table**
    - Has information such as the type of the login provider (default, LDAP, OAuth, etc.), the password and the avatar<br/>(Note: the user code, the user name and the email address are obtained in the program by Laravel functions)
    - Managed on the screen at the URL "/loginuser"
    - The list cannot be obtained from the API. Only your own login information can be obtained
    - Has the "ID of the 'User (user)' of custom data" in the base_user_id column. A 1:n relationship

#### When the IDs of the two tables differ
**When more than one login method is set up, the IDs of the "'User (user)' of custom data" table and the "login user (login_users)" table can differ**. This is a case like the following.

##### The "'User (user)' of custom data" table
| ID | User code | User name | Email address |
| ---- | ---- | ---- | ---- |
| 1 | admin | Administrator | admin@admin.admin |
| 2 | user1 | User1 | user1@user1.user1 |

##### The "login user (login_users)" table
| ID | base_user_id | login_type | login_provider | Note |
| ---- | ---- | ---- | ---- | ---- |
| 1 | 1 | pure | - | The admin user logs in by the normal login method |
| 2 | 1 | oauth | google | The admin user logs in by OAuth with Google |
| 3 | 1 | ldap | ad | The admin user logs in by LDAP |
| 4 | 2 | pure | - | The user1 user logs in by the normal login method |

In such a case, the ID of $login_user->id and that of $login_user->getUserId() are different.  

~~~ php
// Example: when the admin user has logged in by LDAP

$login_user = \Exment::user();
\Log::debug($login_user->id); //Ex.3
\Log::debug($login_user->getUserId()); //Ex.1
~~~

<span class="red">Note: the created user ID, the updated user ID, etc. of the screens all use getUserId().</span> So when you get a user ID in a plugin, etc., always use getUserId().


## CustomTable
The class of a custom table.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Property

| Name | Type | Description |
| ---- | ---- | ---- |
| table_name | string | Table name (alphanumeric) |
| table_view_name | string | Column display name |
| description | string | Description |


### Property(hasMany)
The list of properties defined as Laravel HasMany objects.

| Name | Type | Description |
| ---- | ---- | ---- |
| custom_columns | CustomColumn | Custom columns |
| custom_forms | CustomForm | Forms |
| custom_views | CustomView | Views |
| custom_operations | CustomOperation | Bulk updates |
| notifies | Notify | Notifications |
| custom_relations | CustomRelation | Relations (where this table is the parent) |
| child_custom_relations | CustomRelation | Relations (where this table is the child) |

### Function list


#### (static)getEloquent
Gets the object of a custom table.  
The key, $obj, can be an id, a table_name, a CustomTable, a CustomColumn or a CustomValue.  
Custom table information already obtained within the request is kept in memory, so it does not need to be obtained again.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $obj | mixed | The key value to get by (id, table_name, CustomTable, CustomColumn, CustomValue) |

##### Return value
| Type | Description |
| ---- | ---- |
| CustomTable | The information of the custom table obtained |

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
Gets the model of the custom data.  
Note: the Model of custom data is based on the class CustomValue and is instantiated under a dynamic class name that extends that class.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $id | string,int | To get the model of a specific custom data ID, that id. The default is null |
| $withTrashed | bool | true to get a deleted model. The default is false |

##### Return value
| Type | Description |
| ---- | ---- |
| CustomValue | The object of the custom data (of the dynamic class that extends it) |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// 1. Make a query to get the data of Information
$info = CustomTable::getEloquent('information');
$query = $info->getValueModel()->query();
// Write the database query builder on $query

// 2. Get the Information data whose ID is 1
$value = $info->getValueModel(1);
\Log::debug($value->getValue('title')); // Welcome to Exment!
\Log::debug($value->getValue('body')); // Exment is an easy, affordable web system for data management. ...

~~~

---

#### getSearchEnabledColumns
Gets the list of searchable custom columns.

##### argument
None

##### Return value
| Type | Description |
| ---- | ---- |
| Collection(CustomColumn) | The list of custom column objects |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
return $info->getSearchEnabledColumns();

~~~

---

#### getOption
Gets an option setting of the custom table.  

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $key | string | The key of the setting to get. color, icon, search_enabled, etc. |
| $default | mixed | The default value when the key does not exist. null when not specified |


##### Return value
| Type | Description |
| ---- | ---- |
| mixed | The option value of the custom table |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

$info = CustomTable::getEloquent('information');
\Log::debug($info->getOption('icon')); //fa-exclamation

~~~

---

#### hasPermission
Checks whether the login user has a permission to access the table.  


##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $role_key | \Exceedone\Exment\Enums\Permission | The key of the permission to check. The default is AVAILABLE_VIEW_CUSTOM_VALUE (the permission to view the custom table) |

##### Return value
| Type | Description |
| ---- | ---- |
| bool | true with the permission, false without |

##### Example of use

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Check whether the login user has the view permission for the "contract" table
\Log::debug(CustomTable::getEloquent('contract')->hasPermission());

// Check whether the login user has the edit permission for the "sale" table
\Log::debug(CustomTable::getEloquent('sale')->hasPermission(Permission::AVAILABLE_EDIT_CUSTOM_VALUE));

~~~

---

#### hasPermissionData
Checks whether the login user has the permission to view the specified id of the specified table.  

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $id | string,int | The id of the target custom_value |

##### Return value
| Type | Description |
| ---- | ---- |
| bool | true with the permission, false without |

##### Example of use

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Check whether the login user has the view permission for the data with id 3 of the "contract" table
\Log::debug(CustomTable::getEloquent('contract')->hasPermissionData(3));

~~~

---

#### hasPermissionEditData
---
Checks whether the login user has the permission to edit the specified id of the specified table.  

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $id | string,int | The id of the target custom_value |

##### Return value
| Type | Description |
| ---- | ---- |
| bool | true with the permission, false without |

##### Example of use

~~~ php

use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\Permission;

// Check whether the login user has the view permission for the data with id 5 of the "sale" table
\Log::debug(CustomTable::getEloquent('sale')->hasPermissionEditData(5));

~~~


## CustomColumn
The class of a custom column.

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Property

| Name | Type | Description |
| ---- | ---- | ---- |
| column_name | string | Column name (alphanumeric) |
| column_view_name | string | Column display name |
| required | bool | Whether it is a required column |
| index_enabled | bool | Whether it is a search index column |
| unique | bool | Whether it is a unique column |


### Property(hasMany)
The list of properties defined as Laravel HasMany objects.

| Name | Type | Description |
| ---- | ---- | ---- |
| custom_form_columns | CustomFormColumn | Form columns |
| custom_view_columns | CustomViewColumn | View columns |


### Property(belongsTo)
The list of properties defined as Laravel belongsTo objects.

| Name | Type | Description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table |


### Function list

#### (static)getEloquent
Gets a custom column object.  
The key, $obj, can be an id, a column_name or a CustomColumn.  
Custom column information already obtained within the request is kept in memory, so it does not need to be obtained again.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $column_obj | mixed | The key value to get by (id, column_name, CustomColumn) |
| $table_obj | mixed | When $column_obj is given as a column_name, the id, table_name, CustomTable, etc. of the target custom table, to narrow down the table |

##### Return value
| Type | Description |
| ---- | ---- |
| CustomColumn | The information of the custom column obtained |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// Get the information of the "title" column of the "information" table by the ID of the custom column
$column = CustomColumn::getEloquent(45);
\Log::debug($column->column_name); // title

// Get the information of the "body" column of the "information" table by the custom column name.
// The column name may also be used in another table, so the table information is needed as an argument too
$column = CustomColumn::getEloquent('body', 'information');
\Log::debug($column->column_view_name); // Column display name
~~~

---


#### getIndexColumnName
When the search index is enabled for the column, gets the INDEX name of the database.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $alterColumn | bool | Whether to create the virtual column when the virtual column of the column does not exist in the database. The default is true |

##### Return value
| Type | Description |
| ---- | ---- |
| string | The index name. |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;

// Search the "information" table for the data whose "title" starts with "Exment"
$info = CustomTable::getEloquent('information');
$title = CustomColumn::getEloquent('title', $info);

$query = $info->getValueModel()->query();
$query->where($title->getIndexColumnName(), 'LIKE', 'Exment%')
    ->get();
~~~

---





## CustomValue / custom data
The class of custom data.  
Note: this class is an abstract class. With this class as the base, a class is generated dynamically for each custom table.
To get the custom data class of each table, see [getValueModel of the CustomTable class](/func_reference?id=getvaluemodel).

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Property

| Name | Type | Description |
| ---- | ---- | ---- |
| parent_type | string | When the data has a parent table, the name of the parent table |
| parent_id | int | When the data has a parent table, the id of the custom data of the parent table |
| label | string | The label used when the data is shown on the screen |


### Property(belongsTo)
The list of properties defined as Laravel belongsTo objects.

| Name | Type | Description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table |


### Function list

#### notify
Runs the notification of the custom data.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $notifySavedType | \Exceedone\Exment\Enums\NotifySavedType | The type of the notification |

##### Return value
None

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Run the notification for data creation on the data with id 1 of the information table
CustomTable::getEloquent('information')
    ->getValueModel(1)
    ->notify(\Exceedone\Exment\Enums\NotifySavedType::CREATE);
~~~

---

#### getValue
Gets the saved value, with the specified custom column as the key.  
Note: the type and the contents of the return value depend on the argument $valueType.  
For example, when the custom column type is "Select (From Table)" and $valueType is false, the object of the selected data is returned.  
**Note: for the return value of each custom column type, see [here](/column_reference).**  

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $column | CustomColumn,string,int | One of a CustomColumn instance, a column_name and an id |
| $valueType | bool or \Exceedone\Exment\Enums\ValueType | Returned as follows. <br />- No argument, false or ValueType::VALUE: returned as value  <br /> - true or ValueType::TEXT: returned as text <br />- ValueType::HTML: returned as html <br />- ValueType::PURE_VALUE: returned as pureValue <br /><br />Note: for what pureValue, value, text and html are, see [here](/column_reference). |
| $options | array | Options of how to get the value |

##### Return value
| Type | Description |
| ---- | ---- |
| mixed | The value of the custom data for the specified column |


##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Enums\ValueType;

// Get the data with id 1 of the information table
$value = CustomTable::getEloquent('information')->getValueModel(1);

$title = $value->getValue('title');  // Welcome to Exment!
$priority = $value->getValue('priority');  // 3
$priority = $value->getValue('priority', ValueType::TEXT); // Normal
~~~

---

#### setValue
Assigns a value, with the specified custom column as the key.  
Note: in Exment, the values entered in custom data are saved in the "value" column of the database as the json type.  
In a CustomValue instance, that value property is cast to an associative array.  
This function assigns a value to the value column under the specified key.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $key | string | The custom column name |
| $val | mixed | The value to assign |
| $forgetIfNull | bool | Whether to remove the key from the associative array when $val is null. The default is false |

##### Return value
| Type | Description |
| ---- | ---- |
| CustomValue | The CustomValue instance (magic method) |


##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Get the data with id 1 of the information table
$value = CustomTable::getEloquent('information')->getValueModel(1);

// Update and save to the database
$value->setValue('title', 'Title updated');
$value->save();
~~~

---

#### setValueStrictly

> Implemented in 3.4.3

Assigns an array of the specified custom columns and values to the object.  
Note: validation is done before the values are assigned.  
When a validation error occurs, \Illuminate\Validation\ValidationException is thrown.  


##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $list | array | An array with custom column names as keys and the values to assign as values |
| $forgetIfNull | bool | Whether to remove the key from the associative array when $val is null. The default is false |

##### Return value
| Type | Description |
| ---- | ---- |
| CustomValue | The CustomValue instance (magic method) |


##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Illuminate\Validation\ValidationException;

// Get the data with id 1 of the table "foo"
$value = CustomTable::getEloquent('foo')->getValueModel(1);

try{
    // Set the values on the object. An array of "custom column name => value"
    $value->setValueStrictly(['value1' => 'Value 1', 'value2' => 2]);
    // Update and save to the database
    $value->save();
}
// When a validation error occurs
catch(ValidationException $ex){
    // Get the error contents
    $messages = $ex->validator->getMessages();
}

~~~

---



#### getLabel
Gets the label string of the custom data.  

##### argument
None

##### Return value
| Type | Description |
| ---- | ---- |
| string | The label string of the custom data |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Get the data with id 1 of the information table
$value = CustomTable::getEloquent('information')->getValueModel(1);

$label = $value->getLabel();  // Welcome to Exment!
~~~

---

#### getUrl
Gets the URL that links to the page of the custom data.  


##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $options | array | An associative array that specifies how to get it. <br />tag : true to get it as an a tag. The default is false<br />list : true to get it as the list page. The default is false<br />icon : to add an icon, the class name of font-awesome   |

##### Return value
| Type | Description |
| ---- | ---- |
| string | The URL or the tag |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;

// Get the data with id 1 of the information table
$value = CustomTable::getEloquent('information')->getValueModel(1);

$value->getUrl(); // http://localhost/data/information/1
$value->getUrl(['tag' => true]); // <a href="http://localhost/data/information/1">Welcome to Exment!</a>

~~~






## NotifyService / Notification service
The service called to send a notification.

- namespace Exceedone\Exment\Services


### Function list


#### (static)notifyMail
Sends an email notification.


##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $params | array | The notification parameters. The keys and their descriptions are below |
| $params['prms'] | array | An array of keys and values to replace in the subject and the body |
| $params['user'] | CustomValue(user) or string | The user object the email is sent to, or an email address |
| $params['custom_value'] | CustomValue | The custom data the email is about |
| $params['mail_template'] | MailTemplate or string or id | The notification template information |
| $params['subject'] | string | Subject |
| $params['body'] | string | Body |
| $params['to'] | string | Where the email is sent. Separate several with commas |
| $params['cc'] | string | Email CC. Separate several with commas |
| $params['bcc'] | string | Email BCC. Separate several with commas |


##### Example of use

~~~ php
    // Example 1: a simple email
    NotifyService::notifyMail([
        'subject' => 'Test',
        'body' => 'This is the body',
        'to' => 'foobar@test.com',
        'cc' => 'foobar1@test.com,foobar2@test.com',
        'bcc' => 'foobar3@test.com,foobar4@test.com',
    ]);
    

    // Example 2: with a notification template
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyMail([
        'mail_template' => $mail_template,
        'to' => 'foobar1@test.com',
    ]);
    

    // Example 3: parameter replacement
    NotifyService::notifyMail([
        'subject' => 'Test ${prms1} ${prms2}',
        'body' => 'This is the body. ${prms3} ${prms4}',
        'to' => 'foobar@test.com',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Example 4: parameter replacement with custom data
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyMail([
        'subject' => 'Test',
        'body' => 'This is the body. ${value:contract_code}', // Replaced with the value of contract_code of $custom_value
        'custom_value' => $custom_value,
        'to' => 'foobar@test.com',
    ]);
~~~

---




#### (static)notifyNavbar
Shows a header notification at the top right of the page.


##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $params | array | The notification parameters. The keys and their descriptions are below |
| $params['prms'] | array | An array of keys and values to replace in the subject and the body |
| $params['user'] | CustomValue(user) | The user object the notification is sent to |
| $params['custom_value'] | CustomValue | The custom data the notification is about |
| $params['mail_template'] | MailTemplate or string or id | The notification template information |
| $params['subject'] | string | Subject |
| $params['body'] | string | Body |


##### Example of use

~~~ php
    // Example 1: a simple notification to the user with user ID 1
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => 'Test',
        'body' => 'This is the body',
        'user' => $user,
    ]);
    

    // Example 2: with a notification template
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyNavbar([
        'mail_template' => $mail_template,
        'user' => $user,
    ]);
    

    // Example 3: parameter replacement
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    NotifyService::notifyNavbar([
        'subject' => 'Test ${prms1} ${prms2}',
        'body' => 'This is the body. ${prms3} ${prms4}',
        'user' => $user,
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Example 4: parameter replacement with custom data
    $user = CustomTable::getEloquent('user')->getValueModel()->find(1);
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyNavbar([
        'subject' => 'Test',
        'body' => 'This is the body. ${value:contract_code}', // Replaced with the value of contract_code of $custom_value
        'custom_value' => $custom_value,
        'user' => $user,
    ]);
~~~

---




#### (static)notifySlack
Sends a notification to Slack.


##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $params | array | The notification parameters. The keys and their descriptions are below |
| $params['webhook_url'] | string | The URL of the WebHook |
| $params['webhook_name'] | string | The name to post to Slack as |
| $params['webhook_icon'] | string | The icon to post to Slack with |
| $params['prms'] | array | An array of keys and values to replace in the subject and the body |
| $params['custom_value'] | CustomValue | The custom data the notification is about |
| $params['mail_template'] | MailTemplate or string or id | The notification template information |
| $params['subject'] | string | Subject |
| $params['body'] | string | Body |


##### Example of use

~~~ php
    // Example 1: a simple notification to Slack
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Test',
        'body' => 'This is the body',
    ]);
    

    // Example 2: with a notification template
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'mail_template' => $mail_template,
    ]);
    

    // Example 3: parameter replacement
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Test ${prms1} ${prms2}',
        'body' => 'This is the body. ${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Example 4: parameter replacement with custom data
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifySlack([
        'webhook_url' => 'https://hooks.slack.com/services/XXXXX/YYYY',
        'subject' => 'Test',
        'body' => 'This is the body. ${value:contract_code}', // Replaced with the value of contract_code of $custom_value
        'custom_value' => $custom_value,
    ]);
~~~

---








#### (static)notifyTeams
Sends a notification to Microsoft Teams.


##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $params | array | The notification parameters. The keys and their descriptions are below |
| $params['webhook_url'] | string | The URL of the WebHook |
| $params['prms'] | array | An array of keys and values to replace in the subject and the body |
| $params['custom_value'] | CustomValue | The custom data the notification is about |
| $params['mail_template'] | MailTemplate or string or id | The notification template information |
| $params['subject'] | string | Subject |
| $params['body'] | string | Body |


##### Example of use

~~~ php
    // Example 1: a simple notification to Teams
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Test',
        'body' => 'This is the body',
    ]);
    

    // Example 2: with a notification template
    $mail_template = CustomTable::getEloquent('mail_template')->getValueModel()->where('value->mail_key_name', 'foobar')->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'mail_template' => $mail_template,
    ]);
    

    // Example 3: parameter replacement
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Test ${prms1} ${prms2}',
        'body' => 'This is the body. ${prms3} ${prms4}',
        'prms' => [
            'prms1' => 'AAA',
            'prms2' => 'BBB',
            'prms3' => 'CCC',
            'prms4' => 'DDD',
        ],
    ]);

    
    // Example 4: parameter replacement with custom data
    $custom_value = CustomTable::getEloquent('contract')->getValueModel()->first();
    NotifyService::notifyTeams([
        'webhook_url' => 'https://outlook.office.com/webhook/XXXXX/YYYYYY',
        'subject' => 'Test',
        'body' => 'This is the body. ${value:contract_code}', // Replaced with the value of contract_code of $custom_value
        'custom_value' => $custom_value,
    ]);
~~~

---


## File / File management class
The class that manages the various files uploaded to Exment (files of file columns and image columns, attachments, avatar images, etc.).

- namespace Exceedone\Exment\Model
- extends Exceedone\Exment\Model\ModelBase

### Property

| Name | Type | Description |
| ---- | ---- | ---- |
| uuid | string | A unique string that manages the file. Original file names can be duplicated, so Exment gives a uuid to every file. |
| file_type | integer | The type of the file (1: custom column, 2: attachment, 3: avatar, 4: system, 5: form image, 6: public form) |
| local_dirname | string | The name of the directory where the file is saved |
| local_filename | string | The saved file name (usually uuid + extension) |
| filename | string | The original file name at the time of the upload |
| parent_type | string | The name of the CustomTable the file is tied to |
| parent_id | string | The ID of the CustomValue the file is tied to |
| custom_column_id | integer | The ID of the CustomColumn the file is tied to |
| custom_form_column_id | integer | The ID of the CustomFormColumn the file is tied to |
| path | string | The path of the saved file. Not the full path but the path relative to the upload storage. |
| extension | string | The extension of the file |



### Function list

#### (static)getUrl
Returns the URL for accessing the file.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $path | string | The relative path of the file |
| $options | array | An associative array that specifies how to get it. <br />asApi : true to get the URL of the API. The default is false  |

##### Return value
| Type | Description |
| ---- | ---- |
| string | The URL of the file |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;

// Get the data with id 1 of the test table
$value = CustomTable::getEloquent('test')->getValueModel(1);
// Get the value of the file column (file columns and image columns hold a relative path)
$file_path = $value->getValue('file');
// Get the URL
$url = File::getUrl($file_path);
~~~

---

#### (static)storeAs
Saves the file contents to the storage and adds the data to the file management table.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $file_type | integer | The type of the file (see the properties for details) |
| $content | mixed | The file contents. You can specify an UploadedFile, a String (the string to write to the file), etc. |
| $dirname | string | The name of the directory to save the file in |
| $filename | string | The original file name |
| $options | array | An associative array that specifies the options for saving.  |

##### Return value
| Type | Description |
| ---- | ---- |
| File | The instance of the data added to the file management table |

##### Example of use
Note: see saveCustomValue and saveDocumentModel.

---

#### saveCustomValue
Adds the information of a CustomValue to the data of the file management table.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $custom_value_id | integer | The ID of the CustomValue |
| $custom_column | mixed | When the file type is custom column: the CustomColumn instance / the ID of the target data / the column name (alphanumeric) |
| $custom_table | mixed | The CustomTable instance |
| $replace | bool | true to replace all the files tied to the specified column. The default is false |

##### Return value
| Type | Description |
| ---- | ---- |
| File | The instance of the file management table |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// Get the test table
$custom_table = CustomTable::getEloquent('test');
// Get the data with id=1 of the test table
$custom_value = $custom_table->getValueModel(1);
// Get the file column of the test table
$file_column = CustomColumn::getEloquent('file', $custom_table);
// Save the string "hogehoge" to the storage under the name "hoge.txt". Add the data to the file management table and tie it to the file column of the data with id=1 of the test table
$file = File::storeAs(FileType::CUSTOM_VALUE_COLUMN, 'hogehoge', $custom_table->table_name, 'hoge.txt')
    ->saveCustomValue(1, $file_column, $custom_table);

// Update the file column of the data with id=1 of the test table
$custom_value->setValue('file', $file->path);
$custom_value->save();
~~~

---


#### saveDocumentModel
Creates the document information from the data of the file management table.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $custom_value | CustomValue | The CustomValue instance to tie the document to |
| $document_name | string | The file name of the document |

##### Return value
| Type | Description |
| ---- | ---- |
| File | The instance of the data added to the document table |

##### Example of use

~~~ php
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Model\File;
use Exceedone\Exment\Enums\FileType;

// Get the test table
$custom_table = CustomTable::getEloquent('test');
// Get the data with id=1 of the test table
$custom_value = $custom_table->getValueModel(1);

// Save the string "hogehoge" to the storage under the name "hoge.txt". Add the data to the file management table
$file = File::storeAs(FileType::CUSTOM_VALUE_DOCUMENT, 'hogehoge', $custom_table->table_name, 'hoge.txt');
// Tie the data of the file management table to the data with id=1 of the test table
$file = $file->saveCustomValue(1, null, $custom_table);
// Create the document information (tied to the data with id=1 of the test table)
$document = $file->saveDocumentModel($custom_value, 'hoge.txt');
~~~

---



### Supplement: how files are handled
When you look at the information of a file column in Exment custom data, only a simple relative path is set.  
The actual file is stored in the storage. The file management table (files) manages the information for accessing the file on the storage, the type of the file and which custom data it is tied to.  
It manages all kinds of files together: the files uploaded to file columns and image columns, and also attachments, avatar images, the icons and logos of the system, and so on. (Attachments also use a separate table of their own, the document table.)  
For this reason, setting data in a file column or adding an attachment from a plugin needs slightly more complex code than a normal field.  
For details, see the "Example of use" sections above and the sample plugins.
