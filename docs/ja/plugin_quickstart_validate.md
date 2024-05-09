# プラグイン(バリデーション)
カスタムテーブルを保存する時と、カスタムデータを削除する時に、独自のバリデーションを実行することができます。  
文字種のチェックや桁数のチェックはカスタム列の設定で実装することが可能ですが、より複雑なチェックや項目間の関連チェックを実装したい場合は、このプラグインの使用をおすすめします。

![バリデーション実装例](img/plugin/plugin_validate1.png)   

> 単純な2値による比較(バリデーション)を行いたい場合は、[画面での設定](/ja/table?id=_2つの列を比較)もお試しください。

![2つの列を比較](img/table/compare1.png)    

## 作成方法

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "63d80590-4aad-11e9-b475-0800200c9a66",
    "plugin_view_name": "Plugin Validator",
    "description": "カスタムテーブルのバリデーションを行います。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "target_tables": "test_table",
    "plugin_type": "validator"
}
~~~

- plugin_name : 半角英数で記入してください。
- uuid : 32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : validatorと記入してください。  
- (任意)target_tables : バリデーション対象のテーブル名を記入してください。  


### PHPファイル作成
- 以下のようなPHPファイルを作成します。名前は「Plugin.php」としてください。

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

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

        
        ///// (v3.7.5より追加)バリデーションを呼び出した実行元の種類を取得する場合。特定の呼び出し方でのみバリデーションを実施する場合などにご利用ください
        \Log::debug($this->called_type);
        ///// $this->called_typeの種類
        // form : 画面
        // api : API
        // import : データインポート
        // null : それ以外(他のプラグインなど)
    }

    public function validateDestroy($custom_value)
    {
        // (v6.0.2より追加)falseを返した場合、データ削除せずに、'message'に設定したエラーメッセージを画面に表示します。
        if ($custom_value->getValue('priority') > 3) {
            return [
                'status'  => false,
                'message' =>  '重要度が高いデータは削除できません。',
            ];
        } else {
            // trueを返した場合、データ削除します。
            return [
                'status'  => true
            ];
        }
    }
}
~~~

- namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)

- プラグイン管理画面で設定した「対象テーブル」を保存する直前に、プラグインが呼び出され、Plugin.php内のvalidate関数を実行します。validate関数でtrueを返した場合、処理はそのまま続行します。falseを返した場合、処理を中断して、プロパティ$messagesに設定したエラーメッセージを画面に表示します。  

- 「対象テーブル」を削除する直前に、プラグインが呼び出され、Plugin.php内のvalidateDestroy関数を実行します。validate関数でtrueを返した場合、データを削除します。falseを返した場合、処理を中断して、'message'に設定したエラーメッセージを画面に表示します。

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
[お知らせ表示順チェック](https://github.com/exment-git/plugin-sample/tree/main/validation/PluginValidatorTest)  
- お知らせテーブルの表示順が100を超える場合はエラーにするサンプルです。  

