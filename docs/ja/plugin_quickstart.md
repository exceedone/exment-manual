# プラグイン作成方法
## はじめに
ここでは、Exmentプラグインの作成方法について記載します。  
プラグインの機能・管理方法についての詳細は、[プラグイン](/ja/plugin.md)をご参照ください。  

## 作成方法リンク

- [ボタン](/ja/plugin_quickstart_button.md)
- [イベント](/ja/plugin_quickstart_event.md)
- [ページ](/ja/plugin_quickstart_page.md)
- [ダッシュボード](/ja/plugin_quickstart_dashboard.md)
- [バッチ](/ja/plugin_quickstart_batch.md)
- [スクリプト](/ja/plugin_quickstart_script.md)
- [スタイル](/ja/plugin_quickstart_style.md)
- [バリデーション](/ja/plugin_quickstart_validate.md)
- [API](/ja/plugin_quickstart_api.md)
- [ドキュメント](/ja/plugin_quickstart_document.md)
- [Docurain(PDF出力)](/ja/plugin_quickstart_docurain.md)
- [トリガー ※非推奨](/ja/plugin_quickstart_trigger.md)


## プラグイン名のnamespace
プラグインのnamespaceは、以下の法則で付けてください。
- namespaceは、 **App\Plugins\\(プラグイン名のパスカルケース)** としてください。
    - 例：プラグイン名：testplugin　→ App\Plugins\\Testplugin
    - 例：プラグイン名：customer_list　→ App\Plugins\\CustomerList
    - 例：プラグイン名：get-user　→ App\Plugins\\GetUser


## その他、特別な設定方法
上記に記載している、基本的な作成方法の他に、特別な設定情報の記載を行います。

- [プラグイン設定画面で独自の設定を行う](#プラグイン設定画面で独自の設定を行う)
- [複数のプラグイン種類を1つのプラグインで対応する](#複数のプラグイン種類を1つのプラグインで対応する)
- [インストール時に必須ライブラリチェックを行う](#インストール時に必須ライブラリチェックを行う)
- [インストール時にテンプレートをインストールする](#インストール時にテンプレートをインストールする)


### プラグイン設定画面で独自の設定を行う

プラグイン独自の設定を、画面から行いたい場合に追加します。  
例：YouTube Data APIを実行するために必要なアクセスキーを、画面から設定  

![ページ](img/plugin/plugin_page1.png)

- Plugin.phpファイルを、以下のように記載します。

~~~ php
<?php

// (1)
namespace App\Plugins\YouTubeSearch;

use Encore\Admin\Widgets\Box;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginXXXXBase;
use GuzzleHttp\Client;

class Plugin extends PluginXXXXBase
{
    // (1)
    protected $useCustomOption = true;

    /**
     * (2) プラグインの編集画面で設定するオプション
     *
     * @param $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('access_key', 'アクセスキー')
            ->help('YouTubeのアクセスキーを入力してください。');
    }
}
~~~

- (1)「protected $useCustomOption = true;」を追加します。
- (2) 関数"public function setCustomOptionForm(&$form)"は、プラグインの設定画面で表示される項目です。  
※カスタム設定を使用するには、「protected $useCustomOption = true;」を追加してください。  
※設定した値を取得するには、関数「$this->plugin->getCustomOption('パラメータ名')」を使用してください。

### 複数のプラグイン種類を1つのプラグインで対応する
通常、1つのプラグインファイルで対応できるプラグインの種類は、1種類です。  
そのため、例えば種類「ページ」と、「ダッシュボード」を両方を使用して機能拡張を行いたい場合、プラグインファイルを2つ作成しなければなりません。  
しかし、特別な書き方をすることで、複数のプラグイン種類を、1つのプラグインファイルで対応することができます。  
本項では、その複数種類のプラグインファイルの作成方法について記載します。  

#### config.json修正
config.json内のplugin_typeを、以下のように修正します。

~~~
// config.json 一部抜粋
"plugin_type": "dashboard,page"
~~~

plugin_typeの値を、カンマ区切りで複数記入します。


#### phpファイル修正
※プラグイン種類が「スクリプト」「スタイル」の場合は、この処理は不要です。  
  
- 1種類の場合は「Plugin.php」としていたファイル名を、「Plugin(プラグイン種類の頭大文字).php」に変更します。
    - PluginButton.php
    - PluginEvent.php
    - PluginPage.php
    - PluginDocument.php
    - PluginBatch.php
    - PluginDashboard.php
    - etc....

- 上記ファイルを一部修正し、クラス名をファイル名と同様にします。

~~~ php
<?php

// クラス名変更（イベントの場合）
class PluginEvent extends PluginEventBase
{
~~~


#### (任意)設定用のphpファイル作成
- 「[プラグイン設定画面で独自の設定を行う](#プラグイン設定画面で独自の設定を行う)」で記載した独自の設定を行いたい場合、「PluginSetting.php」ファイルを作成します。  

~~~ php
// ファイル名：PluginSetting.php
<?php

namespace App\Plugins\PageMulti;

use Exceedone\Exment\Services\Plugin\PluginSettingBase;
use Exceedone\Exment\Model\CustomTable;

// クラス名：PluginSetting
class PluginSetting extends PluginSettingBase
{
    protected $useCustomOption = true;
    
    /**
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
        $form->text('text', 'テキスト')
            ->help('テキストを表示します。');
    }
}
~~~


#### zipに圧縮
これらのファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- XXXX.zip
    - config.json
    - PluginDashboard.php
    - PluginPage.php
    - PluginSetting.php(任意)
    - (その他、必要なPHPファイル、画像ファイルなど)

### サンプルプラグイン
[ページ、ダッシュボード両表示](https://exment.net/downloads/sample/plugin/PageMulti.zip)  



### インストール時に必須ライブラリチェックを行う
プラグインのインストール時に、必須ライブラリチェックを行うことができます。  
composerなどでインストールするライブラリ前提のプラグインの場合、事前にチェックを行うことによって、プラグイン実行時のエラーを防ぐことができます。  

#### 仕様
- composerによりインストールされ、チェックを行いたいライブラリのクラス名を、config.jsonに記載します。  
クラスが存在しなかった場合に、ユーザーにインストールを実施してほしいcomposer名も、同様にconfig.jsonに記載します。  

- プラグインのインストール時に、そのクラスが存在しなかった場合、プラグインのインストールはエラーになります。  
その際、画面には、インストールを実施してほしいcomposer名が表示されます。


#### config.json修正
config.jsonに、"requirement"を追加し、以下のようなオプションを追加します。

~~~
// config.json 一部抜粋
"requirement": [
    {
        "class": "(チェックするクラス名)",
        "composer": "(クラスが存在しなかった場合に、ユーザーにインストールを実施してほしいcomposer名)"
    },
    {
        "class": "(チェックするクラス名)",
        "composer": "(クラスが存在しなかった場合に、ユーザーにインストールを実施してほしいcomposer名)"
    }
]
~~~

#### 記入例
ここでは、日本の祝日を一括で取得するライブラリ「[azuyalabs/yasumi](https://github.com/azuyalabs/yasumi)」をプラグインで使用することを想定します。

~~~
// config.json 一部抜粋
"requirement": [
    {
        "class": "\\Yasumi\\Yasumi",
        "composer": "azuyalabs/yasumi=^2.3"
    }
]
~~~

この設定を行うことで、サーバーにクラス「\Yasumi\Yasumi」がない場合、プラグインのインストール時に、エラーが表示されます。
![ページ](img/plugin/plugin_requirement.png)



### インストール時にテンプレートをインストールする
プラグインのインストール時に、[テンプレート](/ja/template)のインストールを行うことができます。  
プラグインとしての機能だけでなく、必要となるテーブル設定なども、同時にインストールすることができます。  

#### config.json修正
config.jsonに、"templates": trueを追加します。

~~~
// config.json 一部抜粋
"templates": true
~~~

#### テンプレートファイル配置
- プラグインフォルダに「templates」フォルダを作成します。

- [テンプレート](/ja/template)のエクスポートを実施します。  

- エクスポートしたzipファイルを解凍し、作成したプラグインフォルダ内の「templates」フォルダに移動します。

- これにより、プラグインインストール時に、テンプレートファイルが自動でインストールされます。

#### その他補足
- 該当のプラグインを削除しても、この機能でインストールしたテンプレートは削除されません。