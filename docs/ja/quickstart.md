# クイックスタート
Exmentを開始するために必要となる手順です。  

## 注意点
- インストール時にエラーが発生した場合、[インストール時にエラーが発生したら](/ja/install_error)をご参照ください。

## PHP, MySQL環境構築
Exmentには、PHP7.1.3以上が必要です。ならびに、MySQL 5.7.8以上 または MariaDB 10.2.7以上が必要です。  
PHPやApache、MySQLのある環境構築を、開発環境としてはじめから構築する場合、XAMPPをおすすめしております。  
XAMPPによる構築方法は、[こちら](/ja/install_xampp)をご参照ください。  
※すでに環境がある方は、当設定は不要です。

## composer導入
Exmentには、composerの導入が必要です。導入方法はこちらをご参照ください。  
※すでに導入済の方は不要です。  
- [公式サイト](https://getcomposer.org/download/)
- [Windows版 解説サイト](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Linux版 解説サイト](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Mac版 解説サイト](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)

## Laravelインストール(プロジェクト作成)
- コマンドラインで、以下のコマンドを実行します。  
※作成したプロジェクトのフォルダを、このマニュアルでは「ルートディレクトリ」と呼びます。

~~~
composer create-project "laravel/laravel=5.6.*" (プロジェクト名)
cd (プロジェクト名)
~~~

## データベース作成
- Exment用のデータベースを、MySQLで作成してください。


## .env変更

- ".env" を開き、以下の内容を追加・変更します。  

~~~

# 以下、必須設定項目 --------------------
#基本設定
APP_URL=http://XXXX.com #そのサイトにアクセスするURL。"admin"は不要

# データベースの設定値変更
DB_CONNECTION=mysql
DB_HOST=127.0.0.1 #MySQLのホスト名
DB_PORT=3306 #MySQLのポート番号
DB_DATABASE=homestead #MySQLのExment用データベース名
DB_USERNAME=homestead #MySQLのExment用データベースのユーザー名
DB_PASSWORD=secret #MySQLのExment用データベースの1パスワード

# v1.2.0より、日本語と日本時間の設定。コピー・ペーストで設定する
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja


# 以下、任意設定項目 --------------------

# メール送信用の設定値変更。パスワードリセットメールなどを送付する場合に設定
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io #メールサーバー用のホスト名
MAIL_PORT=2525 #メールサーバー用のポート番号
MAIL_USERNAME=null  #メールサーバーのユーザー名
MAIL_PASSWORD=null #メールサーバーのパスワード
MAIL_ENCRYPTION=null #ssl使用の場合"ssl"と記入

# https通信の場合に追加
ADMIN_HTTPS=true

~~~

## コマンド実行
- 以下のコマンドを実行します。

~~~
composer require exceedone/exment
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
~~~

## （推奨）エラーページ追加

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
- [シングルサインオン](/ja/quickstart_more.md#シングルサインオン)
- [タスクスケジュール機能](/ja/quickstart_more.md#タスクスケジュール機能)




## (old)config変更
※これらの設定は、v1.2.0より不要になりました。  
ですが、過去バージョンでの設定の記録として残しておきます。(将来的に削除します)

- "config/admin.php"を開き、 キー "auth.providers.admin.driver" を以下のように修正します。  

~~~ php
    'auth' => [
        'providers' => [
            'admin' => [
                // Exment Edit------s
                // 'driver' => 'eloquent',
                //'model'  => Encore\Admin\Auth\Database\Administrator::class,
                'driver' => 'exment-auth',
                // Exment Edit------e
            ],
        ],  
    ],
~~~

- 言語とタイムゾーンを変更したい場合、"config/app.php"を開き、 以下の行を修正します。

~~~ php

    // 'timezone' => 'UTC',
    'timezone' => 'Asia/Tokyo',

    //'locale' => 'en',
     'locale' => 'ja',

~~~
