## プラグイン(ページ)
Exmentに新しい画面を作成することができます。  
既存の機能とは全く異なるページを使用する場合にご利用ください。  

## はじめに
Exmentのプラグインページは、PHPのフレームワーク[Laravel](http://laravel.jp/)、ならびに[laravel-admin](https://laravel-admin.org/docs/) を使用して開発します。  
ページの開発を行う場合には、特にLaravelの知識がある方が開発することをおすすめします。

## 作成方法

### サンプル
ここではサンプルとして、以下のページを作成します。
- YouTubeでデータ検索を行うための検索バーを表示する。  
- 入力した検索値で、YouTube検索を行い。上位20件を表示する。  
- 「登録」ボタンをクリックした動画の、動画IDとタイトル、説明文、リンク、再生数、高評価数、低評価数を、テーブル「YouTube」に登録する。  

![スクリプト](img/plugin/plugin_page2.png)   

※実行には、YouTubeのアクセスキーが必要です。[こちら](https://qiita.com/shinkai_/items/10a400c25de270cb02e4)を参考に、キーを取得してください。  
  
※事前に、[こちら](https://exment.net/downloads/sample/template/YouTube.zip)のテンプレートをインポートしてください。

- サンプルプラグイン[こちら](https://github.com/exment-git/plugin-sample/tree/main/page/YouTubeSearch)  


### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json

{
    "plugin_name": "YouTubeSearch",
    "plugin_view_name" : "YouTube検索",
    "description": "YouTubeを検索し、再生数などをデータ保存します。",
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
- routeには必ず、uriが空（""）となるものを含めてください。メニューからプラグインのページに画面遷移するときに、このエンドポイントにアクセスします。

### Pluginファイル作成

#### メインロジック作成
以下のようなPHPファイルを作成します。ファイル名は「Plugin.php」としてください。

~~~ php
<?php

// (1)
namespace App\Plugins\YouTubeSearch;

use Encore\Admin\Widgets\Box;
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
     * (2) youTube結果一覧表示
     *
     * @return void
     */
    public function list()
    {
        $html = $this->getIndexBox()->render();

        // 文字列検索
        $client = new Client([
            'base_uri' => 'https://www.googleapis.com/youtube/v3/',
        ]);

        $method = 'GET';
        $uri = "search?part=id&type=video&maxResults=20&key=" . $this->plugin->getCustomOption('access_key') 
            . "&q=" . urlencode(request()->get('youtube_search_query')); //検索
        $options = [];
        $response = $client->request($method, $uri, $options);

        $list = json_decode($response->getBody()->getContents(), true);
        $ids = collect(array_get($list, 'items', []))->map(function($l){
            return array_get($l, 'id.videoId');
        })->toArray();


        // idより詳細を検索
        $client = new Client([
            'base_uri' => 'https://www.googleapis.com/youtube/v3/',
        ]);

        $method = 'GET';
        $uri = "videos?part=id,snippet,statistics&key=" . $this->plugin->getCustomOption('access_key') 
            . "&id=" . implode(',', $ids); //検索
        $options = [];
        $response = $client->request($method, $uri, $options);

        $list = json_decode($response->getBody()->getContents(), true);
        
        $html .= new Box("YouTube検索結果", view('exment_you_tube_search::list', [
            'items' => array_get($list, 'items', []),
            // (5)
            'item_action' => $this->plugin->getRouteUri('save'),
        ])->render());

        return $html;
    }

    /**
     * (2) データ保存
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
     * 検索ボックス取得
     *
     * @return void
     */
    protected function getIndexBox(){
        // (3) YouTube アクセスキーのチェック
        $hasKey = !is_null($this->plugin->getCustomOption('access_key'));

        // (4)
        return new Box("YouTube検索", view('exment_you_tube_search::index', [
            'action' => $this->plugin->getRouteUri('list'),
            'youtube_search_query' => request()->get('youtube_search_query'),
            'hasKey' => $hasKey,
        ]));
    }
    
    /**
     * (3) プラグインの編集画面で設定するオプション。アクセスキーを入力させる
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', 'アクセスキー')
            ->help('YouTubeのアクセスキーを入力してください。');
    }
}
~~~

- (1) namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)  
また、クラス名は「Plugin」とし、PluginPageBaseを継承してください。

- (2) クラス内のpublicメソッド名は、config.jsonのfunctionに記載の名称になります。  

- (3) 関数"public function setCustomOptionForm(&$form)"は、プラグインの設定画面で表示される項目です。  
今回の場合、YouTube Data APIを実行するために必要なアクセスキーを、画面から設定できるようになります。  
![ページ](img/plugin/plugin_page1.png)
※カスタム設定を使用するには、「protected $useCustomOption = true;」を追加してください。  
※設定した値を取得するには、関数「$this->plugin->getCustomOption('パラメータ名')」を使用してください。

- (4) ビューを使用する場合、ビュー名の接頭辞は「exment_（プラグイン名のスネークケース）::」を追加してください。  

- (5) プラグインのエンドポイントを取得したい場合、関数「$this->getRouteUri('エンドポイント名')」を使用してください。  
※URLフルパスを取得したい場合、admin_url($this->getRouteUri('エンドポイント名'))を使用してください。


#### (任意)ビューについて
ビューを分離する場合、bladeファイルはフォルダ「resources/views」以下に保存してください。  

#### (任意)css、js、それ以外の静的ファイルについて
- cssファイルは、フォルダ「public/css」に配置してください。  
- jsファイルは、フォルダ「public/js」に配置してください。  
- それ以外のファイル(画像ファイルなど)は、フォルダ「public/assets」に配置してください。  


### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- YouTubeSearch.zip
    - config.json
    - Plugin.php
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

### サンプルプラグイン
[YouTube検索](https://github.com/exment-git/plugin-sample/tree/main/page/YouTubeSearch)  
※事前に、[こちら](https://exment.net/downloads/sample/template/YouTube.zip)のテンプレートをインポートしてください。