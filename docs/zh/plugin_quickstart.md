# 插件的创建方法
## 前言
本页面向开发插件的读者。汇总了各种类插件的创建方法的链接，以及各种类通用的规则和特殊的设置。  
插件的功能，以及上传等管理方法，请参阅[插件](/zh/plugin)。  

基本的流程如下（详情请参阅各种类的页面）。

1. 创建设置文件“config.json”
2. 创建 PHP 文件（“Plugin.php”）等程序文件
3. 压缩为 zip，从 Exment 的页面上传  

※管理页面库的类，按 Exment v7.0.0 及以上版本的命名空间（“ExmentAdminCore\Admin”）记载。  
使用 v6.x 及以前的版本时，请替换为“Encore\Admin”。详情请参阅[这里](/update/v7_0_0)（英语）。

## 创建方法的链接
请选择要创建的插件种类。

- [按钮](/zh/plugin_quickstart_button)
- [事件](/zh/plugin_quickstart_event)
- [页面](/zh/plugin_quickstart_page)
- [仪表板](/zh/plugin_quickstart_dashboard)
- [视图](/zh/plugin_quickstart_view)
- [CRUD 页面](/zh/plugin_quickstart_crud)
- [批处理](/zh/plugin_quickstart_batch)
- [API](/zh/plugin_quickstart_api)
- [验证](/zh/plugin_quickstart_validate)
- [脚本](/zh/plugin_quickstart_script)
- [样式](/zh/plugin_quickstart_style)
- [导入](/zh/plugin_quickstart_import)
- [导出](/zh/plugin_quickstart_export)
- [文档](/zh/plugin_quickstart_document)
- [Docurain(PDF 输出)](/zh/plugin_quickstart_docurain)
- [触发器 ※不推荐](/zh/plugin_quickstart_trigger)


## 插件名称的 namespace
插件的 namespace 请按以下规则命名。
- namespace 请设为 **App\Plugins\\(插件名称的帕斯卡命名)** 。
    - 例：插件名称：testplugin　→ App\Plugins\\Testplugin
    - 例：插件名称：customer_list　→ App\Plugins\\CustomerList
    - 例：插件名称：get-user　→ App\Plugins\\GetUser


## 其他特殊的设置方法
这些是基本的创建方法之外，只在需要时使用的特殊设置。

- [在插件设置页面中进行自己的设置](/zh/plugin_quickstart?id=在插件设置页面中进行自己的设置)
- [用 1 个插件对应多个插件种类](/zh/plugin_quickstart?id=用-1-个插件对应多个插件种类)
- [安装时检查必需的库](/zh/plugin_quickstart?id=安装时检查必需的库)
- [安装时安装模板](/zh/plugin_quickstart?id=安装时安装模板)


### 在插件设置页面中进行自己的设置

想在插件的设置页面中添加插件自己的设置项目时使用。  
例：在页面上设置执行 YouTube Data API 所需的访问密钥    

![页面](../img/plugin/plugin_page1.png)

- 把 Plugin.php 文件写成如下内容。

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
     * (2) 在插件的编辑页面中设置的选项
     *
     * @param $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', '访问密钥')
            ->help('请输入 YouTube 的访问密钥。');
    }
}
~~~

- (1) 添加“protected $useCustomOption = true;”。
- (2) 函数"public function setCustomOptionForm(&$form)"是显示在插件设置页面中的项目。  
※要使用自定义设置，请添加“protected $useCustomOption = true;”。  
※要获取设置的值，请使用函数“$this->plugin->getCustomOption('参数名')”。

### 用 1 个插件对应多个插件种类
通常，1 个插件文件能对应的插件种类是 1 种。  
因此，例如想同时使用种类“页面”和“仪表板”时，就必须创建 2 个插件文件。  
但是，按以下写法，可以把多个插件种类汇总到 1 个插件文件中。    

#### 修改 config.json
把 config.json 中的 plugin_type 修改如下。

~~~
// config.json 节选
"plugin_type": "dashboard,page"
~~~

plugin_type 的值用逗号分隔，填写多个。


#### 修改 php 文件
※插件种类为“脚本”“样式”时，不需要这一步。  
  
- 把 1 种时命名为“Plugin.php”的文件名，改为“Plugin(插件种类的首字母大写).php”。
    - PluginButton.php
    - PluginEvent.php
    - PluginPage.php
    - PluginDocument.php
    - PluginBatch.php
    - PluginDashboard.php
    - etc....

- 修改上述文件的一部分，使类名与文件名相同。

~~~ php
<?php

// 更改类名（事件的情况）
class PluginEvent extends PluginEventBase
{
~~~


#### (可选)创建设置用的 php 文件
- 想进行“[在插件设置页面中进行自己的设置](/zh/plugin_quickstart?id=在插件设置页面中进行自己的设置)”中记载的自己的设置时，创建“PluginSetting.php”文件。  

~~~ php
// 文件名：PluginSetting.php
<?php

namespace App\Plugins\PageMulti;

use Exceedone\Exment\Services\Plugin\PluginSettingBase;
use Exceedone\Exment\Model\CustomTable;

// 类名：PluginSetting
class PluginSetting extends PluginSettingBase
{
    protected $useCustomOption = true;
    
    /**
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('text', '文本')
            ->help('显示文本。');
    }
}
~~~


#### 压缩为 zip
以这些文件作为最小构成，压缩为 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- XXXX.zip
    - config.json
    - PluginDashboard.php
    - PluginPage.php
    - PluginSetting.php(可选)
    - (其他需要的 PHP 文件、图片文件等)

### 示例插件
[页面、仪表板两处显示](https://exment.net/downloads/sample/plugin/PageMulti.zip)  



### 安装时检查必需的库
安装插件时，可以检查服务器上是否安装了需要的库。  
对于以用 composer 等安装的库为前提的插件，事先检查可以防止执行插件时出错。    

#### 规格
- 把要检查的库（用 composer 安装的库）的类名写在 config.json 中。  
类不存在时希望用户安装的 composer 名称，也同样写在 config.json 中。  

- 安装插件时，如果该类不存在，插件的安装会出错。  
这时，页面上会显示希望安装的 composer 名称。


#### 修改 config.json
在 config.json 中添加"requirement"，并添加如下的选项。

~~~
// config.json 节选
"requirement": [
    {
        "class": "(要检查的类名)",
        "composer": "(类不存在时，希望用户安装的composer名称)"
    },
    {
        "class": "(要检查的类名)",
        "composer": "(类不存在时，希望用户安装的composer名称)"
    }
]
~~~

#### 填写示例
这里假设在插件中使用批量获取日本节假日的库“[azuyalabs/yasumi](https://github.com/azuyalabs/yasumi)”。

~~~
// config.json 节选
"requirement": [
    {
        "class": "\\Yasumi\\Yasumi",
        "composer": "azuyalabs/yasumi=^2.3"
    }
]
~~~

进行这项设置后，服务器上没有类“\Yasumi\Yasumi”时，安装插件时会显示错误。
![页面（日语界面）](../ja/img/plugin/plugin_requirement.png)



### 安装时安装模板
安装插件时，可以同时安装[模板](/zh/template)。  
除了插件的功能之外，还可以同时安装需要的表设置等。    

#### 修改 config.json
在 config.json 中添加"templates": true。

~~~
// config.json 节选
"templates": true
~~~

#### 放置模板文件
1. 在插件文件夹中创建“templates”文件夹。

2. 导出[模板](/zh/template)。  

3. 解压导出的 zip 文件，移到创建的插件文件夹内的“templates”文件夹中。

这样，安装插件时就会自动安装模板文件。

#### 其他补充
- 即使删除该插件，用这个功能安装的模板也不会被删除。


### (不推荐)使用不属于类的 PHP 文件
通常，PHP 的处理写在类之中，但有时不使用类而只写函数。  
例如以下内容。

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

function testPluginGlobalFunction(){
    return true;
}
```

从版本 v4.1.0 起，插件的加载使用 [spl_autoload_register](https://www.php.net/manual/zh/function.spl-autoload-register.php)。  
这个函数支持 class、trait、interface，但似乎不支持不属于类的函数。  
因此，需要和通常不同的写法。请进行以下处理。  

#### 调用 require_once
请在调用方的类的构造函数或 execute 函数等中执行 require_once。

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
        // 对同一文件夹的 function.php、Dir1 文件夹的 function.php 执行 require_once
        require_once dirname(__FILE__).'/function.php';
        require_once dirname(__FILE__).'/Dir1/function.php';

        // 执行
        testPluginGlobalFunction();
        Dir1\testPluginGlobalFunctionDir1();
    }
}

```


#### 推荐：实现为属于类的 static 函数
另外，想以 static 方式调用其他类中定义的函数时，请尽量在类中实现为 static 函数。


``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

//　函数的定义方
class StaticFunction
{
    // 作为 static 函数定义在类中
    public static function testPluginStaticFunction(){
        return true;
    }
}

```

``` php
<?php
namespace App\Plugins\TestPluginGlobalFunction;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;

// 函数的调用方
class Plugin extends PluginBatchBase
{
    /**
     * execute
     */
    public function execute()
    {
        // 作为 static 函数调用
        StaticFunction::testPluginStaticFunction();
        Dir1\StaticFunction::testPluginStaticFunctionDir1();
    }
}

```
