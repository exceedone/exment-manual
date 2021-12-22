# Plugin (API)
You can create a new API in Exment.  
Please use it when adding a function that does not exist in the [API reference](https://exment.net/reference/webapi.html).  

## Introduction
Exment API plugins are developed using the PHP framework [Laravel](http://laravel.com/).
When developing APIs, we recommend that you have a knowledge of Laravel.

## How to make

### sample
Here, as a sample, we will create an API that "gets custom column information from the name of the custom column".

- Click [here](https://exment.net/downloads/sample/plugin/PluginDemoAPI.zip) for sample plugins.  


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

- Enter plugin_name in single-byte alphanumerical characters.
- uuid is a string of 32 characters + hyphen, for a total of 36 characters. Used to make the plugin unique.
Please create from the following URL.
https://www.famkruithof.net/uuid/uuidgen
- Enter api for plugin_type.
- For uri, enter the endpoint common to this plugin. You can reset it on the plugin management screen.
- route defines the endpoint for each process, HTTP method, and method name in Controller in a list.
    - uri: This is a uri for page display. The actual URL will be "http (s): // (Exment URL)/admin/api/plugins/(endpoint common to plugins)/(specified uri)".
    - method: HTTP method. Please fill in with get, post, put, delete.
    - function: The name of the method in the Controller to execute.
    - Example: If the endpoint common to plugins is "sampleapi", the uri for each process is "column", and the method is "get", "admin/api/plugins/sampleapi/column (method: GET)".


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


- (1) The namespace should be ** App\Plugins\\(Pascal case of plugin name) **. [Click here for details](/plugin_quickstart#plugin-name-namespace)

Also, set the class name to "Plugin" and inherit PluginApiBase.

- (2) The public method name in the class will be the name described in function of config.json.

- (3) You can check if the current user has permission for the table by calling the custom table information method hasPermission.
    - AVAILABLE_ACCESS_CUSTOM_VALUE: Access permission
    - AVAILABLE_VIEW_CUSTOM_VALUE: Reference permission
    - AVAILABLE_EDIT_CUSTOM_VALUE: Edit permission
    - AVAILABLE_ALL_CUSTOM_VALUE: All data access privileges
    - AVAILABLE_ALL_EDIT_CUSTOM_VALUE: All data edit permission


### Compress to zip
Compress the above two files into a zip with the minimum configuration.
The zip file name should be "(plugin_name) .zip".
- PluginDemoAPI.zip
    - config.json
    - Plugin.php
    -(Other necessary PHP files, etc.)


### access
Enter the URL to access the API.  
The URL is set as follows.  
http(s)://(Exment URL)/admin/api/plugins/(plugin name)  

Example: When the plugin name is "sampleapi"  
http(s)://(Exment URL)/admin/api/plugins/sampleapi  


### others
- When accessing the API created by the plugin, the API scope must be "plugin". (Please specify when acquiring the token.)

- If you want to get the data of a specific ID value, etc., if you want to specify the parameter by URL, add the following description to route → url of config.json. It can be specified as "{id}" or "{table}".


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
[API sample](https://exment.net/downloads/sample/plugin/PluginDemoAPI.zip)  
