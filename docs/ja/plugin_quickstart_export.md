# プラグイン(エクスポート)
カスタムデータ一覧のエクスポートを独自に実装したい場合に使用できます。  
オリジナルフォーマットのファイルをエクスポートする場合や、特殊な変換処理を実装する場合にご利用ください。  

> この機能は、v3.2.0より追加されました。

## 出力形式について
出力形式は、Excelの他、それ以外のフォーマットでの出力も可能です。  
※Excel形式の場合、処理をより最適化しております。


## 作成方法(通常)
ここでは例として、お知らせ情報を、ヘッダーなしのcsv形式で一覧出力するプラグインを作成します。  
※前提として、PHP及びフレームワーク[Laravel](http://laravel.jp/)の知識が必要になります。

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "plugin_name": "ExportTestCsv",
    "uuid": "1e7881d0-324f-11e9-b56e-0800200c9a33",
    "plugin_view_name": "ExportTestCsv",
    "description": "エクスポートのCSVテストです。",
    "author": "Kajitori",
    "version": "0.0.1",
    "plugin_type": "export",
    "target_tables": "information",
    "label": "お知らせ情報出力",
    "icon": "fa-question",
    "export_description": "お知らせ情報を、独自のcsv形式で一覧出力します。"
}
~~~

- plugin_name : プラグイン名です。半角英数で記入してください。
- uuid : 32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : exportと記入してください。  
- target_tables : エクスポート対象のテーブル名を記入してください。複数ある場合、カンマ区切りで入力してください。  
- label : エクスポートのダイアログに表示するタイトルです。
- icon : エクスポートのダイアログに表示するアイコンです。    
- export_description : エクスポートのダイアログに表示する説明文です。

※target_tables、label、icon、export_descriptionは後から画面で変更できます。


### PHPファイル作成
- 以下のようなPHPファイルを作成します。名前は「Plugin.php」としてください。

~~~ php
<?php
namespace App\Plugins\ExportTestCsv;

use Exceedone\Exment\Services\Plugin\PluginExportBase;

class Plugin extends PluginExportBase
{
    /**
     * execute
     */
    public function execute() 
    {
        // ※メソッド「$this->getTmpFullPath()」で、一時tmpファイルを取得する
        // ※実行後、一時tmpファイルは自動的に削除されます。
        $tmp = $this->getTmpFullPath();


        ///// 独自の実装処理---ここから
        // csvファイルを開く
        $fp = fopen($tmp, 'w');

        // すべてのシステム列・カスタム列でデータ一覧取得（配列）
        $data = $this->getData();

        // ビュー形式でデータ一覧取得（配列）
        // $data = $this->getViewData();

        // CustomValueのCollectionでデータ一覧取得
        // $data = $this->getRecords();

        foreach ($data as $fields) {
            fputcsv($fp, $fields);
        }

        fclose($fp);
        ///// 独自の実装処理---ここまで


        // $tmpのstring文字列を返却する
        return $tmp;
    }

    /**
     * Get download file name.
     * ファイル名を取得する
     *
     * @return string
     */
    public function getFileName() : string {
        return "test.csv";
    }
}

~~~
- namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)

- Pluginクラスは、クラスPluginExportBaseを継承する必要があります。  

### zipに圧縮
上記2ファイルを最小構成として、zipに圧縮します。  
- ExportTestCsv.zip
    - config.json
    - Plugin.php


### アップロード
プラグインをアップロードします。  
※アップロード方法は、[プラグイン](/ja/plugin)をご参照ください。  


### エクポートの実行方法
- プラグイン管理画面で登録したtarget_tablesの画面で、「インポート・エクスポート」ボタンをクリックすると、アップロードしたプラグインの選択欄が表示されます。  

![エクスポートダイアログ](img/plugin/plugin_export1.png)  

- 登録したプラグインの「エクスポート」ボタンをクリックすると、Plugin.phpのexecute関数の内容でエクスポート処理が実行されます。  




## 作成方法(Excel)
Excel形式で出力する場合も基本的には同様の手順で実装しますが、PHPファイルの作成時、より便利に実装できます。  
※「PHPファイル作成」以外の手順は、「作成方法(通常)」時の実装と同様です。  
※PHPでExcelを操作するためのライブラリ[PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet)を使用しています。 
  
ここでは例として、以下のサンプルテンプレートファイルに合わせて、お知らせ情報をエクスポートする手順を記載します。  

![エクスポートダイアログ](img/plugin/plugin_export2.png)  



### PHPファイル作成
- 以下のようなPHPファイルを作成します。名前は「Plugin.php」としてください。

~~~ php
<?php
namespace App\Plugins\ExportTestExcel;

// PluginExportExcelに変更
use Exceedone\Exment\Services\Plugin\PluginExportExcel;

// extendsをPluginExportExcelに変更
class Plugin extends PluginExportExcel
{
    /**
     * execute
     */
    public function execute() {
        // テンプレートファイルを読み込み、PhpSpreadsheetを初期化
        $spreadsheet = $this->initializeExcel('template.xlsx');
        // ※テンプレートファイルを使用せず、新規にファイルを作成する場合
        // $spreadsheet = $this->initializeExcel();

        // すべてのシステム列・カスタム列でデータ一覧取得（配列）
        // $data = $this->getData();

        // ビュー形式でデータ一覧取得（配列）
        // $data = $this->getViewData();

        // CustomValueのCollectionでデータ一覧取得
        $data = $this->getRecords();


        ///// 独自の実装処理---ここから
        $sheet = $spreadsheet->getActiveSheet();
        $column = 3;
        foreach($data as $record){

            // データをループしてセット
            $sheet->setCellValue("A{$column}", $record->id); // ID
            $sheet->setCellValue("B{$column}", $record->getValue('title', true)); // タイトル
            $sheet->setCellValue("C{$column}", $record->getValue('priority', true)); // 重要度
            $sheet->setCellValue("D{$column}", $record->updated_at); // 更新日時

            $column++;
        }
    
        // 枠の設定
        $laseRow = $column - 1;
        $sheet->getStyle("A2:D{$laseRow}")->applyFromArray([
            'borders' => [
                'outside'=>[
                    'borderStyle'=>\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN
                ],
                'inside'=>[
                    'borderStyle'=>\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_HAIR
                ],
            ],
        ]);
        
        // 印刷範囲の設定
        $sheet->getPageSetup()->setPrintArea("A1:D{$laseRow}");
        ///// 独自の実装処理---ここまで


        // tmpファイルに作成したファイルを保存して、そのファイルパスを返却
        // (テンプレートとは別ファイルとして保存)
        return $this->getExcelResult($spreadsheet);
    }

    /**
     * Get download file name.
     *
     * @return string
     */
    public function getFileName() : string {
        return "test.xlsx";
    }
}

~~~

### zipに圧縮
ファイルを最小構成として、zipに圧縮します。  
- ExportTestExcel.zip
    - config.json
    - Plugin.php
    - template.xlsx(テンプレートファイルを含める場合)



## サンプルプラグイン
- [CSV出力のエクスポート](https://exment.net/downloads/sample/plugin/ExportTestCsv.zip)
- [Excel出力のエクスポート](https://exment.net/downloads/sample/plugin/ExportTestExcel.zip)
