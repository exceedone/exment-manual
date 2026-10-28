# インストール手順(手動インストール)
Exmentを開始するために必要となる手順です。  
※手動によるインストール方法です。  
※このページは、Exment v7.0.0以降のインストール手順です。Exment v6.x以前(Laravel10.X、管理画面ライブラリはlaravel-admin)では、Laravelのバージョンやインストールするパッケージなどが異なります。v6.xとv7.0.0の違いについては、[更新手順 v7.0.0](/ja/update/v7_0_0)をご確認ください。  

## 注意点
- インストール時にエラーが発生した場合、[トラブルシューティング](/ja/troubleshooting)をご参照ください。
- ※現在、大変申し訳ございませんが、インストール手順やサーバー構築についての個別のお問い合わせは承っておりません。個別対応をご希望の場合、有償のサポートをご希望ください。　　

## サーバー構築
サーバーの構築をまだ行っていない場合、Webサーバーやデータベースサーバーの構築を行ってください。  
構築方法は、[こちら](/ja/server)をご確認ください。


## Exmentアプリ設定
サーバー構築が完了したら、Exmentのアプリ設定を行います。

### Laravelインストール(プロジェクト作成)
- コマンドラインで、以下のコマンドを実行します。  
※作成したプロジェクトのフォルダを、このマニュアルでは「ルートディレクトリ」と呼びます。  
※Exmentは現在、Laravelのバージョン12.Xのみの対応です。それ以外のバージョンでインストールは行わないよう、お願いします。  

~~~
composer create-project "laravel/laravel=12.*" (プロジェクト名)
cd (プロジェクト名)
~~~


### .env変更

- ".env" を開き、以下の内容を追加・変更します。<span class="red bold">特に、以下の値をご確認ください。</span>  
    - DB_CONNECTION : ※お使いのデータベースが、MySQLか、MariaDBか、SQL Serverかで、DB_CONNECTIONの値が異なります
    - APP_TIMEZONE、APP_LOCALE : 言語とタイムゾーンです。インストール前に値を記入してください。
    - SESSION_DRIVER、CACHE_STORE、QUEUE_CONNECTION : Laravel12では、セッション・キャッシュ・キューの初期値が「database」になっています。このままでは、インストール前に画面を開くとエラーが発生し、またメール送信などの通知がキューに保持されたまま実行されません。v6.x以前(Laravel10)と同じ動作にするため、以下の値に変更してください。キューを利用する場合は、[通知処理の遅延実行](/ja/additional_queue)をご参照ください。
- <span class="red bold">.envの変更は、次の「Exmentインストール」の前に行ってください。</span>Laravel12の初期設定ではデータベースが「sqlite」になっているため、変更前にExmentをインストールすると、エラーが表示されます。

~~~
# 以下、必須設定項目 --------------------
#基本設定
APP_URL=http://XXXX.com #そのサイトにアクセスするURL。"admin"は不要

# データベースの設定値変更
# MySQLの場合、以下の設定値（既定値です）
DB_CONNECTION=mysql
# MariaDBの場合、以下の設定値に修正します
DB_CONNECTION=mariadb
# SQL Serverの場合、以下の設定値に修正します
DB_CONNECTION=sqlsrv

DB_HOST=127.0.0.1 #データベースのホスト名
DB_PORT=3306 #データベースのポート番号
DB_DATABASE=homestead #データベースのExment用データベース名
DB_USERNAME=homestead #データベースのExment用データベースのユーザー名
DB_PASSWORD=secret #データベースのExment用データベースの1パスワード

# 日本語と日本時間の設定。コピー・ペーストで設定する
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja

# セッション・キャッシュ・キューの設定。Laravel12の初期値(database)から変更します
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync


# 以下、任意設定項目 --------------------

# https通信の場合に追加
ADMIN_HTTPS=true

# パスワードのハッシュ化(bcrypt)の計算コスト(ラウンド数)。任意設定で、既定値は12です。
# OWASPは10以上を推奨しています。既定値を変更したい場合のみ設定してください。
# 別のコストでハッシュ化されたパスワードは、ユーザーが次にログインしたときに自動で再ハッシュされます。
# https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
BCRYPT_ROUNDS=12
~~~


### Exmentインストール
- ルートディレクトリで、以下のコマンドを実行します。  
※管理画面ライブラリ「exceedone/exment-admin-core」は、Exmentの依存ライブラリとして自動的にインストールされます。個別にインストールする必要はありません。

~~~
composer config --no-plugins allow-plugins.kylekatarnls/update-helper true
composer require exceedone/exment=^7.0 -W

# Exmentのバージョンを指定したい場合、代わりに以下を実行。例：v7.0.0
composer require exceedone/exment=7.0.0 -W
~~~


### コマンド実行
- 以下のコマンドを実行します。

~~~
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
php artisan passport:keys
php artisan exment:install
~~~

## 設定完了
インストールが完了したら、引き続き[初期設定](/ja/first_setting.md)を行ってください。  


## その他の追加設定
以上の作業で、Exmentを開始することは可能ですが、一部の機能を使うために、追加で設定が必要になる場合があります。  
以下のリンクをご確認ください。  
- [追加設定](/ja/quickstart_more)



[←インストール-概要へ戻る](/ja/quickstart)