# Plug-in reference
It is a list of functions and properties unique to each plug-in.  
※ Custom tables or columns, reference of custom data, [click here](/func_reference) please refer to.

## PluginBase / Plugin common class

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| plugin | Plugin | Eloquent instance of the plugin |
| pluginOptions | PluginOptionBase | Class instance that stores various properties of plugin (inherits PluginOptionBase) |
| useCustomOption | bool | Whether to use plugin-specific settings. Initial value is false |

* In the past, properties were defined directly in the abstract class for each type of plug-in, but this method may cause a name conflict with the property defined by the user.
Therefore, I decided to define the properties to be added in v4.2.2 or later in pluginOptions. You can access it with "$this->pluginOptions->{property name}". In addition, existing properties are still compatible and can still be used.  

### Function list

#### setCustomOptionForm
Defines plugin-specific settings.  
For more information [here](/plugin_quickstart#Make-your-own-settings-on-the-plugin-settings-screen), please refer to.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| &$form | \Encore\Admin\Form | laravel-admin form instance |

##### Return value
None

##### Example of use
Click [here](/plugin_quickstart#Make-your-own-settings-on-the-plugin-settings-screen) Please refer to.  

---



## PluginApiBase
An abstract class for plugins (APIs). If you are developing an API plugin, please inherit this class.  
For more information [here](/plugin_quickstart_api), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Controllers\ApiTrait

##### Property
None

### Function list

#### getRouteUri
Get the endpoint of your own API.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $endpoint | string | The endpoint URL to add. Initial value is null |


##### Return value
| Type | Description |
| ---- | ---- |
| string | Unique API endpoint |


---




## PluginBatchBase
This is an abstract class of plug-in (batch). When developing a batch plug-in, inherit this class.  
For more information [here](/plugin_quickstart_batch), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Property

##### PluginOptionBatch(Inheriting PluginOptionBase)
| Name | Type | Description |
| ---- | ---- | ---- |
| command_options | array | Command line arguments passed to the batch |


### Function list

#### execute
Submit the batch. Describe the processing you want to execute in this function.

##### argument
None

##### Return value
None

---



## PluginButtonBase
An abstract class of plugins (buttons). If you develop a button plugin, please inherit this class.  
For more information [here](/plugin_quickstart_button), please refer to.  

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginButtonTrait
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait


##### Property

##### PluginOptionBatch(Inheriting PluginOptionBase)
| Name | Type | Description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Instance of custom table |
| custom_value | CustomValue | Eloquent instance of custom data for the page when the button is pressed on the details screen |
| selected_custom_values | array | An array of Eloquent instances of the selected custom data when the button is pressed on the list screen |

### Function list

#### execute
Executes the process when the button is pressed. Please describe the process you want to execute in this function.

##### argument
None

##### Return value
None

---

#### render
Draw your own button.
If you want to make it look special or embed a unique script, please describe it in this function.

##### argument
None

##### Return value
| Type | Description |
| ---- | ---- |
| string,Renderable | Originally drawn button |


---



## PluginDashboardBase
This is an abstract class of plugin (dashboard).  
When developing a dashboard plugin, please inherit this class.  
For more information [here](/plugin_quickstart_dashboard), please refer to.  

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| dashboard_box | DashboardBox | Placed dashboard Box instance |


### Function list

#### header
Returns the HTML of the header part of the dashboard BOX.  
If you want to output HTML in the header part, please add the process to return HTML in this function in the inherited plugin file.

##### argument
None

##### Return value
| Type | Description |
| ---- | ---- |
| string | HTML of header part |

---


#### body
Returns the HTML of the body part of the dashboard BOX.  
If you want to output HTML to the body, please add the process to return HTML in this function in the inherited plugin file.

##### argument
None

##### Return value
| Type | Description |
| ---- | ---- |
| string | HTML of the body part |

---


#### footer
Returns the HTML of the footer part of dashboard BOX.  
If you want to output HTML in the footer part, please add the process of returning HTML in this function in the inherited plug-in file.

##### argument
None

##### Return value
| Type | Description |
| ---- | ---- |
| string | HTML of footer part |

---

#### getDashboardUri
Get the endpoint of each dashboard BOX.  
When performing GET, POST, PUT, etc. in the dashboard BOX, use this function to get the URI part.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $endpoint | string | Endpoint URL to add. Initial value is null |

##### Return value
| Type | Description |
| ---- | ---- |
| string | Endpoint to dashboard BOX |


---



## PluginDocumentBase
An abstract class for plugins (documents). When developing a document plugin, inherit this class.
For more information [here](/plugin_quickstart_document), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table instance |
| custom_value | CustomValue | Instance of custom data |
| document_value | CustomValue | Instance of output document data (can be referenced only in executed function) |


### Function list

#### (protected)executing
Function called before document output.  
Use this function when you need to process individually, such as when you want to save values ​​to custom data before execution.

##### argument
None

##### Return value
None

---

#### (protected)executed
Function called after document output.  
Use this function if you need to perform individual processing.

##### argument
None

##### Return value
None

---



## PluginEventBase
An abstract class for plugins (events). If you develop an event plugin, please inherit this class.  
For more information [here](/plugin_quickstart_event), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginEventTrait

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table instance |
| custom_value | CustomValue | Eloquent instance of custom data (null for events not related to custom data) |
| isCreate | bool | Whether it is newly created data |
| isDelete | bool | Whether it is deleted data |


##### PluginOptionEvent（PluginOptionBaseを継承）
| Name | Type | Description |
| ---- | ---- | ---- |
| is_modal | bool | Whether the page where the event occurred is a modal form |
| event_type | PluginEventType | Event type<br>(loading, saving, saved, workflow_action_executing, workflow_action_executed, notify_executing, notify_executed) |
| page_type | PluginPageType | The type of page where the event occurred<br>(list,create,edit,show) |


### Function list

#### execute
Describe the process you want to execute when an event occurs in this function.  

##### argument
None

##### Return value
None

---


## PluginExportBase
An abstract class for plugins (exports). If you develop an export plugin, please inherit this class.  
For more information [here](/plugin_quickstart_export), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table instance |


### Function list

#### defaultProvider
A function that sets the default export provider.  

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| default_provider | ProviderBase | Instance of export provider |

##### Return value
| Type | Description |
| ---- | ---- |
| PluginExportBase | Instance of this class |


---


#### viewProvider
A function that sets the view provider.  

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| view_provider | ProviderBase | Instance of view provider for export |

##### Return value
| Type | Description |
| ---- | ---- |
| PluginExportBase | Instance of this class |


---

#### execute
This function is called as an export process.  
Please implement the export process in this function.  

##### argument
None

##### Return value
None

---


## PluginImportBase
It is an abstract class of plug-in (import). When developing an import plugin, inherit this class.
For more information [here](/plugin_quickstart_import), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table instance |
| file | File | File imported from screen |


### Function list

#### execute
Function called as import processing.
Add import processing to this function.

##### argument
None

##### Return value
None

---




## PluginPageBase
An abstract class for plugins (pages). When developing a page plugin, inherit this class.
For more information [here](/plugin_quickstart_page), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| showHeader | bool | Whether to display the icon and title in the header part at the top of the page. true: Display / false: Hide. Initial value is true. |

### Function list

#### getRouteUri
Get your own page endpoint.  
When performing GET, POST, PUT, etc. on your own page, use this function to get the URI part.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $endpoint | string | Endpoint URL to add. Initial value is null |

##### Return value
| Type | Description |
| ---- | ---- |
| string | Endpoint to dashboard BOX |

---



## PluginPublicBase
An abstract class of plugins (scripts, styles). If you develop script plugins or style plugins, please inherit this class.   
For more information [script](/plugin_quickstart_script) or [style](/plugin_quickstart_style), please refer to.

- namespace Exceedone\Exment\Services\Plugin

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| plugin | Plugin | Eloquent instance of the plugin |

### Function list

#### css
A function to get the path of CSS files.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $skipPath | bool | Set to true if css files are stored directly under the public folder. (Initial value is false) |

##### Return value
| Type | Description |
| ---- | ---- |
| array | Array of CSS file paths |

---


#### js
A function to get the path of javascript files.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $skipPath | bool | Set to true if javascript files are stored directly under the public folder. (Initial value is false) |

##### Return value
| Type | Description |
| ---- | ---- |
| array | Array of javascript file paths |

---



## PluginValidatorBase
It is an abstract class of plugin (validation). When developing a validation plugin, inherit this class.
For more information [here](/plugin_quickstart_validate), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table instance |
| original_value | CustomValue | Before change instance of custom data |
| input_value | array | Associative array storing screen input values (key: column name, value: input value) |
| called_type | ValidateCalledType | Caller type <br> (form: form, import: import, api: API) |
| messages | array | Stores error messages<br>(key: column name, value: error message * array if there are multiple) |


### Function list

#### validate
Perform validation. Describe the processing you want to execute in this function.

##### argument
None

##### Return value
| Type | Description |
| ---- | ---- |
| boolean | Validation result (true: normal, false: error) |

#### validateDestroy
Perform validation before delete custom value. Describe the processing you want to execute in this function.

##### argument
| Name | Type | Description |
| ---- | ---- | ---- |
| $custom_value | CustomValue | Instance of custom data  |

##### Return value
| Type | Description |
| ---- | ---- |
| array | Validation result and message (true: normal, false: error) |

~~~ php
        [
            'status'  => false,
            'message' =>  'Data with high importance cannot be deleted.',
        ]
~~~

---  



## PluginViewBase
An abstract class for plugins (views). If you develop a view plugin, please inherit this class.  
For more information [here](/plugin_quickstart_view), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table instance |
| custom_view | CustomView | Custom view instance |
| useBox | bool | Whether to display a button in the list |
| useBoxButtons | array | Which button to display <br> (newButton, menuButton, viewButton) |


### Function list

#### grid
This function is called as a list display process.

##### argument
None

##### Return value
| Type | Description |
| ---- | ---- |
| string,Renderable | What to display on the grid |


---

#### setViewOptionForm
Defines view-specific settings. For details, please refer to [here](/plugin_quickstart?id=make-your-own-settings-on-the-plugin-settings-screen).  

##### 引数
| Name | Type | Description |
| ---- | ---- | ---- |
| &$form | \Encore\Admin\Form | form instance of laravel-admin |

##### 戻り値
None

---


