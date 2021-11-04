## プラグイン(CRUDページ)
Exmentに、独自のCRUDページを追加します。  

## CRUDとは
Create、Read、Update、Deleteのことです。  
これにListも追加し、CRUD + Listに特化したプラグイン開発を可能にします。  
Exmentのカスタムデータの一覧・詳細・新規作成・更新・削除とほとんど同じ画面構成で、必要最低限な開発のみで実装可能にします。  
これにより、外部データ（例：他のデータベースエンジン、WordPress、SharePointリスト、他社Webデータベース、会計システムなど）を、Exmentにデータを取り込むことなく、Exmentの画面で管理可能にします。  


## 作成方法
ここではサンプルとして、「Exmentとは異なるMySQLのデータベース『world』のデータを、Exmentで一覧・表示・作成・更新・削除を実施する」という画面を例として、作成手順を記載します。  

### 事前準備
事前準備として、以下の処理を実行してください。
- 外部データベースを作成します。本プラグインではMySQLのサンプルデータベース「world」を利用しています。[公式サイト](https://dev.mysql.com/doc/index-other.html)からzipをダウンロードした上で、お使いのMySQL（またはMariaDB）環境で解凍したSQLを実行してください。
![MySQLダウンロード画面](img/plugin/plugin_event1.png)  


### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json

{
    "plugin_name": "MySQLWorld",
    "plugin_view_name" : "MySQL World連携",
    "description": "MySQLのサンプルデータベース「World」とExmentを連携します。",
    "uuid":  "2641201a-ba35-2bd9-af59-9440643ca206",
    "author":  "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "crud"
}

~~~

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、crudと記入してください。  

### Pluginファイル作成
以下のようなPHPファイルを作成します。ファイル名は「Plugin.php」としてください。


~~~ php
<?php

// (1)
namespace App\Plugins\MySQLWorld;

use Encore\Admin\Widgets\Box;
use Exceedone\Exment\Model\CustomTable;
use Exceedone\Exment\Services\Plugin\PluginPageBase;
use GuzzleHttp\Client;

class Plugin extends PluginCrudBase
{
    // (13)
    protected $useCustomOption = true;

    /**
     * (2) 列定義を取得
     * Get fields definitions
     *
     * @return array
     */
    public function getFieldDefinitions() : array
    {
        return [
            'ID' => ['label' => 'ID', 'primary' => true],
            'Name' => ['label' => '都市名'],
            'CountryCode' => ['label' => '国コード'],
            'District' => ['label' => '区域'],
            'Population' => ['label' => '人工'],
        ];
    }

    /**
     * (3) データ一覧を取得
     * Get data list
     *
     * @return array
     */
    public function getList(array $options = []) : array
    {
        return \DB::table('city')->paginate();
    }

    /**
     * (3) データ詳細(1件のデータ)を取得
     * read single data
     *
     * @return array
     */
    public function getSingleData($primaryValue, array $options = []) : array
    {
        return \DB::table('city')->where('ID' => $primaryValue)->first();
    }

    /**
     * (4) 新規作成ならびに編集時のフォームを設定
     * set form info
     *
     * @return Form
     */
    public function setForm(Form $form, bool $isCreate, array $options = []) : Form
    {
        if(!$isCreate){
            $form->display('ID');    
        }
        $form->text('Name');

        // 国一覧取得
        $countries = \DB::table('country')->pluck('Name', 'Code');
        $form->select('CountryCode', $countries);
        
        // ToDo: これどうするか
        // $form->select('District');
        $form->number('Population');

        return $form;
    }
    
    /**
     * (5) 新規作成実施
     * post create value
     *
     * @return mixed
     */
    public function postCreate(array $posts, array $options = []) : mixed
    {
        // 独自のデータベースに保存する。
        $posts = array_only($posts, array_keys($this->getFieldDefinitions()));
        
        $value = \DB::table('city')->create($posts);

        // 主キーを戻す・・・が良いのかな。
    }

    /**
     * (6) 編集の実施
     * edit posted value
     *
     * @return mixed
     */
    public function putEdit(Request $request, $primaryValue, array $posts, array $options = []) : mixed
    {
        // 独自のデータベースに保存する。
        $posts = array_only($posts, array_keys($this->getFieldDefinitions()));
        
        $value = \DB::table('city')->create($posts);

        // 主キーを戻す・・・が良いのかな。
    }

    /**
     * (7) データの削除
     * delete value
     *
     * @return mixed
     */
    public function delete($primaryValue, array $posts, array $options = [])
    {
        $value = \DB::table('city')->delete($primaryValue);
    }


    /**
     * (8) (任意：)新規作成を実行可能とするかどうか
     * Whether create data. If false, disable create button.
     * Default: true
     *
     * @return bool
     */
    public function enableCreate(array $options = []) : bool
    {
        return true;
    }

    /**
     * (9) (任意：)編集を実行可能とするかどうか(全件)
     * Whether edit all data. If false, disable edit button and link.
     * Default: true
     *
     * @return bool
     */
    public function enableEdit(array $options = []) : bool
    {
        return true;
    }

    /**
     * (10) (任意：)編集を実行可能とするかどうか(指定のデータ)
     * Whether edit target data. If false, disable edit button and link.
     * Default: true
     *
     * @return bool
     */
    public function enableEditData($primaryValue, array $options = []) : bool
    {
        return true;
    }

    /**
     * (11) (任意：)削除を実行可能とするかどうか(全件)
     * Whether delete all data. If false, disable delete button and link.
     * Default: true
     *
     * @return bool
     */
    public function enableDelete(array $options = []) : bool
    {
        return true;
    }

    /**
     * (12) (任意：)削除を実行可能とするかどうか(指定のデータ)
     * Whether delete target data. If false, disable delete button and link.
     * Default: true
     *
     * @return bool
     */
    public function enableDeleteData($primaryValue, array $options = []) : bool
    {
        return true;
    }
    
    /**
     * (14) (任意：)プラグインの編集画面で設定するオプション。
     *
     * @param [type] $form
     * @return void
     */
    public function setCustomOptionForm(&$form)
    {
    }
}
~~~

- (1) namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)  
また、クラス名は「Plugin」とし、PluginCrudBaseを継承してください。

- (2) 関数getFieldDefinitionsは、列定義を連想配列で取得する関数です。  
必ず"primary" => trueとなるキーを1つ追加してください。(現在、複合キーには対応していません)  
また、"label"は、一覧画面などの項目名に使用します。  

- (3) 関数getListは、データの一覧を取得する関数です。  
取得したデータを、配列で返却してください。  
また、データ一覧内は連想配列とし、この連想配列のキー値は、getFieldDefinitionsで設定しているキー値と同値としてください。

- (4) 関数setFormは、新規作成時ならびに編集時のフォームを設定します。  

- (5) 関数postCreateは、画面で新規作成を実行時に呼び出される関数です。データの新規作成を実施してください。  

- (6) 関数putEditは、画面で編集を実行時に呼び出される関数です。データの編集を実施してください。  

- (7) 関数deleteは、画面で削除を実行時に呼び出される関数です。データの削除を実施してください。  

- (8) (任意)関数enableCreateは、データの作成を許可するかどうかです。許可しない場合はfalseを返却してください。デフォルトはtrueです。

- (9) (任意)関数enableEditは、すべてのデータの編集を許可するかどうかです。許可しない場合はfalseを返却してください。デフォルトはtrueです。  
※enableEditDataと両方がtrueの場合のみ、編集が許可されます。

- (10) (任意)関数enableEditDataは、指定のデータの編集を許可するかどうかです。許可しない場合はfalseを返却してください。デフォルトはtrueです。  
※enableEditと両方がtrueの場合のみ、編集が許可されます。

- (11) (任意)関数enableDeleteは、すべてのデータの削除を許可するかどうかです。許可しない場合はfalseを返却してください。デフォルトはtrueです。  
※enableDeleteDataと両方がtrueの場合のみ、削除が許可されます。

- (12) (任意)関数enableDeleteDataは、指定のデータの削除を許可するかどうかです。許可しない場合はfalseを返却してください。デフォルトはtrueです。  
※enableDeleteと両方がtrueの場合のみ、削除が許可されます。

- (13)(14) (任意)関数setCustomOptionFormは、プラグインの設定画面で表示される項目です。  
ユーザーに画面で独自で設定したい項目がある場合、画面から設定できるようになります。  
※カスタム設定を使用するには、「protected $useCustomOption = true;」を追加してください。  
※設定した値を取得するには、関数「$this->plugin->getCustomOption('パラメータ名')」を使用してください。

### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- MySQLWorld.zip
    - config.json
    - Plugin.php

