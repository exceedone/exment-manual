# 插件(按钮)
可以在 Exment 的列表页面或表单页面上添加按钮，在点击时进行处理。  
本页用 3 个例子（普通按钮、自定义按钮、文件下载）说明插件(按钮)的创建方法。  

![按钮的实现示例](../img/plugin/plugin_button1.png)   

## 按钮的种类

- ##### 普通按钮
用插件设置中保存的按钮标签、颜色、图标等生成按钮，并放在页面上。  
实现点击按钮之后的处理。

- ##### 自定义按钮(从 v3.4.1 起支持)
可以用自己的形式显示按钮。  
实现显示按钮时的处理。


## 按钮的显示条件

| 名称 | 种类 | 说明 |
| ---- | ---- | ---- |
| grid_menubutton | 列表页面的菜单按钮 | 在数据列表页面的上方添加按钮，在点击时触发事件。 |
| form_menubutton_show | 数据详情的菜单按钮 | 在数据详细页面的上方添加按钮，在点击时触发事件。 |
| form_menubutton_create | 表单的菜单按钮（新建时） | 在数据新建页面的上方添加按钮，在点击时触发事件。 |
| form_menubutton_edit | 表单的菜单按钮（编辑时） | 在数据更新页面的上方添加按钮，在点击时触发事件。 |

## 创建方法

### 创建 config.json
- 创建以下的 config.json 文件。  

~~~ json
{
    "plugin_name": "PluginDemoButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a66",
    "plugin_view_name": "Plugin Button",
    "description": "这是执行插件按钮的测试。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "grid_menubutton",
    "target_tables": "information"
}
~~~

- plugin_name 请用半角英文数字填写。
- uuid 是 32 个字符加连字符、共 36 个字符的字符串。用来使插件唯一。  
请通过以下 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type 请填写 button。  
- 要从一开始就指定 event_triggers(按钮的显示条件)时，请把“按钮的显示条件”的名称用逗号分隔填写。
- 要从一开始就指定 target_tables 时，请把自定义表的表名用逗号分隔填写。


### 创建 PHP 文件
- 创建如下的 PHP 文件。名称请设为“Plugin.php”。

~~~ php
<?php
namespace App\Plugins\PluginDemoButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        \Log::debug('Plugin calling');
        

        // 根据返回值进行页面跳转的详细说明 ----------------------------------------------------
        // true : 在页面右上角显示“执行完成！”，并在该页面重新加载
        return true;

        // true : 显示自己的消息“○○已正常完成！接下来请进行××的处理”
        // return [
        //     'result' => true,
        //     'swaltext' => '○○已正常完成！接下来请进行××的处理',
        // ];

        // true : 显示“执行完成！”，并重定向到别的页面
        // return redirect('https://github.com/exceedone/exment');
        // return admin_url('/');

        // false : 显示自己的错误消息“发生了○○的错误”
        // return [
        //     'result' => false,
        //     'swaltext' => '发生了○○的错误',
        // ];


        // (v3.4.1 起支持)从“列表页面的菜单按钮”调用时 ---------
        // 在列表页面中勾选的数据的 CustomValue 对象列表。\Illuminate\Support\Collection 类型
        // $custom_values = $this->selected_custom_values; 
    }

    /**
    * (v3.4.3 起支持)判断是否在页面上显示按钮。默认为 true
    * 
    * @return bool true: 绘制 false 不绘制
    */
    public function enableRender(){
        // 例 1：所选数据的 id 为 2 时显示按钮
        //return $this->custom_value->id % 2 === 0;

        // 自定义列的值“status”为“active”时显示按钮
        return $this->custom_value->getValue('status')  === 'active';
    }
}
~~~
- namespace 请设为 **App\Plugins\\(插件名称的帕斯卡命名)** 。[详情见这里](/zh/plugin_quickstart)

- 符合在插件管理页面中登记的触发条件时，插件会被调用，执行 Plugin.php 内的 execute 函数。  

- Plugin 类继承了 PluginButtonBase 类。  
PluginButtonBase 拥有调用方的自定义表 $custom_table、表的值 $custom_value 等属性，  
在 execute 函数被调用的时候，这些属性已被赋值。  
属性的详情请参阅[插件参考](/zh/plugin_reference)。  

- (v3.4.3 起支持) 想用已登记的数据控制按钮的显示和隐藏时，实现方法"enableRender"。  
要显示按钮时返回 true，要隐藏时返回 false。(默认为 true。)


### 压缩为 zip
以上述 2 个文件作为最小构成，压缩为 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- PluginDemoButton.zip
    - config.json
    - Plugin.php
    - (其他需要的 PHP 文件、图片文件等)



## 创建方法(显示自定义按钮)

> 此功能从 v3.4.1 起支持。

可以用自己的形式显示按钮。请用于以下用途。  

- 并排显示多个按钮。
- 显示下拉形式的按钮。
- 只在满足特定条件时显示按钮。条件的判断使用自己的逻辑。

这里开发一个“在数据详细页面上显示该数据的‘上一条’‘下一条’按钮”的示例。


### 创建 config.json
和普通的创建方法相同。

``` json
{
    "plugin_name": "PluginCustomButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a12",
    "plugin_view_name": "Plugin Custom Button",
    "description": "这是添加自定义插件按钮的测试。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### 创建 PHP 文件
- 创建如下的 PHP 文件。名称请设为“Plugin.php”。

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\PluginCustomButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
    }
    
    /**
     * 代替默认的按钮显示，添加自定义按钮的处理
     *
     * @return void
     */
    public function render(){
        $buttons = [];

        // keys. true: “下一条”，false：“上一条”
        $keys = [true, false];
        foreach($keys as $key){
            // 获取前后的值
            $value = $this->getNextOrPrevId($key);
            
            // 值存在时，添加按钮
            if(!is_null($value)){
                $buttons[] = [
                    'href' => $value->getUrl(),
                    'target' => '_top',
                    ($key ? 'icon_right' : 'icon') => $key ? 'fa-arrow-right' : 'fa-arrow-left',
                    'label' => $value->getLabel(),
                ];
            }
        }

        // 用 button.blade.php 绘制按钮
        return $this->pluginView('buttons', ['buttons' => $buttons]);
    }

    /**
     * 获取下一条或上一条数据
     *
     * @param boolean $isNext true: 下一条数据，false: 上一条数据
     * @return CustomValue
     */
    protected function getNextOrPrevId(bool $isNext){
        $query = $this->custom_table->getValueModel()->query();   
        $query->where('id', ($isNext ? '>' : '<'), $this->custom_value->id);

        $query->orderBy('id', ($isNext ? 'asc' : 'desc'));

        return $query->first();
    }
}
~~~

- namespace 名称、Plugin 类的继承、命名等基本规则，和创建普通按钮时相同。

- 符合在插件管理页面中登记的触发条件时，插件会被调用，调用 Plugin.php 内的"render()"方法。

- 在 render() 方法内显示 resources/views 内的 view。

### 创建 PHP 文件(blade)

~~~ php
///// resources/views/buttons.blade.php
@foreach($buttons as $button)
<div class="btn-group pull-right" style="margin-right: 5px">
    <a href="{{ array_get($button, 'href')}}" class="btn btn-sm {{ array_get($button, 'btn_class', 'btn-default') }}" title="{{ array_get($button, 'label')}}" target="{{ array_get($button, 'target', '_blank')}}">
        @if(array_has($button, 'icon'))
        <i class="fa {{ array_get($button, 'icon') }}"></i>
        &nbsp;
        @endif

        <span class="hidden-xs">{{ array_get($button, 'label')}}</span>

        @if(array_has($button, 'icon_right'))
        &nbsp;
        <i class="fa {{ array_get($button, 'icon_right') }}"></i>
        @endif
    </a>
</div>
@endforeach
~~~

### 压缩为 zip
和普通按钮一样，压缩为 zip 并上传。


### 示例插件
[显示“下一条”“上一条”按钮(自定义按钮)](https://github.com/exment-git/plugin-sample/tree/main/button/PluginCustomButton)  





## 创建方法(文件下载)

> 此功能从 v4.3.3 起支持。

这是用插件下载文件的示例。  

这里下载用户没有使用头像时显示的用户图片。


### 创建 config.json
和普通的创建方法相同。

``` json
{
    "plugin_name": "TestPluginDownload",
    "uuid": "e9b18218-2cc6-acea-e5cf-36b88ced5a62",
    "plugin_view_name": "Plugin file download test",
    "description": "这是用插件下载文件的测试。",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### 创建 PHP 文件
- 创建如下的 PHP 文件。名称请设为“Plugin.php”。

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\TestPluginDownload;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;

class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        // 用数组返回 base64 字符串、Content-Type、文件名
        $base_path = base_path('public/vendor/exment/images/user.png');
        $fileName = 'user.png';
        return [
            'fileBase64' => base64_encode(\File::get($base_path)),
            'fileContentType' => \File::mimeType($base_path),
            'fileName' => $fileName,
            
            // 可选：显示“下载已完成”的消息
            'swaltext' => '下载已完成',
        ];
    }
}
~~~

- namespace 名称、Plugin 类的继承、命名等基本规则，和创建普通按钮时相同。

- 在 execute 函数的返回值中，用数组返回以下的值。
    - fileBase64 : 文件的 base64 字符串
    - fileContentType : 文件的 Content-Type
    - fileName : 下载时的文件名

### 压缩为 zip
和普通按钮一样，压缩为 zip 并上传。


### 示例插件
[下载匿名用户图片](https://github.com/exment-git/plugin-sample/tree/main/button/TestPluginDownload)
