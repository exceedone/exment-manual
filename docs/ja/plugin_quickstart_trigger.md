# プラグイン(トリガー)

> v3.2.0より、「プラグイン(トリガー)」は非推奨になりました。  
これから作るときは、[プラグイン(ボタン)](/ja/plugin_quickstart_button)、または[プラグイン(イベント)](/ja/plugin_quickstart_event)で作ってください。  


プラグイン(トリガー)は、Exment の画面で特定の操作をしたときに動くプラグインです。値の更新などの処理ができます。  
また、一覧画面やフォーム画面にボタンを追加し、クリックしたときに処理を行うこともできます。  
このページでは、トリガーの種類と、作り方（config.json と Plugin.php を作り、zip にまとめる）を説明します。  


## トリガーの種類

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| saving | 保存直前 | データの保存直前に、処理が起動します。 |
| saved | 保存後 | データの保存後に、処理が起動します。 |
| grid_menubutton | 一覧画面のメニューボタン | データ一覧画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |
| form_menubutton_show | データ詳細画面のメニューボタン | データ詳細画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |
| form_menubutton_create | データ新規作成画面のメニューボタン | データの新規作成画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |
| form_menubutton_edit | データ更新画面のメニューボタン | データの更新画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |
| workflow_action_executing | ワークフロー実行直前 | ワークフロー実行の直前に、処理が起動します。 |
| workflow_action_executed | ワークフロー実行後 | ワークフロー実行後に、処理が起動します。 |
| notify_executing | 通知実行直前 | 通知実行の直前に、処理が起動します。 |
| notify_executed | 通知実行後 | 通知実行後に、処理が起動します。 |

## 作成方法

### config.json作成
- 次の config.json ファイルを作ります。  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Trigger",
    "description": "プラグインをアップロードするテストです。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "trigger",
    "event_triggers": "loaded,loading"

}
~~~

- plugin_name は、半角英数で書いてください。
- uuid は、32 文字 + ハイフンの、合計 36 文字の文字列です。プラグインを 1 つに見分けるために使います。  
次の URL などで作ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type は、trigger と書いてください。  
- event_triggers を最初から指定する場合は、上の「トリガーの種類」の「名前」を、カンマ区切りで書いてください。
- target_tables を最初から指定する場合は、カスタムテーブルのテーブル名を、カンマ区切りで書いてください。


### PHPファイル作成
- 次のような PHP ファイルを作ります。名前は「Plugin.php」としてください。

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginTriggerBase;
class Plugin extends PluginTriggerBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        admin_toastr('Plugin calling');
        return true;
    }
}
~~~
- namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)

- プラグイン管理画面で登録したトリガーの条件に合ったときに、プラグインが呼び出され、Plugin.php の execute 関数が実行されます。  

- Plugin クラスは、クラス PluginTriggerBase を継承しています。  
PluginTriggerBase は、呼び出し元のカスタムテーブル $custom_table、テーブル値 $custom_value などのプロパティを持っています。  
execute 関数が呼び出された時点で、これらのプロパティに値が入っています。  
プロパティのくわしい内容は、[プラグインリファレンス](plugin_reference.md)をご参照ください。  

### zipに圧縮
上の 2 つのファイルを最小の構成として、zip に圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php
    - (その他、必要なPHPファイル、画像ファイルなど)


### サンプルプラグイン
準備中...
