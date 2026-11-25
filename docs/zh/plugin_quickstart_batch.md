# 插件(批处理)
这是按固定的周期，或在管理员指定的时机，执行自己的处理的插件。
想添加每天一定要执行的处理等时，推荐使用。


## 创建方法
以“把逻辑删除的数据物理删除”的批处理为例，说明创建步骤。
※Exment 的标准做法是，在页面中删除的数据成为“逻辑删除”，仍然留在数据库中。
这是把这些数据完全删除（物理删除）的批处理。

### 创建 config.json
- 创建下面的 config.json 文件。  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "harddelete_data",
    "plugin_view_name": "数据的物理删除",
    "description": "把逻辑删除的全部数据完全删除。",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "batch",
    "batch_hour": 0,
    "batch_cron": "0 0 * * *"
}
~~~

- plugin_name : 插件名称。请用半角英文数字填写。
- uuid : 用来区分插件的字符串。由 32 个字符和连字符组成，共 36 个字符。请不要和其他插件的值相同。  
可以用下面的 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : 请填写 batch。  
- batch_hour（任意） : 每天执行插件的时刻（时）。请用 0～23 的整数填写。
- batch_cron（任意） : 面向高级用户。用 cron 记法填写执行插件的时机。可以灵活地指定启动批处理的时机。

※batch_hour 和 batch_cron 可以以后在页面中更改。写在 config.json 中的值，是上传后的初始值。


### 创建 PHP 文件
- 创建如下的 PHP 文件。名称请设为“Plugin.php”。

~~~ php
<?php
namespace App\Plugins\HarddeleteData;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginBatchBase{
    /**
     * execute
     */
    public function execute() {
        $tables = CustomTable::all();

        foreach($tables as $table){
            $modelname = getModelName($table);
            if(!isset($modelname)){
                continue;
            }

            $modelname::onlyTrashed()
                ->forceDelete();
        }
    }
    
}
~~~
- namespace 请设为 **App\Plugins\\(插件名称的帕斯卡命名)** 。[详细内容在这里](/zh/plugin_quickstart)

- 符合在插件管理页面中登记的触发条件时，插件被调用，执行 Plugin.php 内的 execute 函数。

- Plugin 类继承了类 PluginBatchBase。  

### 压缩为 zip
以上面 2 个文件为最小构成，压缩为 zip。  
- HarddeleteData.zip
    - config.json
    - Plugin.php


### 上传
上传插件。上传方法请参阅[插件](/zh/plugin)。

- 批处理在刚上传后，“启用”是“禁用”，不会自动执行。要执行，请在[插件](/zh/plugin)中切换“启用”。
- **除了这个设置以外，还需要设置任务计划**。详细内容请确认[任务计划](/zh/additional_task_schedule)。


### 批处理的启动方法
启动已上传的批处理的方法，有下面 3 种。

| 方法 | 执行的时机 |
| ---- | ---- |
| 指定“批处理执行时间（时）” | 每天，在指定的时刻 |
| 指定“批处理执行 cron” | 用 cron 记法指定的时机 |
| 执行命令 | 执行命令时（手动） |

#### 指定“批处理执行时间（时）”
在插件设置页面中，输入 0～23。
每天在那个时刻执行插件。（例：设置为“5”时，每天 5:00 执行插件）
![插件页面](../img/plugin/plugin_batch1.png)  

#### 指定“批处理执行 cron”
面向高级用户。可以用 cron 记法输入执行插件的时机。
※填写了这个设置时，上面的“批处理执行时间（时）”无效。
![插件页面](../img/plugin/plugin_batch2.png)  

#### 执行命令
也可以从命令行，在喜欢的时机手动执行批处理。
请执行下面的命令之一。

~~~
# 指定插件 ID
php artisan exment:batch 1

# 指定 plugin_name（插件名称）
php artisan exment:batch --name=harddelete_data

# 指定 uuid
php artisan exment:batch --uuid=b5c0a5d2-2716-4161-98d0-b490c1ebc521
~~~


### 示例插件
[数据的物理删除插件](https://github.com/exment-git/plugin-sample/tree/main/batch/HarddeleteBatch)  
- 把已逻辑删除的数据物理删除的批处理。  
  
[外部数据库联动](https://github.com/exment-git/plugin-sample/tree/main/batch/PluginSyncBatch)  
- 把保存在外部数据库中的信息，批量导入 Exment 的表的批处理。  
- 作为事前准备，请执行下面的处理。
    1. 从 Exment 的“管理员设置”→“模板”，导入[模板](https://exment.net/downloads/sample/template/city_template.zip)。  
    2. 创建外部数据库。本插件使用 MySQL 的示例数据库“world”。请从[官方网站](https://dev.mysql.com/doc/index-other.html)下载 zip，然后在您使用的 MySQL（或 MariaDB）环境中执行解压出来的 SQL。
![MySQL 下载页面](../img/plugin/plugin_event1.png)  
    3. 从 Exment 的“管理员设置”→“插件”，上传[插件](https://github.com/exment-git/plugin-sample/tree/main/batch/PluginSyncBatch)。  
    4. 打开插件的设置页面，输入在 2. 中创建的外部数据库的连接信息并保存。  
![插件设置页面](../img/plugin/plugin_event2.png)  
