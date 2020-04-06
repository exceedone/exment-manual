# プラグイン(バリデーション)
カスタムテーブルを保存する際に独自のバリデーションを実行することができます。  
文字種のチェックや桁数のチェックはカスタム列の設定で実装することが可能ですが、より複雑なチェックや項目間の関連チェックを実装したい場合は、このプラグインの使用をおすすめします。

## 作成方法

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "plugin_name": "PluginValidatorTest",
    "uuid": "63d80590-4aad-11e9-b475-0800200c9a66",
    "plugin_view_name": "Plugin Validator",
    "description": "カスタムテーブルのバリデーションを行います。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "target_tables": "test_table",
    "plugin_type": "validator"
}
~~~

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、validatorと記入してください。  
- target_tables : バリデーション対象のテーブル名を記入してください。  


### PHPファイル作成
- 以下のようなPHPファイルを作成します。名前は「Plugin.php」としてください。

~~~ php
<?php
namespace App\Plugins\PluginDemoValidator;

use Exceedone\Exment\Services\Plugin\PluginValidatorBase;
class Plugin extends PluginValidatorBase
{
    /**
     * Plugin Validator
     */
    public function validate()
    {
        // 入力値を取得する
        $xpos = array_get($this->input_value, 'xpos');
        $ypos = array_get($this->input_value, 'ypos');

        if (isset($xpos) && isset($ypos)) {
            if (intval($xpos) > intval($ypos)) {
                // エラーメッセージを設定する（キー：列名、値：メッセージ）
                $this->messages['ypos'] = 'YにはXよりも大きな値を入力してください。';
                // 戻り値にfalse（エラー発生）を返す
                return false;
            }
        }
        // 戻り値にtrue（正常）を返す
        return true;
    }
}
~~~
- namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)

- プラグイン管理画面で設定した「対象テーブル」を保存する直前に、プラグインが呼び出され、Plugin.php内のvalidate関数を実行します。validate関数でtrueを返した場合、処理はそのまま続行します。falseを返した場合、処理を中断して、プロパティ$messagesに設定したエラーメッセージを画面に表示します。  

- Pluginクラスは、クラスPluginValidatorBaseを継承しています。  
PluginValidatorBaseは、呼び出し元のカスタムテーブル$custom_table、変更前のカスタムデータ値$original_value、画面の入力値$input_valueなどのプロパティを所有しており、validate関数内ではそれらのプロパティを参照することができます。  
プロパティの詳細については、[プラグインリファレンス](/ja/plugin_reference.md)をご覧ください。  

### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php


### サンプルプラグイン
準備中...
