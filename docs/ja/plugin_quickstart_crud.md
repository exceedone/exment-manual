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
    /**
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
     * Get data list
     *
     * @return array
     */
    public function getList(array $options = []) : array
    {
        return \DB::table('city')->paginate();
    }

    /**
     * read single data
     *
     * @return array
     */
    public function getSingleData($primaryValue, array $options = []) : array
    {
        return \DB::table('city')->where('ID' => $primaryValue)->first();
    }

    /**
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
}
~~~
