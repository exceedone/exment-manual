# アップデート
Exmentのバージョンが更新され、アップデートが必要になった場合の手順です。  
**※v1.0.Xもしくはv1.1.Xからv1.2.Xへの更新は、特別な手順が必要です。[こちら](/ja/update/v1_2)の手順で、更新を行ってください。**

## (任意)データのバックアップ
データのバックアップを実行します。詳細は[バックアップ](/ja/backup)をご確認ください。  
- 管理者でExmentにログインし、左メニューより「管理者設定」→「バックアップ」を選択します。
- 「バックアップ」ページ右上の「バックアップ」ボタンをクリックします。
- 最新のデータ、ならびに添付ファイルなどのバックアップが作成されます。
- その後、実行した時刻のバックアップファイルをクリックし、ダウンロードします。


## 最新ソース取得、反映、データベース更新
- コマンドラインで、以下のコマンドを実行します。  
※リリース直後だと、最新バージョンが検知されない場合があります。その場合、10～20分ほど経過後、再度下記コマンドを実行してください。  
**※version1.1.8より、アップデート方法ならびに順序を変更しております。** ご確認をお願いいたします。

~~~
cd (プロジェクトのルートディレクトリ)
composer require exceedone/laravel-admin
composer require exceedone/exment
php artisan exment:update
~~~


## (参考)過去のアップデート方法
コマンド「php artisan exment:update」は、v1.0.9より追加されました。  
万が一、このコマンドで実行できなかった場合、以下のコマンドを実行してください。  

~~~
cd (プロジェクトのルートディレクトリ)
composer require exceedone/exment
php artisan exment:update
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider" --tag=public --force
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider" --tag=lang --force
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider" --tag=views_vendor --force
php artisan migrate
~~~
