# ドキュメント出力(Docurain)
Excelとjsonだけで帳票開発ができるクラウド帳票エンジン **Docurain** を使用し、PDF出力を行います。  

> Excel形式での出力は、[こちら](/ja/plugin_quickstart_document)をご参照ください。  

## Docurainとは
Docurainは、Excelとjsonだけで帳票開発ができるクラウド帳票エンジンです。  
さまざまなレイアウトの帳票も、Excelファイルのテンプレートから作成することができ、またPDF形式の出力にも対応しています。  
[Docurainのサイトはこちら](https://docurain.jp/)

> Docurainは、ルート42株式会社が開発・運用のサービスになります。  
ご利用の際には、ライセンストークンが必要となります。帳票出力の回数ごとの従量課金となります。（試用トークンの発行は可能です。）  
Exmentの開発・運用会社である株式会社カジトリは、Docurainの代理店です。試用のご要望、お申し込み、お問い合わせは、[こちら](https://exment.net/docurain)からお願いします。


## 実行方法
- [こちらのプラグイン](https://github.com/exment-git/plugin-sample/tree/main/docurain/Docurain)をダウンロードします。

- Exmentのプラグインとしてアップロードします。  
手順は[こちら](/ja/plugin?id=プラグインアップロード)をご参照ください。

- アップロード後、Docurainプラグインの行をクリックし、プラグイン設定画面に入ります。  

![Docurain](img/docurain/docurain_setting3.png)  

- 以下の内容を入力します。

- 対象テーブル：Docurainを実行する対象のテーブル

![Docurain](img/docurain/docurain_setting1.png)  

- トークン：Docurain実行トークン。トークン発行は、[こちら](https://exment.net/inquiry)にてお問い合わせください

![Docurain](img/docurain/docurain_setting2.png)  

- テーブル名と帳票ファイル名一覧： 帳票出力を行うテーブル名とテンプレートファイル名、出力する帳票ファイル名、ボタンのラベルをカンマ区切りで入力してください。複数の場合は改行区切りを行ってください。  
※テンプレートファイル名に日本語は使用できません。（帳票ファイル名とボタンラベルには使用可能です）  
※帳票ファイル名を省略した場合はテンプレートファイル名になります。  
※ボタンのラベルを省略した場合はプラグイン共通で設定したラベルになります。  
※帳票ファイル名には日付などの[パラメータ](ja/params.md)を含めることができます。

![Docurain](img/docurain/docurain_setting4.png)  


- 解凍したフォルダ内の「documents」フォルダ内に、帳票の元となるExcelファイルを配置します。  
複数の帳票をDocurainで作成する場合、複数のExcelファイルをdocumentsに配置してください。  
※フォルダパスは、「(プロジェクトルートフォルダ)/storage/app/plugins/Docurain/documents」になります。  
※帳票の作成方法は、以下の「帳票作成方法」をご確認ください。

![Docurain](img/docurain/docurain_setting5.png)  
![Docurain](img/docurain/docurain_setting6.png)  

- ここまでの設定を行うことで、「対象テーブル」で選択したテーブルに、ボタンが表示されます。  

![Docurain](img/docurain/docurain_setting7.png)  

- ボタンをクリックすることで、帳票が作成されます。  

![Docurain](img/docurain/docurain_setting8.png)
![Docurain](img/docurain/docurain_setting9.png)  

### テンプレートExcelファイル作成
帳票の元となるExcelファイルを作成します。  
※Excelファイルの名前に日本語は使用できません。拡張子は必ずxlsxでお願いします。  
※テンプレートファイルのパラメータは、通常のExmentのパラメータ記載方法とは異なり、Docurain専用の記載方法が必要です。  

#### パラメータ
テンプレートのExcelファイルに設定するパラメータです。
Excelセルに特定の形式の変数を入力することで、帳票出力時に、様々な値に変換されます。  

##### システム値
| 項目 | 説明 |
| ---- | ---- |
| %{system.site_name} | システムのサイト名 |
| %{system.site_name_short} | システムのサイト名(短縮) |
| %{system.system_mail_from} | システムの送信元 |
| %{system.system_url} | システムのホームURL |
| %{system.login_url} | システムのログインURL |

##### データ
| 項目 | 説明 |
| ---- | ---- |
| %{id} | 対象データのIDが設定されます。(例：123) |
| %{suuid} | 対象データの、suuid(Short UUID. 20桁のランダム文字列))が設定されます。 |
| %{value_url} | 対象データを表示するリンクが設定されます。 |
| %{value.(列名)} | 対象データの列の値が設定されます。(例：ユーザーデータに対し、%{value.user_code}と記入した場合、ユーザーコードが設定される) |
| %{select_table.(列名).(参照先のテーブルの列名)} | 「列名」に該当する列が、「選択肢 (他のテーブルの値一覧から選択)」「ユーザー」「組織」の場合、参照先の列の値が設定されます。(例：「契約情報(contract)」テーブルに「顧客(client)」列があり、「顧客情報(client)」テーブルを参照している場合、%{select_table.client.client_code}と設定すれば、「顧客情報(client)」テーブルの顧客コード(client_code)を表示できる) |
| %{parent.(参照先のテーブルの列名)} | 親テーブルの列の値が設定されます。(例：「契約明細情報(contract_detail)」テーブルから、親である「契約情報(contract)」テーブルの契約コード(contract_code)を参照する場合、%{parent.contract_code}と記入した場合、契約コードが設定される) |
| $ENTITY.children.(子テーブル名) | 「#foreach」などのブロック構文を用いて子テーブルの情報を設定します。子テーブルの情報は複数存在するケースがあるので、%{children.(子テーブル名).(子テーブルの列名)}のように設定することはできません。下記で一例を説明しています。 |

#### 設定例
##### 基本ルール
- 一般的なEXCEL関数や書式設定が使用可能です。  
- A列はロジック記述専用の列です。#ifや#foreach、#setなどのブロック構文を記述します。

##### ※テンプレートの一例   
![Docurain](img/docurain/docurain_setting10.png)

- 上記テンプレートを出力した結果のPDFです。   
![Docurain](img/docurain/docurain_setting11.png)

#### サンプルテンプレートのダウンロード
[ユーザー情報](https://exment.net/downloads/product/plugin/Docurain/user.xlsx)  
[製品バージョン情報](https://exment.net/downloads/product/plugin/Docurain/product_version.xlsx)  
[契約情報](https://exment.net/downloads/product/plugin/Docurain/contract.xlsx)  
※製品バージョン情報と契約情報を使用するためには、事前に「製品販売会社用テンプレート」をインポートする必要があります。


### エラーについて
- 出力の実行後、エラーが表示される場合があります。  
その場合はエラー内容をご確認いただき、対応を行ってください。
![Docurain](img/docurain/docurain_error1.png)

- エラーのうち、「HTTPステータスコード」が「413」のエラーは、Docurainのクラウドサービス側で、サービス許容値の変更対応を行う必要があります。  
その場合は、[こちら](https://exment.net/docurain)よりお問い合わせください。
