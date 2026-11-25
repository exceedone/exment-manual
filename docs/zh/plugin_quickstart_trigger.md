# 插件（触发器）

> 从 v3.2.0 起，“插件（触发器）”已不再推荐使用。  
今后创建时，请用[插件（按钮）](/zh/plugin_quickstart_button)或[插件（事件）](/zh/plugin_quickstart_event)来创建。  


插件（触发器）是在 Exment 的页面上进行特定操作时运行的插件。可以进行更新值等处理。  
另外，也可以在列表页面、表单页面上添加按钮，在点击时进行处理。  
本页说明触发器的种类和创建方法（创建 config.json 和 Plugin.php，并打包成 zip）。  


## 触发器的种类

| 名称 | 种类 | 说明 |
| ---- | ---- | ---- |
| saving | 保存前 | 在数据即将保存之前启动处理。 |
| saved | 保存后 | 在数据保存之后启动处理。 |
| grid_menubutton | 列表页面的菜单按钮 | 在数据列表页面的上部添加按钮，点击时触发事件。 |
| form_menubutton_show | 数据详情页面的菜单按钮 | 在数据详情页面的上部添加按钮，点击时触发事件。 |
| form_menubutton_create | 新建数据页面的菜单按钮 | 在新建数据页面的上部添加按钮，点击时触发事件。 |
| form_menubutton_edit | 数据更新页面的菜单按钮 | 在数据更新页面的上部添加按钮，点击时触发事件。 |
| workflow_action_executing | 工作流执行前 | 在工作流即将执行之前启动处理。 |
| workflow_action_executed | 工作流执行后 | 在工作流执行之后启动处理。 |
| notify_executing | 通知执行前 | 在通知即将执行之前启动处理。 |
| notify_executed | 通知执行后 | 在通知执行之后启动处理。 |

## 创建方法

### 创建 config.json
- 创建下面的 config.json 文件。  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Trigger",
    "description": "这是上传插件的测试。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "trigger",
    "event_triggers": "loaded,loading"

}
~~~

- plugin_name 请用半角英文和数字来写。
- uuid 是 32 个字符 + 连字符，共 36 个字符的字符串。用来唯一识别插件。  
请用下面的 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type 请写 trigger。  
- 要一开始就指定 event_triggers 时，请把上面“触发器的种类”中的“名称”用逗号分隔来写。
- 要一开始就指定 target_tables 时，请把自定义表的表名用逗号分隔来写。


### 创建 PHP 文件
- 创建下面这样的 PHP 文件。名称请设为“Plugin.php”。

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginTriggerBase;
class Plugin extends PluginTriggerBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        admin_toastr('Plugin calling');
        return true;
    }
}
~~~
- namespace 请设为 **App\Plugins\\(插件名称的帕斯卡命名)** 。[详情见这里](/zh/plugin_quickstart)

- 符合在插件管理页面中登记的触发器条件时，插件会被调用，执行 Plugin.php 的 execute 函数。  

- Plugin 类继承了类 PluginTriggerBase。  
PluginTriggerBase 有调用方的自定义表 $custom_table、表的值 $custom_value 等属性。  
在 execute 函数被调用的时候，这些属性中已经有值。  
属性的详细内容，请参考[插件参考](/zh/plugin_reference)。  

### 压缩成 zip
以上面 2 个文件为最小的构成，压缩成 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php
    - （其他需要的 PHP 文件、图片文件等）


### 示例插件
准备中...
