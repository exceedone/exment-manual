## 插件(API)
这是向 Exment 添加新的 API 的插件。
想添加 [API 参考](https://exment.net/reference/webapi.html)中没有的功能时，请使用它。

## 前言
Exment 的 API 插件，使用 PHP 的框架 [Laravel](http://laravel.jp/) 来开发。  
开发 API 时，特别建议由有 Laravel 知识的人来开发。

## 创建方法

### 示例
这里作为示例，创建“从自定义列的名称取得自定义列信息”的 API。

- 示例插件在[这里](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)  


### 创建 config.json
- 创建下面的 config.json 文件。  

~~~ json

{
    "plugin_name": "PluginDemoAPI",
    "uuid": "50716af0-05d3-11ea-aaef-0800200c9a66",
    "plugin_view_name": "API Plugin Sample",
    "description": "从列名取得自定义列信息的示例 API。",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "api",
    "uri": "sampleapi",
    "route": [
        {
            "uri": "column",
            "method": [
                "get"
            ],
            "function": "column"
        }
    ]
}

~~~

- plugin_name 请用半角英文数字填写。
- uuid 是用来区分插件的字符串。由 32 个字符和连字符组成，共 36 个字符。请不要和其他插件的值相同。  
可以用下面的 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type 请填写 api。  
- 在 uri 中，请填写本插件共同的端点。以后可以在插件管理页面中重新设置。
- 在 route 中，以列表的形式定义每个处理的端点、HTTP 方法，以及 Controller 内的方法名。
    - uri：用于显示页面的 uri。实际的 URL 是“http(s)://(Exment的URL)/api/plugins/(插件共同的端点)/(指定的uri)”。  
    - method：HTTP 方法。请用 get、post、put、delete 填写。
    - function：要执行的 Controller 内的方法名。
    - 例：插件共同的端点是“sampleapi”，每个处理的 uri 是“column”，method 是“get”时，是“http(s)://(Exment的URL)/api/plugins/sampleapi/column（方法：GET）”。

> ※URL 是不带“/admin”的标准设置（v7.2.1 及以后新安装的站点）时的情况。`.env` 的 `ADMIN_ROUTE_PREFIX` 有值时（用以前的版本安装的站点是“admin”），请在站点的 URL 后面加上那个值（例：`http(s)://(Exment的URL)/admin/api/plugins/sampleapi/column`）。详细内容请参阅[更改或删除 URL 中包含的“admin”](/zh/additional_prefix)。

### 创建 Plugin 文件

#### 创建主逻辑
创建如下的 PHP 文件。文件名请设为“Plugin.php”。

~~~ php
<?php

// (1)
namespace App\Plugins\PluginDemoAPI;

use Exceedone\Exment\Enums\ErrorCode;
use Exceedone\Exment\Enums\Permission;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginApiBase;
use Validator;

class Plugin extends PluginApiBase
{
    /**
     * (2) column
     *
     * 从列名取得自定义列信息的示例
     *
     * @return mixed
     */
    public function column()
    {
        // 检查请求参数（table 和 column 都是必填）
        $validator = Validator::make(request()->all(), [
            'table' => 'required',
            'column' => 'required',
        ]);
        if ($validator->fails()) {
            return abortJson(400, [
                'errors' => $this->getErrorMessages($validator)
            ], ErrorCode::VALIDATION_ERROR());
        }

        // 从请求参数取得表名和列名
        $table_name = request()->get('table');
        $column_name = request()->get('column');

        // 取得自定义表信息
        $custom_table = CustomTable::where('table_name', $table_name)->first();
        if (!isset($custom_table)) {
            return abort(400);
        }

        // (3) 检查是否有权限
        if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
            return abortJson(403, trans('admin.deny'));
        }

        // 取得自定义列信息
        $column = $custom_table->custom_columns()->where('column_name', $column_name)->first();
        if (!isset($column)) {
            return abort(400);
        }

        return $column;
    }
}
~~~

- (1) namespace 请设为 **App\Plugins\\(插件名称的帕斯卡命名)** 。[详细内容在这里](/zh/plugin_quickstart)

另外，类名请设为“Plugin”，并继承 PluginApiBase。

- (2) 类内的 public 方法名，是在 config.json 的 function 中记载的名称。  

- (3) 调用自定义表信息的方法 hasPermission，可以检查当前用户是否有那个表的权限。可以检查的权限如下。
    - AVAILABLE_ACCESS_CUSTOM_VALUE：访问权限
    - AVAILABLE_VIEW_CUSTOM_VALUE：查看权限
    - AVAILABLE_EDIT_CUSTOM_VALUE：编辑权限
    - AVAILABLE_ALL_CUSTOM_VALUE：全部数据的访问权限
    - AVAILABLE_ALL_EDIT_CUSTOM_VALUE：全部数据的编辑权限


### 压缩为 zip
以上面 2 个文件为最小构成，压缩为 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- PluginDemoAPI.zip
    - config.json
    - Plugin.php
    - （其他需要的 PHP 文件等）


### 访问
用下面的 URL 访问 API。
http(s)://(Exment的URL)/api/plugins/(插件共同的端点)/(route的uri)  

例：插件共同的端点是"sampleapi"，route 的 uri 是"column"时  
http(s)://(Exment的URL)/api/plugins/sampleapi/column


### 其他
- 要访问用插件创建的 API，需要把 API 作用域设为“plugin”。（请在取得令牌时指定。）

- 取得特定 ID 值的数据等，想在 URL 中指定参数时，请在 config.json 的 route→uri 中添加如下的写法。可以像“{id}”“{table}”这样指定。

~~~ json

{
    "route": [
        {
            "uri": "tablecolumn/{table}/{column}",
            "method": [
                "get"
            ],
            "function": "tablecolumn"
        }
    ]
}

~~~

~~~ php

/**
    * 从列名取得自定义列信息的示例
    * ※在 URL 中指定表名和列名
    * @return mixed
    */
public function tablecolumn($table, $column)
{
    // 取得自定义表信息
    $custom_table = CustomTable::where('table_name', $table)->first();
    if (!isset($custom_table)) {
        return abort(400);
    }

    // 检查是否有权限
    if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
        return abortJson(403, trans('admin.deny'));
    }

    // 取得自定义列信息
    $custom_column = $custom_table->custom_columns()->where('column_name', $column)->first();
    if (!isset($custom_column)) {
        return abort(400);
    }

    return $custom_column;
}

~~~

### 示例插件
[API 示例](https://github.com/exment-git/plugin-sample/tree/main/api/PluginDemoAPI)
