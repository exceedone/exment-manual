# Plug-in reference
It is a list of functions and properties unique to each plug-in.  
※ Custom tables or columns, reference of custom data, [click here](/func_reference) please refer to.

## PluginBase / Plugin common class

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| plugin | Plugin | Eloquent instance of the plugin |
| useCustomOption | bool | Whether to use plugin-specific settings. Initial value is false |

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



## PluginBatchBase
This is an abstract class of plug-in (batch). When developing a batch plug-in, inherit this class.  
For more information [here](/plugin_quickstart_batch), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Property
None

### Function list

#### execute
Submit the batch. Describe the processing you want to execute in this function.

##### argument
None

##### Return value
None

---



## PluginDashboardBase
This is an abstract class of plugin (dashboard).  
When developing a dashboard plugin, please inherit this class.  
For more information [here](/plugin_quickstart_dashboard), please refer to.  

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

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

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| showHeader | bool | Whether to display the header in the header at the top left of the page. true: Display / false: Hide. Initial value is true. |

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




## PluginTriggerBase
This is an abstract class of plugin (trigger). When developing a trigger plugin, inherit this class.  
For more information [here](/plugin_quickstart_trigger), please refer to.

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### Property
| Name | Type | Description |
| ---- | ---- | ---- |
| custom_table | CustomTable | Custom table instance |
| custom_value | CustomValue | Eloquent instance of custom data to call plugin when displaying form |
| isCreate | bool | When displaying a form, whether it is a newly created form |


### Function list

#### execute
Submit the batch. Describe the processing you want to execute in this function.

##### argument
None

##### Return value
None

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
| input_value | array | Associative array storing screen input values ​​(key: column name, value: input value) |
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


---