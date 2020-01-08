# Plugin creation method
## Introduction
This section describes how to create an Exment plug-in.  
For more information on plug-in functions and management methods, see [Plugins](/plugin.md).

## Creation method link
- [trigger](/plugin_quickstart_trigger.md)
- [page](/plugin_quickstart_page.md)
- [document](/plugin_quickstart_document.md)
- [dashboard](/plugin_quickstart_dashboard.md)
- [batch](/plugin_quickstart_batch.md)
- [script](/plugin_quickstart_script.md)
- [style](/plugin_quickstart_style.md)


## Other special settings
In addition to the basic creation method described above, special setting information is described.

- [Make your own settings on the plugin settings screen](#Make-your-own-settings-on-the-plugin-settings-screen)
- [Support multiple plugin types with one plugin](#Support-multiple-plugin-types-with-one-plugin)

### Make your own settings on the plugin settings screen

Add a plugin-specific setting if you want to do it from the screen.  
Example: Set the access key required to execute the YouTube Data API from the screen.  

![page](img/plugin/plugin_page1.png)

- The Plugin.php file is described as follows.  

~~~ php
<?php

// (1)
namespace App\Plugins\YouTubeSearch;

use Encore\Admin\Widgets\Box;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginPageBase;
use GuzzleHttp\Client;

class Plugin extends PluginXXXXBase
{
    // (1)
    protected $useCustomOption = true;

    /**
     * (2) Options set on the plug-in edit screen
     *
     * @param $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', 'access key')
            ->help('Please enter your YouTube access key.');
    }
}
~~~

- (1) Add "protected $ useCustomOption = true;"  
- (2) The function "public function setCustomOptionForm (& $ form)" is an item displayed on the plug-in setting screen.  
※ To use custom settings, add "protected $ useCustomOption = true;"  
※ To get the set value, use the function "$ this-> plugin-> getCustomOption ('parameter name')".

### Support multiple plug-in types with one plugin
Usually, only one plug-in type can be supported by one plug-in file.  
Therefore, for example, if you want to extend the function using both the type "Page" and "Dashboard", you need to create two plug-in files.  
However, by using a special style, multiple plug-in types can be handled with a single plug-in file.  
This section describes how to create multiple types of plug-in files.  

#### config.json modified
Modify plugin_type in config.json as follows.  

~~~
// config.json Excerpt
"plugin_type": "dashboard,page"
~~~

Enter multiple plugin_type values ​​separated by commas.


#### php file modification
※ If the plug-in type is "Script" or "Style", this process is not required.
  
- In the case of one type, change the file name from "Plugin.php" to "Plugin (the initial capital letter of the plug-in type) .php".
    - PluginTrigger.php
    - PluginPage.php
    - PluginDocument.php
    - PluginBatch.php
    - PluginDashboard.php

- Modify the above file partially so that the class name is the same as the file name.  

~~~ php
<?php

// Class name change (for trigger)
class PluginTrigger extends PluginPageBase
{
~~~


#### (Optional) Create php file for configuration
- "[Do your own settings in the plug-in settings screen](#Do-your-own-settings-in-the-plugin-settings-screen) if you want to do your own settings as described in" to create a "PluginSetting.php" file.  

~~~ php
// File name：PluginSetting.php
<?php

namespace App\Plugins\PageMulti;

use Exceedone\Exment\Services\Plugin\PluginSettingBase;
use Exceedone\Exment\Model\CustomTable;

// Class name：PluginSetting
class PluginSetting extends PluginSettingBase
{
    protected $useCustomOption = true;
    
    /**
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('text', 'text')
            ->help('Show text');
    }
}
~~~


#### Compress to zip
Compress these files into a zip as a minimal configuration.  
The zip file name should be "(plugin_name) .zip".  
- XXXX.zip
    - config.json
    - PluginDashboard.php
    - PluginPage.php
    - PluginSetting.php(optional)
    - (Other required PHP files, image files, etc.)

### Sample plugin
[Page and dashboard display](https://exment.net/downloads/sample/plugin/PageMulti.zip)  
