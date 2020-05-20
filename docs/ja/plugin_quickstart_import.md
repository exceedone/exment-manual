# プラグイン(インポート)
カスタムデータへのインポート処理を独自に実装することができます。  
既存システムで出力したファイル等をExmentに取り込む場合は、このプラグインの使用をおすすめします。  


## 作成方法
「見積書（Excel）を契約テーブルと契約明細テーブルにインポートする」プラグインを例として、作成手順を記載します。  
※見積書のヘッダ部分には契約テーブルに関する情報、明細部分には契約明細テーブルに関する情報が記載されているものとします。  
※前提として、PHP及びフレームワーク[Laravel](http://laravel.jp/)、PHPでExcelを操作するためのライブラリ[PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet)の知識が必要になります。

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "PluginImportContract",
    "plugin_view_name": "契約データのインポート",
    "description": "契約データを独自ロジックでインポートします。",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "import",
    "target_tables": "contract",
    "label": "契約インポート",
    "icon": "fa-files-o"
}
~~~

- plugin_name : プラグイン名です。半角英数で記入してください。
- uuid : 32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : importと記入してください。  
- target_tables : インポート対象のテーブル名を記入してください。  

※target_tablesは後から画面で変更できます。複数指定した場合は、それぞれのテーブルのインポートダイアログにプラグインの選択欄が表示されます。  


### PHPファイル作成
- 以下のようなPHPファイルを作成します。名前は「Plugin.php」としてください。

~~~ php
<?php
namespace App\Plugins\Pluginimportcontract;

use Exceedone\Exment\Services\Plugin\PluginImportBase;
use PhpOffice\PhpSpreadsheet\IOFactory;

class Plugin extends PluginImportBase{
    /**
     * execute
     */
    public function execute() {
        $path = $this->file->getRealPath();

        $reader = $this->createReader();
        $spreadsheet = $reader->load($path);

        // Sheet1のB4セルの内容で契約テーブルを読み込みます
        $sheet = $spreadsheet->getSheetByName('Sheet1');
        $client_name = getCellValue('B4', $sheet, true);
        $client = getModelName('client')::where('value->client_name', $client_name)->first();

        // Sheet1のヘッダ部分に記載された情報で契約データを編集します
        // statusには固定値:1を設定します
        $contract = [
            'value->contract_code' => getCellValue('B3', $sheet, true),
            'value->client' => $client->id,
            'value->status' => '1',
            'value->contract_date' => getCellValue('D4', $sheet, true),
        ];
        // 契約テーブルにレコードを追加します
        $record = getModelName('contract')::create($contract);

        // Sheet1の7行目～15行目に記載された明細情報を元に契約明細データを出力します
        for ($i = 7; $i <= 15; $i++) {
            // A列から製品バージョンコードを取得します
            $product_version_code = getCellValue("A$i", $sheet, true);
            // 製品バージョンコードが設定されていない時は次の行にスキップします
            if (!isset($product_version_code)) break;
            // 製品バージョンコードで、製品バージョンテーブルを読み込みます
            $product_version = getModelName('product_version')
                ::where('value->product_version_code、, $product_version_code)->first();
            // 製品バージョンテーブルが取得できなかった場合は次の行にスキップします
            if (!isset($product_version)) continue;
            // 明細行と製品バージョンテーブルから契約明細データを編集します
            $contract_detail = [
                'parent_id' => $record->id,
                'parent_type' => 'contract',
                'value->product_version_id' => $product_version->id,
                'value->fixed_price' => getCellValue("B$i", $sheet, true),
                'value->num' => getCellValue("C$i", $sheet, true),
                'value->zeinuki_price' => getCellValue("D$i", $sheet, true),
            ];
            // 契約明細テーブルにレコードを追加します
            getModelName('contract_detail')::create($contract_detail);
        }

        return true;
    }

    /**
     * create reader
     */
    protected function createReader()
    {
        return IOFactory::createReader('Xlsx');
    }
    
}
~~~
- namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)

- Pluginクラスは、クラスPluginImportBaseを継承する必要があります。  

### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
- PluginImportContract.zip
    - config.json
    - Plugin.php


### アップロード
プラグインをアップロードします。  
※アップロード方法は、[プラグイン](/ja/plugin)をご参照ください。  


### インポートの実行方法
プラグイン管理画面で登録したtarget_tablesの画面で、インポートダイアログを開くと、インポートプラグインの選択欄が表示されます。登録したプラグインを選択して、送信ボタンを押下すると、Plugin.phpのexecute関数の内容でインポート処理が実行されます。  
![インポートダイアログ](img/plugin/plugin_import1.png)  


### サンプルプラグイン
※こちらのサンプルプラグインは、テンプレート設定で、「製品販売会社用テンプレート」の追加を行ってください。  
[契約データのインポートプラグイン](https://exment.net/downloads/sample/plugin/PluginImportContract/PluginImportContract.zip)  
[契約データの取込ファイル](https://exment.net/downloads/sample/plugin/PluginImportContract/contract_sample.xlsx)  

