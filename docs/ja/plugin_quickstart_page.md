## プラグイン(ページ)
> v2.1.0仕様変更予定です。

Exmentに新しい画面を作成することができます。  
既存の機能とは全く異なるページを使用する場合にご利用ください。  

## 作成方法
ここではサンプルとして、以下のページを作成します。
- YouTubeでデータ検索を行うための検索バーを表示する。  
- 入力した検索値で、YouTube検索を行い。上位20件を表示する。  
- 「登録」ボタンをクリックした動画の、動画IDとタイトル、説明文、リンク、再生数、高評価数、低評価数を、テーブル「YouTube」に登録する。  
※実行には、YouTubeのアクセスキーが必要です。[こちら](https://www.plusdesign.co.jp/blog/?p=7752)を参考に、キーを取得してください。  

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json

{
    "plugin_name": "YouTubeSearch",
    "plugin_view_name" : "YouTube検索",
    "explain": "YouTubeを検索し、再生数などをデータ保存します。",
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
            "uri": "post",
            "method": [
                "post"
            ],
            "function": "save"
        }
    ]
}

~~~

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、pageと記入してください。  
- routeは、実行するURLのエンドポイントと、そのHTTPメソッド、Contoller内のメソッドを一覧で定義します。
    - uri：ページ表示のためのuriです。実際のURLは、「http(s)://(ExmentのURL)/admin/plugins/(プラグイン管理画面で設定したURL)/(指定したuri)」になります。  
    - method：HTTPメソッドです。get,post,put,deleteで記入してください。
    - function：実行するContoller内のメソッド
    - 例：プラグイン管理画面で設定したURLを「youtube_search」、config.jsonで指定したuriが「list」、指定したmethodが「get」の場合、「http(s)://(ExmentのURL)/admin/plugins/youtube_search/list（メソッド：GET）」。

### Pluginファイル作成
- 以下のようなPHPファイルを作成します。クラス名は、config.jsonのcontrollerに記載の名称にしてください。

~~~ php
<?php

namespace App\Plugins\PluginDemoPage;

use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Facades\Admin;
use Encore\Admin\Layout\Content;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Exceedone\Exment\Model\PluginPage;
use Illuminate\Http\Request;

class PluginManagementController extends Controller
{
    public function show_details($id){

        return Admin::content(function (Content $content) use ($id) {

            $content->header('Show');
            $content->description('Show');

            $content->body($this->form()->edit($id));
        });
    }

    protected function grid()
    {
        return Admin::grid(PluginPage::class, function (Grid $grid) {

            $grid->column('plugin_name', 'プラグイン名')->sortable();
            $grid->column('plugin_author', '作者')->sortable();

            $grid->disableExport();

        });
    }

    /**
     * Edit interface.
     *
     * @param $id
     * @return Content
     */
    public function edit_test($id)
    {
        return Admin::content(function (Content $content) use ($id) {

            $content->header('header');
            $content->description('description');

            $content->body($this->form($id)->edit($id));
        });
    }

    public function update_test($id){
        return $this->form()->update($id);
    }

    /**
     * Create interface.
     *
     * @return Content
     */
    public function create_new()
    {
        return Admin::content(function (Content $content) {

            $content->header('header');
            $content->description('description');

            $content->body($this->form());
        });
    }

    public function post(Request $request)
    {
        dd($request);
        return Admin::content(function (Content $content) {

            $content->header('header');
            $content->description('description');

            $content->body($this->form());
        });
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        return Admin::form(PluginPage::class, function (Form $form) {

            $form->display('id', 'ID');
            $form->text('plugin_name', 'Plugin Name');
            $form->text('plugin_author', 'Author');
            $form->display('created_at', 'Created At');
            $form->display('updated_at', 'Updated At');
        });
    }

}

~~~
- namespaceは、**App\Plugins\(プラグイン名)**としてください。

- Contoller内のpublicメソッド名は、config.jsonのfunctionに記載の名称になります。

### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- PluginDemoPage.zip
    - config.json
    - PluginManagementController.php
    - (その他、必要なPHPファイル、画像ファイルなど)


### その他
- 特定のID値のデータ詳細を表示したい場合、config.jsonのrouteに以下のような記述を追加してください。  
「{id}」のようにuriを指定することができます。  

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