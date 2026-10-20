# コマンド一覧
Exmentで利用可能なコマンド一覧です。  
システム内で利用しているコマンド、開発用のコマンドを含みます。

## インストール・アップデート

### インストール

Exmentを手動でインストールするためのコマンドです。  
詳細は[こちら](/ja/quickstart_manual)をご確認ください。   
※インストールは、下記のコマンド以外にも必要な作業がございます。インストール実行時には、基本的に上記のリンク先の内容に従い、実行してください。

```
php artisan exment:install
```

### アップデート
Exmentを手動でアップデートするためのコマンドです。  
詳細は[こちら](/ja/update)をご確認ください。  
※アップデートは、下記のコマンド以外にも必要な作業がございます。アップデート実行時には、基本的に上記のリンク先の内容に従い、実行してください。

```
php artisan exment:update
```

### css・jsファイルなど発行
パッケージ内のcss、js、画像ファイルや、設定ファイルなどの一式を、laravelの既定のパスへ発行します。

```
php artisan exment:publish
```

### サーバー設定時の初期ファイル・フォルダ設定
主にLinux環境で、Exment実行に必要なファイル・フォルダの、所有者・パーミッション設定を行います。  
詳細は[こちら](/ja/server#初期フォルダ自動生成)をご確認ください。  

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}
```



## データインポート・エクスポート・データ削除

### データエクスポート
データのエクスポートをコマンドから実行します。  
詳細は[こちら](/ja/data_cmd_import_export#データエクスポート)をご確認ください。

```
php artisan exment:export (テーブル名)
```

### データエクスポート(chunkモード)
データのエクスポート(chunkモード、分割出力)をコマンドから実行します。  
詳細は[こちら](/ja/data_cmd_import_export#export_chunk)をご確認ください。

```
php artisan exment:chunkexport (テーブル名)
```


### データインポート
データのインポートをコマンドから実行します。  
詳細は[こちら](/ja/data_cmd_import_export#データインポート)をご確認ください。

```
php artisan exment:import {フォルダ名}
```


### データインポート - 画像・ファイル列の添付ファイル取込
Exmentのカスタム列種類「画像」「ファイル」列に、添付ファイルを一括で登録することができます。  
詳細は[こちら](/ja/data_cmd_import_export#import_file)をご確認ください。

```
php artisan exment:file-import {フォルダ名}
```


### データインポート - ドキュメント(添付ファイル)一覧
指定のカスタムデータの、ドキュメント(添付ファイル)に、ファイルを一括で登録することができます。  
詳細は[こちら](/ja/data_cmd_import_export#import_document)をご確認ください。

```
php artisan exment:document-import {フォルダ名}
```


### 大量データ一括投入
大量データ一括投入を、コマンドから行います。  
詳細は[こちら](/ja/data_bulk_insert)をご確認ください。

```
php artisan exment:bulkinsert {フォルダ名}
```


### カスタムデータのリフレッシュ
Exmentに登録している、カスタムデータを、リフレッシュ(一括削除)します。  
テーブル定義のみ残し、テストデータを削除する場合などにご利用ください。  
詳細は[こちら](/ja/refresh_data)をご確認ください。

```
php artisan exment:refreshdata
```


### カスタムデータのリフレッシュ(指定のテーブル)
Exmentに登録している、カスタムデータのうち、指定のテーブルのデータを、リフレッシュ(一括削除)します。  
テーブル定義のみ残し、テストデータを削除する場合などにご利用ください。  
詳細は[こちら](/ja/refresh_data)をご確認ください。

```
php artisan exment:refreshtable (テーブル名)
```


### 操作ログの削除
[操作ログ](/ja/logs)のデータを削除します。  
- --keep-days=(日数。指定した日数より前の操作ログを削除します。1以上の整数を指定します。未指定の場合、すべての操作ログを削除します)
- --force(指定した場合、削除前の確認メッセージを表示せずに実行します)

<span class="red">※「--keep-days」を指定しない場合、すべての操作ログが削除されますので、ご注意ください。</span>  
※確認メッセージを表示できない環境(cronなど)では、「--force」を指定しない場合、削除は行われません。

```
php artisan exment:log-clear {--keep-days=} {--force}

# 180日より前の操作ログを、確認メッセージを表示せずに削除する場合
php artisan exment:log-clear --keep-days=180 --force
```







## バックアップ・リストア

### バックアップ
Exmentのバックアップを実行します。画面から実行する、バックアップ機能と同等の機能となります。  
詳細は[こちら](/ja/backup#backup_command)をご確認ください。  

```
php artisan exment:backup
```

### リストア
Exmentのリストアを実行します。画面から実行する、リストア機能と同等の機能となります。  
詳細は[こちら](/ja/backup#restore_command)をご確認ください。  

```
php artisan exment:restore (zipファイル名)
```


## バッチ・スケジュール
### プラグインバッチ実行
Exmentに登録しているバッチを実行します。  
詳細は[こちら](/ja/plugin_quickstart_batch)をご確認ください。

```
php artisan exment:batch 1
```


### スケジュール実行
Exmentに登録しているスケジューラに従い、ジョブを実行します。  
詳細は[こちら](/ja/additional_task_schedule)をご確認ください。

```
php artisan exment:schedule
```


### 通知(時間の経過)を実行
通知の実施トリガー「時間の経過」で設定している通知を、「通知時間」設定よらずに、即時実行します。  
詳細は[こちら](/ja/notify)をご確認ください。

```
php artisan exment:notify {id?} {--name=}
```


### 安否確認(地震情報の確認)
地震情報を取得し、[安否確認](/ja/safety_check)の自動送信の条件に合致する地震があれば、安否確認を送信します。  
[タスクスケジュール](/ja/additional_task_schedule)により、毎分実行されます。  
※システム設定の「地震発生時に自動送信する」がNOの場合は、何も実行しません。

```
php artisan exment:safetywatch
```



## 全文検索エンジン(Meilisearch)
全文検索エンジン「Meilisearch」を使用する場合のコマンドです。  
各コマンドの詳細は[こちら](/ja/additional_meilisearch)をご確認ください。

|コマンド|内容|
|---|---|
|php artisan exment:meili-index {--fresh} {--force}|データベースの内容から、インデックスを作成します。「--fresh」を指定した場合、インデックスをすべて作成しなおします。詳細は[こちら](/ja/additional_meilisearch?id=インデックスの再作成)をご確認ください。|
|php artisan exment:meili-reconcile {--dry-run} {--table=}|データベースとインデックスの差異を修復します。詳細は[こちら](/ja/additional_meilisearch?id=差異の修復)をご確認ください。|
|php artisan exment:meili-settings {--show}|インデックスの設定(言語・シノニム・ストップワードなど)を反映します。「--show」を指定した場合、現在の設定内容を表示します。詳細は[こちら](/ja/additional_meilisearch?id=設定のみの反映)をご確認ください。|
|php artisan exment:meili-health {--failed}|Meilisearchとの接続状態と、登録されているドキュメント件数を表示します。「--failed」を指定した場合、同期待ちのジョブと、同期に失敗したジョブの件数もあわせて表示します。|
|php artisan exment:meili-search (キーワード) {--limit=10} {--table=} {--highlight} {--facets}|Meilisearchで検索を行い、検索結果と処理時間を表示します。動作確認用のコマンドです。詳細は[こちら](/ja/additional_meilisearch?id=動作確認)をご確認ください。|



## その他、開発用

### Exmentバージョン
現在インストールされている、Exmentのバージョンを表示します。

```
php artisan exment:version
```


### パスワードリセット
Exmentのログインパスワードリセットを、コマンドから実行します。  
詳細は[こちら](/ja/login_setting#パスワードリセットコマンド)をご確認ください。

```
php artisan exment:resetpassword --email=(対象ユーザーのメールアドレス) --password=(変更後パスワード)
```

### ワークフローのデータのリセット 
進行中のワークフローのデータをリセットすることができます。なんらかの理由で、ワークフローが進行不可能になった場合に実行してください。  
詳細は[こちら](/ja/workflow_execution#ワークフローのデータのリセット)をご確認ください。

```
php artisan exment:workflow-clear (テーブル名) (ID)
```


### LINE連携コードの発行
指定したユーザーの、LINEアカウント連携用の連携コードと、連携用のURL(ディープリンク)を発行します。  
連携用のURLを、LINE公式アカウントを友だち追加したスマートフォンで開き、表示されたメッセージを送信すると、連携が完了します。  
※通常は、[LINE連携](/ja/line?id=lineアカウント連携)の画面から、各ユーザーが連携してください。  
※「ユーザーのID」には、ユーザーのデータのID(数値)を指定します。ユーザーコードではありません。  
<span class="red">※すでにLINEアカウントを連携しているユーザーに実行すると、現在の連携は解除されます。</span>

```
php artisan exment:line-linkcode (ユーザーのID)
```



### テストデータ作成
Exmentのテストデータ一式を作成します。  
<span class="red">※登録済みの全データが削除されますので、ご注意ください。</span>

```
php artisan exment:inittest
```


### メール送信テスト
Exmentに設定されたメール設定に従い、メール送信テストを行います。  
詳細は[こちら](/ja/mailsend_setting#コマンドから実行)をご確認ください。

```
php artisan exment:notifytest --to=(メール送信先)
```

### 言語ファイル対応漏れ確認
Laravelの言語ファイルで、パッケージに反映が漏れている言語・単語を確認します。

```
php artisan exment:checklang
```


### データパッチ
データベースに登録されているデータの補正が必要になった場合に実行するコマンドです。  
※基本的には、データのアップデート実施時に自動的に実行されます。  
※実施アクションは、ソース"src/Console/PatchDataCommand.php"を直接ご確認ください。

```
php artisan exment:patchdata {実施アクション}
```



### データベースの接続確認
データベースに接続されているかどうかの確認を行います。  
接続されている場合は1を、未接続の場合は0を返却します。

```
php artisan exment:check-connection
```
