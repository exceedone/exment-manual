## Plugin (CRUD page)
Add your own CRUD page to Exment.  
**Note: the plugin (CRUD) provides many features and functions. For details, see the [Plugin reference](/plugin_reference_crud).**  
Note: the classes of the admin library are written with the namespace of Exment v7.0.0 or later ("ExmentAdminCore\Admin"). If you use v6.x or lower, read them as "Encore\Admin". For details, see [here](/update/v7_0_0).  

## What is CRUD
CRUD stands for Create, Read, Update and Delete.
This plugin is specialized in making "CRUD + List" screens, which add List to these.

- The screen structure is almost the same as the list, details, create, update and delete screens of Exment custom data. You can make it with only the minimum development.
- You can manage external data (for example, other database engines, WordPress, SharePoint lists, other companies' web databases, accounting systems) on Exment screens without importing it into Exment.
- You only develop the internal processing, such as getting and adding data. Basically no UI development is needed, so it takes much less work than developing a [plugin (page)](/plugin_quickstart_page).

![CRUD](img/crud/crud1.png)  

## Main features
- Manage external data (for example, other database engines, WordPress, SharePoint lists, third-party web databases, accounting systems, etc.) on Exment screens without importing the data into Exment
- Freely join, filter, and sort multiple Exment tables and display the result
- Control whether data list, show, create, edit, and delete can be executed, according to features and permissions
- The data list supports both "display all data in one list" and "paginated display in units of 20, 50, or 100 items", so that it can match the external service
- Supports multiple endpoints. A single plugin can define multiple endpoints, and each endpoint displays its own CRUD pages
- Authentication can be configured. Supports "key", "ID and password", or "OAuth authentication". You can control access so that the CRUD page can be accessed only when these settings exist and the user is authenticated

## How to create (minimum required)
This section explains the steps with an example: a screen that "lists, shows, creates, updates and deletes, in Exment, the data of the MySQL database 'world', which is separate from Exment".

### Preparation
First, do the following two things.
- Create an external database. This plugin uses the MySQL sample database "world". Download the zip from [the official website](https://dev.mysql.com/doc/index-other.html) and execute the unzipped SQL in your MySQL (or MariaDB) environment.
![MySQL download page](img/plugin/plugin_event1.png)  

- Open config/database.php and add the following to connections.

```
        'world' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE_WORLD', 'world'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
```


### Create config.json
- Create the following config.json file.  

~~~ json

{
    "plugin_name": "MySQLWorld",
    "plugin_view_name" : "MySQL World Integration",
    "description": "Integrates Exment with the MySQL sample database \"World\".",
    "uuid":  "2641201a-ba35-2bd9-af59-9440643ca206",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "uri":  "mysql_world",
    "plugin_type": "crud"
}

~~~

- Enter plugin_name in single-byte alphanumeric characters.
- uuid is a string that tells plugins apart. It is 32 characters plus hyphens, 36 characters in total. Make sure it is not the same value as another plugin's.  
You can make one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- For uri, enter the URI used to access this plugin.  
(If not specified, it is generated from plugin_name.)  
- For plugin_type, enter crud.  

### Plugin file creation
Create the following PHP file. The file name should be "Plugin.php".  
**Note: the example below is the minimum. The plugin (CRUD) provides many other features and functions. For details, see the [Plugin reference](/plugin_reference_crud).**  

~~~ php
<?php

// (1)
namespace App\Plugins\MySQLWorld;

use ExmentAdminCore\Admin\Widgets\Grid\Grid;
use ExmentAdminCore\Admin\Widgets\Form;
use Exceedone\Exment\Services\Plugin\PluginCrudBase;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class Plugin extends PluginCrudBase
{
    /**
     * (2) Title
     * content title
     *
     * @var string
     */
    protected $title = 'World cities';

    /**
     * (3) Description
     * content description
     *
     * @var string
     */
    protected $description = 'Displays a list of cities in the world.';

    /**
     * (4) Icon
     * content icon
     *
     * @var string
     */
    protected $icon = 'fa-globe';

    /**
     * (5) Get field definitions
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => 'City name', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => 'Country code', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => 'Population', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }

    /**
     * (6) Get data list (paginate)
     * Get data paginate
     *
     * @return LengthAwarePaginator
     */
    public function getPaginate(array $options = []) : ?LengthAwarePaginator
    {
        $query = \DB::connection('world')
            ->table('city');

        // If a free word search is specified
        $q = array_get($options, 'query');
        if(isset($q)){
            $query->where(function($query) use($q){
                $query
                    ->where('Name', 'LIKE', "%{$q}%")
                    ->orWhere('CountryCode', 'LIKE', "%{$q}%")
                ;
            });
        }

        return $query->paginate(array_get($options, 'per_page') ?? 20, ['*'], 'page', array_get($options, 'page'));
    }

    /**
     * (7) Get data details (single record)
     * read single data
     *
     * @return array|Collection
     */
    public function getData($id, array $options = [])
    {
        return \DB::connection('world')
            ->table('city')
            ->where('ID', $id)->first();
    }

    /**
     * (8) Set the form for create and edit
     * set form info
     *
     * @return Form|null
     */
    public function setForm(Form $form, bool $isCreate, array $options = []) : ?Form
    {
        if(!$isCreate){
            $form->display('ID');    
        }
        $form->text('Name');

        // Get country list
        $countries = \DB::connection('world')->table('country')->pluck('Name', 'Code');
        $form->select('CountryCode')->options($countries);
        
        $form->number('Population');

        return $form;
    }

    /**
     * (9) Execute create
     * post create value
     *
     * @return mixed
     */
    public function postCreate(array $posts, array $options = [])
    {
        // Save to your own database.
        $value = \DB::connection('world')
            ->table('city')
            ->insertGetId($posts);

        return $value;
    }

    /**
     * (10) Execute edit
     * edit posted value
     *
     * @return mixed
     */
    public function putEdit($id, array $posts, array $options = [])
    {
        // Save to your own database.
        \DB::connection('world')
            ->table('city')
            ->whereOrIn('ID', $id)
            ->update($posts);

        return $id;
    }

    /**
     * (11) Delete data
     * delete value
     *
     * @param $id string|array target ids. If multiple check, calls as array.
     * @return mixed
     */
    public function delete($id, array $options = [])
    {
        $ids = stringToArray($id);
        $value = \DB::connection('world')
            ->table('city')
            ->whereIn('ID', $ids)
            ->delete();
    }
}

~~~

- (1) The namespace should be **App\Plugins\\(plugin name in Pascal case)**. [Click here for details](/plugin_quickstart?id=plugin-name-namespace)  
Also, name the class "Plugin" and extend PluginCrudBase.

- (2) The property title is the title displayed on each page.

- (3) The property description is the description displayed on each page.

- (4) The property icon is the icon displayed on each page.

- (5) The function getFieldDefinitions returns the column definitions as an associative array.  
    - Be sure to add exactly one key with "primary" => true. (Composite keys are not currently supported.)  
    - "key" is the item name, used when retrieving data and as the name of each HTML element. Enter alphanumeric characters.  
    - "label" is used as the item name on the list screen and other screens.  
    - Set "grid" for items displayed on the list screen. Enter an integer for the display order.
    - Set "show" for items displayed on the details screen. Enter an integer for the display order.
    - Set "create" for items displayed on the create screen. Enter an integer for the display order.
    - Set "edit" for items displayed on the edit screen. Enter an integer for the display order.

- (6) The function getPaginate gets the data list in paginated form.  
Return the data as a LengthAwarePaginator.
Make each element of the list an associative array, with the same keys as the keys set in getFieldDefinitions.
Note: when a search is made on the screen, values are set in the argument $options. For details, see the [Plugin reference](/plugin_reference_crud).

- (7) The function getData gets the data details (a single record).  
Make the data an associative array, with the same keys as the keys set in getFieldDefinitions.

- (8) The function setForm sets the form for the create screen and the edit screen.  
Implement this function when you want to shape the form freely.
Note: if this function is not implemented, the items with "create" or "edit" set in the function getFieldDefinitions are shown on the screen.

- (9) The function postCreate is called when you save on the create screen. Register the new data here.

- (10) The function putEdit is called when you save on the edit screen. Update the data here.

- (11) The function delete is called when you delete on the screen. Delete the data here.
Note: depending on the screen, an array is set in the argument $id.


### Compress to zip
Compress the above two files, as the minimum configuration, into a zip.  
The zip file name should be "(plugin_name).zip".  
- MySQLWorld.zip
    - config.json
    - Plugin.php


## Sample plugins
Note: the sample plugins below are for Exment v7.0.0 or later and use the namespace "ExmentAdminCore\Admin".  
If you use v6.x or lower, replace "ExmentAdminCore\Admin" in "Plugin.php" with "Encore\Admin". For details, see [here](/update/v7_0_0).

The following samples are available.

| Name | Overview | Authentication | Sample link |
| ---- | ---- | ---- | ---- |
| MySQLWorld | Connects to a database other than Exment's and retrieves, adds, edits, and deletes data. | - | [Other MySQL integration](https://github.com/exment-git/plugin-sample/tree/main/crud/mysqlworld) |
| ShowLevels3Data | A sample that uses your own SQL so that items in three hierarchy levels can be listed and viewed at the same time. | - | [Display Exment data with your own SQL](https://github.com/exment-git/plugin-sample/tree/main/crud/show_levels3_data) |
| WordPress | Uses the REST API to list and show posts on the specified WordPress site. | - | [WordPress integration](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress) |
| WordPresses | Uses the REST API to list and show posts on multiple WordPress sites. Supports multiple endpoints, and the target site is switched with a button on the screen. | - | [WordPress integration for multiple sites](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpresses) |
| WordPressPost | Uses the REST API to list and show posts on the specified WordPress site. Also adds, edits, and deletes posts using a preconfigured access key. | ID and password | [WordPress posts](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress_post) |
| OtherExment | Integrates with Exment on another server via the REST API and retrieves data. | OAuth | [REST API integration with another Exment](https://github.com/exment-git/plugin-sample/tree/main/crud/other_exment) |
