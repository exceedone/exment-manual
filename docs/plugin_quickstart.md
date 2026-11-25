# Plugin creation method
## Introduction
This page is for those who develop plugins. It gathers the links to how to make each type of plugin, and the rules and special settings common to every type.  
For the functions of plugins and how to manage them, such as uploading, see [Plugin](/plugin).

The basic flow is as follows (see the page of each type for details).

1. Make the setting file "config.json"
2. Make the program files, such as the PHP file ("Plugin.php")
3. Compress them into a zip and upload it from the Exment screen

※The classes of the admin library are described with the namespace of Exment v7.0.0 or later ("ExmentAdminCore\Admin").  
If you are using v6.x or lower, please read them as "Encore\Admin". For details, please check [here](/update/v7_0_0).

## Creation method link
Choose the type of plugin you want to make.

- [Button](/plugin_quickstart_button)
- [Event](/plugin_quickstart_event)
- [Page](/plugin_quickstart_page)
- [Dashboard](/plugin_quickstart_dashboard)
- [View](/plugin_quickstart_view)
- [CRUD page](/plugin_quickstart_crud)
- [Batch](/plugin_quickstart_batch)
- [API](/plugin_quickstart_api)
- [Validation](/plugin_quickstart_validate)
- [Script](/plugin_quickstart_script)
- [Style](/plugin_quickstart_style)
- [Import](/plugin_quickstart_import)
- [Export](/plugin_quickstart_export)
- [Document](/plugin_quickstart_document)
- [Docurain (PDF output)](/plugin_quickstart_docurain)
- [Trigger ※not recommended](/plugin_quickstart_trigger)


## Plugin name namespace
Name the namespace of the plugin according to the following rule.
- The namespace should be **App\Plugins\\(Pascal case of plugin name)**.
    - Example: plugin name "testplugin" → App\Plugins\\Testplugin
    - Example: plugin name "customer_list" → App\Plugins\\CustomerList
    - Example: plugin name "get-user" → App\Plugins\\GetUser


## Other special settings
Besides the basic way of making a plugin, these are special settings that you use only when you need them.

- [Make your own settings on the plugin settings screen](#make-your-own-settings-on-the-plugin-settings-screen)
- [Support multiple plugin types with one plugin](#support-multiple-plug-in-types-with-one-plugin)
- [Check the required libraries at installation](#check-the-required-libraries-at-installation)
- [Install a template at installation](#install-a-template-at-installation)


### Make your own settings on the plugin settings screen

Use this when you want to add the plugin's own setting items to the plugin settings screen.  
Example: set the access key required to execute the YouTube Data API from the screen

![Page](img/plugin/plugin_page1.png)

- Write the Plugin.php file as follows.

~~~ php
<?php

// (1)
namespace App\Plugins\YouTubeSearch;

use ExmentAdminCore\Admin\Widgets\Box;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginXXXXBase;
use GuzzleHttp\Client;

class Plugin extends PluginXXXXBase
{
    // (1)
    protected $useCustomOption = true;

    /**
     * (2) Options set on the plugin edit screen
     *
     * @param $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', 'Access key')
            ->help('Please enter your YouTube access key.');
    }
}
~~~

- (1) Add "protected $useCustomOption = true;".
- (2) The function "public function setCustomOptionForm(&$form)" defines the items displayed on the plugin settings screen.  
※To use custom settings, add "protected $useCustomOption = true;".  
※To get the set value, use the function "$this->plugin->getCustomOption('parameter name')".

### Support multiple plug-in types with one plugin
Usually, one plugin file can handle only one plugin type.  
Therefore, for example, if you want to use both the types "Page" and "Dashboard", you have to make two plugin files.  
However, written in the following way, multiple plugin types can be put together in one plugin file.

#### config.json modified
Modify plugin_type in config.json as follows.

~~~
// config.json (excerpt)
"plugin_type": "dashboard,page"
~~~

Enter multiple values of plugin_type separated by commas.


#### php file modification
※If the plugin type is "Script" or "Style", this step is not needed.  
  
- Change the file name, which is "Plugin.php" for one type, to "Plugin(the plugin type with a capital first letter).php".
    - PluginButton.php
    - PluginEvent.php
    - PluginPage.php
    - PluginDocument.php
    - PluginBatch.php
    - PluginDashboard.php
    - etc....

- Modify part of the above file so that the class name is the same as the file name.

~~~ php
<?php

// Class name change (for an event)
class PluginEvent extends PluginEventBase
{
~~~


#### (Optional) Create php file for configuration
- If you want your own settings as described in "[Make your own settings on the plugin settings screen](#make-your-own-settings-on-the-plugin-settings-screen)", create a "PluginSetting.php" file.

~~~ php
// File name: PluginSetting.php
<?php

namespace App\Plugins\PageMulti;

use Exceedone\Exment\Services\Plugin\PluginSettingBase;
use Exceedone\Exment\Model\CustomTable;

// Class name: PluginSetting
class PluginSetting extends PluginSettingBase
{
    protected $useCustomOption = true;
    
    /**
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('text', 'Text')
            ->help('Shows the text.');
    }
}
~~~


#### Compress to zip
Compress these files, as the minimum set, into a zip.  
The zip file name should be "(plugin_name).zip".
- XXXX.zip
    - config.json
    - PluginDashboard.php
    - PluginPage.php
    - PluginSetting.php(optional)
    - (Other required PHP files, image files, etc.)

### Sample plugin
[Page and dashboard display](https://exment.net/downloads/sample/plugin/PageMulti.zip)



### Check the required libraries at installation
When a plugin is installed, you can check whether the libraries it needs are on the server.  
For a plugin that depends on libraries installed with composer and the like, checking first prevents errors when the plugin is executed.

#### Specification
- Write the class name of the library you want to check (one installed with composer) in config.json.  
Also write in config.json the composer name you want the user to install when the class does not exist.

- If the class does not exist when the plugin is installed, the installation of the plugin ends in an error.  
Then the screen shows the composer name you want installed.


#### config.json modified
Add "requirement" to config.json, with options like the following.

~~~
// config.json (excerpt)
"requirement": [
    {
        "class": "(the class name to check)",
        "composer": "(the composer name you want the user to install when the class does not exist)"
    },
    {
        "class": "(the class name to check)",
        "composer": "(the composer name you want the user to install when the class does not exist)"
    }
]
~~~

#### Example
Here we assume that the plugin uses "[azuyalabs/yasumi](https://github.com/azuyalabs/yasumi)", a library that gets the Japanese public holidays at once.

~~~
// config.json (excerpt)
"requirement": [
    {
        "class": "\\Yasumi\\Yasumi",
        "composer": "azuyalabs/yasumi=^2.3"
    }
]
~~~

With this setting, when the server does not have the class "\Yasumi\Yasumi", an error is displayed when the plugin is installed.
![Page](ja/img/plugin/plugin_requirement.png)



### Install a template at installation
When a plugin is installed, a [template](/template) can be installed together with it.  
Not only the functions of the plugin but also the table settings it needs can be put in at the same time.

#### config.json modified
Add "templates": true to config.json.

~~~
// config.json (excerpt)
"templates": true
~~~

#### Placing the template files
1. Create a "templates" folder in the plugin folder.

2. Export a [template](/template).

3. Unzip the exported zip file and move the contents into the "templates" folder in the plugin folder you created.

Now the template files are installed automatically when the plugin is installed.

#### Other notes
- Even if the plugin is deleted, the template installed by this function is not deleted.


### (Not recommended) Use PHP files that do not belong to a class
Usually PHP processing is written inside a class, but sometimes only functions are written, without a class.  
For example, like the following.

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

function testPluginGlobalFunction(){
    return true;
}
```

From version v4.1.0, plugins are loaded with [spl_autoload_register](https://www.php.net/manual/en/function.spl-autoload-register.php).  
This function supports classes, traits and interfaces, but it does not seem to support functions that do not belong to a class.  
Therefore, they need to be written differently from usual. Please do the following.

#### Call require_once
Execute require_once in the constructor, the execute function or the like of the calling class.

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;

class Plugin extends PluginBatchBase
{
    /**
     * execute
     */
    public function execute()
    {
        // require_once function.php in the same folder and function.php in the Dir1 folder
        require_once dirname(__FILE__).'/function.php';
        require_once dirname(__FILE__).'/Dir1/function.php';

        // Execute
        testPluginGlobalFunction();
        Dir1\testPluginGlobalFunctionDir1();
    }
}

```


#### Recommended: implement static functions that belong to a class
When you want to call statically a function defined in another class, please implement it as a static function of a class as far as possible.


``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

// Where the function is defined
class StaticFunction
{
    // Define it in a class as a static function
    public static function testPluginStaticFunction(){
        return true;
    }
}

```

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;

// Where the function is called
class Plugin extends PluginBatchBase
{
    /**
     * execute
     */
    public function execute()
    {
        // Call it as a static function
        StaticFunction::testPluginStaticFunction();
        Dir1\StaticFunction::testPluginStaticFunctionDir1();
    }
}

```
