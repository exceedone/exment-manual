## プラグイン(API)
Exmentに新しいAPIを作成することができます。  
[APIリファレンス](https://exment.net/reference/ja/webapi.html)に存在しない機能を追加する場合にご利用ください。  

## はじめに
ExmentのAPIプラグインは、PHPのフレームワーク[Laravel](http://laravel.jp/)、ならびに[laravel-admin](https://laravel-admin.org/docs/) を使用して開発します。  
APIの開発を行う場合には、特にLaravelの知識がある方が開発することをおすすめします。

## 作成方法

### サンプル
ここではサンプルとして、「カスタム列の名前から、カスタム列情報を取得する」APIを作成します。

- サンプルプラグインは[こちら](https://exment.net/downloads/sample/plugin/PluginDemoAPI.zip)  


### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json

{
    "plugin_name": "PluginDemoAPI",
    "uuid": "50716af0-05d3-11ea-aaef-0800200c9a66",
    "plugin_view_name": "API Plugin Sample",
    "description": "列名からカスタム列情報を取得するサンプルAPIです。",
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

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、apiと記入してください。  
- uriは、このプラグイン共通のエンドポイントを記入してください。プラグイン管理画面で設定し直すことができます。  
- routeは、処理毎のエンドポイントとHTTPメソッド、Contoller内でのメソッド名を一覧で定義します。
    - uri：ページ表示のためのuriです。実際のURLは、「http(s)://(ExmentのURL)/admin/plugins/(プラグイン共通のエンドポイント)/(指定したuri)」になります。  
    - method：HTTPメソッドです。get,post,put,deleteで記入してください。
    - function：実行するContoller内のメソッド名です。
    - 例：プラグイン共通のエンドポイントを「sampleapi」、処理毎のuriが「column」、methodが「get」の場合、「http(s)://(ExmentのURL)/admin/plugins/sampleapi/column（メソッド：GET）」。

### Pluginファイル作成

#### メインロジック作成
以下のようなPHPファイルを作成します。ファイル名は「Plugin.php」としてください。

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
     * カラム名からカスタム列情報を取得するサンプルです
     *
     * @return mixed
     */
    public function column()
    {
        // リクエストパラメータをチェックします（tableとcolumnはそれぞれ必須）
        $validator = Validator::make(request()->all(), [
            'table' => 'required',
            'column' => 'required',
        ]);
        if ($validator->fails()) {
            return abortJson(400, [
                'errors' => $this->getErrorMessages($validator)
            ], ErrorCode::VALIDATION_ERROR());
        }

        // リクエストパラメータからテーブル名とカラム名を取得します
        $table_name = request()->get('table');
        $column_name = request()->get('column');

        // カスタムテーブル情報を取得します
        $custom_table = CustomTable::where('table_name', $table_name)->first();
        if (!isset($custom_table)) {
            return abort(400);
        }

        // (3) 権限があるかチェックします
        if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
            return abortJson(403, trans('admin.deny'));
        }

        // カスタム列情報を取得します
        $column = $custom_table->custom_columns()->where('column_name', $column_name)->first();
        if (!isset($column)) {
            return abort(400);
        }

        return $column;
    }
}
~~~

- (1) namespaceは、**App\Plugins\\(プラグイン名)**としてください。  
また、クラス名は「Plugin」とし、PluginApiBaseを継承してください。

- (2) クラス内のpublicメソッド名は、config.jsonのfunctionに記載の名称になります。  

- (3) カスタムテーブル情報のメソッドhasPermissionを呼び出すと、現在のユーザーがそのテーブルに対して権限を所持しているかをチェックできます。  
    - AVAILABLE_ACCESS_CUSTOM_VALUE：アクセス権限
    - AVAILABLE_VIEW_CUSTOM_VALUE：参照権限
    - AVAILABLE_EDIT_CUSTOM_VALUE：編集権限
    - AVAILABLE_ALL_CUSTOM_VALUE：全データアクセス権限
    - AVAILABLE_ALL_EDIT_CUSTOM_VALUE：全データ編集権限


### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- PluginDemoAPI.zip
    - config.json
    - Plugin.php
    - (その他、必要なPHPファイル等)


### その他
- プラグインで作成したAPIにアクセスする場合、APIスコープは「plugin」にする必要があります。（トークン取得時に指定してください。）  

- 特定のID値のデータを取得したい場合など、URLでパラメータを指定する場合はconfig.jsonのroute→urlに以下のような記述を追加してください。「{id}」や「{table}」のように指定することができます。  

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
    * カラム名からカスタム列情報を取得するサンプルです
    * ※URLでテーブル名とカラム名を指定しています
    * @return mixed
    */
public function tablecolumn($table, $column)
{
    // カスタムテーブル情報を取得します
    $custom_table = CustomTable::where('table_name', $table)->first();
    if (!isset($custom_table)) {
        return abort(400);
    }

    // 権限があるかチェックします
    if (!$custom_table->hasPermission(Permission::AVAILABLE_ACCESS_CUSTOM_VALUE)) {
        return abortJson(403, trans('admin.deny'));
    }

    // カスタム列情報を取得します
    $custom_column = $custom_table->custom_columns()->where('column_name', $column)->first();
    if (!isset($custom_column)) {
        return abort(400);
    }

    return $custom_column;
}

~~~

### サンプルプラグイン
[APIサンプル](https://exment.net/downloads/sample/plugin/PluginDemoAPI.zip)  
