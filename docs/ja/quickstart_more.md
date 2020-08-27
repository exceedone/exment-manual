# 追加設定
[インストール手順](/ja/quickstart.md)を実施することで、Exmentを実行することができます。  
ですが、一部の機能を使うために、追加で設定が必要になる場合があります。  
以下の機能を使用する場合、手順に従って設定を行ってください。  

### 設定内容一覧

- [URLに含む「admin」の変更・削除](/ja/additional_prefix)  
通常だと含まれる、URLの「/admin」を変更・削除します。

- [タスクスケジュール](/ja/additional_task_schedule)  
バックアップの自動作成や、期限通知など、一定の時刻で自動処理を行う場合の設定方法です。

- [サーバー外部通信オフ](/ja/additional_disable_outside_api)  
Exmentの更新情報など、サーバーから外部サーバーへの通信を止める場合の設定方法です。

- [キャッシュの有効化](/ja/additional_cache)  
カスタムテーブルや列、ビュー、ワークフローなどのマスターデータをキャッシュ化します。環境によって、高速化する場合があります。

- [ファイル保存先変更](/ja/additional_file_saveplace)  
ファイル保存先を、ローカルサーバーから、FTPやAWS S3などに変更するための手順です。

- [ファイルアップロード上限サイズ・メモリ量変更](/ja/additional_php_ini)  
添付ファイルのアップロードサイズと、PHPのメモリ使用などを変更する手順です。

- [IPフィルター](/ja/additional_ip_filter)  
Webページのリクエスト、ならびにAPI実行を、IPアドレスで制限することができます。

- [APIで429エラーが発生時](/ja/additional_429_too_many)  
API実施時に、429 Too Many Requestsが発生する場合の対処法です。

- [データ取得APIで、label列を追加する](/ja/additional_api_label)  
データ一覧取得、もしくはデータ新規作成・更新の実行時に、"label"列を追加することができます。

- [列種類「1行テキスト」の設定「使用可能文字」で、独自オプション追加](/ja/additional_available_characters)  
カスタム列の種類「1行テキスト」の設定「使用可能文字」で、使用できるオプションを追加できます。

- [通知処理の遅延実行](/ja/additional_queue)  
通知など、一部の処理を遅延実行(キュー実行)することができます。

- [リバースプロキシ設定](/ja/additional_reverse_proxy)  
リバースプロキシで環境構築時の追加設定です。

- [エキスパートモード](/ja/additional_expert)  
より柔軟な設定項目を表示するための手順です。