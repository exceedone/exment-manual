## 插件(CRUD 页面)
向 Exment 添加自己的 CRUD 页面。  
**※插件(CRUD)准备了很多功能和函数。详细内容请确认[插件参考](/zh/plugin_reference_crud)。**  
※管理页面库的类，按 Exment v7.0.0 及以后的命名空间（“ExmentAdminCore\Admin”）记载。使用 v6.x 及以前的版本时，请换读为“Encore\Admin”。详细内容请确认[这里](/update/v7_0_0)（英语）。  

## 什么是 CRUD
CRUD 是指 Create（创建）、Read（显示）、Update（更新）、Delete（删除）。
本插件专门用来制作在此基础上加上 List（列表）的“CRUD + List”页面。

- 页面的构成，和 Exment 的自定义数据的列表、详情、新建、更新、删除几乎相同。只做最低限度的开发就可以创建。
- 可以不把外部数据（例：其他数据库引擎、WordPress、SharePoint 列表、其他公司的 Web 数据库、会计系统等）导入 Exment，而在 Exment 的页面中管理。
- 要开发的只有数据的取得、添加等内部处理。UI 部分基本上不需要开发，所以和[插件(页面)](/zh/plugin_quickstart_page)的开发相比，开发工时大幅减少。

![CRUD](../img/crud/crud1.png)  

## 主要能做的事
- 可以不把外部数据（例：其他数据库引擎、WordPress、SharePoint 列表、其他公司的 Web 数据库、会计系统等）导入 Exment，而在 Exment 的页面中管理
- 把 Exment 的多个表自由地合并、筛选、排序后显示
- 按功能和权限，控制数据列表、显示、新建、编辑、删除能否执行
- 数据列表配合外部服务，支持“把全部数据显示为列表”和“按每 20 条、50 条、100 条分页显示”两种方式
- 支持多个端点。可以在 1 个插件中设置多个端点，在各个端点中显示 CRUD
- 可以设置认证。支持“密钥”“ID 和密码”或“OAuth 认证”。可以控制为只有在有这些设置值并且已认证时，才能访问 CRUD 页面

## 创建方法（必要的最小限度）
这里以“把与 Exment 不同的 MySQL 数据库‘world’的数据，在 Exment 中列表、显示、创建、更新、删除”的页面为例，说明创建步骤。

### 事前准备
请先进行下面 2 件事。
- 创建外部数据库。本插件使用 MySQL 的示例数据库“world”。请从[官方网站](https://dev.mysql.com/doc/index-other.html)下载 zip 并解压，在您使用的 MySQL（或 MariaDB）环境中执行里面的 SQL。
![MySQL 下载页面](../img/plugin/plugin_event1.png)  

- 打开 config/database.php，在 connections 中添加下面的内容。

```
        'world' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE_WORLD', 'world'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
```


### 创建 config.json
- 创建下面的 config.json 文件。  

~~~ json

{
    "plugin_name": "MySQLWorld",
    "plugin_view_name" : "MySQL World 联动",
    "description": "把 MySQL 的示例数据库“World”和 Exment 联动。",
    "uuid":  "2641201a-ba35-2bd9-af59-9440643ca206",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "uri":  "mysql_world",
    "plugin_type": "crud"
}

~~~

- plugin_name 请用半角英文数字填写。
- uuid 是用来区分插件的字符串。由 32 个字符和连字符组成，共 36 个字符。请不要和其他插件的值相同。  
可以用下面的 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- 在 uri 中，请填写用来访问本插件的 URI。
（没有指定时，从 plugin_name 生成）
- plugin_type 请填写 crud。  

### 创建 Plugin 文件
创建如下的 PHP 文件。文件名请设为“Plugin.php”。  
**※下面的例子是最小限度的内容。插件(CRUD)除了下面的内容以外，还准备了很多功能和函数。详细内容请确认[插件参考](/zh/plugin_reference_crud)。**  

~~~ php
<?php

// (1)
namespace App\Plugins\MySQLWorld;

use ExmentAdminCore\Admin\Widgets\Grid\Grid;
use ExmentAdminCore\Admin\Widgets\Form;
use Exceedone\Exment\Services\Plugin\PluginCrudBase;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class Plugin extends PluginCrudBase
{
    /**
     * (2)标题
     * content title
     *
     * @var string
     */
    protected $title = '世界的城市';

    /**
     * (3)说明文
     * content description
     *
     * @var string
     */
    protected $description = '把世界的城市显示为列表。';

    /**
     * (4)图标
     * content icon
     *
     * @var string
     */
    protected $icon = 'fa-globe';

    /**
     * (5) 取得列定义
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => '城市名', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => '国家代码', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => '人口', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }

    /**
     * (6) 取得数据列表(Paginate)
     * Get data paginate
     *
     * @return LengthAwarePaginator
     */
    public function getPaginate(array $options = []) : ?LengthAwarePaginator
    {
        $query = \DB::connection('world')
            ->table('city');

        // 有自由词搜索时
        $q = array_get($options, 'query');
        if(isset($q)){
            $query->where(function($query) use($q){
                $query
                    ->where('Name', 'LIKE', "%{$q}%")
                    ->orWhere('CountryCode', 'LIKE', "%{$q}%")
                ;
            });
        }

        return $query->paginate(array_get($options, 'per_page') ?? 20, ['*'], 'page', array_get($options, 'page'));
    }

    /**
     * (7) 取得数据详情(1 条数据)
     * read single data
     *
     * @return array|Collection
     */
    public function getData($id, array $options = [])
    {
        return \DB::connection('world')
            ->table('city')
            ->where('ID', $id)->first();
    }

    /**
     * (8) 设置新建和编辑时的表单
     * set form info
     *
     * @return Form|null
     */
    public function setForm(Form $form, bool $isCreate, array $options = []) : ?Form
    {
        if(!$isCreate){
            $form->display('ID');    
        }
        $form->text('Name');

        // 取得国家列表
        $countries = \DB::connection('world')->table('country')->pluck('Name', 'Code');
        $form->select('CountryCode')->options($countries);
        
        $form->number('Population');

        return $form;
    }

    /**
     * (9) 执行新建
     * post create value
     *
     * @return mixed
     */
    public function postCreate(array $posts, array $options = [])
    {
        // 保存到自己的数据库。
        $value = \DB::connection('world')
            ->table('city')
            ->insertGetId($posts);

        return $value;
    }

    /**
     * (10) 执行编辑
     * edit posted value
     *
     * @return mixed
     */
    public function putEdit($id, array $posts, array $options = [])
    {
        // 保存到自己的数据库。
        \DB::connection('world')
            ->table('city')
            ->whereOrIn('ID', $id)
            ->update($posts);

        return $id;
    }

    /**
     * (11) 删除数据
     * delete value
     *
     * @param $id string|array target ids. If multiple check, calls as array.
     * @return mixed
     */
    public function delete($id, array $options = [])
    {
        $ids = stringToArray($id);
        $value = \DB::connection('world')
            ->table('city')
            ->whereIn('ID', $ids)
            ->delete();
    }
}

~~~

- (1) namespace 请设为 **App\Plugins\\(插件名称的帕斯卡命名)** 。[详细内容在这里](/zh/plugin_quickstart)  
另外，类名请设为“Plugin”，并继承 PluginCrudBase。

- (2) 属性 title 是在各页面中显示的标题。

- (3) 属性 description 是在各页面中显示的说明文。

- (4) 属性 icon 是在各页面中显示的图标。

- (5) 函数 getFieldDefinitions 是以关联数组取得列定义的函数。  
    - 请一定添加 1 个"primary" => true 的键。（目前不支持复合键）  
    - "key"是用于取得数据、HTML 各元素的 name 等的项目名。请用英文数字输入。
    - "label"用于列表页面等的项目名。
    - "grid"设置在要显示于列表页面的项目上。请用整数填写显示顺序。
    - "show"设置在要显示于详情页面的项目上。请用整数填写显示顺序。
    - "create"设置在要显示于新建页面的项目上。请用整数填写显示顺序。
    - "edit"设置在要显示于编辑页面的项目上。请用整数填写显示顺序。

- (6) 函数 getPaginate 是以分页的形式取得数据列表的函数。  
请把取得的数据以 LengthAwarePaginator 的形式返回。
列表的各元素请设为关联数组，它的键请和在 getFieldDefinitions 中设置的键相同。
※在页面中进行了搜索时，参数 $options 中会设置值。详细内容请确认[插件参考](/zh/plugin_reference_crud)。

- (7) 函数 getData 取得数据详情（1 条数据）。  
数据请设为关联数组，它的键请和在 getFieldDefinitions 中设置的键相同。

- (8) 函数 setForm 设置新建时和编辑时的表单。  
想把表单做成自由的形式时，请实现这个函数。
※不实现这个函数时，在函数 getFieldDefinitions 中设置了"create"或"edit"的项目会显示在页面中。

- (9) 函数 postCreate 在新建页面中保存时被调用。请在这里登记新的数据。

- (10) 函数 putEdit 在编辑页面中保存时被调用。请在这里更新数据。

- (11) 函数 delete 在页面中删除时被调用。请在这里删除数据。
※根据页面的不同，参数 $id 中会设置数组。


### 压缩为 zip
以上面 2 个文件为最小构成，压缩为 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- MySQLWorld.zip
    - config.json
    - Plugin.php


## 示例插件
※下面的示例插件支持 Exment v7.0.0 及以后的版本，使用命名空间“ExmentAdminCore\Admin”。  
使用 v6.x 及以前的版本时，请把“Plugin.php”内的“ExmentAdminCore\Admin”替换为“Encore\Admin”后使用。详细内容请确认[这里](/update/v7_0_0)（英语）。

准备了下面的示例。

| 名称 | 概要 | 认证 | 示例链接 |
| ---- | ---- | ---- | ---- |
| MySQLWorld | 连接与 Exment 不同的数据库，进行数据的取得、添加、编辑、删除。 | - | [其他 MySQL 联动](https://github.com/exment-git/plugin-sample/tree/main/crud/mysqlworld) |
| ShowLevels3Data | 使用自己的 SQL，可以同时列表、参照 3 个层级的项目的示例。 | - | [用自己的 SQL 显示 Exment 数据](https://github.com/exment-git/plugin-sample/tree/main/crud/show_levels3_data) |
| WordPress | 使用 REST API，把指定的 Wordpress 站点的文章显示为列表和详情。 | - | [WordPress 联动](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress) |
| WordPresses | 使用 REST API，把多个 Wordpress 站点的文章显示为列表和详情。支持多个端点，在页面中用按钮切换目标站点。 | - | [多个站点的 WordPress 联动](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpresses) |
| WordPressPost | 使用 REST API，把指定的 Wordpress 站点的文章显示为列表和详情。另外，使用事先设置的访问密钥，也进行文章的添加、编辑、删除。 | ID 和密码 | [WordPress 文章](https://github.com/exment-git/plugin-sample/tree/main/crud/wordpress_post) |
| OtherExment | 和别的服务器的 Exment 进行 Rest API 联动，取得数据。 | OAuth | [和其他 Exment 的 REST API 联动](https://github.com/exment-git/plugin-sample/tree/main/crud/other_exment) |
