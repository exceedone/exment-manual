# 追加設定
[インストール手順](/ja/quickstart.md)が終われば、Exment は動きます。  
ただし、一部の機能を使うには、追加の設定が必要です。  
下の一覧から、使いたい機能のページを開いて、手順のとおりに設定してください。  

### 設定内容一覧

- [URLに含む「admin」の変更・削除](/ja/additional_prefix)  
URL の頭に付ける「/admin」などの値を変えたり、なくしたりします（v7.2.1 以降の新しいインストールでは、標準で付きません）。

- [タスクスケジュール](/ja/additional_task_schedule)  
バックアップの自動作成や、期限の通知など、決まった時刻に自動で処理を動かすための設定です。

- [サーバー外部通信オフ](/ja/additional_disable_outside_api)  
Exment の更新情報の取得など、サーバーから外部のサーバーへの通信を止めるための設定です。

- [キャッシュの有効化](/ja/additional_cache)  
カスタムテーブル・列・ビュー・ワークフローなどのマスターデータをキャッシュします。環境によっては、速くなることがあります。

- [ファイル保存先変更](/ja/additional_file_saveplace)  
ファイルの保存先を、ローカルのサーバーから、FTP や AWS S3 などに変える手順です。

- [PHP設定値変更](/ja/additional_php_ini)  
添付ファイルのアップロードサイズ・PHP のメモリ使用量・タイムアウト時間を変える手順です。

- [IPフィルター](/ja/additional_ip_filter)  
Web ページへのリクエストと API の実行を、IP アドレスで制限できます。

- [APIで429エラーが発生時](/ja/additional_429_too_many)  
API を実行したときに、429 Too Many Requests が出る場合の対処法です。

- [データ取得APIで、label列を追加する](/ja/additional_api_label)  
データ一覧の取得や、データの新規作成・更新のときに、結果に "label" 列を足せます。

- [列種類「1行テキスト」の設定「使用可能文字」で、独自オプション追加](/ja/additional_available_characters)  
カスタム列の種類「1行テキスト」の設定「使用可能文字」で、使えるオプションを足せます。

- [通知処理の遅延実行](/ja/additional_queue)  
通知など、一部の処理を、あとから実行する（キュー実行）ようにできます。

- [リバースプロキシ設定](/ja/additional_reverse_proxy)  
リバースプロキシを使う環境で必要な、追加の設定です。

- [全文検索エンジン(Meilisearch)の利用](/ja/additional_meilisearch)  
データが多い環境で、全文検索エンジン「Meilisearch」を使って、速く検索するための設定です。

- [エキスパートモード](/ja/additional_expert)  
より細かい設定項目を画面に出すための手順です。