# プラグイン(ドキュメント出力)
見積書や帳票など、独自のドキュメント資料を作成することができます。  
ドキュメントの元となるテンプレートはExcel形式で、出力もExcel形式で出力されます。  

![ドキュメント出力例](img/plugin/plugin_document1.png)   

> PDF形式での出力は、[こちら](/ja/plugin_quickstart_docurain)をご参照ください。  

## 作成方法

### config.json作成
- 以下のconfig.jsonファイルを作成します。  

~~~ json
{
    "plugin_name": "PluginDemoDocument",
    "uuid": "1e7881d0-324f-11e9-b56e-0800200c9a66",
    "plugin_view_name": "Plugin Document",
    "description": "ドキュメント出力を行うテストです。",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "document",
    "filename": "見積書_${ymdhms}",
    "target_tables": "estimate",
    "label": "見積書出力",
    "icon": "fa-files-o",
    "button_class": "btn-success"
}
~~~

- plugin_nameは、半角英数で記入してください。
- uuidは、32文字列+ハイフンの、合計36文字の文字列です。プラグインを一意にするために使用します。  
以下のURLなどから、作成を行ってください。  
https://www.famkruithof.net/uuid/uuidgen
- plugin_typeは、documentと記入してください。  
- file_nameは、出力する際のファイル名です。[パラメータ変数](/ja/params)を使用できます。
- target_tablesは、出力対象となるテーブルです。複数ある場合、カンマ区切りで入力してください。※プラグインの設定画面で後から変更できます。
- labelは、ドキュメント出力のためのボタンのラベルです。※プラグインの設定画面で後から変更できます。
- iconは、ドキュメント出力のためのボタンのアイコンです。※プラグインの設定画面で後から変更できます。
- button_classは、ドキュメント出力のためのボタンのクラスです。※プラグインの設定画面で後から変更できます。


### テンプレートExcelファイル作成
ドキュメントの元となる、テンプレートファイルを作成します。  
テンプレートファイルはExcel形式(xlsx)です。出力されるファイルも同様に、Excel形式(xlsx)です。  
※テンプレートExcelファイルのファイル名は、「document.xlsx」としてください。  
※テンプレートファイルのパラメータは、下記の「テンプレートExcelファイルのパラメータ」を参照してください。  

#### パラメータ
テンプレートのExcelファイルに設定するパラメータです。
Excelセルに、特定の形式の変数を入力することで、ドキュメント出力時に、システムに登録しているパラメータが出力されます。  
##### 基本ルール
- 「**${変数名}**」のルールで、Excelのセルに入力します。  
例：「${year}」「${month}」「${value:estimate_code}」  
![パラメータ](img/plugin/plugin_document_params.png)  

- 同一のセルに、複数のパラメータを設定することができます。  

- Excelには、関数を設定しておくことができます。※一部関数は正常に動作しない可能性があります。必ず動作確認を行ってください。  

- 設定できるパラメータ変数は、以下のページをご確認ください。  
[パラメータ変数](/ja/params)


##### 子テーブルデータの一覧出力方法
ドキュメントの種類によっては、対象データの子テーブル一覧表に、データ出力を行う必要があります。  
例：見積日や顧客情報を登録する「見積」と、見積する製品の一覧を登録する「見積明細」  
![子テーブル](img/plugin/plugin_document_children.png)  
この表に、データ一覧出力を行う方法を記載します。  

- 出力する表の1行目の1列目に、以下のパラメータを設定します。  
**「${loop:(子テーブルのテーブル名):start}」**  
例：${loop:estimate_detail:start}  
![子テーブル_パラメータ1](img/plugin/plugin_document_loop1.png)  

- 出力する表の2行目の、出力したい項目の各列に、以下のパラメータを設定します。  
**「${loop-item:(子テーブルのテーブル名):(子テーブルの列名)}」**  
例：${loop-item:estimate_detail:product_detail_name}  
![子テーブル_パラメータ2](img/plugin/plugin_document_loop2.png)  

- 出力する表の最終行の1列目に、以下のパラメータを設定します。  
**「${loop:(子テーブルのテーブル名):end}」**  
例：${loop:estimate_detail:end}  
![子テーブル_パラメータ3](img/plugin/plugin_document_loop3.png)  


##### その他の制約
- PhpSpreadSheetの最新版(2022/02/25現在)である1.22.0では、以下の内容には対応していません。テンプレートには含めないようにお願いします。  
    - 挿入する図形
    - グラフ
    - 「テーブルとして書式設定」を行う表

- 出力されたファイルに画像が含まれない場合、[こちら](/ja/troubleshooting)の「Excelをテンプレートとしたドキュメント出力で、画像の出力に失敗する」をご確認ください。

### PHPファイル作成(任意)
- 通常のドキュメント出力はパラメータ変数を設定したdocument.xlsxを用意するだけで十分です。  
特殊なデータ加工を行いたい場合、Exment以外のデータを出力したい場合は別途PHPファイルを作成してください。名前は「Plugin.php」です。  
**※特殊な処理が必要ない場合、このPlugin.phpファイルは不要です。**

~~~ php
<?php
namespace App\Plugins\PluginDemoDocument; // (PluginDemoDocument:プラグイン名)

use Exceedone\Exment\Model\Define;
use Exceedone\Exment\Model\System;
use Exceedone\Exment\Services\Plugin\PluginDocumentBase;

class Plugin extends PluginDocumentBase
{
    /**
     * ドキュメントの変数置き換え実行前に呼び出される関数
     *
     * @param SpreadSheet $spreadsheet
     * @return void
     */
    protected function called($spreadsheet)
    {
        // ドキュメントの変数置き換え実行前に独自処理を実行したい場合はこちら
    }

    /**
     * ドキュメントの変数置き換え実行後に呼び出される関数
     *
     * @param SpreadSheet $spreadsheet
     * @return void
     */
    protected function saving($spreadsheet)
    {
        // １枚目のシートを選択
        $sheet = $spreadsheet->getSheet(0);
        // B1セルにサイト名を設定
        $sheet->setCellValue('B1', System::site_name());

        // Exmentの新着情報を取得する
        $items = $this->getItems();

        foreach ($items as $idx => $item) {
            // 4行目～出力
            $row = $idx + 4;
            // 日付をA?セルに出力
            $date = \Carbon\Carbon::parse(array_get($item, 'date'))->format(config('admin.date_format'));
            $sheet->setCellValue("A$row", $date);
            // リンクをB?セルに出力
            $link = array_get($item, 'link');
            $sheet->setCellValue("B$row", $link);
            // タイトルをC?セルに出力
            $title = array_get($item, 'title.rendered');
            $sheet->setCellValue("C$row", $title);
        }
    }

    /**
     * Exmentの新着情報をAPIから取得する
     *
     * @return array exment news items array
     */
    protected function getItems()
    {
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', Define::EXMENT_NEWS_API_URL, [
            'http_errors' => false,
            'query' => $this->getQuery(),
            'timeout' => 3, // Response timeout
            'connect_timeout' => 3, // Connection timeout
        ]);

        $contents = $response->getBody()->getContents();
        if ($response->getStatusCode() != 200) {
            return [];
        }
        return json_decode_ex($contents, true);
    }

    /**
     * APIに渡すクエリ条件
     *
     * @return array query string array
     */
    protected function getQuery()
    {
        $request = request();

        // get querystring
        $query = [
            'categories' => 6,
            'per_page' => System::datalist_pager_count() ?? 5,
            'page' => $request->get('page') ?? 1,
        ];

        return $query;
    }

    /**
    * (v3.4.3対応)画面にボタンを表示するかどうかの判定。デフォルトはtrue
    * 
    * @return bool true: 描写する false 描写しない
    */
    public function enableRender(){
        // カスタム列の値「view_flg」が「1」の場合にボタンを表示する
        return $this->custom_value->getValue('view_flg')  == 1;
    }
}

~~~

- namespaceは、**App\Plugins\\(プラグイン名のパスカルケース)**としてください。[詳細はこちら](/ja/plugin_quickstart#プラグイン名のnamespace)

- パラメータ変数置換前に独自の処理を行う場合は「called」メソッドを実装してください。パラメータ変数置換後に処理を行う場合は「saving」メソッドです。  
これらの関数に渡される引数のスプレッドシートにアクセスすることで、セルに値を設定することが可能です。  
※スプレッドシートの詳しい利用方法については、[こちら](https://phpspreadsheet.readthedocs.io/en/latest/)をご参照ください。  

- Pluginクラスは、クラスPluginDocumentBaseを継承しています。  
PluginDocumentBaseは、呼び出し元のカスタムテーブル$custom_table、テーブル値$custom_valueなどのプロパティを所有しており、  
execute関数が呼び出された時点で、そのプロパティに値が代入されます。  
プロパティの詳細については、[プラグインリファレンス](plugin_reference.md)をご参照ください。  

- (v3.4.3対応) 登録しているデータを用いて、ボタンの表示・非表示を制御したい場合、メソッド"enableRender"を実装します。  
ボタンを表示する場合はtrueを、非表示にしたい場合はfalseを返却してください。(デフォルトはtrueです。)


### zipに圧縮
上記のファイルを最小構成として、zipに圧縮します。  
zipファイル名は、「(plugin_name).zip」にしてください。  
- PluginDemoDocument.zip
    - config.json
    - document.xlsx
    - Plugin.php(任意)
    - (その他、必要なPHPファイル、画像ファイルなど)


### アップロード
プラグインをアップロードします。  
※アップロード方法は、[プラグイン](/ja/plugin)をご参照ください。  


### ドキュメント出力実行
すべての設定を正常に完了した場合、データの表示画面にボタンが表示されます。  
![ドキュメント出力_ボタン](img/plugin/plugin_document_button.png)  
  
ボタンをクリックすることで、「添付ファイル」に一覧が表示されます。  
![ドキュメント出力_添付ファイル](img/plugin/plugin_document_list.png) 

### サンプルプラグイン
[ユーザー情報出力](https://github.com/exment-git/plugin-sample/tree/main/document/document_demo_user)  
※ユーザー情報画面で、「ユーザー情報出力」ボタンが表示されます。  

### 製品プラグイン
[請求書のPDF出力](https://github.com/exment-git/plugin-product/tree/main/document/PluginInvoiceDocument)  
※テンプレートで請求書をEXCEL形式で出力します。合わてEXCELファイルをPDFへ変換します。