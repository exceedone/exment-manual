# インストール手順(ZIP版)
Exmentを開始するために必要となる手順です。zipファイルよりインストールする方法です。  
※非推奨のインストール方法です。[インストール手順](/ja/quickstart.md)での導入をおすすめしております。  

## 注意点
- インストール時にエラーが発生した場合、[インストール時にエラーが発生したら](/ja/install_error)をご参照ください。
- その他お問い合わせは、お気軽にこちらの[無料お問い合わせ](https://exment.net/inquiry)にてお願いいたします。


## PHP, MySQL環境構築
Exmentには、PHP7.1.3以上が必要です。ならびに、MySQL 5.7.8以上、8.0.0未満 または MariaDB 10.2.7以上が必要です。  
PHPやApache、MySQLのある環境構築を、開発環境としてはじめから構築する場合、XAMPPをおすすめしております。  
XAMPPによる構築方法は、[こちら](/ja/install_xampp)をご参照ください。  
※すでに環境がある方は、当設定は不要です。


## zipダウンロード・展開
- 以下のURLより、zipファイルをダウンロードします。  
[Exment zip版](https://exment.net/downloads/ja/exment.zip)

- zipファイルを、PHP実行可能なパスに展開します。  
例：C:\xampp\local


## APP_KEY再生成
アプリケーションキー(APP_KEY)を再生成します。以下のコマンドを実行してください。  
※APP_KEYは、データの暗号化で使用する内容です。このコマンドを実行しない場合、zip内にあるデフォルトのAPP_KEYが使用されてしまいます。セキュリティ対策として、必ず実行してください。

~~~
cd (展開したexmentのルートフォルダ)
php artisan key:generate
~~~


## データベース作成
- Exment用のデータベースを、MySQLで作成してください。


## .env変更

- ".env" を開き、以下の内容を追加・変更します。  

~~~
# 以下、データベースの設定値変更
DB_CONNECTION=mysql
DB_HOST=127.0.0.1 #MySQLのホスト名
DB_PORT=3306 #MySQLのポート番号
DB_DATABASE=homestead #MySQLのExment用データベース名
DB_USERNAME=homestead #MySQLのExment用データベースのユーザー名
DB_PASSWORD=secret #MySQLのExment用データベースのパスワード

# 以下、メール送信用の設定値変更
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io #メールサーバー用のホスト名
MAIL_PORT=2525 #メールサーバー用のポート番号
MAIL_USERNAME=null  #メールサーバーのユーザー名
MAIL_PASSWORD=null #メールサーバーのパスワード
MAIL_ENCRYPTION=null #ssl使用の場合"ssl"と記入

# 以下、特定の場合に追加
ADMIN_HTTPS=true #https通信の場合に追加
~~~

## コマンド実行
- 以下のコマンドを実行します。

~~~
php artisan passport:keys
php artisan exment:install
~~~

## 設定完了
クイックスタートが完了したら、引き続き[初期設定](/ja/first_setting.md)を行ってください。  

## その他の初期設定
以上の作業で、Exmentを開始することは可能ですが、一部の機能を使うために、追加で設定が必要になる場合があります。  
以下のリンクをご確認ください。  
- [URLに含む「admin」の変更・削除](/ja/quickstart_more.md#URLに含む「admin」の変更・削除)
- [シングルサインオン](/ja/quickstart_more.md#シングルサインオン)
- [タスクスケジュール機能](/ja/quickstart_more.md#タスクスケジュール機能)
- [サーバー外部通信オフ](/ja/quickstart_more.md#サーバー外部通信オフ)
- [ファイルアップロード上限サイズ変更](/ja/quickstart_more.md#ファイルアップロード上限サイズ変更)
