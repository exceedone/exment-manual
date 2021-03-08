## プラグイン(ビュー)
Exmentのカスタムデータ一覧画面に、新しいデザインや独自の機能を作成し、追加することができます。  
標準で用意されたビューである、一覧・集計・カレンダービューと、全く異なる機能を使用したい場合にご利用ください。  



## はじめに
Exmentのプラグインページは、PHPのフレームワーク[Laravel](http://laravel.jp/)、ならびに[laravel-admin](https://laravel-admin.org/docs/) を使用して開発します。  
ページの開発を行う場合には、特にLaravelの知識がある方が開発することをおすすめします。


## 作成方法

### サンプル
ここではサンプルとして、以下のページを作成します。
- カテゴリごとにタスクをかんばんを作成する、かんばんビューを表示する。  
- 「カテゴリ」に該当する列は、ビュー設定で適宜可能にする。これにより、複数のテーブルで使用できるようにする。


### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json

{
    "plugin_name": "KanbanView",
    "plugin_view_name" : "かんばんビュー",
    "description": "かんばんビューを表示します。",
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

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、viewと記入してください。  
- routeは、実行するURLのエンドポイントと、そのHTTPメソッド、Contoller内のメソッドを一覧で定義します。  
※基本的には、ビューは一覧画面の表示のみのため、routeの設定は不要です。ですが、ajaxによる非同期のリクエスト・レスポンスを行う場合、定義を実施してください。

    - uri：ページ表示のためのuriです。実際のURLは、「http(s)://(ExmentのURL)/admin/plugins/(プラグイン管理画面で設定したURL)/(指定したuri)」になります。  
    - method：HTTPメソッドです。get,post,put,deleteで記入してください。
    - function：実行するContoller内のメソッド
    - 例：プラグイン管理画面で設定したURLを「youtube_search」、config.jsonで指定したuriが「list」、指定したmethodが「get」の場合、「http(s)://(ExmentのURL)/admin/plugins/youtube_search/list（メソッド：GET）」。


### Pluginファイル作成

#### メインロジック作成
以下のようなPHPファイルを作成します。ファイル名は「Plugin.php」としてください。

~~~ php
<?php

// (1)
namespace App\Plugins\TestPluginView;

use Exceedone\Exment\Services\Plugin\PluginViewBase;
use Exceedone\Exment\Enums\ColumnType;
use Exceedone\Exment\Model\CustomColumn;

class Plugin extends PluginViewBase
{
    // (3) プラグイン独自の設定を追加する場合はコメントアウト
    // protected $useCustomOption = true;

    /**
     * (2) 一覧表示時のメソッド。"grid"固定
     */
    public function grid()
    {
        $values = $this->values();
        // (5) ビューを呼び出し
        return $this->pluginView('sample', ['values' => $values]);
    }

    /**
     * (2) このプラグイン独自のエンドポイント
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
     * (3) ビュー設定画面で表示するオプション
     * Set view option form for setting
     *
     * @param Form $form
     * @return void
     */
    public function setViewOptionForm($form)
    {
        //　独自設定を追加する場合
        $form->embeds('custom_options', '詳細設定', function($form){
            $form->select('category', 'カテゴリ列')
                ->options($this->custom_table->getFilteredTypeColumns([ColumnType::SELECT, ColumnType::SELECT_VALTEXT])->pluck('column_view_name', 'id'))
                ->required()
                ->help('カテゴリ列を選択してください。カンバンのボードに該当します。カスタム列種類「選択肢」「選択肢(値・見出し)」が候補に表示されます。');
        });

        //　フィルタ(絞り込み)の設定を行う場合
        static::setFilterFields($form, $this->custom_table);

        // 並べ替えの設定を行う場合
        static::setSortFields($form, $this->custom_table);
    }
    
    
    /**
     * (4) プラグインの編集画面で設定するオプション。全ビュー共通で設定する
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        // 必要な場合、追加
        // $form->text('access_key', 'アクセスキー')
        //     ->help('YouTubeのアクセスキーを入力してください。');
    }

    
    // 以下、かんばんビューで必要な処理 ----------------------------------------------------

    protected function values(){
        $query = $this->custom_table->getValueQuery();

        // データのフィルタを実施
        $this->custom_view->filterModel($query);

        // データのソートを実施
        $this->custom_view->sortModel($query);

        // 値を取得
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

- (1) namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)  
また、クラス名は「Plugin」とし、PluginViewBaseを継承してください。

- (2) 一覧画面表示時のpublicメソッド名は、grid固定になります。

- (3) その他、追加のエンドポイントを作成する場合、クラス内のpublicメソッド名は、config.jsonのfunctionに記載の名称で記載してください。  

- (4) 関数"public function setViewOptionForm(&$form)"は、ビューの設定画面で表示される項目です。  
この設定は、ビュー個別に設定を行うことできるため、同じビューでも、例えば「ビューAでは、全データを表示する」「ビューBでは、有効フラグがYESのデータのみ表示する」といった設定を行うことが出来ます。  
  
プラグイン独自の設定と、Exment標準機能で用意している、「フィルター条件」「並べ替え設定」の2種類があります。  
※設定した値を取得するには、関数「$this->custom_view->getCustomOption('パラメータ名')」を使用してください。  
※また、Exmentの標準機能のビューで使用している列設定を使用する場合、以下のように記述してください。

- (4) 関数"public function setCustomOptionForm(&$form)"は、プラグインの設定画面で表示される項目です。    
すべてのビューで、共通で使用される設定になります。  

※カスタム設定を使用するには、「protected $useCustomOption = true;」を追加してください。  
※設定した値を取得するには、関数「$this->plugin->getCustomOption('パラメータ名')」を使用してください。

- (5) ビューを使用する場合、関数"$this->pluginView"を使用してください。  

- (6) プラグインのエンドポイントを取得したい場合、関数「$this->getRouteUri('エンドポイント名')」を使用してください。  
※URLフルパスを取得したい場合、admin_url($this->getRouteUri('エンドポイント名'))を使用してください。


#### (任意)ビューについて
ビューを分離する場合、bladeファイルはフォルダ「resources/views」以下に保存してください。  

#### (任意)css、js、それ以外の静的ファイルについて
- cssファイルは、フォルダ「public/css」に配置してください。  
- jsファイルは、フォルダ「public/js」に配置してください。  
- それ以外のファイル(画像ファイルなど)は、フォルダ「public/assets」に配置してください。  
※本サンプルでは、かんばんビューを作成するためのjs・cssを作成しています。  


### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- TestPluginView.zip
    - config.json
    - Plugin.php
    - (その他、必要なPHPファイル、画像ファイルなど)


## カスタムビュー 主な仕様
- カスタムデータの一覧画面で、独自の機能や画面を表示することができます。
- ビューの設定は、プラグイン開発者が、独自の設定を自由に追加することができます。他の標準のビューと同じように、ビュー設定画面で、ビュー特有の設定を個別に行うことができます。
- 他の標準のビューと同じように、複数のビューを作成することができるので、同じビューでも、例えば「ビューAでは、全データを表示する」「ビューBでは、有効フラグがYESのデータのみ表示する」といった設定を行うことが出来ます。


## ページとビューの違い
独自のページを作成する方法として、[プラグイン(ページ)](/ja/plugin_quickstart_page)があります。  
プラグイン(ページ)とプラグイン(ビュー)は、主に以下のような違いがあります。  

#### プラグイン(ページ)
- 基本的に、特定のテーブルに紐付かず、完全に独立したページを作成します。  
- プラグインをインストールした段階で、プラグイン独自の画面にアクセスすることができるようになります。  
- 特定のテーブルに紐付かないので、複数のテーブルを結合したり、逆にExmentのカスタムデータとまったく無関係のページを作成することができます。  

#### プラグイン(ビュー)
- 特定のテーブルの一覧画面に、作成したプラグイン画面が表示されます。  
- 標準で用意されたビューである、一覧・集計・カレンダービューと同じように、管理者もしくはユーザーが、ビューを追加することによって、プラグイン独自の画面が表示されます。
- 複数のテーブルを結合したり、逆にExmentのカスタムデータとまったく無関係のページを作成することもできますが、基本的には、選択したテーブルのデータに関連する画面を表示します。

