# テンプレート
Exmentのテーブル、列、フォーム情報や、メニュー、ダッシュボードなどの情報を、インポート、またはエクスポートします。  
別のユーザーが作成したテンプレートを、このシステムに取り込むことで、カスタムテーブルなどを作成する手間が省けます。  
また、このシステムで作成したカスタムテーブルなどを、テンプレートとしてエクスポートすることで、他のユーザーが利用することができます。

## ページ表示
- 左メニューより、「テンプレート」を選択します。  
もしくは、以下のURLにアクセスしてください。  
http(s)://(ExmentのURL)/admin/template  
これにより、テンプレート画面が表示されます。  
![テンプレート画面](img/template/template1.png)  


## エクスポート
テンプレートをエクスポートします。  
ページ上項目の「エクスポート」に、必要事項を記入していき、「送信」をクリックすることで、必要情報が記入されたzipファイルが出力されます。  
![テンプレート画面](img/template/template_export0.png)  

##### テンプレート名  
エクスポートしたときに、システムで使用するための名称を、半角英数字、"-"または"_"で記入します。  
他のテンプレートファイルと重複しないような名称を記入してください。  

##### テンプレート表示名  
テンプレート画面で表示するテンプレート名を記入します。

##### テンプレート説明文  
テンプレート画面で表示する説明文を記入します。

##### サムネイル  
テンプレート画面で表示するサムネイルをアップロードします。推奨サイズは256px*256pxです。  
アップロードしない場合、テンプレート画面では「No Image」画像が表示されます。

##### エクスポート対象  
このテンプレートでエクスポートする対象を選択します。テンプレートをインポート時、選択した項目が、システムにインポートされます。
![テンプレート画面](img/template/template_export1.png)  

##### エクスポート対象テーブル
「エクスポート対象テーブル」で、「テーブル」または「メニュー」を選択時、このテーブルで選択したテーブルに関連する内容のみ、エクスポートされます。  
自身が作成したテーブルに関連する内容のみ、エクスポートしてテンプレートを作成したい場合、選択してください。  
※未選択の場合、すべての項目がエクスポートされます。
![テンプレート画面](img/template/template_export2.png)  

##### 保存
入力が完了したら、［送信］をクリックします。それにより、入力した内容に従って、テンプレートファイルがエクスポートされます。データ形式はzipファイルです。


## インポート
テンプレートをインポートします。  
インポートできるテンプレートは、現在以下の3通りあります。  
- Exmentで用意しているテンプレート
- 画面からアップロードしたテンプレート
- 過去にそのシステムでアップロードしたテンプレート（再度インポートできます）
![テンプレート画面](img/template/template_import0.png)  

以下のいづれかの方法で、インポートを実行してください。

- ##### インストールテンプレート：
Exmentで用意しているテンプレート、もしくは過去にアップロードしたテンプレートの一覧が表示されています。  
その中から、インポートを行いたいテンプレートを選択してください。

- ##### テンプレートアップロード(zip)：
ユーザーがお持ちのExmentテンプレートファイルを、画面からアップロードしてください。  
ファイル形式はzipです。

- ##### テンプレートアップロード(Excel)：
作成したExcelテンプレートファイルを、画面からアップロードしてください。   
ファイル形式はxlsxです。  
※詳細は[「Excelテンプレート」](#import-excel)をご参照ください。

##### 保存  
上記のどちらかを行ったら、「送信」をクリックします。それにより、選択したテンプレート、もしくはアップロードしたテンプレートが、システムにインポートされます。  
それにより、テンプレートで定義しているテーブル・フォーム・ビュー・ダッシュボードなどの情報が、システムにインストールされます。


<h3 id="import-excel"><a href="#/ja/template?id=import-excel" data-id="import-excel" class="anchor"><span>インポート - Excelテンプレート</span></a></h3>

Excelテンプレートファイルに、必要事項を記入し、テーブル設定などをインポートすることができます。  
画面から1からテーブルを作成する場合と比較し、一括で複数のテーブルなどを作成できます。

![テンプレート画面](img/template/template_import_excel1.png)  


#### 実行方法
- [Excelテンプレートファイル](https://exment.net/downloads/template/exment_template.xlsx)をダウンロードし、ファイルを開きます。  

- テンプレートファイルに、設定値を入力していきます。各設定と、対応するシート名は以下になります。
    - カスタムテーブル　：　custom_tables
    - カスタム列　：　custom_columns
    - カスタムテーブル(拡張設定)　：　custom_column_multisettings
    - リレーション設定　：　custom_relations
    - メニュー　：　admin_menu

- 記入後、テンプレート画面の「アップロード(Excel)」項目で、作成したExcelファイルを選択して、アップロードを行ってください。

![テンプレート画面](img/template/template_import_excel2.png)  

#### 注意事項
- Excelテンプレートファイルによるインポートで、現在対応しているのは、以下の設定になります。それ以外の設定(フォームやビューなど)は、画面から設定を行ってください。
    - カスタムテーブル
    - カスタム列
    - カスタムテーブル(拡張設定)
    - リレーション設定
    - メニュー

- カスタム列のうち、「計算式」の設定は対応しておりません。  
こちらの設定は、画面から設定を行ってください。

- <span class="red">カスタム列で、「ユーザー」「組織」列を追加する場合は、シート「custom_columns」のD列「column_type：列種類」を、「user」「organization」と記入を行ってください。</span>  
D列「column_type：列種類」を「select_table」に、AD列「options.select_target_table_name：選択肢(対象テーブル名を入力) 」を「user」「organization」にすると、正常に動作しません。  
なお、すでに取込済だった場合、[こちら](/ja/patch/select_table_user_org)で、更新を行ってください。

- Excelファイルの、各シート名は変更しないでください。また、Excel列の追加も行わないでください。  
(シートの追加は問題ございません。)

- 現在、インポート処理では、バリデーションを設定しておりません。  
インポートを実行する際には、一度テスト環境などを用意し、検証を行ってから、本番環境に取り込みを行うことを推奨しております。  

#### テンプレート、サンプル
- [Excelテンプレートファイル](https://exment.net/downloads/template/exment_template.xlsx)

- [Excelテンプレートファイル - サンプル](https://exment.net/downloads/sample/template/exment_template_sample.xlsx)