# プラグイン(ボタン)
Exmentの一覧画面もしくはフォーム画面にボタンを追加し、クリック時に処理を行うことができます。  

## ボタンの種類

| 名前 | 種類 | 説明 |
| ---- | ---- | ---- |
| grid_menubutton | 一覧画面のメニューボタン | データ一覧画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |
| form_menubutton_show | データ詳細画面のメニューボタン | データ詳細画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |
| form_menubutton_create | データ新規作成画面のメニューボタン | データの新規作成画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |
| form_menubutton_edit | データ更新画面のメニューボタン | データの更新画面の上部にボタンを追加し、クリック時にイベントを発生させます。 |

## 作成方法

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "plugin_name": "PluginDemoButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a66",
    "plugin_view_name": "Plugin Button",
    "description": "プラグインボタンを実行するテストです。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "grid_menubutton",
    "target_tables": "information"
}
~~~

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、buttonと記入してください。  
- event_triggersを最初から指定する場合、「トリガーの種類」の名称を、カンマ区切りで入力してください。
- target_tablesを最初から指定する場合、カスタムテーブルのテーブル名を、カンマ区切りで入力してください。


### PHPファイル作成
- 以下のようなPHPファイルを作成します。名前は「Plugin.php」としてください。

~~~ php
<?php
namespace App\Plugins\PluginDemoButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        \Log::debug('Plugin calling');
        

        /////// 戻り値による画面遷移の詳細
        // true : 「実行完了しました！」と画面右上に表示し、その画面でリロードする
        return true;

        // true : 「○○が正常に完了しました！この後は××の処理を行ってください」と、独自メッセージを表示する
        // return [
        //     'result' => true,
        //     'swaltext' => '○○が正常に完了しました！この後は××の処理を行ってください',
        // ];

        // true : 「実行完了しました！」と表示し、別のページにリダイレクトする
        // return redirect('https://github.com/exceedone/exment');
        // return admin_url('/');

        // false : 「○○のエラーが発生しました」と、独自エラーメッセージを表示する
        // return [
        //     'result' => false,
        //     'swaltext' => '○○のエラーが発生しました',
        // ];
    }
}
~~~
- namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)

- プラグイン管理画面で登録した、トリガーの条件に合致した場合に、プラグインが呼び出され、Plugin.php内のexecute関数が実行されます。  

- Pluginクラスは、クラスPluginButtonBaseを継承しています。  
PluginButtonBaseは、呼び出し元のカスタムテーブル$custom_table、テーブル値$custom_valueなどのプロパティを所有しており、  
execute関数が呼び出された時点で、そのプロパティに値が代入されます。  
プロパティの詳細については、[プラグインリファレンス](plugin_reference.md)をご参照ください。  

### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- PluginDemoButton.zip
    - config.json
    - Plugin.php
    - (その他、必要なPHPファイル、画像ファイルなど)


### サンプルプラグイン
準備中...
