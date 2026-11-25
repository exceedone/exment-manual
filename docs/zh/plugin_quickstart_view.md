## 插件(视图)
这是在自定义数据的列表页面中，添加具有自己的设计和功能的视图的插件。
想使用与标准视图（列表、汇总、日历视图）完全不同的功能时，请使用它。

![视图的实现示例](../img/plugin/plugin_view1.png)   

## 前言
Exment 的插件页面，使用下面 2 个来开发。

- PHP 的框架 [Laravel](http://laravel.jp/)
- 管理页面库 [exment-admin-core](https://github.com/exceedone/exment-admin-core)（以 laravel-admin / open-admin 为基础的库，v6.x 及以前是 laravel-admin）

特别建议由有 Laravel 知识的人来开发。


## 自定义视图 主要规格
- 可以在自定义数据的列表页面中，显示自己的功能和页面。
- 视图的设置项目，插件的开发者可以自由添加。添加的项目和标准视图一样，可以在视图设置页面中按视图分别设置。
- 和标准视图一样，可以创建多个视图。即使是同一个插件的视图，也可以按视图改变设置，例如“视图 A 显示全部数据”“视图 B 只显示启用标志为 YES 的数据”。


## 页面和视图的区别
创建自己的页面的方法，除了本插件(视图)以外，还有[插件(页面)](/zh/plugin_quickstart_page)。
两者的主要区别如下。

#### 插件(页面)
- 基本上创建不与特定的表关联的、完全独立的页面。
- 安装插件后，从那时起就可以访问插件自己的页面。
- 因为不与特定的表关联，所以也可以创建合并多个表的页面，或与 Exment 的自定义数据完全无关的页面。

#### 插件(视图)
- 在特定的表的列表页面中，显示所创建的插件的页面。
- 和标准视图（列表、汇总、日历视图）一样，管理员或用户添加视图后，就会显示插件自己的页面。
- 基本上显示与所选表的数据有关的页面。也可以创建合并多个表的页面，或与 Exment 的自定义数据完全无关的页面。



## 创建方法

### 示例
这里作为示例，创建下面的页面。
- 显示把任务按类别排列的、简单的看板视图。
- 相当于“类别”的列，可以在视图设置中选择。这样，同一个插件就可以用于多个表。


### 创建 config.json
- 创建下面的 config.json 文件。  

~~~ json

{
    "plugin_name": "KanbanView",
    "plugin_view_name" : "看板视图",
    "description": "显示看板视图。",
    "uuid":  "4880a5c5-eced-60f4-0ac5-d2d672f63bea",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "view",
    "route": [
        {
            "uri": "update",
            "method": [
                "post"
            ],
            "function": "update"
        }
    ]
}

~~~

- plugin_name 请用半角英文数字填写。
- uuid 是用来区分插件的字符串。由 32 个字符和连字符组成，共 36 个字符。请不要和其他插件的值相同。  
可以用下面的 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type 请填写 view。  
- 在 route 中，以列表的形式定义要执行的 URL 的端点、它的 HTTP 方法，以及 Controller 内的方法。
※视图基本上只显示列表页面，所以不需要设置 route。只在用 ajax 进行异步的请求和响应时才定义。

    - uri：用于显示页面的 uri。实际的 URL 是“http(s)://(Exment的URL)/plugins/(插件的URL)/(指定的uri)”。“插件的URL”是把 plugin_name 改为蛇形命名（snake_case）后的值（在 config.json 中写了“uri”时，是那个值）。  
    - method：HTTP 方法。请用 get、post、put、delete 填写。
    - function：要执行的 Controller 内的方法
    - 例：plugin_name 是“KanbanView”，在 config.json 中指定的 uri 是“update”，指定的 method 是“post”时，是“http(s)://(Exment的URL)/plugins/kanban_view/update（方法：POST）”。

> ※URL 是不带“/admin”的标准设置（v7.2.1 及以后新安装的站点）时的情况。`.env` 的 `ADMIN_ROUTE_PREFIX` 有值时（用以前的版本安装的站点是“admin”），请在站点的 URL 后面加上那个值（例：`http(s)://(Exment的URL)/admin/plugins/kanban_view/update`）。详细内容请参阅[更改或删除 URL 中包含的“admin”](/zh/additional_prefix)。


### 创建 Plugin 文件

#### 创建主逻辑
创建如下的 PHP 文件。文件名请设为“Plugin.php”。

~~~ php
<?php

// (1)
namespace App\Plugins\KanbanView;

use Exceedone\Exment\Services\Plugin\PluginViewBase;
use Exceedone\Exment\Enums\ColumnType;
use Exceedone\Exment\Model\CustomColumn;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginViewBase
{
    // (5) 要添加插件自己的设置时，取消注释
    // protected $useCustomOption = true;

    /**
     * (2) 显示列表时的方法。固定为"grid"
     */
    public function grid()
    {
        $values = $this->values();
        // (6) 调用视图
        return $this->pluginView('sample', ['values' => $values]);
    }

    /**
     * (3) 本插件自己的端点
     */
    public function update(){
        $value = request()->get('value');

        $custom_table = CustomTable::getEloquent(request()->get('table_name'));
        $custom_value = $custom_table->getValueModel(request()->get('id'));

        $custom_value->setValue($value)
            ->save();

        return response()->json($custom_value);
    }

    /**
     * (4) 在视图设置页面中显示的选项
     * Set view option form for setting
     *
     * @param Form $form
     * @return void
     */
    public function setViewOptionForm($form)
    {
        //　添加自己的设置时
        $form->embeds('custom_options', '详细设置', function($form){
            $form->select('category', '类别列')
                ->options($this->custom_table->getFilteredTypeColumns([ColumnType::SELECT, ColumnType::SELECT_VALTEXT])->pluck('column_view_name', 'id'))
                ->required()
                ->help('请选择类别列。它相当于看板的板。候选中会显示自定义列类型“选项（固定值）”“选项（登记值和标签）”。');
        });

        //　要进行筛选的设置时
        static::setFilterFields($form, $this->custom_table);

        // 要进行排序的设置时
        static::setSortFields($form, $this->custom_table);
    }
    
    
    /**
     * (5) 在插件的编辑页面中设置的选项。所有视图共同设置
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        // 需要时添加
        // $form->text('access_key', '访问密钥')
        //     ->help('请输入 YouTube 的访问密钥。');
    }

    
    // 以下是看板视图需要的处理 ----------------------------------------------------

    protected function values(){
        $query = $this->custom_table->getValueQuery();

        // 进行数据的筛选
        $this->custom_view->filterModel($query);

        // 进行数据的排序
        $this->custom_view->sortModel($query);

        // 取得值
        $items = collect();
        $query->chunk(1000, function($values) use(&$items){
            $items = $items->merge($values);
        });

        $boards = $this->getBoardItems($items);

        return $boards;
    }


    protected function getBoardItems($items){
        $category = CustomColumn::getEloquent($this->custom_view->getCustomOption('category'));
        $options = $category->createSelectOptions();

        // set boards
        $boards_dragTo = collect($options)->map(function($option, $key){
            return "board-id-$key";
        })->toArray();

        $boards = collect($options)->map(function($option, $key) use($category, $boards_dragTo){
            return [
                'id' => "board-id-$key",
                'column_name' => $category->column_name,
                'key' => $key,
                'title' => $option,
                'drapTo' => $boards_dragTo,
                'item' => [],
            ];
        })->values()->toArray();

        foreach($items as $item){
            $c = array_get($item, 'value.' . $category->column_name);
            
            foreach($boards as &$board){
                if(!isMatchString($c, $board['key'])){
                    continue;
                }

                $board['item'][] = [
                    'id' => "item-id-$item->id",
                    'title' => $item->getLabel(),
                    'dataid' => $item->id,
                    'table_name' => $this->custom_table->table_name
                ];
            }
        }

        return $boards;
    }
}
~~~

- (1) namespace 请设为 **App\Plugins\\(插件名称的帕斯卡命名)** 。[详细内容在这里](/zh/plugin_quickstart)  
另外，类名请设为“Plugin”，并继承 PluginViewBase。

- (2) 显示列表页面时的 public 方法名，固定为“grid”。

- (3) 另外要创建追加的端点时，类内的 public 方法名，请设为在 config.json 的 function 中写的名称。

- (4) 用函数"public function setViewOptionForm($form)"，定义在视图的设置页面中显示的项目。
这个设置可以按视图进行，所以即使是同一个插件的视图，也可以改变设置，例如“视图 A 显示全部数据”“视图 B 只显示启用标志为 YES 的数据”。
  
    项目有 2 种：插件自己的设置，以及 Exment 标准功能准备的“筛选条件”“排序设置”。
    ※设置的值，用函数“$this->custom_view->getCustomOption('参数名')”取得。
    ※另外，要使用 Exment 标准功能的视图中使用的列设置时，请像下面这样写。

    ~~~ php
    $this->setColumnFields($form);
    ~~~

- (5) 用函数"public function setCustomOptionForm(&$form)"，定义在插件的设置页面中显示的项目。
这是所有视图共同的设置。

    ※要使用自定义设置，请添加“protected $useCustomOption = true;”。
    ※设置的值，用函数“$this->plugin->getCustomOption('参数名')”取得。

- (6) 使用视图（blade 文件）时，请使用函数"$this->pluginView"。

- (7) 要取得插件的端点，请使用函数“$this->getRouteUri('端点名')”。
※要取得 URL 的完整路径，请使用 admin_url($this->getRouteUri('端点名'))。


#### （任意）关于视图
把页面的显示部分（视图）分到别的文件时，blade 文件请保存在文件夹“resources/views”下。

#### （任意）关于 css、js 和其他静态文件
- css 文件请放在文件夹“public/css”中。  
- js 文件请放在文件夹“public/js”中。  
- 其他文件（图片文件等）请放在文件夹“public/assets”中。  
※本示例中，创建了用来制作看板视图的 js 和 css。  


### 压缩为 zip
以上面 2 个文件为最小构成，压缩为 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- KanbanView.zip
    - config.json
    - Plugin.php
    - （其他需要的 PHP 文件、图片文件等）
