## プラグイン(ビュー)
カスタムデータの一覧画面に、独自のデザインや機能を持つビューを追加するプラグインです。
標準のビュー（一覧・集計・カレンダービュー）とは、まったく違う機能を使いたいときにご利用ください。

![ビュー実装例](img/plugin/plugin_view1.png)   

## はじめに
Exmentのプラグインページは、次の2つを使って開発します。

- PHPのフレームワーク[Laravel](http://laravel.jp/)
- 管理画面ライブラリ[exment-admin-core](https://github.com/exceedone/exment-admin-core)(laravel-admin / open-adminをベースとしたライブラリ、v6.x以前はlaravel-admin)

特に、Laravelの知識がある方が開発することをおすすめします。


## カスタムビュー 主な仕様
- カスタムデータの一覧画面に、独自の機能や画面を表示できます。
- ビューの設定項目は、プラグインの開発者が自由に追加できます。追加した項目は、標準のビューと同じように、ビュー設定画面でビューごとに設定できます。
- 標準のビューと同じように、ビューを複数作れます。同じプラグインのビューでも、「ビューAでは、全データを表示する」「ビューBでは、有効フラグがYESのデータのみ表示する」のように、ビューごとに設定を変えられます。


## ページとビューの違い
独自の画面を作る方法には、このプラグイン(ビュー)のほかに、[プラグイン(ページ)](/ja/plugin_quickstart_page)があります。
2つの主な違いは、次のとおりです。

#### プラグイン(ページ)
- 基本的に、特定のテーブルに紐付かない、完全に独立したページを作ります。
- プラグインをインストールすると、その時点でプラグイン独自の画面にアクセスできるようになります。
- 特定のテーブルに紐付かないので、複数のテーブルを結合したページや、Exmentのカスタムデータとまったく無関係のページも作れます。

#### プラグイン(ビュー)
- 特定のテーブルの一覧画面に、作成したプラグインの画面が表示されます。
- 標準のビュー（一覧・集計・カレンダービュー）と同じように、管理者またはユーザーがビューを追加すると、プラグイン独自の画面が表示されます。
- 基本的には、選択したテーブルのデータに関連する画面を表示します。複数のテーブルを結合した画面や、Exmentのカスタムデータとまったく無関係の画面を作ることもできます。



## 作成方法

### サンプル
ここではサンプルとして、以下のページを作成します。
- タスクをカテゴリごとに並べる、シンプルなかんばんビューを表示します。
- 「カテゴリ」にあたる列は、ビュー設定で選べるようにします。これで、同じプラグインを複数のテーブルで使えます。


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
- uuidは、プラグインを見分けるための文字列です。32文字とハイフンで、合計36文字です。ほかのプラグインと同じ値にならないようにします。  
次のURLなどで作れます。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、viewと記入してください。  
- routeには、実行するURLのエンドポイントと、そのHTTPメソッド、Controller内のメソッドを一覧で定義します。
※ビューは、基本的に一覧画面を表示するだけなので、routeの設定は不要です。ajaxで非同期のリクエスト・レスポンスを行うときだけ、定義してください。

    - uri：ページ表示のためのuriです。実際のURLは、「http(s)://(ExmentのURL)/plugins/(プラグインのURL)/(指定したuri)」になります。「プラグインのURL」は、plugin_nameをスネークケースにしたものです（config.jsonに「uri」を書いた場合は、その値）。  
    - method：HTTPメソッドです。get,post,put,deleteで記入してください。
    - function：実行するController内のメソッド
    - 例：plugin_nameが「KanbanView」、config.jsonで指定したuriが「update」、指定したmethodが「post」の場合、「http(s)://(ExmentのURL)/plugins/kanban_view/update（メソッド：POST）」。

> ※URL は、「/admin」が付かない標準の設定（v7.2.1 以降に新しくインストールしたサイト）の場合です。`.env` の `ADMIN_ROUTE_PREFIX` に値がある場合（前の版で入れたサイトは「admin」）は、サイトの URL のあとにその値を足してください（例：`http(s)://(ExmentのURL)/admin/plugins/kanban_view/update`）。詳しくは[URLに含む「admin」の変更・削除](/ja/additional_prefix)をご覧ください。


### Pluginファイル作成

#### メインロジック作成
以下のようなPHPファイルを作成します。ファイル名は「Plugin.php」としてください。

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
    // (5) プラグイン独自の設定を追加する場合はコメントアウト
    // protected $useCustomOption = true;

    /**
     * (2) 一覧表示時のメソッド。"grid"固定
     */
    public function grid()
    {
        $values = $this->values();
        // (6) ビューを呼び出し
        return $this->pluginView('sample', ['values' => $values]);
    }

    /**
     * (3) このプラグイン独自のエンドポイント
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
     * (4) ビュー設定画面で表示するオプション
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
     * (5) プラグインの編集画面で設定するオプション。全ビュー共通で設定する
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

- (1) namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)** としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)  
また、クラス名は「Plugin」とし、PluginViewBaseを継承してください。

- (2) 一覧画面を表示するときのpublicメソッド名は、「grid」で固定です。

- (3) そのほかに追加のエンドポイントを作る場合、クラス内のpublicメソッド名は、config.jsonのfunctionに書いた名前にしてください。

- (4) 関数"public function setViewOptionForm($form)"で、ビューの設定画面に表示する項目を定義します。
この設定はビューごとに行えるので、同じプラグインのビューでも、「ビューAでは、全データを表示する」「ビューBでは、有効フラグがYESのデータのみ表示する」のように設定を変えられます。
  
    項目には、プラグイン独自の設定と、Exment標準機能で用意している「フィルター条件」「並べ替え設定」の2種類があります。
    ※設定した値は、関数「$this->custom_view->getCustomOption('パラメータ名')」で取得します。
    ※また、Exmentの標準機能のビューで使用している列設定を使用する場合、以下のように記述してください。

    ~~~ php
    $this->setColumnFields($form);
    ~~~

- (5) 関数"public function setCustomOptionForm(&$form)"で、プラグインの設定画面に表示する項目を定義します。
すべてのビューで共通の設定です。

    ※カスタム設定を使うには、「protected $useCustomOption = true;」を追加してください。
    ※設定した値は、関数「$this->plugin->getCustomOption('パラメータ名')」で取得します。

- (6) ビュー(bladeファイル)を使う場合は、関数"$this->pluginView"を使用してください。

- (7) プラグインのエンドポイントを取得するには、関数「$this->getRouteUri('エンドポイント名')」を使用してください。
※URLのフルパスを取得するには、admin_url($this->getRouteUri('エンドポイント名'))を使用してください。


#### (任意)ビューについて
画面の表示部分(ビュー)を別のファイルに分ける場合、bladeファイルはフォルダ「resources/views」以下に保存してください。

#### (任意)css、js、それ以外の静的ファイルについて
- cssファイルは、フォルダ「public/css」に配置してください。  
- jsファイルは、フォルダ「public/js」に配置してください。  
- それ以外のファイル(画像ファイルなど)は、フォルダ「public/assets」に配置してください。  
※本サンプルでは、かんばんビューを作成するためのjs・cssを作成しています。  


### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- KanbanView.zip
    - config.json
    - Plugin.php
    - (その他、必要なPHPファイル、画像ファイルなど)

