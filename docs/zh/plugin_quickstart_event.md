# 插件(事件)
在 Exment 的页面上进行特定操作（保存数据、执行工作流等）时执行，可以进行更新值等处理。  
本页说明插件(事件)的创建方法。创建 config.json 和 Plugin.php，压缩为 zip 后上传。  

> 此功能从 v3.2.0 起添加。

## 事件的种类

| 名称 | 种类 | 说明 |
| ---- | ---- | ---- |
| loading | 页面加载前 | 在页面加载处理的最开始启动处理。 |
| loaded | 页面加载后 | 在页面加载处理的最后启动处理。 |
| saving | 保存前 | 在即将保存数据之前启动处理。 |
| saved | 保存后 | 在保存数据之后启动处理。 |
| deleted | 删除后 | 在删除数据之后启动处理。 |
| workflow_action_executing | 工作流执行前 | 在即将执行工作流之前启动处理。 |
| workflow_action_executed | 工作流执行后 | 在执行工作流之后启动处理。 |
| notify_executing | 通知前 | 在即将执行通知之前启动处理。 |
| notify_executed | 通知后 | 在执行通知之后启动处理。 |

## 创建方法

### 创建 config.json
- 创建以下的 config.json 文件。  

~~~ json
{
    "plugin_name": "PluginDemoEvent",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Event",
    "description": "这是执行插件事件的测试。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "event",
    "event_triggers": "loaded"
}
~~~

- plugin_name 请用半角英文数字填写。
- uuid 是 32 个字符加连字符、共 36 个字符的字符串。用来使插件唯一。  
请通过以下 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type 请填写 event。  
- 要从一开始就指定 event_triggers 时，请把“事件的种类”的名称用逗号分隔填写。
- 要从一开始就指定 target_tables 时，请把自定义表的表名用逗号分隔填写。


### 创建 PHP 文件
- 创建如下的 PHP 文件。名称请设为“Plugin.php”。

~~~ php
<?php
namespace App\Plugins\PluginDemoEvent;

use Exceedone\Exment\Services\Plugin\PluginEventBase;
class Plugin extends PluginEventBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        \Log::debug('Event called!');
        return true;
    }
}
~~~
- namespace 请设为 **App\Plugins\\(插件名称的帕斯卡命名)** 。[详情见这里](/zh/plugin_quickstart)

- 符合在插件管理页面中登记的触发条件时，插件会被调用，执行 Plugin.php 内的 execute 函数。  

- Plugin 类继承了 PluginEventBase 类。  
PluginEventBase 拥有调用方的自定义表 $custom_table、表的值 $custom_value 等属性，  
在 execute 函数被调用的时候，这些属性已被赋值。  
属性的详情请参阅[插件参考](/zh/plugin_reference)。  

### 压缩为 zip
以上述 2 个文件作为最小构成，压缩为 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- PluginDemoEvent.zip
    - config.json
    - Plugin.php
    - (其他需要的 PHP 文件、图片文件等)


### 示例插件
[外部数据库联动](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity)  
- 这是在保存自定义数据时，与外部数据库联动的示例。  
- 在 Exment 的城市表中进行添加、更新、删除后，会反映到外部数据库的 city 表中。  
- 作为事前准备，请依次执行以下处理。
    1. 从 Exment 的管理员设置→模板，导入[模板](https://exment.net/downloads/sample/template/city_template.zip)。  
    2. 创建外部数据库。本插件使用 MySQL 的示例数据库“world”。请从[官方网站](https://dev.mysql.com/doc/index-other.html)下载 zip，然后在所用的 MySQL（或 MariaDB）环境中执行解压出的 SQL。
![MySQL 下载页面](../img/plugin/plugin_event1.png)  
    3. 从 Exment 的管理员设置→插件，上传[插件](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity)。  
    4. 打开插件的设置页面，填入第 2 步中设置的外部数据库的连接信息→保存。    
![插件设置页面](../img/plugin/plugin_event2.png)  
