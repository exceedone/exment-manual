## Plugin(View)
This plugin adds a view with its own design and functions to the list screen of custom data.  
Use it when you want something completely different from the standard views (list, aggregation and calendar views).

![View plugin example](img/plugin/plugin_view1.png)

## Introduction
An Exment plugin page is developed with these two.

- The PHP framework [Laravel](http://laravel.com/)
- The admin library [exment-admin-core](https://github.com/exceedone/exment-admin-core) (a library based on laravel-admin / open-admin; laravel-admin in v6.x or earlier)

We especially recommend that someone who knows Laravel does the development.


## Custom View Main specifications
- You can show your own functions and screens on the list screen of custom data.
- The plugin developer can freely add setting items for the view. Like a standard view, the added items are set for each view on the view setting screen.
- Like a standard view, you can make more than one view. Even with the same plugin, each view can have different settings, such as "View A shows all data" and "View B shows only the data whose valid flag is YES".


## Difference between page and view
Besides this Plugin (View), there is another way to make your own screen: [Plugin (Page)](/plugin_quickstart_page).  
The main differences between the two are as follows.

#### Plugin(Page)
- Basically, it makes a completely independent page that is not tied to a specific table.
- Once the plugin is installed, the plugin's own screen can be opened.
- Because it is not tied to a specific table, you can also make a page that joins several tables, or a page that has nothing to do with Exment's custom data.

#### Plugin(View)
- The screen of the plugin is shown on the list screen of a specific table.
- Like the standard views (list, aggregation and calendar views), the plugin's own screen is shown when an administrator or a user adds a view.
- Basically, it shows a screen related to the data of the selected table. You can also make a screen that joins several tables, or a screen that has nothing to do with Exment's custom data.



## How to make

### Sample
Here, as a sample, we make the following page.
- It shows a simple Kanban view that lines up tasks by category.
- The column used as the "category" can be selected in the view settings. This way the same plugin can be used with several tables.


### Create config.json
- Create the following config.json file.  

~~~ json

{
    "plugin_name": "KanbanView",
    "plugin_view_name" : "Kanban View",
    "description": "Display Kanban View.",
    "uuid":  "4880a5c5-eced-60f4-0ac5-d2d672f63bea",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "view",
    "route": [
        {
            "uri": "update",
            "method": [
                "post"
            ],
            "function": "update"
        }
    ]
}

~~~

- Enter plugin_name in single-byte alphanumeric characters.
- uuid is a string that tells plugins apart. It is 32 characters plus hyphens, 36 characters in total. Make sure it is not the same value as another plugin's.  
You can make one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- Enter view for plugin_type.  
- route defines a list of the URL endpoints to run, their HTTP methods and the methods in the Controller.
Note: a view basically only shows the list screen, so the route setting is not needed. Define it only when you make asynchronous requests and responses with ajax.

    - uri: the uri for showing the page. The actual URL is "http(s)://(Exment URL)/plugins/(URL of the plugin)/(specified uri)". The "URL of the plugin" is plugin_name in snake case (or, when config.json has "uri", that value).  
    - method: the HTTP method. Enter get, post, put or delete.
    - function: the method in the Controller to run
    - Example: when plugin_name is "KanbanView", the uri specified in config.json is "update" and the specified method is "post", it is "http(s)://(Exment URL)/plugins/kanban_view/update (method: POST)".

> Note: the URLs are for the default setting without "/admin" (a site newly installed with v7.2.1 or later). If `ADMIN_ROUTE_PREFIX` in `.env` has a value (a site installed with an earlier version has "admin"), add that value after the URL of the site (e.g. `http(s)://(Exment URL)/admin/plugins/kanban_view/update`). For details, see [Change / delete "admin" included in URL](/additional_prefix).


### Plugin file creation

#### Main logic creation
Create a PHP file like the one below. The file name should be "Plugin.php".

~~~ php
<?php

// (1)
namespace App\Plugins\KanbanView;

use Exceedone\Exment\Services\Plugin\PluginViewBase;
use Exceedone\Exment\Enums\ColumnType;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginViewBase
{
    // (5) Uncomment to add plugin-specific settings
    // protected $useCustomOption = true;

    /**
     * (2) The method for showing the list. Fixed to "grid"
     */
    public function grid()
    {
        $values = $this->values();
        // (6) Call the view
        return $this->pluginView('sample', ['values' => $values]);
    }

    /**
     * (3) This plugin's own endpoint
     */
    public function update(){
        $value = request()->get('value');

        $custom_table = CustomTable::getEloquent(request()->get('table_name'));
        $custom_value = $custom_table->getValueModel(request()->get('id'));

        $custom_value->setValue($value)
            ->save();

        return response()->json($custom_value);
    }

    /**
     * (4) Options shown on the view setting screen
     * Set view option form for setting
     *
     * @param Form $form
     * @return void
     */
    public function setViewOptionForm($form)
    {
        // When adding your own settings
        $form->embeds('custom_options', 'Detail settings', function($form){
            $form->select('category', 'Category column')
                ->options($this->custom_table->getFilteredTypeColumns([ColumnType::SELECT, ColumnType::SELECT_VALTEXT])->pluck('column_view_name', 'id'))
                ->required()
                ->help('Please select a category column. It corresponds to the boards of the Kanban. Columns of the custom column types "Select (From Static Value)" and "Select (Save Value and Label)" are shown as candidates.');
        });

        // When setting the filter (narrowing down)
        static::setFilterFields($form, $this->custom_table);

        // When setting the sort
        static::setSortFields($form, $this->custom_table);
    }
    
    
    /**
     * (5) Options set on the plugin edit screen. Common to all views
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        // Add if needed
        // $form->text('access_key', 'Access key')
        //     ->help('Please enter your YouTube access key.');
    }

    
    // Below, the processing needed for the Kanban view ----------------------------------------------------

    protected function values(){
        $query = $this->custom_table->getValueQuery();

        // Filter the data
        $this->custom_view->filterModel($query);

        // Sort the data
        $this->custom_view->sortModel($query);

        // Get the values
        $items = collect();
        $query->chunk(1000, function($values) use(&$items){
            $items = $items->merge($values);
        });

        $boards = $this->getBoardItems($items);

        return $boards;
    }


    protected function getBoardItems($items){
        $category = CustomColumn::getEloquent($this->custom_view->getCustomOption('category'));
        $options = $category->createSelectOptions();

        // set boards
        $boards_dragTo = collect($options)->map(function($option, $key){
            return "board-id-$key";
        })->toArray();

        $boards = collect($options)->map(function($option, $key) use($category, $boards_dragTo){
            return [
                'id' => "board-id-$key",
                'column_name' => $category->column_name,
                'key' => $key,
                'title' => $option,
                'drapTo' => $boards_dragTo,
                'item' => [],
            ];
        })->values()->toArray();

        foreach($items as $item){
            $c = array_get($item, 'value.' . $category->column_name);
            
            foreach($boards as &$board){
                if(!isMatchString($c, $board['key'])){
                    continue;
                }

                $board['item'][] = [
                    'id' => "item-id-$item->id",
                    'title' => $item->getLabel(),
                    'dataid' => $item->id,
                    'table_name' => $this->custom_table->table_name
                ];
            }
        }

        return $boards;
    }
}
~~~

- (1) The namespace should be **App\Plugins\\(plugin name in Pascal case)**. [Click here for details](/plugin_quickstart?id=plugin-name-namespace)  
Also, name the class "Plugin" and extend PluginViewBase.

- (2) The name of the public method that shows the list screen is fixed to "grid".

- (3) When you make other endpoints, give the public method in the class the name written in function of config.json.

- (4) The function "public function setViewOptionForm($form)" defines the items shown on the view setting screen.
This setting is made for each view. So even with the same plugin, the settings can differ, such as "View A shows all data" and "View B shows only the data whose valid flag is YES".
  
    There are two kinds of items: the plugin's own settings, and the "Filter" and "Sort" settings that Exment provides as standard.
    Note: get a set value with the function "$this->custom_view->getCustomOption('parameter name')".
    Note: to use the column settings that the standard views of Exment use, write as follows.

    ~~~ php
    $this->setColumnFields($form);
    ~~~

- (5) The function "public function setCustomOptionForm(&$form)" defines the items shown on the plugin setting screen.
This setting is common to all views.

    Note: to use custom settings, add "protected $useCustomOption = true;".
    Note: get a set value with the function "$this->plugin->getCustomOption('parameter name')".

- (6) To use a view (a blade file), use the function "$this->pluginView".

- (7) To get an endpoint of the plugin, use the function "$this->getRouteUri('endpoint name')".
Note: to get the full path of the URL, use admin_url($this->getRouteUri('endpoint name')).


#### (Optional) About View
When you put the display part of the screen (the view) in a separate file, save the blade file under the folder "resources/views".

#### (Optional) About css, js and other static files
- Put css files in the folder "public/css".  
- Put js files in the folder "public/js".  
- Put other files (image files, etc.) in the folder "public/assets".  
Note: this sample has js and css for making the Kanban view.  


### Compress to zip
Compress the above two files, as the minimum configuration, into a zip.  
The zip file name should be "(plugin_name).zip".  
- KanbanView.zip
    - config.json
    - Plugin.php
    - (Other necessary PHP files, image files, etc.)
