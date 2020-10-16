# インストール手順(手動インストール)
Exmentを開始するために必要となる手順です。  
※手動によるインストール方法です。  

## 注意点
- インストール時にエラーが発生した場合、[トラブルシューティング](/ja/troubleshooting)をご参照ください。
- ※現在、大変申し訳ございませんが、インストール手順やサーバー構築についての個別のお問い合わせは承っておりません。個別対応をご希望の場合、有償のサポートをご希望ください。　　

## サーバー構築
サーバーの構築をまだ行っていない場合、Webサーバーやデータベースサーバーの構築を行ってください。  
構築方法は、[こちら](/ja/server)をご確認ください。

### Webサーバー構築
Exmentには、PHP7.1.3以上が必要です。  
サーバーの構築をまだ行っていない場合、[こちら](/ja/server)をご確認いただき、構築を行ってください。

### composer導入
Exmentには、Webサーバーにcomposerの導入が必要です。導入方法はこちらをご参照ください。  
※すでに導入済の方は不要です。  
- [公式サイト](https://getcomposer.org/download/)
- [Windows版 解説サイト](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Linux版 解説サイト](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Mac版 解説サイト](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)


### データベース構築
Exmentのデータベースエンジンには、以下のいずれかが必要です。

- MySQL 5.7.8以上8.0.0未満
- MariaDB 10.2.7以上
- SQL Server 13.0.0以上(現在、自動のバックアップ・リストアが未対応です)

データベースサーバーの設定をまだ行っていない場合、[こちら](/ja/server#データベース)をご確認いただき、構築を行ってください。


## Exmentアプリ設定
サーバー構築が完了したら、Exmentのアプリ設定を行います。

### Laravelインストール(プロジェクト作成)
- コマンドラインで、以下のコマンドを実行します。  
※作成したプロジェクトのフォルダを、このマニュアルでは「ルートディレクトリ」と呼びます。  
※Exmentは現在、バージョン5.6のみの対応です。それ以外のバージョンでインストールは行わないよう、お願いします。

~~~
composer create-project "laravel/laravel=5.6.*" (プロジェクト名)
cd (プロジェクト名)
composer require exceedone/exment

# Exmentのバージョンを指定したい場合、代わりに以下を実行。例：v3.2.6
composer require exceedone/exment=3.2.6
# Exmentのバージョンを指定したい場合、代わりに以下を実行。例2：develop(開発バージョン)
composer require exceedone/exment=dev-develop
~~~

### データベース作成
- ご利用のデータベース環境に、Exment用のデータベースを作成してください。


### .env変更

- ".env" を開き、以下の内容を追加・変更します。<span class="red bold">特に、以下の値をご確認ください。</span>  
    - DB_CONNECTION : ※お使いのデータベースが、MySQLか、MariaDBか、SQL Serverかで、DB_CONNECTIONの値が異なります
    - APP_TIMEZONE、APP_LOCALE : 言語とタイムゾーンです。インストール前に値を記入してください。

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


# 以下、任意設定項目 --------------------

# https通信の場合に追加
ADMIN_HTTPS=true

~~~


### （推奨）エラーページ追加

- "app/Exceptions/Handler.php"を開き、 "render"関数に以下を追加します。  
※エラーの内容によっては、ここで制御したエラーページが表示されず、Laravelのエラーが表示されることがあります。

~~~ php
    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        // 追加
        return \Exment::error($request, $exception, function($request, $exception){
            return parent::render($request, $exception);
        });
    }
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


## その他の初期設定
以上の作業で、Exmentを開始することは可能ですが、一部の機能を使うために、追加で設定が必要になる場合があります。  
以下のリンクをご確認ください。  
- [追加設定](/ja/quickstart_more)
