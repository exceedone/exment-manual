## 插件(页面)
可以在 Exment 中创建新的页面。  
想使用和标准功能完全不同的页面时，请使用这一种。  
本页以搜索 YouTube 的页面为例，说明插件(页面)的创建方法。  

## 前言
Exment 的插件页面使用 PHP 框架 [Laravel](http://laravel.jp/) 以及管理页面库 [exment-admin-core](https://github.com/exceedone/exment-admin-core)（以 laravel-admin / open-admin 为基础的库，v6.x 及以前为 laravel-admin）开发。  
开发页面时，特别建议由具备 Laravel 知识的人来开发。

※管理页面库的类，按 Exment v7.0.0 及以上版本的命名空间（“ExmentAdminCore\Admin”）记载。  
使用 v6.x 及以前的版本时，请替换为“Encore\Admin”。详情请参阅[这里](/update/v7_0_0)（英语）。

## 创建方法

### 示例
这里作为示例，创建以下页面。
- 显示用来在 YouTube 中搜索数据的搜索栏。  
- 用输入的搜索值进行 YouTube 搜索，显示前 20 条。  
- 把点击了“登记”按钮的视频的视频 ID、标题、说明文字、链接、播放数、点赞数、点踩数登记到表“YouTube”中。  

![脚本](../img/plugin/plugin_page2.png)   

※执行时需要 YouTube 的访问密钥。请参考[这里](https://qiita.com/shinkai_/items/10a400c25de270cb02e4)（日语）获取密钥。  
  
※请事先导入[这里](https://exment.net/downloads/sample/template/YouTube.zip)的模板。

- 示例插件见[这里](https://github.com/exment-git/plugin-sample/tree/main/page/YouTubeSearch)  


### 创建 config.json
- 创建以下的 config.json 文件。  

~~~ json

{
    "plugin_name": "YouTubeSearch",
    "plugin_view_name" : "YouTube 搜索",
    "description": "搜索 YouTube，并把播放数等保存为数据。",
    "uuid":  "c6d8daa0-c255-11e9-bb97-0800200c9a66",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "page",
    "route": [
        {
            "uri": "",
            "method": [
                "get"
            ],
            "function": "index"
        },
        {
            "uri": "list",
            "method": [
                "get"
            ],
            "function": "list"
        },
        {
            "uri": "save",
            "method": [
                "post"
            ],
            "function": "save"
        }
    ]
}

~~~

- plugin_name 请用半角英文数字填写。
- uuid 是 32 个字符加连字符、共 36 个字符的字符串。用来使插件唯一。  
请通过以下 URL 等生成。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type 请填写 page。  
- route 以列表定义要执行的 URL 的端点、其 HTTP 方法，以及 Controller 内的方法。
    - uri：用于显示页面的 uri。实际的 URL 为“http(s)://(Exment的URL)/plugins/(在插件管理页面中设置的URL)/(指定的uri)”。  
    - method：HTTP 方法。请用 get,post,put,delete 填写。
    - function：要执行的 Controller 内的方法
    - 例：在插件管理页面中设置的 URL 为“youtube_search”、在 config.json 中指定的 uri 为“list”、指定的 method 为“get”时，为“http(s)://(Exment的URL)/plugins/youtube_search/list（方法：GET）”。
- route 中请务必包含 uri 为空（""）的一项。从菜单跳转到插件的页面时，会访问这个端点。

> ※此 URL 是不带“/admin”的标准设置（v7.2.1 及以上版本新安装的站点）时的写法。`.env` 的 `ADMIN_ROUTE_PREFIX` 有值时（用以前的版本安装的站点为“admin”），请在站点的 URL 后面加上该值（例：`http(s)://(Exment的URL)/admin/plugins/youtube_search/list`）。详情请参阅[更改、删除 URL 中包含的“admin”](/zh/additional_prefix)。

### 创建 Plugin 文件

#### 创建主要逻辑
创建如下的 PHP 文件。文件名请设为“Plugin.php”。

~~~ php
<?php

// (1)
namespace App\Plugins\YouTubeSearch;

use ExmentAdminCore\Admin\Widgets\Box;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginPageBase;
use GuzzleHttp\Client;

class Plugin extends PluginPageBase
{
    // (3)
    protected $useCustomOption = true;

    /**
     * (2) Index
     *
     * @return void
     */
    public function index()
    {
        return $this->getIndexBox();
    }

    /**
     * (2) 显示 youTube 结果列表
     *
     * @return void
     */
    public function list()
    {
        $html = $this->getIndexBox()->render();

        // 字符串搜索
        $client = new Client([
            'base_uri' => 'https://www.googleapis.com/youtube/v3/',
        ]);

        $method = 'GET';
        $uri = "search?part=id&type=video&maxResults=20&key=" . $this->plugin->getCustomOption('access_key') 
            . "&q=" . urlencode(request()->get('youtube_search_query')); //搜索
        $options = [];
        $response = $client->request($method, $uri, $options);

        $list = json_decode($response->getBody()->getContents(), true);
        $ids = collect(array_get($list, 'items', []))->map(function($l){
            return array_get($l, 'id.videoId');
        })->toArray();


        // 根据 id 搜索详细内容
        $client = new Client([
            'base_uri' => 'https://www.googleapis.com/youtube/v3/',
        ]);

        $method = 'GET';
        $uri = "videos?part=id,snippet,statistics&key=" . $this->plugin->getCustomOption('access_key') 
            . "&id=" . implode(',', $ids); //搜索
        $options = [];
        $response = $client->request($method, $uri, $options);

        $list = json_decode($response->getBody()->getContents(), true);
        
        $html .= new Box("YouTube 搜索结果", view('exment_you_tube_search::list', [
            'items' => array_get($list, 'items', []),
            // (5)
            'item_action' => $this->plugin->getRouteUri('save'),
        ])->render());

        return $html;
    }

    /**
     * (2) 保存数据
     *
     * @return void
     */
    public function save(){
        $request = request();
        $model = CustomTable::getEloquent('youtube')->getValueModel();
        $model->setValue('youtubeId', $request->get('youtubeId'));
        $model->setValue('description', $request->get('description'));
        $model->setValue('viewCount', $request->get('viewCount'));
        $model->setValue('likeCount', $request->get('likeCount'));
        $model->setValue('dislikeCount', $request->get('dislikeCount'));
        $model->setValue('url', $request->get('url'));
        $model->setValue('title', $request->get('title'));
        $model->setValue('publishedAt', $request->get('publishedAt'));
        $model->save();

        admin_toastr(trans('admin.save_succeeded'));
        return redirect()->back()->withInput();
    }

    /**
     * 获取搜索框
     *
     * @return void
     */
    protected function getIndexBox(){
        // (3) 检查 YouTube 访问密钥
        $hasKey = !is_null($this->plugin->getCustomOption('access_key'));

        // (4)
        return new Box("YouTube 搜索", view('exment_you_tube_search::index', [
            'action' => $this->plugin->getRouteUri('list'),
            'youtube_search_query' => request()->get('youtube_search_query'),
            'hasKey' => $hasKey,
        ]));
    }
    
    /**
     * (3) 在插件的编辑页面中设置的选项。让用户输入访问密钥
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', '访问密钥')
            ->help('请输入 YouTube 的访问密钥。');
    }
}
~~~

- (1) namespace 请设为 **App\Plugins\\(插件名称的帕斯卡命名)** 。[详情见这里](/zh/plugin_quickstart)  
另外，类名请设为“Plugin”，并继承 PluginPageBase。

- (2) 类内的 public 方法名，是 config.json 的 function 中记载的名称。  

- (3) 函数"public function setCustomOptionForm(&$form)"是显示在插件设置页面中的项目。  
在这个例子中，可以在页面上设置执行 YouTube Data API 所需的访问密钥。  
![页面](../img/plugin/plugin_page1.png)
※要使用自定义设置，请添加“protected $useCustomOption = true;”。  
※要获取设置的值，请使用函数“$this->plugin->getCustomOption('参数名')”。

- (4) 使用视图时，请在视图名称前加上前缀“exment_（插件名称的蛇形命名）::”。  

- (5) 想获取插件的端点时，请使用函数“$this->getRouteUri('端点名')”。  
※想获取 URL 的完整路径时，请使用 admin_url($this->getRouteUri('端点名'))。


#### (可选)关于视图
要把视图分离出来时，请把 blade 文件保存在文件夹“resources/views”之下。  

#### (可选)关于 css、js 和其他静态文件
- css 文件请放在文件夹“public/css”中。  
- js 文件请放在文件夹“public/js”中。  
- 其他文件（图片文件等）请放在文件夹“public/assets”中。  


### 压缩为 zip
以上述 2 个文件作为最小构成，压缩为 zip。  
zip 文件名请设为“(plugin_name).zip”。  
- YouTubeSearch.zip
    - config.json
    - Plugin.php
    - (其他需要的 PHP 文件、图片文件等)


### 其他
- 想显示特定 ID 值的数据详细内容时，请在 config.json 的 route 中添加如下的内容。  
可以像“{id}”这样指定 uri。  

~~~ json

{
    "route": [
        {
            "uri": "show_details/{id}",
            "method": [
                "get"
            ],
            "function": "show_details"
        }
    ]
}

~~~

### 示例插件
※以下的示例插件支持 Exment v7.0.0 及以上版本，使用命名空间“ExmentAdminCore\Admin”。  
使用 v6.x 及以前的版本时，请把“Plugin.php”内的“ExmentAdminCore\Admin”替换为“Encore\Admin”后使用。详情请参阅[这里](/update/v7_0_0)（英语）。

[YouTube 搜索](https://github.com/exment-git/plugin-sample/tree/main/page/YouTubeSearch)  
※请事先导入[这里](https://exment.net/downloads/sample/template/YouTube.zip)的模板。
