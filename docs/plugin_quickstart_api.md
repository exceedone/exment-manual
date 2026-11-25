# Plugin (API)
This plugin adds a new API to Exment.
Use it when you want to add a function that is not in the [API reference](https://exment.net/reference/webapi.html).

## Introduction
An Exment API plugin is developed with the PHP framework [Laravel](http://laravel.com/).  
We especially recommend that someone who knows Laravel develops the API.

## How to make

### sample
Here, as a sample, we make an API that "gets the custom column information from the name of the custom column".

- The sample plugin is [here](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)  


### Create config.json
- Create the following config.json file.  

~~~ json

{
    "plugin_name": "PluginDemoAPI",
    "uuid": "50716af0-05d3-11ea-aaef-0800200c9a66",
    "plugin_view_name": "API Plugin Sample",
    "description": "This is a sample API to get custom column information from column names.",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "api",
    "uri": "sampleapi",
    "route": [
        {
            "uri": "column",
            "method": [
                "get"
            ],
            "function": "column"
        }
    ]
}

~~~

- Enter plugin_name in single-byte alphanumeric characters.
- uuid is a string that tells plugins apart. It is 32 characters plus hyphens, 36 characters in total. Make sure it is not the same value as another plugin's.  
You can make one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- Enter api for plugin_type.  
- For uri, enter the endpoint common to this plugin. You can set it again later on the plugin management screen.
- route defines a list of the endpoint of each process, its HTTP method and the method name in the Controller.
    - uri: the uri for showing the page. The actual URL is "http(s)://(Exment URL)/api/plugins/(endpoint common to the plugin)/(specified uri)".  
    - method: the HTTP method. Enter get, post, put or delete.
    - function: the name of the method in the Controller to run.
    - Example: when the endpoint common to the plugin is "sampleapi", the uri of the process is "column" and the method is "get", it is "http(s)://(Exment URL)/api/plugins/sampleapi/column (method: GET)".

> Note: the URLs are for the default setting without "/admin" (a site newly installed with v7.2.1 or later). If `ADMIN_ROUTE_PREFIX` in `.env` has a value (a site installed with an earlier version has "admin"), add that value after the URL of the site (e.g. `http(s)://(Exment URL)/admin/api/plugins/sampleapi/column`). For details, see [Change / delete "admin" included in URL](/additional_prefix).

### Plugin file creation

#### Main logic creation
Create a PHP file like the one below. The file name should be "Plugin.php".

~~~ php
<?php

// (1)
namespace App\Plugins\PluginDemoAPI;

use Exceedone\Exment\Enums\ErrorCode;
use Exceedone\Exment\Enums\Permission;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginApiBase;
use Validator;

class Plugin extends PluginApiBase
{
    /**
     * (2) column
     *
     * This is a sample to get custom column information from column name
     *
     * @return mixed
     */
    public function column()
    {
        // Check request parameters (table and column are required respectively)
        $validator = Validator::make(request()->all(), [
            'table' => 'required',
            'column' => 'required',
        ]);
        if ($validator->fails()) {
            return abortJson(400, [
                'errors' => $this->getErrorMessages($validator)
            ], ErrorCode::VALIDATION_ERROR());
        }

        // Get table name and column name from request parameter
        $table_name = request()->get('table');
        $column_name = request()->get('column');

        // Get custom table information
        $custom_table = CustomTable::where('table_name', $table_name)->first();
        if (!isset($custom_table)) {
            return abort(400);
        }

        // (3) Check if you have permission
        if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
            return abortJson(403, trans('admin.deny'));
        }

        // Get custom column information
        $column = $custom_table->custom_columns()->where('column_name', $column_name)->first();
        if (!isset($column)) {
            return abort(400);
        }

        return $column;
    }
}
~~~

- (1) The namespace should be **App\Plugins\\(plugin name in Pascal case)**. [Click here for details](/plugin_quickstart?id=plugin-name-namespace)

Also, name the class "Plugin" and extend PluginApiBase.

- (2) The public method name in the class is the name written in function of config.json.  

- (3) By calling the method hasPermission of the custom table information, you can check whether the current user has a permission for that table. The permissions you can check are as follows.
    - AVAILABLE_ACCESS_CUSTOM_VALUE: access permission
    - AVAILABLE_VIEW_CUSTOM_VALUE: view permission
    - AVAILABLE_EDIT_CUSTOM_VALUE: edit permission
    - AVAILABLE_ALL_CUSTOM_VALUE: permission to access all data
    - AVAILABLE_ALL_EDIT_CUSTOM_VALUE: permission to edit all data


### Compress to zip
Compress the above two files, as the minimum configuration, into a zip.  
The zip file name should be "(plugin_name).zip".  
- PluginDemoAPI.zip
    - config.json
    - Plugin.php
    - (Other necessary PHP files, etc.)


### access
Access the API at the following URL.
http(s)://(Exment URL)/api/plugins/(endpoint common to the plugin)/(uri of the route)  

Example: when the endpoint common to the plugin is "sampleapi" and the uri of the route is "column"  
http(s)://(Exment URL)/api/plugins/sampleapi/column


### others
- To access an API made by a plugin, the API scope must be "plugin". (Specify it when you get the token.)

- When you want to give a parameter in the URL, for example to get the data of a specific ID, add a description like the one below to route → uri of config.json. You can specify it like "{id}" or "{table}".

~~~ json

{
    "route": [
        {
            "uri": "tablecolumn/{table}/{column}",
            "method": [
                "get"
            ],
            "function": "tablecolumn"
        }
    ]
}

~~~

~~~ php

/**
    * This is a sample to get custom column information from column name
    * * The table name and column name are specified in the URL.
    * @return mixed
    */
public function tablecolumn($table, $column)
{
    // Get custom table information
    $custom_table = CustomTable::where('table_name', $table)->first();
    if (!isset($custom_table)) {
        return abort(400);
    }

    // Check if you have permission
    if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
        return abortJson(403, trans('admin.deny'));
    }

    // Get custom column information
    $custom_column = $custom_table->custom_columns()->where('column_name', $column)->first();
    if (!isset($custom_column)) {
        return abort(400);
    }

    return $custom_column;
}

~~~

### Sample plugin
[API sample](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)  
