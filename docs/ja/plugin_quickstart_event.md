# プラグイン(イベント)
Exmentの画面上で特定の操作を行った場合に実行され、値の更新などの処理を行うことができます。  

> この機能は、v3.2.0より追加されました。

## イベントの種類

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| loading | ロード開始時 | ページのロード処理の最初に、処理が起動します。 |
| saving | 保存直前 | データの保存直前に、処理が起動します。 |
| saved | 保存後 | データの保存後に、処理が起動します。 |
| deleted | 削除後 | データの削除後に、処理が起動します。 |
| workflow_action_executing | ワークフロー実行直前 | ワークフロー実行の直前に、処理が起動します。 |
| workflow_action_executed | ワークフロー実行後 | ワークフロー実行後に、処理が起動します。 |
| notify_executing | 通知実行直前 | 通知実行の直前に、処理が起動します。 |
| notify_executed | 通知実行後 | 通知実行後に、処理が起動します。 |

## 作成方法

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "plugin_name": "PluginDemoEvent",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Event",
    "description": "プラグインイベントを実行するテストです。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "event",
    "event_triggers": "loaded"
}
~~~

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、eventと記入してください。  
- event_triggersを最初から指定する場合、「トリガーの種類」の名称を、カンマ区切りで入力してください。
- target_tablesを最初から指定する場合、カスタムテーブルのテーブル名を、カンマ区切りで入力してください。


### PHPファイル作成
- 以下のようなPHPファイルを作成します。名前は「Plugin.php」としてください。

~~~ php
<?php
namespace App\Plugins\PluginDemoEvent;

use Exceedone\Exment\Services\Plugin\PluginEventBase;
class Plugin extends PluginEventBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        \Log::debug('Event called!');
        return true;
    }
}
~~~
- namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)

- プラグイン管理画面で登録した、トリガーの条件に合致した場合に、プラグインが呼び出され、Plugin.php内のexecute関数が実行されます。  

- Pluginクラスは、クラスPluginEventBaseを継承しています。  
PluginEventBaseは、呼び出し元のカスタムテーブル$custom_table、テーブル値$custom_valueなどのプロパティを所有しており、  
execute関数が呼び出された時点で、そのプロパティに値が代入されます。  
プロパティの詳細については、[プラグインリファレンス](/ja/plugin_reference.md)をご参照ください。  

### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- PluginDemoEvent.zip
    - config.json
    - Plugin.php
    - (その他、必要なPHPファイル、画像ファイルなど)


### サンプルプラグイン
[外部データベース連携](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity)  
- カスタムデータの保存を行った際に、外部データベースとの連携を行うサンプルです。  
- Exmentの都市テーブルで追加・更新・削除を行うと、外部データベースのcityテーブルに反映されます。  
- 事前準備として、以下の処理を実行してください。
    1. Exmentの管理者設定→テンプレートから、[テンプレート](https://exment.net/downloads/sample/template/city_template.zip)をインポートします。  
    - 外部データベースを作成します。本プラグインではMySQLのサンプルデータベース「world」を利用しています。[公式サイト](https://dev.mysql.com/doc/index-other.html)からzipをダウンロードした上で、お使いのMySQL（またはMariaDB）環境で解凍したSQLを実行してください。
![MySQLダウンロード画面](img/plugin/plugin_event1.png)  
    - Exmentの管理者設定→プラグインから、[プラグイン](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity)をアップロードします。  
    - プラグインの設定画面を開き、2.で設定した外部データベースの接続情報を入力→保存してください。  
![プラグイン設定画面](img/plugin/plugin_event2.png)  
