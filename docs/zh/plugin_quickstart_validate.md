# 插件(验证)
这是在保存自定义数据时和删除自定义数据时，执行独自的验证（检查输入内容）的插件。
字符种类和位数的检查，可以在自定义列的设置中进行。想做更复杂的检查，或项目之间的关联检查时，推荐使用本插件。

![验证的实现示例](../img/plugin/plugin_validate1.png)   

> 如果是单纯比较 2 个值的验证，也请试试[在页面中的设置](/zh/table)。

![比较两列](../img/table/compare1.png)    

## 创建方法

### 创建 config.json
- 创建下面的 config.json 文件。  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "63d80590-4aad-11e9-b475-0800200c9a66",
    "plugin_view_name": "Plugin Validator",
    "description": "进行自定义表的验证。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "target_tables": "test_table",
    "plugin_type": "validator"
}
~~~

- plugin_name : 请用半角英文数字填写。
- uuid : 用来区分插件的字符串。由 32 个字符和连字符组成，共 36 个字符。请不要和其他插件的值相同。  
可以用下面的 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : 请填写 validator。  
- （任意）target_tables : 请填写验证对象的表名。  


### 创建 PHP 文件
- 创建如下的 PHP 文件。名称请设为“Plugin.php”。

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginValidatorBase;
class Plugin extends PluginValidatorBase
{
    /**
     * Plugin Validator
     */
    public function validate()
    {
        // 取得输入值
        $xpos = array_get($this->input_value, 'xpos');
        $ypos = array_get($this->input_value, 'ypos');

        if (isset($xpos) && isset($ypos)) {
            if (intval($xpos) > intval($ypos)) {
                // 设置错误消息（键：列名，值：消息）
                $this->messages['ypos'] = '请在 Y 中输入比 X 大的值。';
                // 返回值返回 false（发生错误）
                return false;
            }
        }

        // 返回值返回 true（正常）
        return true;

        
        ///// （从 v3.7.5 起添加）要取得调用验证的执行来源的种类时。只在特定的调用方式下进行验证等时，请使用
        \Log::debug($this->called_type);
        ///// $this->called_type 的种类
        // form : 页面
        // api : API
        // import : 数据导入
        // null : 其他（其他插件等）
    }

    public function validateDestroy($custom_value)
    {
        // （从 v6.0.2 起添加）返回 false 时，不删除数据，把在 'message' 中设置的错误消息显示在页面中。
        if ($custom_value->getValue('priority') > 3) {
            return [
                'status'  => false,
                'message' =>  '优先级高的数据不能删除。',
            ];
        } else {
            // 返回 true 时，删除数据。
            return [
                'status'  => true
            ];
        }
    }
}
~~~

- namespace 请设为 **App\Plugins\\(插件名称的帕斯卡命名)** 。[详细内容在这里](/zh/plugin_quickstart)

- **保存时**：在保存插件管理页面中设置的“目标表”的数据之前，插件被调用，执行 Plugin.php 内的 validate 函数。
    - validate 函数返回 true 时，处理照常继续。
    - 返回 false 时，中断处理，把在属性 $messages 中设置的错误消息显示在页面中。

- **删除时**：在删除“目标表”的数据之前，插件被调用，执行 Plugin.php 内的 validateDestroy 函数。
    - validateDestroy 函数返回 'status' 为 true 的数组时，删除数据。
    - 返回 'status' 为 false 的数组时，中断处理，把在 'message' 中设置的错误消息显示在页面中。

- Plugin 类继承了类 PluginValidatorBase。
PluginValidatorBase 有下面的属性等。在 validate 函数中，可以参照这些属性。
属性的详细内容，请参阅[插件参考](/zh/plugin_reference)。
    - $custom_table：调用来源的自定义表
    - $original_value：更改前的自定义数据值
    - $input_value：页面的输入值

### 压缩为 zip
以上面 2 个文件为最小构成，压缩为 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php


### 示例插件
[通知信息显示顺序检查](https://github.com/exment-git/plugin-sample/tree/main/validation/PluginValidatorTest)  
- “通知信息”表的显示顺序超过 100 时报错的示例。  

